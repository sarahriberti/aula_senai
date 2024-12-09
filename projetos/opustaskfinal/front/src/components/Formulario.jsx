import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../App.css';

// Função para formatar a data
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

function Formulario({ taskToEdit, isEditing, onClose, selectedDate }) {
  const [formData, setFormData] = useState({
    cor: '#563d7c',
    notific: false,
    repetir: '5',
    categoria: '',
    Inicio: formatDate(selectedDate) || formatDate(new Date()), // Data de início
    Termino: formatDate(selectedDate) || formatDate(new Date()), // Data de término
    hora_ini: '', // Campo para horário de início
    hora_fin: '', // Campo para horário de término
    titulo: '', // Campo para título da tarefa
    descr: '' // Campo para descrição
  });

  const [error, setError] = useState({}); // Estado para armazenar as mensagens de erro
  const updateRelatedTasks = async (id_tarefa, updatedData) => {
    try {
      console.log("ID da tarefa:", id_tarefa);  // Verifica se o ID da tarefa está correto
  
      // Fazer a requisição para buscar as tarefas relacionadas
      const response = await fetch(`http://10.135.60.33:8085/tarefas/relacionadas/${id_tarefa}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas relacionadas.');
      }
  
      const result = await response.json();
      console.log('Resultado da API de busca:', result);
  
      if (result.erro) {
        alert(result.mensagem || 'Erro ao buscar tarefas relacionadas.');
        return;
      }
  
      const idPai = result.tarefas[0]?.ID_PAI || id_tarefa; // Se não encontrar o ID_PAI, usa o id_tarefa como padrão
  
      // Agora, faz a atualização das tarefas relacionadas com o ID encontrado
      const updateResponse = await fetch(`http://10.135.60.33:8085/tarefas/atualizar/${idPai}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar tarefas relacionadas.');
      }
  
      const updateResult = await updateResponse.json();
      console.log('Resultado da API de atualização:', updateResult);
  
      if (!updateResult.erro) {
        alert('Tarefas relacionadas atualizadas com sucesso.');
      } else {
        alert(updateResult.mensagem || 'Erro ao atualizar tarefas relacionadas.');
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefas relacionadas:', error);
      alert('Ocorreu um erro. Tente novamente.');
    }
  };
  
  useEffect(() => {
    if (isEditing && taskToEdit) {
      const datetimeIni = new Date(taskToEdit.Inicio);
      const datetimeFin = new Date(taskToEdit.Termino);

      const formattedHoraIni = datetimeIni ? datetimeIni.toTimeString().slice(0, 5) : '';
      const formattedHoraFin = datetimeFin ? datetimeFin.toTimeString().slice(0, 5) : '';

      setFormData({
        titulo: taskToEdit.Titulo || '',
        Inicio: formatDate(datetimeIni) || formatDate(selectedDate) || formatDate(new Date()),
        Termino: formatDate(datetimeFin) || formatDate(selectedDate) || formatDate(new Date()),
        hora_ini: formattedHoraIni || '',
        hora_fin: formattedHoraFin || '',
        cor: taskToEdit.Cor || '#563d7c',
        descr: taskToEdit.Descr || '',
        notific: taskToEdit.Notific || false,
        repetir: taskToEdit.Repetir || '5',
        categoria: taskToEdit.Categoria || '',
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        Inicio: formatDate(selectedDate) || formatDate(new Date()),
        Termino: formatDate(selectedDate) || formatDate(new Date()),
      }));
    }
  }, [taskToEdit, isEditing, selectedDate]);

  const handleClose = () => {
    onClose();
  };

  // Função para validar as datas e os campos obrigatórios
  const validateForm = () => {
    const newError = {};

    if (!formData.titulo) {
      newError.titulo = 'Este campo é obrigatório.';
    }
    if (!formData.hora_ini) {
      newError.hora_ini = 'Este campo é obrigatório.';
    }
    if (!formData.hora_fin) {
      newError.hora_fin = 'Este campo é obrigatório.';
    }

    const startDate = new Date(formData.Inicio);
    const endDate = new Date(formData.Termino);
    const startTime = new Date(`${formData.Inicio} ${formData.hora_ini}`);
    const endTime = new Date(`${formData.Termino} ${formData.hora_fin}`);

    if (endDate < startDate) {
      newError.termino = 'A data de término não pode ser anterior à data de início.';
    }

    if (startDate.toDateString() === endDate.toDateString() && endTime < startTime) {
      newError.hora_fin = 'O horário de término não pode ser anterior ao de início.';
    }

    setError(newError);
    return Object.keys(newError).length === 0; // Retorna verdadeiro se não houver erros
  };

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const { name } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveTask = async () => {
    // Verifique se o formulário é válido
    if (!validateForm()) {
      return;
    }

    const userID = localStorage.getItem('id');
    if (!userID) {
      alert('ID do usuário não encontrado.');
      return;
    }

    const datetime_ini = `${formData.Inicio} ${formData.hora_ini}`;
    const datetime_fim = `${formData.Termino} ${formData.hora_fin}`;

    console.log('Data e hora de início:', datetime_ini);
    console.log('Data e hora de término:', datetime_fim);

    
    const tarefa = {
      action: isEditing ? 'atualizar_tarefa' : 'salvar_tarefa',
      Cor: formData.cor,
      Titulo: formData.titulo,
      Inicio: datetime_ini,
      Termino: datetime_fim,
      Notific: formData.notific, // Campo de notificação mantido
      Descr: formData.descr || '', // A descrição é opcional
      Repetir: formData.repetir,
      ID_Usu: userID,
      Categoria: formData.categoria,
      taskID: isEditing && taskToEdit ? taskToEdit.ID : null,
    };

    const apiUrl = isEditing
      ? 'http://10.135.60.33:8085/atualizar_tarefa'
      : 'http://10.135.60.33:8085/receber_dados';

    try {
      const response = await fetch(apiUrl, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} a tarefa`);
      }

      const result = await response.json();
      console.log('Resultado da API:', result);

      if (!result.erro) {
        handleClose();
      } else {
        alert(result.mensagens || 'Erro ao salvar a tarefa.');
      }
    } catch (error) {
      console.error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} a tarefa:`, error);
      alert('Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className='main'>
      <Modal show={true} onHide={handleClose}>
        <div id='add-task' className='adicionar-compromisso'>
          <Modal.Header closeButton>
            <h2 className='comp-name'>{isEditing ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Cor */}
              <div className='color-selector'>
                <Form.Label>Cor</Form.Label>
                <Form.Control
                  type="color"
                  value={formData.cor}
                  name="cor"
                  onChange={handleChange}
                  className='color-choose'
                  id='color-take'
                />
              </div>

              {/* Título */}
              <div className='titulo-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Título'
                    onChange={handleChange}
                    value={formData.titulo}
                    name="titulo"
                    id='title-camp'
                  />
                  {error.titulo && <small className="text-danger">{error.titulo}</small>}
                </Form.Group>
              </div>

              {/* Data e Horário de Início */}
              <div className='data-horario-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label className="start-task">Início</Form.Label>
                  <div className='d-flex'>
                    <Form.Control
                      type="date"
                      name="Inicio"
                      onChange={handleChange}
                      value={formData.Inicio}
                      id='input-date-ini'
                    />
                    <Form.Control
                      type="time"
                      name="hora_ini"
                      onChange={handleChange}
                      value={formData.hora_ini}
                      id='input-hora-ini'
                    />
                  </div>
                  {error.hora_ini && <small className="text-danger">{error.hora_ini}</small>}
                </Form.Group>
              </div>

              {/* Data e Horário de Término */}
              <div className='data-horario-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Término</Form.Label>
                  {/* Mensagem de erro abaixo do rótulo */}
                  {error.termino && (
                    <small className="text-danger">{error.termino}</small>
                  )}
                  <div className='d-flex'>
                    <Form.Control
                      type="date"
                      name="Termino"
                      onChange={handleChange}
                      value={formData.Termino}
                      id='input-date-fin'
                    />
                    <Form.Control
                      type="time"
                      name="hora_fin"
                      onChange={handleChange}
                      value={formData.hora_fin}
                      id='input-hora-fin'
                    />
                  </div>
                  {/* Mensagem de erro para o horário de término */}
                  {error.hora_fin && <small className="text-danger">{error.hora_fin}</small>}
                </Form.Group>
              </div>

              {/* Notificação */}
              <div className='notificacao-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    label="Notificação"
                    name="notific"
                    id="costum-switch"
                    onChange={handleChange}
                    checked={formData.notific}
                  />
                </Form.Group>
              </div>

              {/* Descrição */}
              <div className='descricao-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder='Descrição'
                    onChange={handleChange}
                    value={formData.descr}
                    name="descr"
                    id='descr-camp'
                    rows={3}
                  />
                </Form.Group>
              </div>

              {/* Categoria */}
              <div className='categoria-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select
                    aria-label="Categoria"
                    name="categoria"
                    onChange={handleChange}
                    value={formData.categoria}
                  >
                    <option value="1">Lazer</option>
                    <option value="2">Estudo</option>
                    <option value="3">Trabalho</option>
                    <option value="4">Saúde</option>
                    <option value="5">Família</option>
                    <option value="6">Outro</option>
                  </Form.Select>
                </Form.Group>
              </div>

              {/* Repetir */}
              <div className='repetir-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Repetir</Form.Label>
                  <Form.Select
                    aria-label="Repetir"
                    name="repetir"
                    onChange={handleChange}
                    value={formData.repetir}
                  >
                    <option value="1">Diariamente</option>
                    <option value="2">Semanalmente</option>
                    <option value="3">Mensalmente</option>
                    <option value="4">Anualmente</option>
                    <option value="5">Nunca</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={saveTask}>
              {isEditing ? 'Salvar Alterações' : 'Adicionar'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default Formulario;