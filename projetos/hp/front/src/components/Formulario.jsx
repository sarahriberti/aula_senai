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
    categoria: '6',
    Inicio: formatDate(selectedDate) || formatDate(new Date()), // Data de início
    Termino: formatDate(selectedDate) || formatDate(new Date()), // Data de término
    hora_ini: '', // Campo para horário de início
    hora_fin: '', // Campo para horário de término
  });

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
        categoria: taskToEdit.Categoria || '6',
        repetir: taskToEdit.Repetir || '5',
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

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const saveTask = async () => {
    if (!formData.titulo || !formData.Inicio || !formData.hora_ini || !formData.hora_fin || !formData.Termino) {
      alert('Preencha todos os campos obrigatórios.');
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
      Notific: formData.notific,
      Descr: formData.descr,
      Categoria: formData.categoria,
      Repetir: formData.repetir,
      ID_Usu: userID,
      taskID: isEditing && taskToEdit ? taskToEdit.ID : null,
    };

    const apiUrl = isEditing
      ? 'http://10.135.60.38:8085/atualizar_tarefa'
      : 'http://10.135.60.38:8085/receber_dados';

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
        <div className='adicionar-compromisso'>
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
                  />
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
                </Form.Group>
              </div>

              {/* Data e Horário de Término */}
              <div className='data-horario-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Término</Form.Label>
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
                </Form.Group>
              </div>

              {/* Notificação */}
              <div className='notification'>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Notificação"
                  name="notific"
                  onChange={handleChange}
                  checked={formData.notific}
                />
              </div>

              {/* Descrição */}
              <div className='description'>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder='Descrição'
                    name="descr"
                    onChange={handleChange}
                    value={formData.descr}
                  />
                </Form.Group>
              </div>

              {/* Categoria */}
              <div className='category'>
                <Form.Select name="categoria" onChange={handleChange} value={formData.categoria}>
                  <option>Categoria</option>
                  <option value="1">Lazer</option>
                  <option value="2">Estudo</option>
                  <option value="3">Trabalho</option>
                  <option value="4">Saúde</option>
                  <option value="5">Família</option>
                  <option value="6">Outro</option>
                </Form.Select>
              </div>
              {/* Repetir */}
              <div className='repeat'>
                <Form.Select name="repetir" onChange={handleChange} value={formData.repetir}>
                  <option>Repetir</option>
                  <option value="1">Diário</option>
                  <option value="2">Semanal</option>
                  <option value="3">Mensal</option>
                  <option value="4">Anual</option>
                  <option value="5">Nunca</option>
                </Form.Select>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={saveTask}>
              {isEditing ? 'Salvar Alterações' : 'Salvar Tarefa'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default Formulario;