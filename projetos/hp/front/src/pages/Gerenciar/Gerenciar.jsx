import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Gerenciar.css';
import MenuLateral from '../../components/Menu_Lateral';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa os ícones
import InputMask from 'react-input-mask';
import adicionarPerfil from '../../../src/image/adicionar-usuario.png'

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
    id: localStorage.getItem('id'),
    imagemPerfil: '',
  });

  const [erro, setErro] = useState('');
  const [info, setInfo] = useState('');

  const opcoesImagens = [
    { src: adicionarPerfil, alt: 'imagem user perfil' },
  ];

  const selecionarImagem = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const novaImagem = reader.result;
          setDadosUsuario((prevState) => ({
            ...prevState,
            imagemPerfil: novaImagem,
          }));

          fetch('http://10.135.60.33:8085/atualizar_cad', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...dadosUsuario,
              imagemPerfil: novaImagem,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Erro ao salvar imagem no banco.');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Imagem salva com sucesso:', data);
            })
            .catch((error) => {
              console.error('Erro ao salvar imagem:', error);
            });
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  };


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

  // Função para validar a senha
  const validarSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha) && !/\s/.test(senha);
  };  

  // Função para enviar os dados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const idade = calcularIdade(dadosUsuario.data_nascimento);
    if (idade < 12 || idade > 100) {
      setErro("A idade deve estar entre 12 e 100 anos.");
      return;
    }

    if (dadosUsuario.senha && !validarSenha(dadosUsuario.senha)) {
      setErro("A senha deve ter no mínimo 8 caracteres, incluir uma letra maiúscula, uma letra minúscula, um número, um caractere especial e não pode conter espaços.");
      return;
    }

    if (!dadosUsuario.senhaveia) {
      setErro("Senha atual é obrigatória.");
      return;
    }

    if (dadosUsuario.senha || dadosUsuario.confirmarNovaSenha) {
      if (dadosUsuario.senha !== dadosUsuario.confirmarNovaSenha) {
        setErro("A nova senha e a confirmação da nova senha não correspondem.");
        return;
      }
    }

    try {
      const response = await fetch('http://10.135.60.33:8085/atualizar_cad', {
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
        setInfo("Dados atualizados com sucesso!");
      } else {
        setErro("Falha ao atualizar os dados.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      setErro("Erro ao atualizar os dados.");
    }

    // Remove mensagens automaticamente após 10 segundos
    setTimeout(() => {
      setErro('');
      setInfo('');
    }, 50000);
  };


  // Puxar dados do usuário
  useEffect(() => {
    const buscarDadosUsuario = async () => {
      const userId = localStorage.getItem('id');
      try {
        const response = await fetch('http://10.135.60.33:8085/receber_dados', {
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
            imagemPerfil: data.mensagem.imagem_perfil || '', // Carrega a imagem salva no banco
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

  const imagemExibida = dadosUsuario.imagemPerfil.startsWith('data:image')
    ? dadosUsuario.imagemPerfil
    : dadosUsuario.imagemPerfil
      ? `http://10.135.60.57:8085/imagens/${dadosUsuario.imagemPerfil}`
      : adicionarPerfil;

  const [mostrarSenha, setMostrarSenha] = useState({
    senhaveia: false,
    senha: false,
    confirmarNovaSenha: false,
  });

  const toggleSenha = (campo) => {
    setMostrarSenha((prevState) => ({
      ...prevState,
      [campo]: !prevState[campo],
    }));
  };

  return (
    <div className="gerenciar-container">
      <MenuLateral />
      <Form onSubmit={handleSubmit}>
        <div className='gerenciar_inputs'>
          <h2 className='txt_geren'>Gerenciar Conta</h2>

          <Form.Group>
            <div className="grupo-imagens">
              {opcoesImagens.map((imagem, idx) => (
                <img
                  id="gerenciar-imagem-perfil"
                  src={imagemExibida}
                  alt="Imagem do usuário"
                  className={dadosUsuario.imagemPerfil ? "imagem-perfil-selecionada" : "imagem-perfil-padrao"}
                  onClick={() => selecionarImagem()}
                />
              ))}
            </div>
          </Form.Group>

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

          <div className="senha_gerenciar">
            <label htmlFor="senhaatual_gerenciar_id" className="nome_input">Senha Atual</label>
            <div className="input-wrapper">
              <input
                type={mostrarSenha.senhaveia ? "text" : "password"}
                name="senhaveia"
                className="senha"
                id="senhaatual_gerenciar_id"
                placeholder="Digite sua senha atual"
                value={dadosUsuario.senhaveia}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => toggleSenha("senhaveia")}
                id="toggle_password_senhaveia"
              >
                {mostrarSenha.senhaveia ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="senha_gerenciar">
            <label htmlFor="novasenha_gerenciar_id" className="nome_input">Nova Senha</label>
            <div className="input-wrapper">
              <input
                type={mostrarSenha.senha ? "text" : "password"}
                name="senha"
                className="senha"
                id="novasenha_gerenciar_id"
                placeholder="Digite uma nova senha ou deixe em branco"
                value={dadosUsuario.senha}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => toggleSenha("senha")}
                id="toggle_password_senha"
              >
                {mostrarSenha.senha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="senha_gerenciar">
            <label htmlFor="confimsenha_gerenciar_id" className="nome_input">Confirmar Nova Senha</label>
            <div className="input-wrapper">
              <input
                type={mostrarSenha.confirmarNovaSenha ? "text" : "password"}
                name="confirmarNovaSenha"
                className="senha"
                id="confimsenha_gerenciar_id"
                placeholder="Confirme a nova senha ou deixe em branco"
                value={dadosUsuario.confirmarNovaSenha}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => toggleSenha("confirmarNovaSenha")}
                id="toggle_password_confirmarNovaSenha"
              >
                {mostrarSenha.confirmarNovaSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Mensagem de erro ou sucesso entre os campos e o botão */}
          {erro && <div className="erro-mensagem">{erro}</div>}
          {info && <div className="info-mensagem">{info}</div>}

          {/* Botão de atualização */}
          <Button id="btn_atualizar_dados" className='btn-update' variant="primary" type="submit">
            Atualizar Dados
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Gerenciar;