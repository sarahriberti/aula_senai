/*Nome: Avatar */
/*Autor: Emily */
/*Data da criação:  2023 */
/*Descrição : componente para atualizar a foto de perfil do usuário */

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../Gerenciar.css'

function Avatar() {
    return (
        <div className="avatar-main"> {/* Contêiner principal do componente Avatar */}
            {/* Seção para o avatar atual */}
            <div className='avatar-actual'>
                <div className='image-avatar'> {/* Div para a imagem do avatar atual */}
                    <p>Avatar Atual</p> {/* Texto indicando o avatar atual */}
                    <Container> {/* Container do React Bootstrap */}
                        <Row> {/* Linha do React Bootstrap */}
                            <Col xs={6} md={4}> {/* Coluna do React Bootstrap com tamanho responsivo */}
                                <Image src="https://i.pinimg.com/236x/6e/0b/d3/6e0bd3a9e257f0525799347432abcd0d.jpg" rounded /> {/* Imagem do avatar atual */}
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* Botão para enviar a alteração do avatar */}
                <Button as="input" type="submit" value="Submit" />{' '} {/* Botão do React Bootstrap como input */}
            </div>

            {/* Seção para selecionar um novo avatar */}
            <div className='avatar-new'>
                <div className='avatar-text'> {/* Div para o texto sobre o novo avatar */}
                    <h3>Novo avatar</h3> {/* Título indicando o novo avatar */}
                    <h6>Somente nos formatos JPG, PNG ou GIF de preferência com 120x120 pixels</h6> {/* Informações sobre o formato e tamanho do novo avatar */}
                    {/* Botão para procurar e selecionar um novo avatar */}
                    <Button type="submit">Procurar</Button>{' '} {/* Botão do React Bootstrap */}
                </div>
            </div>
            {/* Botão adicional para enviar a alteração do avatar */}
            <Button as="input" type="submit" value="Submit" />{' '} {/* Botão do React Bootstrap como input */}
        </div>
    )
}
export default Avatar;