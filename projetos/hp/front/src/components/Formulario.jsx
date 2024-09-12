import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../App.css';

function Formulario({ taskToEdit, isEditing, onClose }) {
  const [formData, setFormData] = useState({
    cor: '#563d7c',
    notific: false,
    repetir: '4',
  });

  useEffect(() => {
    if (isEditing && taskToEdit) {
      setFormData({
        titulo: taskToEdit.Titulo || '',
        data: taskToEdit.Data || '',
        hora_ini: taskToEdit.Hora_Ini || '',
        hora_fin: taskToEdit.Hora_Fin || '',
        cor: taskToEdit.Cor || '#563d7c',
        descr: taskToEdit.Descr || '',
        notific: taskToEdit.Notific || false,
        repetir: taskToEdit.Repetir || '4',
      });
    } else {
      setFormData({
        cor: '#563d7c',
        notific: false,
        repetir: '4',
      });
    }
  }, [taskToEdit, isEditing]);

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

  // Função para salvar ou atualizar tarefa
  const saveTask = async () => {
    if (!formData.titulo || !formData.data || !formData.hora_ini || !formData.hora_fin) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const userID = localStorage.getItem('id'); // Obtendo ID do usuário
    if (!userID) {
      alert('ID do usuário não encontrado.');
      return;
    }

    const tarefa = {
      action: isEditing ? 'atualizar_tarefa' : 'salvar_tarefa',
      Cor: formData.cor,
      Titulo: formData.titulo,
      Data: formData.data,
      Hora_Ini: formData.hora_ini,
      Hora_Fin: formData.hora_fin,
      Notific: formData.notific,
      Descr: formData.descr,
      Repetir: formData.repetir,
      ID_Usu: userID,
      taskID: isEditing && taskToEdit ? taskToEdit.ID : null, // Inclui o ID da tarefa para atualização
    };
    console.log('Dados da tarefa antes de salvar:', tarefa)

    const apiUrl = isEditing
      ? 'http://10.135.60.16:8085/atualizar_tarefa'
      : 'http://10.135.60.16:8085/receber_dados';

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
      console.log('Resposta da API:', result);

      if (!result.erro) {
        // Fechar o formulário e atualizar a interface automaticamente
        handleClose();
      } else {
        alert(result.mensagens);
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
              <div className='color-selector'>
                <Form.Control
                  type="color"
                  value={formData.cor}
                  name="cor"
                  onChange={handleChange}
                />
                <Form.Label>Cor</Form.Label>
              </div>
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
              <div className='data-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="date"
                    name="data"
                    onChange={handleChange}
                    value={formData.data}
                  />
                </Form.Group>
              </div>
              <div className='horario-compromisso'>
                <Form.Group className="mb-3">
                  <Form.Label>Horário</Form.Label>
                  <div className='hor-edit'>
                    <Form.Label>Início:</Form.Label>
                    <Form.Control
                      type="time"
                      name="hora_ini"
                      onChange={handleChange}
                      value={formData.hora_ini}
                    />
                    <Form.Label>Até:</Form.Label>
                    <Form.Control
                      type="time"
                      name="hora_fin"
                      onChange={handleChange}
                      value={formData.hora_fin}
                    />
                  </div>
                </Form.Group>
              </div>
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
              <div className='description'>
                <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
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
              <div className='repeat'>
                <Form.Select name="repetir" onChange={handleChange} value={formData.repetir}>
                  <option>Repetir</option>
                  <option value="1">Diariamente</option>
                  <option value="2">Semanalmente</option>
                  <option value="3">Mensalmente</option>
                  <option value="4">Nunca</option>
                </Form.Select>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={saveTask}>
              {isEditing ? 'Atualizar' : 'Salvar'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default Formulario;