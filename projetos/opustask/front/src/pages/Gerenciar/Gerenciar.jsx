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

  const [erro, setErro] = useState(''); // Estado para a mensagem de erro
  const [info, setInfo] = useState(''); // Estado para a mensagem informativa

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'senha' || name === 'confirmarNovaSenha') {
      if (name === 'senha' && !value) {
        setDadosUsuario({ ...dadosUsuario, [name]: value, confirmarNovaSenha: '' });
      } else {
        setDadosUsuario({ ...dadosUsuario, [name]: value });
      }
    } else if (name === 'celular') {
      // Limpeza dos caracteres não numéricos
      const cleanedValue = value.replace(/\D/g, '');
      setDadosUsuario({ ...dadosUsuario, [name]: cleanedValue });
    } else {
      setDadosUsuario({ ...dadosUsuario, [name]: value });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifique se a data de nascimento é válida
    const idade = calcularIdade(dadosUsuario.data_nascimento);
    if (idade < 12 || idade > 100) {
      alert("A idade deve estar entre 12 e 100 anos.");
      return;
    }

    // Verifique se a senha atende aos requisitos
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
      if (dadosUsuario.senha && dadosUsuario.senha === dadosUsuario.confirmarNovaSenha) {
        // A nova senha é igual a confirmação da nova senha, então ok para enviar
      }
    } else {
      dadosUsuario.senha = dadosUsuario.senhaveia;
      dadosUsuario.confirmarNovaSenha = dadosUsuario.senhaveia;
    }

    try {
      const response = await fetch('http://10.135.60.8:8085/atualizar_cad', {
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
      console.log('Resultado da atualização', resultado);

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
      const userId = localStorage.getItem('id');

      try {
        const response = await fetch('http://10.135.60.8:8085/receber_dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_usuario: userId })
        });

        if (!response.ok) {
          console.error('Erro na resposta da API:', response.status);
          return;
        }

        const data = await response.json();

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
        <h2 className='text-geren'>Gerenciar Conta</h2>
        {erro && <div className="erro-mensagem">{erro}</div>} {/* Exibe a mensagem de erro, se houver */}
        {info && <div className="info-mensagem">{info}</div>} {/* Exibe a mensagem informativa, se houver */}

        <Form.Group controlId="formNome">
          <Form.Label className='input-name'>Nome:</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={dadosUsuario.nome}
            onChange={handleChange}
            className='camp-name'
          />
        </Form.Group>

        <Form.Group controlId="formDataNascimento">
          <Form.Label className='data-title'>Data de Nascimento:</Form.Label>
          <Form.Control
            className='camp-date'
            type="date"
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
          <InputMask
            className='camp-fone'
            mask="(99) 99999-9999"
            name="celular"
            value={dadosUsuario.celular}
            onChange={handleChange}
          >
            {(inputProps) => <Form.Control {...inputProps} />}
          </InputMask>
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
            placeholder="Deixe em branco para manter a senha atual"
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
            placeholder="Deixe em branco para manter a senha atual"
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