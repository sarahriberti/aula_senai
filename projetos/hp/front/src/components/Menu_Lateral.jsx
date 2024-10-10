import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sair from './Sair';
import Compartilhar from "../pages/Gerenciar/pages/Compartilhar";
import { Link } from 'react-router-dom';
import instagramIcon from '../image/instagramDourado.png';
import facebookIcon from '../image/facebookDourado.png';
import whatsappIcon from '../image/whatsappDourado.png';
import Sugestao from './Sugestao/Sugestao';

function MenuLateral() {
  const [show, setShow] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Função para obter o nome do usuário do localStorage
  const getNome = () => {
    const storedNome = localStorage.getItem('nome');
    if (storedNome) {
      setNomeUsuario(storedNome);
    }
  };

  // Função para atualizar o nome do usuário no localStorage
  const updateNome = (novoNome) => {
    localStorage.setItem('nome', novoNome);
    setNomeUsuario(novoNome);
  };

  useEffect(() => {
    getNome(); // Obtém o nome ao montar o componente
    const intervalId = setInterval(() => {
      getNome(); // Atualiza o nome a cada 5 segundos
    }, 5000);

    return () => clearInterval(intervalId); // Limpeza do intervalo ao desmontar o componente
  }, []);

  return (
    <>
      <div className='parte_superior'>
        <Button className='chamar_menu' variant="primary" onClick={handleShow}>
          <img src="/src/image/menu-aberto (4).png" alt="menu icon" width={50} />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header className='fechar_menu' closeButton closeVariant='white'></Offcanvas.Header>
        <div className='perfil'>
          <Offcanvas.Body>
            <img src="https://cdn-icons-png.flaticon.com/128/848/848006.png" alt="user" width={100} className='imagem1' />
            <p className='name'><b>{nomeUsuario}</b></p> {/* Exibe o nome do usuário */}
            <nav>
              <ul>
                <li className='item'><Link to="/Gerenciar" className='itens'>Gerenciar Conta</Link></li>
                <li className='item'><Link to="/Calendario" className='itens2'>Calendário</Link></li>
                <li className='item'><Compartilhar className='itens'/></li>
                <li className='item'><Sugestao className='itens'/></li>
                <li className='item'><Link to="/Doacao" className='itens1'>Contribuição</Link></li>
                <li className='item'><Sair className='itens'/></li>
              </ul>
            </nav>
            <div className='redes'>
              <ul className='redes-link'>
                <div className='iconess'>
                  <a href="https://www.instagram.com/opus_task/"><img src={instagramIcon} alt="insta" className='insta' /></a>
                  <a href="https://www.facebook.com/?locale=pt_BR"><img src={facebookIcon} alt="face" className='face' /></a>
                  <a href="https://www.whatsapp.com/?lang=pt_BR"><img src={whatsappIcon} alt="whats" className='whats' /></a>
                </div>
              </ul>
            </div>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}

export default MenuLateral;