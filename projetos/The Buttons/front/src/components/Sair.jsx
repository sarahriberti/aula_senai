import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function Sair() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      <Button variant="primary" onClick={handleShow} className='linke'>
        Sair da Conta
      </Button>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
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