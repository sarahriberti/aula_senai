/*Nome: Função Sair */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata de como sair do site no componente do menu lateral*/
/*Observações : Este documento contém o import do Usestate, Button, Modal, Link  */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
/*Fim das importações  */

/*Início da função sair */
function Sair() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      <Button variant="primary" onClick={handleShow} className='linke2'>
        Sair da Conta
      </Button>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/*Este modal é para sber se realmente você que sair e a opção de sim ou não */}
        <Modal.Body>
          <h4>Você deseja realmente sair?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NÃO
          </Button>
          <Link to='/'>
          <Button variant="primary" onClick={handleClose}>
            SIM
          </Button>
          </Link>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Sair;
/*Término da função sair */