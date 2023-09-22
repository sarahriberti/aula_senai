import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../App.css'

function Formulario() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <Button id='adicionar-click' variant="primary" onClick={handleShow} className='butao3'> {/* >>> BOTÃO PARA ADICIONAR COMPROMISSO <<< */ }
      <img src="./src/assets/mais.png"  alt="rg" className='image1'/>
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
                />
                <Form.Label htmlFor="exampleColorInput">Cor</Form.Label>
              </div>

              <div className='titulo-compromisso'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label></Form.Label> {/* >>> TÍTULO DA TAREFA <<< */}
                  <Form.Control className='til-color'
                    type="text"
                    autoFocus
                    placeholder='Título'
                  />
                </Form.Group>
              </div>

              <div className='data-compromisso'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Data</Form.Label> {/* >>> DATA DA TAREFA <<< */}
                  <Form.Control className='date-color'
                    type="date"
                    autoFocus
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
                    />
                    <Form.Label>Até:</Form.Label>
                    <Form.Control className='ate-color'
                      type="time"
                      autoFocus
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
                  />
                </Form>
              </div>

              <div className='category'>
                <Form.Select className='category-color' aria-label="Default select example"> {/* >>> CATEGORIA <<< */}
                  <option>Categoria</option>
                  <option value="1">Evento</option>
                  <option value="2">Trabalho</option>
                  <option value="3">Lazer</option>
                  <option value="3">Outro</option>
                </Form.Select>
              </div>

              <div className='description'>
                <Form.Group /* >>> DESCRIÇÃO <<< */
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control className='descri' as="textarea" rows={3} placeholder='Descrição'/>
                </Form.Group>
              </div>

              <div className='repeat'>
                <Form.Select className='repeat-color' aria-label="Default select example"> {/* >>> REPETIR <<< */}
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
                <Button type='submit' variant="primary" onClick={handleClose}>
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