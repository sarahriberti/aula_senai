/*Nome: Login */
/*Data da criação: junho de 2023 */
/*Descrição : Nesta página foi criado a oportunidde de se logar no nosso site*/
/*Observações : Este documento contém o import do Usestate, Link  */
import './Login.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importação dos ícones de olho
/*Fim das importações*/

// Componente para a página de login
const Login = () => {
    const navigate = useNavigate(); // >>> Instancia o hook useNavigate para navegar entre as páginas <<<

    const [formValues, setFormValues] = useState({
        email_log: '',
        senha_log: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const [mensagensErro, setMensagensErro] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Atualiza o estado com os dados do usuário recuperados
            setFormValues((prevValues) => ({
                ...prevValues,
                //email_log: storedEmail, // Atualiza o campo de e-mail do formulário com o e-mail armazenado
            }));

            // Envia os dados do formulário para o servidor
            const resposta = await fetch('http://10.135.60.23:8085/receber_dados', {
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
                console.log('Dados processados com sucesso!', resultado.mensagem[0]);
 
                // Define o nome e o ID do usuário no localStorage
                localStorage.setItem('id', resultado.mensagem[0]);
                localStorage.setItem('nome', resultado.mensagem[1]);

                // Redireciona para a página do calendário
                navigate('/Calendario'); // >>> Implementação do useNavigate para quando estiver com os dados do login corretos, o usuário ir para  página de calendário <<<
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
   

    return (
        <>
            <section className="logiin">
                {mensagensErro.length > 0 && (
                    <div style={{ color: 'red' }}>
                        <ul>
                            {mensagensErro.map((mensagem, index) => (
                                <li key={index}> {mensagem.mensagem}</li>
                            ))}
                        </ul>

                    </div>
                )}
                <div className="formularium">
                    <form onSubmit={handleSubmit} id='form_login'>
                        <h1 className='titulo-form'>Login</h1>
                        {/* Campo de e-mail do login */}
                        <div className="email_log">
                            <label htmlFor="email_log" className="nome_input">E-mail</label>
                            <input type="email" name="email_log" className="email" id="email" placeholder="Digite seu E-mail" value={formValues.email_log} onChange={handleChange} required />
                        </div>
                        {/* Campo de senha do login */}
                        <div className="class_senha">
                                <label htmlFor="senha">Senha</label>
                                <div className="input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="senha"
                                        className="senha"
                                        id="senha"
                                        placeholder="Digite sua senha"
                                        value={formValues.senha}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        {/* Botões de entrar e cancelar na página do calendário */}
                        <div className="botoes_cad">
                            <input type="submit" value="Entrar" id="cancel_ent" />
                            {/* Link para a página do cadastro */}
                            <input type="submit" value="Cancelar" id="cancel_cad" />
                        </div>
                        {/* Link para a página do cadastro */}
                        <li className="text_return">
                            <Link to="/Cadastro">Não possui conta? Cadastre-se</Link>
                        </li>
                        <h3>Login com</h3>
                        {/* Botões de login com Google e Facebook */}
                        <div className="logininferior">
                            <input type="button" value="Google" />
                            <a href="https://www.instagram.com/"><input type="button" value="Facebook" /></a>
                        </div>
                    </form>
                </div>
                <p className="error-validation template"></p>
                <script src="js/email.js"></script>
            </section>
        </>
    )
}

export { Login };