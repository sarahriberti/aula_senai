/*Nome: Formulário */
/*Data da criação: junho/setembro de 2023 */
/*Descrição : Neste componente se trata o formulário do calendário de gerar tarefas */
/*Observações : Este documento contém o import de um CSS corresponde exclusivamente ao componente e import's do react-bootstrap */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../App.css'
/*Fim das importações  */

/* >>> INÍCIO DA FUNÇÃO DO FORMULÁRIO TO-DO-LIST <<< */
function Formulario() {

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setShow(false);
    setFormData({}); // Limpa os dados do formulário e define "Nunca" como padrão
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {

      // >>> RECUPERA O ID DO USUÁRIO PRESENTE NO LOCALSTORAGE <<<
      const userID = localStorage.getItem('id');

      // >>> DADOS DO FORMULÁRIO INCLUINDO O ID <<<
      const formDataAcao = {
        ...formData,
        acao: 'salvar_tarefa',
        ID: userID, // Inclui o ID do usuário
        notific: formData.notific || false, // Define a notificação como false se estiver desativada
        repetir: formData.repetir || '4', // Define "Nunca" se nenhuma opção for escolhida
      };
      const resposta = await fetch('http://10.135.60.16:8085/receber_dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAcao),
      });
  
      if (!resposta.ok) {
        throw new Error('Erro na solicitação');
      }
  
      handleClose(); // Feche o modal após a conclusão bem-sucedida
      setFormData({ repetir: '4' }); // Limpa os dados do formulário após o envio bem-sucedido
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
    }
  };

  const handleChange = (event) => {
    // Atualize o estado com os dados do formulário à medida que eles são alterados
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  return (
    <>
      <Button id='adicionar-click' variant="primary" onClick={handleShow} className='butao3'> {/* >>> BOTÃO PARA ADICIONAR COMPROMISSO <<< */}

      </Button>

      <div className='main'> {/* >>> DIV MAIN <<< */}

        <Modal show={show} onHide={handleClose}> {/* >>> INÍCIO DO MODAL <<< */}

          <div className='adicionar-compromisso'> {/* >>> TÍTULO <<< */}
            <Modal.Header closeButton> {/* >>> INÍCIO DO MODAL HEADER <<< */}
              <h2 className='comp-name'>TAREFA</h2>
            </Modal.Header> {/* >>> FINAL DO MODAL HEADER <<< */}
          </div>

          <Modal.Body> {/* >>> INÍCIO DO MODAL BODY <<< */}

            <Form> {/* >>> INÍCIO DO FORMULÁRIO <<< */}

              <div className='color-selector'>
                {/* >>> SELETOR DE COR <<< */}
                <Form.Control
                  type="color"
                  id="exampleColorInput"
                  title="Choose your color"
                  value={formData.cor || '#563d7c'}
                  name="cor"
                  onChange={handleChange}
                />
                <Form.Label htmlFor="exampleColorInput">Cor</Form.Label>
              </div>

              <div className='titulo-compromisso'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label></Form.Label> {/* >>> TÍTULO DA TAREFA <<< */}
                  <Form.Control
                    className='til-color'
                    type="text"
                    placeholder='Título'
                    onChange={handleChange}
                    value={formData.titulo || ''}
                    name="titulo"
                  />
                </Form.Group>
              </div>

              <div className='data-compromisso'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Data</Form.Label> {/* >>> DATA DA TAREFA <<< */}
                  <Form.Control
                    className='date-color'
                    type="date"
                    autoFocus
                    name="data"
                    onChange={handleChange}
                    value={formData.data || ''}
                  />
                </Form.Group>
              </div>

              <div className='horario-compromisso'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                  <Form.Label>Horário</Form.Label> {/* >>> HORÁRIO DA TAREFA <<< */}

                  <div className='hor-edit'>
                    <Form.Label >Início:</Form.Label>
                    <Form.Control
                      className='ini-color'
                      type="time"
                      autoFocus
                      name="hora_ini"
                      onChange={handleChange}
                      value={formData.hora_ini || ''}
                    />
                    <Form.Label>Até:</Form.Label>
                    <Form.Control
                      className='ate-color'
                      type="time"
                      autoFocus
                      name="hora_fin"
                      onChange={handleChange}
                      value={formData.hora_fin || ''}
                    />
                  </div>
                </Form.Group>
              </div>

              <div className='notification'>
                <Form>
                  <Form.Check // prettier-ignore >>> NOTIFICAÇÃO <<<
                    type="switch"
                    id="custom-switch"
                    label="Notificação"
                    name="notific"
                    onChange={handleChange}
                    checked={formData.notific || false}
                  />
                </Form>
              </div>

              <div className='description'>
                <Form.Group /* >>> DESCRIÇÃO <<< */ className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label></Form.Label>
                  <Form.Control
                    className='descri'
                    as="textarea"
                    rows={3}
                    placeholder='Descrição'
                    name="descr"
                    onChange={handleChange}
                    value={formData.descr || ''}
                  />
                </Form.Group>
              </div>

              <div className='repeat'>
                <Form.Select className='repeat-color' aria-label="Default select example" name="repetir" onChange={handleChange} value={formData.repetir || ''}> {/* >>> REPETIR <<< */}
                  <option>Repetir</option>
                  <option value="1">Diariamente</option>
                  <option value="2">Semanalmente</option>
                  <option value="3">Mensalmente</option>
                  <option value="3">Anualmente</option>
                  <option value="4">Nunca</option>
                </Form.Select>
              </div>

            </Form>
          </Modal.Body> {/* >>> FINAL DO MODAL BODY <<< */}

          <div className='rodape'> {/* >>> INÍCIO DO FOOTER <<< */}

            <Modal.Footer> {/* >>> INÍCIO DO MODAL FOOTER <<< */}

              <div className='salvar-compromisso'> {/* >>> BOTÃO DE SALVAR TAREFA <<< */}
                <Button type='submit' variant="primary" onClick={handleSubmit}>
                  Salvar
                </Button>
              </div>

            </Modal.Footer> {/* >>> FINAL DO MODAL FOOTER <<< */}
          </div> {/* >>> FINAL DO FOOTER <<< */}

        </Modal> {/* >>> FINAL DO MODAL <<< */}
      </div >
    </>
  );
}
export default Formulario;
/* >>> TÉRMINO DA FUNÇÃO DE FORMULÁRIO DE TO-DO-LIST <<< */