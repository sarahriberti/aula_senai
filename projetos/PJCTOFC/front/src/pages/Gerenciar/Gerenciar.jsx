import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MenuLateral from '../../components/Menu_Lateral';
import Avatar from './pages/Avatar';
import './Gerenciar.css'
import Confirmacao from '../../components/confirmacao';


function Gerenciar() {
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    id: localStorage.getItem('id')
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosUsuario({ ...dadosUsuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados do usuário atualizados', dadosUsuario)
    try {
      const response = await fetch('http://10.135.60.11:8085/atualizar_dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
      });
      const resultado= await response.json();
      console.log('Resultado da atualização', resultado)

      // Lógica para atualizar os dados na página após o salvamento
      // Pode incluir uma mensagem de sucesso, etc.
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      console.log(localStorage.getItem('id'))
      try {
        const response = await fetch('http://localhost:5000/receber_dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_usuario: localStorage.getItem('id')
          })
        });
        const data = await response.json();
        console.log(data);
        setDadosUsuario({
          nome: data.mensagem[1],
          dataNascimento: data.mensagem ? data.mensagem[2] : '',
          email: data.mensagem ? data.mensagem[4] : '',
          telefone: data.mensagem ? data.mensagem[3] : ''
        });
        
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    buscarDadosUsuario();
  }, []);

  const formatarData = (data) => {
    if (!data) return ''; // Retorna vazio se a data não estiver definida
  
    const partes = data.split(' ');
    const dia = partes[1]; // Pegando o dia
    const mesAbreviado = partes[2]; // Pegando o mês
    const ano = partes[3];
  
    // Mapeia os meses abreviados para seus números correspondentes
    const mesesAbreviados = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
  
    // Verifica se o ano já está digitado (quando tem 4 dígitos consideramos que o ano foi digitado)
    const anoCompleto = ano.length === 4 ? ano : '';
  
    const mesNumero = mesesAbreviados[mesAbreviado]; // Obtém o número do mês a partir do objeto de meses
  
    // Retorna a data formatada apenas se o ano já estiver completo
    return anoCompleto ? `${anoCompleto}-${mesNumero}-${dia}` : data;
  };
  


  return (
    <Tabs defaultActiveKey="profile" id="gerenciarconta" className="mb-3">
      <Tab eventKey="menu-lat-geren" title={<MenuLateral />}>
      </Tab>
      <Tab className='dados-basic' eventKey="DadosBasicos" title="Dados Basicos">
        <div className="dados-main">
          <Form onSubmit={handleSubmit}>
            <div className='alt-name'> {/* >>> ALTERAR NOME <<< */}
              <Form.Label>Nome:</Form.Label>
              <div>
                <Form.Control className='space-name' type="text" autoFocus onChange={handleChange} value={dadosUsuario.nome} />
              </div>
            </div>
            <div className='alt-date-born'> {/* >>> ALTERAR DATA DE NASCIMENTO <<< */}
              <Form.Label>Data de nascimento:</Form.Label>
              <div className='alt-date-box'>
                <Form.Control className='space-date' type="date" autoFocus onChange={handleChange} value={formatarData(dadosUsuario.dataNascimento)} />
              </div>
            </div>
            <div className='bbb'>
              <Confirmacao />
              <Button as="input" type="reset" value="Cancelar" className='cancelarr' />
            </div>
          </Form>

        </div>
      </Tab>

      <Tab eventKey="Avatar" title="Avatar">
        <div className="avatar-main">

          <div className='avatar-actual'>
            <div className='image-avatar'>
              <h3>Novo avatar</h3>

              <p>Avatar Atual</p>
              <Container>
                <Row>
                  <Col xs={6} md={4}>
                    <Image src="https://i.pinimg.com/236x/6e/0b/d3/6e0bd3a9e257f0525799347432abcd0d.jpg" rounded />
                  </Col>
                </Row>
              </Container>
            </div>


          </div>
          <div className='avatar-new'>
            <div className='avatar-text'>
              <h6>Somente nos formatos JPG de preferência com 120x120 pixels</h6>
              <Avatar />
            </div>
          </div>
          <div className='bbb'>
            <Confirmacao />
            <Button as="input" type="reset" value="Cancelar" className='cancelar-avatar' />
          </div>
        </div>
      </Tab>

      <Tab eventKey="Senha" title="Senha">
        <Form.Group controlId="formBasicPasswordNow">
          <Form.Label>Senha atual:</Form.Label>
          <Form.Control type="password" autoFocus />
          <li>
            <Link to="/EsqueciSenha">Esqueceu sua senha?</Link>
          </li>
        </Form.Group>
        <Form.Group controlId="formBasicPasswordNew">
          <Form.Label>Nova senha:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConf">
          <Form.Label>Confirmar senha:</Form.Label>
          <Form.Control type="password" />
          <div className='bbb'>
            <Confirmacao />
            <Button as="input" type="reset" value="Cancelar" className='cancelarr' />
          </div>
        </Form.Group>
      </Tab>
      <Tab eventKey="Email" title="Email">
        <div className="email-main">
          <Form>
            <div className='actual-email'>
              <p>E-mail Atual</p>
              <h6>{dadosUsuario.email}</h6>
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
              <Form.Label>Senha:</Form.Label>
              <div>
                <Form.Control className='space-password-opus'
                  type="password"
                  autoFocus
                />
              </div>
            </div>
            <div className='bbb2'>
              <Confirmacao />
              <Button as="input" type="reset" value="Cancelar" className='cancelarr' />
            </div>

          </Form>
        </div>
      </Tab>
      <Tab eventKey="Telefone" title="Telefone">
        <div className="telefone-main">
          <Form>
            <div className='actual-tel'>
              <p>Telefone Atual</p>
              <h6>{dadosUsuario.telefone}</h6>
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
              <Form.Label >Senha:</Form.Label>
              <div>
                <Form.Control className='space-password-opustel'
                  type="password"
                  autoFocus
                />
              </div>
            </div>
            <div className='bbb'>
              <Confirmacao />
              <Button as="input" type="reset" value="Cancelar" className='cancelarr' />
            </div>

          </Form>
        </div>
      </Tab>

    </Tabs>
  );
}

export default Gerenciar;