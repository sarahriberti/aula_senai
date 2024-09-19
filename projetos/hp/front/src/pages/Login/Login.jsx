/*Nome: Login */
/*Data da criação: junho de 2023 */
/*Descrição : Nesta página foi criado a oportunidde de se logar no nosso site*/
/*Observações : Este documento contém o import do Usestate, Link  */
import './Login.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const handleSubmit_log = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch('http://172.20.10.4:8085/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });


            const resultado = await resposta.json();
            console.log("------------------", resultado)


            if (resultado.erro) {
                console.error('Erro no servidor:', resultado.mensagens);
                setMensagensErro(resultado.mensagens);
            } else {
                console.log('Dados processados com sucesso!', resultado.mensagem[0]);
                localStorage.setItem('id', resultado.mensagem[0]);
                localStorage.setItem('nome', resultado.mensagem[1]);
                console.log('_______________', resultado);
                localStorage.setItem('id', resultado.mensagem[0]);
                navigate('/Calendario');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);

        }
    };

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
                    <form onSubmit={handleSubmit_log} id='form_login'>
                        <h1 className='titulo-form'>Login</h1>
                        {/* Campo de e-mail do login */}
                        <div className="email_log">
                            <label htmlFor="email_log" className="nome_input">E-mail</label>
                            <input type="email" name="email_log" className="email" id="email" placeholder="Digite seu E-mail" value={formValues.email_log} onChange={handleChange} required />
                        </div>
                        {/* Campo de senha do login */}
                        <div className="senha_log">
                            <label htmlFor="senha_log" className="nome_input">Senha</label>
                            <input type="password" name="senha_log" className="senha" id="senha" placeholder="Digite sua senha" value={formValues.senha_log} onChange={handleChange} required />
                        </div>
                        {/* Botões de entrar e cancelar na página do calendário */}
                        <div className="botoes_cad">
                            <input type="submit" value="Entrar" id="cancel_ent" />
                            {/* Link para a página do cadastro */}
                            <input type="button" value="Cancelar" id="cancel_cad" />
                        </div>
                        {/* Link para a página do cadastro */}
                        <li className="text_return">
                            <Link to="/Cadastro">Não possui conta? Cadastre-se</Link>
                        </li>
                        <h3>Login com</h3>
                        {/* Botões de login com Google e Facebook */}
                        <div className="logininferior">
                            <input className='vamosss' type="button" value="Google" />
                            <input type="button" value="Facebook" />
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