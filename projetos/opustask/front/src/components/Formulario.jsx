/*Nome: Formulário */
/*Data da criação: junho/setembro de 2023 */
/*Descrição : Neste componente se trata o formulário do calendário de gerar tarefas */
/*Observações : Este documento contém o import de um CSS correspondente exclusivamente ao componente e imports do react-bootstrap */
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../App.css'
/*Fim das importações  */

/* >>> INÍCIO DA FUNÇÃO DO FORMULÁRIO TO-DO-LIST <<< */
function Formulario({ taskToEdit, isEditing, onClose }) {
  const [formData, setFormData] = useState({
    cor: '#563d7c', // Definindo cor padrão
    notific: false,
    repetir: '4'
  });

  useEffect(() => {
    if (isEditing && taskToEdit) {
      setFormData({
        titulo: taskToEdit.Titulo,
        data: taskToEdit.Data,
        hora_ini: taskToEdit.Hora_Ini,
        hora_fin: taskToEdit.Hora_Fin,
        cor: taskToEdit.Cor || '#563d7c', // Define a cor padrão se estiver vazio
        descr: taskToEdit.Descr,
        notific: taskToEdit.Notific || false,
        repetir: taskToEdit.Repetir || '4',
      });
    } else {
      setFormData({
        cor: '#563d7c', // Cor padrão quando não estiver editando
        notific: false,
        repetir: '4'
      });
    }
  }, [taskToEdit, isEditing]);

  const handleClose = () => {
    onClose(); // Fechando o modal ao chamar a função passada pelo pai
  };

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const userID = localStorage.getItem('id');
      const formDataAcao = {
        ...formData,
        ID: userID,
        notific: formData.notific || false,
        repetir: formData.repetir || '4',
      };

      // URL e método dinâmico, dependendo se está editando ou criando uma tarefa
      let apiUrl = isEditing ? 'http://10.135.60.16:8085/atualizar_tarefa' : 'http://10.135.60.16:8085/receber_dados';
      let method = isEditing ? 'PUT' : 'POST';

      const resposta = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAcao),
      });

      if (!resposta.ok) {
        throw new Error('Erro na solicitação');
      }

      handleClose(); // Fecha o modal após a conclusão bem-sucedida
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
    }
  };

  return (
    <>
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
                      value={formData.titulo || ''}
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
                      value={formData.data || ''}
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
                        value={formData.hora_ini || ''}
                      />
                      <Form.Label>Até:</Form.Label>
                      <Form.Control
                        type="time"
                        name="hora_fin"
                        onChange={handleChange}
                        value={formData.hora_fin || ''}
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
                      value={formData.descr || ''}
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
              <Button variant="primary" onClick={handleSubmit}>
                {isEditing ? 'Atualizar' : 'Salvar'}
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Formulario;
/* >>> TÉRMINO DA FUNÇÃO DE FORMULÁRIO DE TO-DO-LIST <<< */