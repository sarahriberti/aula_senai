/*Nome: Função Menu_lateral */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata do menu lateral que está na página do calendário, onde você pode voltar a página, ver sua conta ou sair do site*/
/*Observações : Este documento contém o import do UseState, Button, OffCanvs, Sair, Link */
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sair from './Sair';
import Compartilhar from "../pages/Gerenciar/pages/Compartilhar";
import { Link } from 'react-router-dom';
/*Fim das importações  */

/*Início da função Menu lateral */
function MenuLateral() {
  const [show, setShow] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Função para obter o nome do usuário do localStorage
  useEffect(() => {
    const storedNome = localStorage.getItem('nome');
    if (storedNome) {
      setNomeUsuario(storedNome);
    }
  }, []); // Adicione o array de dependências vazio aqui

  return (
    <>
      <div className='parte_superior'>
        <Button className='chamar_menu' variant="primary" onClick={handleShow}>
          <img src="/src/image/menu-aberto (4).png" alt="menu icon" width={50} />
        </Button>
      </div>
      {/*O cabeçalho do menu tendo o perfil e o nome do usuário */}
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header className='fechar_menu' closeButton closeVariant='white'></Offcanvas.Header>
        <div className='perfil'>
          <Offcanvas.Body>
            <img src="https://cdn-icons-png.flaticon.com/128/848/848006.png" alt="user" width={100} className='imagem1' />
            <p className='name'><b>{nomeUsuario}</b></p> {/* Exibe o nome do usuário aqui */}
            <nav>
              <ul> {/*Um menu para colocar todos os links do menu lateral */}
                <li className='item'><Link to="/Gerenciar">Gerenciar Conta</Link></li>
                <li className='item'><Link to="/Calendario">Calendário</Link></li>
                <li className='item'><Compartilhar /></li>
                <li className='item'><Link to="/Doacao">Doação</Link></li>
                <li className='item'><Sair /></li>
              </ul>
            </nav>
            <div className='redes'>
              <ul className='redes-link'>
                <div className='iconess'>
                  <a href="https://www.instagram.com/opus_task/"><img href="https://www.instagram.com/opus_task/" src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="insta" className='insta' /></a>
                  <a href="https://www.facebook.com/?locale=pt_BR"><img href="https://www.uol.com.br/tilt/facebook/" src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="face" className='face' /></a>
                  <a href="https://www.whatsapp.com/?lang=pt_BR"><img href="https://web.whatsapp.com/" src="https://cdn-icons-png.flaticon.com/128/4494/4494494.png" alt="whats" className='whats' /></a>
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
/*Término da função Menu Lateral */