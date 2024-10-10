import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Gerenciar.css';
import MenuLateral from '../../components/Menu_Lateral';
import InputMask from 'react-input-mask';

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

  const [erro, setErro] = useState('');
  const [info, setInfo] = useState('');

  // Função para atualizar os dados no estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosUsuario({ ...dadosUsuario, [name]: value });
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const validarSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha) && !/\s/.test(senha);
  };

  // Função para enviar os dados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const idade = calcularIdade(dadosUsuario.data_nascimento);
    if (idade < 12 || idade > 100) {
      alert("A idade deve estar entre 12 e 100 anos.");
      return;
    }

    if (dadosUsuario.senha && !validarSenha(dadosUsuario.senha)) {
      alert("A senha deve ter no mínimo 8 caracteres, incluir uma letra maiúscula, uma letra minúscula, um número, um caractere especial e não pode conter espaços.");
      return;
    }

    if (!dadosUsuario.senhaveia) {
      alert("Senha atual é obrigatória.");
      return;
    }

    if (dadosUsuario.senha || dadosUsuario.confirmarNovaSenha) {
      if (dadosUsuario.senha !== dadosUsuario.confirmarNovaSenha) {
        alert("A nova senha e a confirmação da nova senha não correspondem.");
        return;
      }
    }

    try {
      const response = await fetch('http://10.135.60.18:8085/atualizar_cad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na resposta da API: ${response.statusText} - ${errorText}`);
      }

      const resultado = await response.json();
      if (resultado.sucesso) {
        alert('Dados atualizados com sucesso!');
        localStorage.setItem('nome', dadosUsuario.nome);  // Armazena o nome atualizado no localStorage
        window.location.reload(); // Atualiza a página para refletir as mudanças no MenuLateral
      } else {
        alert('Falha ao atualizar os dados.');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert('Erro ao atualizar os dados.');
    }
  };

  // Puxar dados do usuário
  useEffect(() => {
    const buscarDadosUsuario = async () => {
      const userId = localStorage.getItem('id');
      try {
        const response = await fetch('http://10.135.60.18:8085/receber_dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_usuario: userId }),
        });

        if (!response.ok) {
          console.error('Erro na resposta da API:', response.status);
          return;
        }

        const data = await response.json();
        if (data && data.mensagem) {
          setDadosUsuario((prevState) => ({
            ...prevState,
            nome: data.mensagem.nome || '',
            data_nascimento: data.mensagem.data_nascimento || '',
            email: data.mensagem.email || '',
            celular: data.mensagem.telefone || '',
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

  return (
    <div className="gerenciar-container">
      <MenuLateral />
      <Form onSubmit={handleSubmit}>
        {erro && <div className="erro-mensagem">{erro}</div>}
        {info && <div className="info-mensagem">{info}</div>}
        <div className='gerenciar_inputs'>
          <h2 className='txt_geren'>Gerenciar Conta</h2>
          <Form.Group >
            <Form.Label className='nome-title'>Nome:</Form.Label>
            <Form.Control
              id='nome_gerenciar_id'
              type="text"
              name="nome"
              value={dadosUsuario.nome}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label className='data-title'>Data de Nascimento:</Form.Label>
            <Form.Control
              id='data_gerenciar_id'
              type="date"
              name="data_nascimento"
              value={dadosUsuario.data_nascimento}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label className='email-title'>Email:</Form.Label>
            <Form.Control
              id='email_gerenciar_id'
              type="email"
              name="email"
              value={dadosUsuario.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label className='telefone-title'>Telefone:</Form.Label>
            <InputMask
              id='telefone_gerenciar_id'
              mask="(99) 99999-9999"
              name="celular"
              value={dadosUsuario.celular}
              onChange={handleChange}
            >
              {(inputProps) => <Form.Control {...inputProps} />}
            </InputMask>
          </Form.Group>

          <Form.Group >
            <Form.Label className='senhaatual-title'>Senha Atual:</Form.Label>
            <Form.Control
              id='senhaatual_gerenciar_id'
              type="password"
              name="senhaveia"
              value={dadosUsuario.senhaveia}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group >
            <Form.Label className='novasenha-title'>Nova Senha:</Form.Label>
            <Form.Control
              id='novasenha_gerenciar_id'
              type="password"
              name="senha"
              value={dadosUsuario.senha}
              onChange={handleChange}
              placeholder="Deixe em branco para manter a senha atual"
            />
          </Form.Group>

          <Form.Group >
            <Form.Label className='confirmsenha-title'>Confirmar Nova Senha:</Form.Label>
            <Form.Control
              id='confimsenha_gerenciar_id'
              type="password"
              name="confirmarNovaSenha"
              value={dadosUsuario.confirmarNovaSenha}
              onChange={handleChange}
              placeholder="Deixe em branco para manter a senha atual"
            />
          </Form.Group>
          <Button id="btn_atualizar_dados"className='btn-update' variant="primary" type="submit">
            Atualizar Dados
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Gerenciar;