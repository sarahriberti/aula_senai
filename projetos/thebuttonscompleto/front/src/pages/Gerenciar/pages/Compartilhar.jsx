/*Nome: Compartilhar */
/*Autor: Julia Bosso */
/*Descrição : Componenete da página de compartilhar o calendário*/
import { useState } from 'react'; 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import Modal from 'react-bootstrap/Modal'; 

// Função principal do componente Compartilhar
function Compartilhar() {
  // Estado para controlar a visibilidade do modal
  const [show, setShow] = useState(false);

  // Função para fechar o modal
  const handleClose = () => setShow(false);
  // Função para abrir o modal
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Botão para abrir o modal */}
      <Button variant="primary" onClick={handleShow} className='comp_menu'>
        Compartilhamento
      </Button>

      {/* Modal para o formulário de compartilhamento */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compartilhamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email convidado</Form.Label>
              {/* Campo de entrada para o email do convidado */}
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
              {/* Grupo de opções de permissão */}
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Pode editar"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Pode visualizar"
                />
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Botão para cancelar e fechar o modal */}
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          {/* Botão para salvar as configurações e fechar o modal */}
          <Button variant="primary" onClick={handleClose}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Compartilhar; // Exporta o componente Compartilhar como padrão
