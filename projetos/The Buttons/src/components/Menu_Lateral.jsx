import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sair from './Sair';
import { Link } from 'react-router-dom';

function MenuLateral() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='parte_superior'>
        <Button className='chamar_menu' variant="primary" onClick={handleShow}>
          <img src="/src/image/menu-aberto (4).png" alt="menu icon" width={50} />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header className='fechar_menu' closeButton></Offcanvas.Header>
        <div className='perfil'>
          <Offcanvas.Body>
            <img src="https://cdn-icons-png.flaticon.com/128/848/848006.png" alt="user" width={100} className='imagem1' />
            <p className='name'><b>Nome</b></p>
            <nav>
              <ul>
                <li className='item'><Link to="//">Gerenciar Conta</Link></li>
                <li className='item'><Link to="">Calendário</Link></li>
                <li className='item'><Sair/></li>
              </ul>
              
            </nav>
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