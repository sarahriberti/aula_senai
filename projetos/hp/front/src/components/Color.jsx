/*Nome: Função Color */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata das cores do componente tarefas*/
/*Observações : Este documento contém o import do form do bootstrap para ter todas as cores  */
import Form from 'react-bootstrap/Form';

function Cor1() {
  return (
    /*Form para colocar as cores das tarefas */
    <>
      <Form.Label htmlFor="exampleColorInput"></Form.Label>
      <Form.Control
        type="color"
        defaultValue="#563d7c"
      />
    </>
  );
}

export default Cor1;