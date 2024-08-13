/*Nome: Função Check */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata a função de marcar*/
/*Observações : Este documento contém o import de um CSS corresponde exclusivamente ap componente  */

import Form from 'react-bootstrap/Form';

function Check() {
    return (
      /*Form para ver se a tarefa está concluida */
      <Form className='box'>
        {['checkbox'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="Tarefa Concluída"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
      </Form>
    );
  }
  
  export default Check;
  
  
  