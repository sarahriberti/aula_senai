import './Login.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>

            <section className="logiin">

                <div className="formularium">
                    <form id="form_login" action="">
                        <h1 className='titulo-form'>Login</h1>
                        <div className="email_log">
                            <label for="email" className="nome_input">E-mail</label>
                            <input type="email" id="email" className="email" name="email" placeholder="Digite seu e-mail" data-email-validate data-max-length="40" data-min-length="8" />
                        </div>
                        <div className="senha_log">
                            <label for="senha" className="nome_input">Senha</label>
                            <input type="password" id="senha" className="senha" name="senha" placeholder="Digite sua senha" />
                        </div>
                        <div className="botoes_cad">

                            <Link to='/Calendario'><input type="submit" value="Entrar" id="cancel_ent" /></Link>
                            <a href="file:///C:/Users/Aluno/Documents/GitHub/aula_senai/projetos/The%20Buttons/cadastro.html" /><input
                                type="submit" value="Cancelar" id="cancel_cad" />
                        </div>
                        <li className="text_return">
                            <Link to="/Cadastro">Não possui conta? Cadastre-se</Link>
                        </li>
                        <h3>Login com</h3>
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