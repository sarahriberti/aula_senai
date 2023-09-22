//Inicio MenuLateral
import { useState } from 'react'; //Importar o react
import Button from 'react-bootstrap/Button'; //Importar o botão do bootstrap
import Offcanvas from 'react-bootstrap/Offcanvas'; //Importar o Offcanvas do bootstrap

function MenuLateral() { //Função para chamar o MenuLateral
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className='parte_superior'> {/*div que contem o botão e a imagem da logo */}
    <Button className='chamar_menu' onClick={handleShow}> {/*botão para chamar o modal*/}
        <img src="./src/assets/menu-aberto (4).png" alt="menu icon" width={50} />
      </Button>
    </div> {/*fim da div chamar_menu*/}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header className='fechar_menu' closeButton></Offcanvas.Header> {/*header do menu*/}
        <div className='perfil'> {/*div com as informações do perfil*/}
        <Offcanvas.Body>
        <img src="https://cdn-icons-png.flaticon.com/128/848/848006.png" alt="user" width={100} className='imagem1'/>
          <p className='name'><b>Nome</b></p>
          <a href=""><p>Calendário</p></a>
          <a href=""><p>Adicionar Tarefa</p></a>
          <a href=""><p>Editar Perfil</p></a>
          <div className='redes'>
            <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="insta" className='insta' />
            <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="face" className='face' />
            <img src="https://cdn-icons-png.flaticon.com/128/4494/4494494.png" alt="whats" className='whats' />
          </div>
        </Offcanvas.Body>

        </div> {/*fim da div parte_superior*/}
      </Offcanvas>
    </>
  );
}
export default MenuLateral;