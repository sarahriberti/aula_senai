import './Login.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

// Componente para a página de login
const Login = () => {
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envia os dados do formulário para o servidor
            const response = await fetch('http://localhost:5000/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                console.log('Dados enviados com sucesso!');
            } else {
                console.error('Erro ao enviar dados.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <>
            <section className="logiin">
                <div className="formularium">
                    <form onSubmit={handleSubmit} id='form_login'>
                        <h1 className='titulo-form'>Login</h1>
                        {/* Campo de e-mail do login */}
                        <div className="email_log">
                            <label htmlFor="email_log" className="nome_input">E-mail</label>
                            <input type="email" id="email_log" className="email_log" name="email_log" placeholder="Digite seu e-mail" value={formValues.email_log} onChange={handleChange} required/>
                        </div>
                        {/* Campo de senha dp login */}
                        <div className="senha_log">
                            <label htmlFor="senha_log" className="nome_input">Senha</label>
                            <input type="password" id="senha_log" className="senha_log" name="senha_log" placeholder="Digite sua senha" value={formValues.senha_log} onChange={handleChange} required/>
                        </div>
                        {/* Botões de entrar e cancelar na página do calendário */}
                        <div className="botoes_cad">
                            <input type="submit" value="Entrar" id="cancel_ent" />
                            {/* Link para a página do cadastro */}
                            <Link to="/Cadastro"><input type="submit" value="Cancelar" id="cancel_cad" /></Link>
                        </div>
                        {/* Link para a página do cadastro */}
                        <li className="text_return">
                            <Link to="/Cadastro">Não possui conta? Cadastre-se</Link>
                        </li>
                        <h3>Login com</h3>
                        {/* Botões de login com Google e Facebook */}
                        <div className="logininferior">
                            <a href="https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1"><input type="button" value="Google" /></a>
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