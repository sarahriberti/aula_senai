import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'; // Importando Link
import './Gerenciar.css';

/** Final dos componentes ligados ao bootstrap */
function EsqueciSenha() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header className='Header_EsqSenha'>
          <Modal.Title className='Titulo_EsqSenha'>Esqueci Senha</Modal.Title>
        </Modal.Header>

        <Modal.Body className='Container_EsqSenha'>
          <p>Digite seu e-mail para recuperar a sua senha:</p>
          <Form>
            <Form.Group className="CampoTelefoneEsqueci" controlId="senhaForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Digite seu e-mail"
                autoFocus
              />
            </Form.Group>
          </Form>
          {/* Link para a página de login */}
         
        </Modal.Body>

        <Modal.Footer className='Footer_EsqSenha'>
        <div className="link-login">
            <p><Link to="/Login">Volte para o Login</Link></p>
          </div>
          <Button variant="primary">Enviar</Button>
        </Modal.Footer>
        
      </Modal.Dialog>
    </div>
  );
}

export default EsqueciSenha;
