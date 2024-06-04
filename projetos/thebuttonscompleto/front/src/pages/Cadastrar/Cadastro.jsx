/* Nome: Cadastro */
/*Autor: Arthur */
/* Data da criação: junho de 2023 */
/* Descrição : Nesta página foi criado a oportunidade de se cadastrar no nosso site */
import './Cadastro.css'; // Importa o arquivo de estilos Cadastro.css
import { Link } from 'react-router-dom'; // Importa o componente Link do react-router-dom para navegação
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate do react-router-dom para navegação programática
import React, { useState } from 'react'; // Importa React e o hook useState do react

/* Fim das importações */

const Cadastro = () => {
    const navigate = useNavigate(); // Instancia o hook useNavigate para navegação

    // Estado inicial para armazenar os valores do formulário
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        celular: '',
        dataNascimento: '',
        senha: '',
        confirmsenha: '',
    });

    // Função para atualizar os valores do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Estado inicial para armazenar as mensagens de erro
    const [mensagensErro, setMensagensErro] = useState([]);

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch('http://localhost:5000/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const resultado = await resposta.json();

            if (resultado.erro) {
                // Exibe mensagens de erro no console.log ou em algum local visível
                console.error('Erro no servidor:', resultado.mensagens);

                // Atualiza o estado com as mensagens de erro para exibição no formulário
                setMensagensErro(resultado.mensagens);
            } else {
                // Dados foram processados com sucesso
                console.log('Dados processados com sucesso!', resultado.mensagens);

                navigate('/CadConcluido'); // Navega para a página de conclusão de cadastro
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <>
            <main className='container_cad'>
                {/* Exibe mensagens de erro, se houver */}
                {mensagensErro.length > 0 && (
                    <div style={{ color: 'red' }}>
                        <p>Erro ao processar os dados:</p>
                        <ul>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}>{mensagem.mensagem}</li> /* Exibe cada mensagem de erro */
                            ))}
                        </ul>
                    </div>
                )}
                <section className="cadastro">
                    <div className="formulario">
                        <h1>Cadastro</h1>

                        {/* Formulário de cadastro */}
                        <form onSubmit={handleSubmit} id='form_cadastro'>
                            <div className="class_nome">
                                <label htmlFor="">Nome</label><br />
                                <input type="text" name="nome" className="nome" id="nome" placeholder="Digite seu Nome" value={formValues.nome} onChange={handleChange} required />
                            </div>
                            <div className="class_date">
                                <label htmlFor="">Data de nascimento</label>
                                <input type="date" name="dataNascimento" className="dataNascimento" id="dataNascimento" value={formValues.dataNascimento} onChange={handleChange} required />
                            </div>
                            <div className="class_cel">
                                <label htmlFor="">Celular</label>
                                <input type="tel" name="celular" className="celular" id="celular" placeholder="Digite seu número" value={formValues.celular} onChange={handleChange} required />
                            </div>
                            <div className="class_email">
                                <label htmlFor="">E-mail</label>
                                <input type="email" name="email" className="email" id="email" placeholder="Digite seu E-mail" value={formValues.email} onChange={handleChange} required />
                            </div>
                            <div className="class_senha">
                                <label htmlFor="">Senha</label>
                                <input type="password" name="senha" className="senha" id="senha" placeholder="Digite sua senha" value={formValues.senha} onChange={handleChange} required />
                            </div>
                            <div className="class_confir">
                                <label htmlFor="confirmsenha">Confirmar senha</label>
                                <input type="password" name="confirmsenha" className="confirmsenha" id="confirmsenha" placeholder="Digite sua senha novamente" data-equal="password" value={formValues.confirmsenha} onChange={handleChange} required />
                            </div>
                            <div className="botoes_cad">
                                <input type="submit" value="Cadastrar-se" id="enter_cad" /> {/* Botão de cadastro */}
                                <input type="button" value="Cancelar" id="cancel_cada" onClick={() => navigate('/')} /> {/* Botão de cancelar */}
                            </div>
                            <div className="class_botoes">
                                <li className="text_return">
                                    <Link to="/Login">Já possui uma conta? Faça login</Link> {/* Link para a página de login */}
                                </li>
                            </div>
                            <div className="cadastro">
                                <h3>Cadastrar-se com</h3>
                                <a href="https://www.instagram.com/"><input type="button" value="Facebook" /></a> {/* Botão de cadastro com Facebook */}
                                <a href="https://www.google.com/intl/pt-BR/account/about/"><input type="button" value="Google" /></a> {/* Botão de cadastro com Google */}
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}

export { Cadastro };