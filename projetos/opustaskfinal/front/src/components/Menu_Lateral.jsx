import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sair from './Sair';
import { Link } from 'react-router-dom';
import instagramIcon from '../image/instagramDourado.png';
import facebookIcon from '../image/facebookDourado.png';
import whatsappIcon from '../image/whatsappDourado.png';
import Sugestao from './Sugestao/Sugestao';
import Perfilusu from '../../src/image/perfil_original.jpg'

function MenuLateral() {
  const [show, setShow] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('ID do usuário não encontrado no localStorage');
        return;
      }
      try {
        const response = await fetch('http://10.135.60.33:8085/receber_dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_usuario: userId }),
        });
  
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Resposta da API:', data);
  
        if (data && data.erro === false && data.mensagem) {
          const usuario = data.mensagem;
          setNomeUsuario(usuario.nome || 'Usuário');
          
          if (usuario.imagem_perfil) {
            const imagemPerfil = usuario.imagem_perfil.startsWith('data:image')
              ? usuario.imagem_perfil

              : '';
            setImagemPerfil(imagemPerfil);
          }
        } else {
          console.error('Estrutura de resposta da API inesperada ou erro na resposta:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
  
    buscarDadosUsuario();
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
              <img
                id="menu-lateral-imagem-perfil"
                src={imagemPerfil ? imagemPerfil : Perfilusu }
                alt="Imagem de Perfil"
                width={100}
                className="imagem1"
              />

            </div>

            <p className='name'><b>{nomeUsuario}</b></p>
            <nav>
              <ul>
                <li className='item'><Link to="/Gerenciar" className='itens'>Gerenciar Conta</Link></li>
                <li className='item'><Link to="/Calendario" className='itens2'>Calendário</Link></li>
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