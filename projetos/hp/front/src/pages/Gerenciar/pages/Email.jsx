import './Gerenciar.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Email() {
    return (
        <div className="email-main">
            <Form>
                <div className='actual-email'>
                    <p>E-mail Atual</p>
                    <h6>exemplo@gmail.com</h6>
                </div>
                <div className='new-password'>
                    <Form.Label>Novo e-mail:</Form.Label>
                    <div>
                        <Form.Control className='space-new-email'
                            type="email"
                            autoFocus
                        />
                    </div>
                </div>
                <div className='confirm'>
                    <Form.Label>Senha do Opus Task:</Form.Label>
                    <div>
                        <Form.Control className='space-password-opus'
                            type="text"
                            autoFocus
                        />
                    </div>
                </div>
                <Button as="input" type="submit" value="Trocar e-mail" />{' '}
            </Form>
        </div>
    )
}
export default Email;