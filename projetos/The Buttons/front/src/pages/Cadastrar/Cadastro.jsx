import './Cadastro.css'
import { Link } from 'react-router-dom';

function Cadastro() {
    return (
        <>
        <main className='container_cad'>
        <section className="cadastro">

            <div className="formulario">
                
                <form id="form_cadastro" action="">
                    <h1>Cadastro</h1>

                    <div className="class_nome">
                        <label for="">Nome</label><br/>
                        <input type="text" name="nome" className="nome" id="nome" placeholder="Digite seu Nome" data-min-length="3" data-max-length="40" data-space-validate/>
                    </div>
                        <div className="class_date">
                            <label for="" >Data de nascimento</label>
                            <input type="date" name="data_nasc" className="data_nasc" id="data_nasc"/>
                        </div>
                        <div className="class_cel">
                            <label for="">Celular</label>
                        <input type="tel" name="celular" className="celular" id="celular" placeholder="+55/Digite seu número" data-max-length="15" data-min-length="15"/>
                        </div>
                    <div className="class_email">
                        <label for="">E-mail</label>
                        <input type="email" name="e-mail" className="e-mail" id="e-mail" placeholder="Digite seu E-mail" data-email-validate data-max-length="40" data-min-length="8" />
                    </div>
                    <div className="class_senha">
                        <label for="">Senha</label>
                        <input type="password" name="senha" className="senha" id="senha" placeholder="Digite sua Senha" data-min-length="8" data-max-length="40"/>
                    </div>
                    <div className="class_confir">
                        <label for=""> Confirmar senha</label>
                        <input type="password" name="senha_conf" className="senha_conf" id="senha_conf" placeholder="Digite sua senha novamente" data-equal="password"/>
                    </div>
                    <div className="botoes_cad">
                        <input type="submit" value="Cadastrar-se" id="enter_cad"/>
                        <input type="submit" value="Cancelar" id="cancel_cada"/>
                    </div>
                    <div className="class_botoes">
                            <li className="text_return">
                                    <Link to="/Login">Já possui uma conta? Faça login</Link>
                            </li>
                    </div>

                    <div className="cadastro">
                        <h3>Cadastrar-se com</h3>
                        <a href="https://www.instagram.com/"><input type="button" value="Facebook"/></a>
                        <a href="https://www.google.com/intl/pt-BR/account/about/"><input type="button" value="Google"/></a>
                    </div>
                </form>
            
            </div>
            

        </section>
        <p className="error-validation template"></p>
        <script src="js/email.js"></script>
    
    </main>
        </>
    )
}

export { Cadastro };