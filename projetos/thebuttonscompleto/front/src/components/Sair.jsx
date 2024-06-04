/*Nome: Sair */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata de como sair do site no componente do menu lateral*/
import { useState } from 'react';
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal'; 
import { Link } from 'react-router-dom'; 
/*Fim das importações  */

/*Início da função sair */
function Sair() {
  const [show, setShow] = useState(false);  // Declara um estado 'show' e a função 'setShow' para atualizar esse estado. Inicialmente 'show' é false.

  const handleClose = () => setShow(false);  // Define a função handleClose para fechar o modal, alterando o estado 'show' para false
  const handleShow = () => setShow(true);  // Define a função handleShow para abrir o modal, alterando o estado 'show' para true

  return (
    <>
      {/* Botão para acionar a abertura do modal */}
      <Button variant="primary" onClick={handleShow} className='linke2'>
        Sair da Conta
      </Button>

      {/* Componente Modal para confirmação de saída */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"  // Define que o modal não fecha ao clicar fora dele
        keyboard={false}  // Define que o modal não fecha ao pressionar a tecla 'ESC'
      >
        {/* Este modal é para saber se realmente você quer sair e oferece a opção de sim ou não */}
        <Modal.Body>
          <h4>Você deseja realmente sair?</h4>  {/* Mensagem de confirmação */}
        </Modal.Body>
        <Modal.Footer>
          {/* Botão para fechar o modal sem sair */}
          <Button variant="secondary" onClick={handleClose}>
            NÃO
          </Button>
          {/* Link para a rota raiz com um botão para confirmar a saída */}
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
