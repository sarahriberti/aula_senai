import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
/** Final dos componentes ligados ao bootstrap*/
function EsqueciSenha() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
    <Modal.Dialog>
        <Modal.Header className='Header_EsqSenha' /**Titulo */ >
          <Modal.Title className='Titulo_EsqSenha '>Esqueci Senha </Modal.Title>
        </Modal.Header>

        <Modal.Body className='Container_EsqSenha' /**Caixa type do emial para recupeção */>
          <p>Digite seu e-mail para recuperar a sua senha:</p>
            <Form>
                <Form.Group className="CampoTelefoneEsqueci" controlId="senhaForm.ControlInput1">
                <Form.Control
                    type="E-mail"
                    placeholder="Digite seu e-mail"
                    autoFocus
                />
                </Form.Group>
            </Form>
        </Modal.Body>


        <Modal.Footer className='Footer_EsqSenha'/**Botão */>
          <Button variant="Botao_Esqueci">Enviar</Button>
        </Modal.Footer>
    </Modal.Dialog>
    </div>
  );
}

export default {EsqueciSenha};