/*Nome: Tarefa */
/*Autor: Gian e Julia */
/*Data da criação: outubro de 2023 */
/*Descrição: Neste componente traz a tela onde o usuário pode visualizar mais detalhadamente sua tarefa*/
import { useState } from 'react'; 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';  
import Modal from 'react-bootstrap/Modal'; 
import Diario from './Diario';
import Check from './Check'; 
/*Fim das importações */

/*Início da função Tarefa */
function Tarefa() {
    const [show, setShow] = useState(false);  // Declara um estado 'show' e a função 'setShow' para atualizar esse estado. Inicialmente 'show' é false.

    const handleClose = () => setShow(false);  // Define a função handleClose para fechar o modal, alterando o estado 'show' para false
    const handleShow = () => setShow(true);  // Define a função handleShow para abrir o modal, alterando o estado 'show' para true

    return (
        <>
            {/* Botão para abrir o modal, que também renderiza o componente Diario */}
            <Button variant="primary" onClick={handleShow} className='text'>
                <Diario />
            </Button>

            {/* Componente Modal para exibir os detalhes da tarefa */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* Título do modal e inclusão do componente Check */}
                    <Modal.Title>ACADEMIA 26/06</Modal.Title>
                    <Check />
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {/* Exibição do horário de início da tarefa */}
                            <h5><Form.Label>INICIO: 13:00</Form.Label></h5>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {/* Exibição do horário de término da tarefa */}
                            <h5><Form.Label>TÉRMINO: 16:00</Form.Label></h5>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {/* Área de texto para a descrição da tarefa */}
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
                    {/* Botões para editar e excluir a tarefa */}
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
/*Fim da função Tarefa */
export default Tarefa;
/** Componentes da barra tarefas */
