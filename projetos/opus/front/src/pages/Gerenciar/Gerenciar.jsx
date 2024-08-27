import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Gerenciar.css';
import MenuLateral from '../../components/Menu_Lateral';

function Gerenciar() {
  const [dadosUsuario, setDadosUsuario] = useState({
    acao: 'update_cad',
    nome: '',
    data_nascimento: '',
    email: '',
    celular: '',
    senhaveia: '',
    senha: '',
    confirmarNovaSenha: '',
    id: localStorage.getItem('id')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosUsuario({ ...dadosUsuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados do usuário atualizados', dadosUsuario);
    try {
      const response = await fetch('http://10.135.60.21:8085/atualizar_cad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
      });

      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.statusText}`);
      }

      const resultado = await response.json();
      console.log('Resultado da atualização', resultado.sucesso);

      if (resultado.sucesso) {
        alert('Dados atualizados com sucesso!');
      } else {
        alert('Falha ao atualizar os dados.');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert('Erro ao atualizar os dados.');
    }
  };

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      console.log("Iniciando busca dos dados do usuário...");
      const userId = localStorage.getItem('id');
      console.log("ID do usuário:", userId);

      try {
        const response = await fetch('http://10.135.60.16:8085/receber_dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_usuario: userId })
        });

        if (!response.ok) {
          console.error('Erro na resposta da API:', response.status);
          return;
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        if (data && data.mensagem) {
          setDadosUsuario((prevState) => ({
            ...prevState,
            nome: data.mensagem[1] || '',
            data_nascimento: data.mensagem[2] ? formatarData(data.mensagem[2]) : '',
            email: data.mensagem[4] || '',
            celular: data.mensagem[3] || ''
          }));
        } else {
          console.error('Estrutura de dados inesperada:', data);
        }

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    buscarDadosUsuario();
  }, []);

  const formatarData = (data) => {
    const partes = data.split(' ');
    const dia = partes[1];
    const mesAbreviado = partes[2];
    const ano = partes[3];

    const mesesAbreviados = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };

    const mesNumero = mesesAbreviados[mesAbreviado];
    return `${ano}-${mesNumero}-${dia}`;
  };

  return (
    <div className="gerenciar-container">
      <MenuLateral />
      <Form className='form-geren' onSubmit={handleSubmit}>
        <h2 className='text-geren' >Gerenciar Conta</h2>
        <Form.Group controlId="formNome">
          <Form.Label className='input-name'>Nome:</Form.Label>
          <Form.Control
            className='camp-name'
            type="text"
            name="nome"
            value={dadosUsuario.nome}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimento">
          <Form.Label className='data-title'>Data de Nascimento:</Form.Label>
          <input
            className='camp-date'
            type="text"
            name="data_nascimento"
            value={dadosUsuario.data_nascimento}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label className='email-title'>Email:</Form.Label>
          <Form.Control
            className='camp-email'
            type="email"
            name="email"
            value={dadosUsuario.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formTelefone">
          <Form.Label className='telefone-title'>Telefone:</Form.Label>
          <Form.Control
            className='camp-phone'
            type="text"
            name="celular"
            value={dadosUsuario.celular}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formSenhaAtual">
          <Form.Label className='senhaatual-title'>Senha Atual:</Form.Label>
          <Form.Control
            className='camp-actualpass'
            type="password"
            name="senhaveia"
            value={dadosUsuario.senhaveia}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formNovaSenha">
          <Form.Label className='novasenha-title'>Nova Senha:</Form.Label>
          <Form.Control
            className='camp-newpass'
            type="password"
            name="senha"
            value={dadosUsuario.senha}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmarNovaSenha">
          <Form.Label className='confirmsenha-title'>Confirmar Nova Senha:</Form.Label>
          <Form.Control
            className='camp-confirmnewpass'
            type="password"
            name="confirmarNovaSenha"
            value={dadosUsuario.confirmarNovaSenha}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className='btn-update' variant="primary" type="submit">
          Atualizar Dados
        </Button>
      </Form>
      </div>
  );
}

export default Gerenciar;