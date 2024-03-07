/*Nome: Função Tarefa */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata das tarefas que o usuário vai fazer em seu dia, assim, utilizando o componente check e diario*/
/*Observações : Este documento contém o import do Usestate, Button, Form, Modal, Diario, Check  */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Diario from './Diario';
import Check from './Check';
/*Fim das importações */

/*Inicio da function */
function Tarefa() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='text'>
                <Diario />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ACADEMIA 26/06</Modal.Title>
                    <Check />
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <h5><Form.Label>INICIO: 13:00</Form.Label></h5>

                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <h5><Form.Label>TÉRMINO: 16:00</Form.Label></h5>

                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <div className='descr'>
                                <Form.Group /* >>> DESCRIÇÃO <<< */
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label></Form.Label>
                                    <Form.Control className='description-color' as="textarea" rows={3} placeholder='Descrição'/>
                                </Form.Group>
                            </div>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Editar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
/*Fim da function */
export default Tarefa;
/** Componentes da barra tarefas*/