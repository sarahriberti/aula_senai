import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sair from './Sair';
import Compartilhar from "../pages/Gerenciar/Compartilhar";
import { Link } from 'react-router-dom';
import instagramIcon from '../image/instagramDourado.png';
import facebookIcon from '../image/facebookDourado.png';
import whatsappIcon from '../image/whatsappDourado.png';
import Sugestao from './Sugestao/Sugestao';

function MenuLateral() {
  const [show, setShow] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getNome = () => {
    const storedNome = localStorage.getItem('nome');
    if (storedNome) {
      setNomeUsuario(storedNome);
    }
  };

  const getUsuarioData = async () => {
    const idUsuario = localStorage.getItem('id'); // Pega o id_usuario do localStorage

    if (!idUsuario) {
      console.error('ID do usuário não encontrado no localStorage');
      return;
    }

    try {
      const response = await fetch('http://10.135.60.33:8085/buscar_usuario', { // URL completa do backend Flask
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: idUsuario }) // Inclui o id_usuario no corpo da requisição
      });

      if (response.ok) {
        const data = await response.json();
        console.log('response', data);

        // Ajuste as variáveis conforme os nomes retornados do backend
        setNomeUsuario(data.nome);
        setImagemPerfil(data.imagem_perfil); // Aqui é 'imagem_perfil' conforme seu backend

        console.log("Dados do Usuário", data);
      } else {
        console.error('Erro ao obter dados do usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };



  useEffect(() => {
    getNome();
    getUsuarioData(); // Obtém os dados do usuário ao montar o componente
    const intervalId = setInterval(() => {
      getNome();
    }, 5000);

    return () => clearInterval(intervalId);
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
            <div id='perfil_gerenciar'>
              <img src={imagemPerfil || "https://cdn-icons-png.flaticon.com/128/848/848006.png"} alt="user" width={100} className='imagem1' />

            </div>

            <p className='name'><b>{nomeUsuario}</b></p>
            <nav>
              <ul>
                <li className='item'><Link to="/Gerenciar" className='itens'>Gerenciar Conta</Link></li>
                <li className='item'><Link to="/Calendario" className='itens2'>Calendário</Link></li>
                <li className='item'><Compartilhar className='itens' /></li>
                <li className='item'><Sugestao className='itens' /></li>
                <li className='item'><Link to="/Doacao" className='itens1'>Contribuição</Link></li>
                <li className='item'><Sair className='itens' /></li>
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