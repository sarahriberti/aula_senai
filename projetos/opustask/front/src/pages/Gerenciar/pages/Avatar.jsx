import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../Gerenciar.css'

function Avatar() {
    return (
        <div className="avatar-main">

            <div className='avatar-actual'>
                <div className='image-avatar'>
                    <p>Avatar Atual</p>
                    <Container>
                        <Row>
                            <Col xs={6} md={4}>
                                <Image src="https://i.pinimg.com/236x/6e/0b/d3/6e0bd3a9e257f0525799347432abcd0d.jpg" rounded />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Button as="input" type="submit" value="Submit" />{' '}
            </div>
            <div className='avatar-new'>
                <div className='avatar-text'>
                    <h3>Novo avatar</h3>
                    <h6>Somente nos formatos JPG, PNG ou GIF de preferência com 120x120 pixels</h6>
                    <Button type="submit">Procurar</Button>{' '}
                </div>
            </div>
            <Button as="input" type="submit" value="Submit" />{' '}
        </div>
    )
}
export default Avatar;