import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sair from './Sair';

function MenuLateral() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='parte_superior'>
        <Button className='chamar_menu' variant="primary" onClick={handleShow}>
          <img src="./src/assets/menu-aberto (4).png" alt="menu icon" width={50} />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header className='fechar_menu' closeButton></Offcanvas.Header>
        <div className='perfil'>
          <Offcanvas.Body>
          <img src="https://cdn-icons-png.flaticon.com/128/848/848006.png" alt="user" width={100} className='imagem1'/>
          <p className='name'><b>Nome</b></p>
          <a href=""><p className='item'>Gerenciar Conta</p></a>
          <a href=""><p className='item'>Adicionar Tarefa</p></a>
          <a href=""><p className='item'>Calendário</p></a>
          <Sair />
          <div className='redes'>
            <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="insta" className='insta' />
            <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="face" className='face' />
            <img src="https://cdn-icons-png.flaticon.com/128/4494/4494494.png" alt="whats" className='whats' />
          </div>
          </Offcanvas.Body>
        </div>

      </Offcanvas>
    </>
  );
}

export default MenuLateral;