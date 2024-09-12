import '../GerenciarConta/Gerenciar.css'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Senha() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="senha-main">

            <Form>
                <div className='password-actual'>
                    <Form.Label>Senha atual:</Form.Label>

                    <div>
                        <Form.Control className='space-user'
                            type="text"
                            autoFocus
                        />
                        <Button variant="primary" onClick={handleShow}>
                            Esqueceu sua senha?
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton className='Header_EsqSenha' /**Titulo */>
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
                            <Modal.Footer>
                                <Button variant="Botao_Esqueci">Enviar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className='new-password'>
                    <Form.Label>Nova senha:</Form.Label>
                    <div>
                        <Form.Control className='space-user'
                            type="text"
                            autoFocus
                        />
                    </div>
                </div>
                <div className='confirm'>
                    <Form.Label>Confirmar nova senha:</Form.Label>
                    <div>
                        <Form.Control className='space-user'
                            type="text"
                            autoFocus
                        />
                    </div>
                </div>
                <Button as="input" type="submit" value="Trocar senha" />{' '}
            </Form>
        </div>
    )
}
export default Senha;