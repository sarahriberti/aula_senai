import '../GerenciarConta/Gerenciar.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Telefone() {
    return (
        <div className="telefone-main">
            <Form>
                <div className='actual-tel'>
                    <p>Telefone Atual</p>
                    <h6>(00) 00000-0000</h6>
                </div>
                <div className='new-password'>
                    <Form.Label>Novo telefone:</Form.Label>
                    <div>
                        <Form.Control className='space-user'
                            type="text"
                            autoFocus
                        />
                    </div>
                </div>
                <div className='confirm'>
                    <Form.Label>Senha do Opus Task:</Form.Label>
                    <div>
                        <Form.Control className='space-password-opustel'
                            type="text"
                            autoFocus
                        />
                    </div>
                </div>
                <Button as="input" type="submit" value="Trocar telefone" />{' '}
            </Form>
        </div>
    )
}
export default Telefone;