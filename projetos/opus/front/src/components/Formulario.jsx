/*Nome: Formulário */
/*Data da criação: junho/setembro de 2023 */
/*Descrição : Neste componente se trata o formulário do calendário de gerar tarefas */
/*Observações : Este documento contém o import de um CSS corresponde exclusivamente ao componente e import's do react-bootstrap */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../App.css'
import axios from 'axios'; // Importe o axios para fazer solicitações HTTP
/*Fim das importações  */

/* >>> INÍCIO DA FUNÇÃO DO FORMULÁRIO TO-DO-LIST <<< */
function Formulario() {

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({}); // Estado para armazenar os dados do formulário

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      // Faça uma solicitação POST para o backend com os dados do formulário
      await axios.post('http://10.135.60.16:8085/receber_dados', formData);
      handleClose(); // Feche o modal após a conclusão bem-sucedida
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
    }
  };

  const handleChange = (event) => {
    // Atualize o estado com os dados do formulário à medida que eles são alterados
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
                  defaultValue="#563d7c"
                  title="Choose your color"
                  name="cor"
                />
                <Form.Label htmlFor="exampleColorInput">Cor</Form.Label>
              </div>

              <div className='titulo-compromisso'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label></Form.Label> {/* >>> TÍTULO DA TAREFA <<< */}
                  <Form.Control className='til-color'
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
                  <Form.Control className='date-color'
                    type="date"
                    autoFocus
                    name="data"
                  />
                </Form.Group>
              </div>

              <div className='horario-compromisso'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                  <Form.Label>Horário</Form.Label> {/* >>> HORÁRIO DA TAREFA <<< */}

                  <div className='hor-edit'>
                    <Form.Label >Início:</Form.Label>
                    <Form.Control className='ini-color'
                      type="time"
                      autoFocus
                      name="hora_ini"
                    />
                    <Form.Label>Até:</Form.Label>
                    <Form.Control className='ate-color'
                      type="time"
                      autoFocus
                      name="hora_fin"
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
                  />
                </Form>
              </div>

              <div className='description'>
                <Form.Group /* >>> DESCRIÇÃO <<< */
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control className='descri' as="textarea" rows={3} placeholder='Descrição' name="descr" />
                </Form.Group>
              </div>

              <div className='repeat'>
                <Form.Select className='repeat-color' aria-label="Default select example" name="repetir"> {/* >>> REPETIR <<< */}
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