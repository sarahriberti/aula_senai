/*Nome: EsqueciSenha */
/*Autor: Julia Bosso */
/*Descrição : Componente para recuperar senha */
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'; 
function EsqueciSenha() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      {/* Modal para recuperar a senha */}
      <Modal.Dialog>
        {/* Cabeçalho do modal */}
        <Modal.Header className='Header_EsqSenha' /**Titulo */ >
          <Modal.Title className='Titulo_EsqSenha '>Esqueci Senha </Modal.Title> {/* Título do modal */}
        </Modal.Header>

        {/* Corpo do modal */}
        <Modal.Body className='Container_EsqSenha' /**Caixa type do emial para recuperação */>
          <p>Digite seu e-mail para recuperar a sua senha:</p> {/* Instrução para digitar o e-mail */}
          {/* Formulário para digitar o e-mail */}
          <Form>
            <Form.Group className="CampoTelefoneEsqueci" controlId="senhaForm.ControlInput1">
              <Form.Control
                type="E-mail" // Tipo de entrada é um e-mail
                placeholder="Digite seu e-mail" // Placeholder para orientar o usuário
                autoFocus // Define o foco inicial no campo de entrada
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Rodapé do modal */}
        <Modal.Footer className='Footer_EsqSenha'/**Botão */>
          <Button variant="Botao_Esqueci">Enviar</Button> {/* Botão de enviar */}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default {EsqueciSenha};