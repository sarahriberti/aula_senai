import React from 'react';
import './Help.css';
import { useNavigate } from 'react-router-dom';
import { FaleConosco } from "../Fale Conosco/Fale_Conosco";

const AjudaLogin = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='sair_help'>
                {/* Imagem de sair para voltar ao Home */}
                <img src="./src/image/seta-esquerda.png" alt="Voltar para Home" className="sair_help_botao" onClick={() => navigate('/Login')} />
            </div>
            <div className="container_help">
                <div>
                    <h1 className="header">Precisa de Ajuda?</h1>

                    <p className="text_help">
                        Olá! Seja Bem-vindo á central de ajuda Opus!
                        <br />Estamos aqui para ajudar! Se você está tendo dificuldades em efetuar Login, veja abaixo algumas instruções para resolver problemas comuns.
                    </p>
                </div>

                <div className='container_help_filho'>
                    <div className="section_um">
                        <h2 className="subHeader_help">Passos para Efetuar o Login</h2>
                        <ul className="list_help">
                            <li className='letra_help'><strong>1. Insira suas credenciais:</strong> Digite seu e-mail e senha nos campos apropriados.</li>
                            <li className='letra_help'><strong>2. Clique no botão de Login:</strong> Após inserir suas credenciais, clique no botão "Entrar" para acessar sua conta.</li>
                            <li className='letra_help'><strong>3. Problemas com login?</strong> Se você não conseguir fazer login, verifique se o e-mail e a senha estão corretos. Caso tenha esquecido a senha, clique no link "Esqueci minha senha" para redefini-la.</li>
                            <li className='letra_help'><strong>4. Dúvidas?</strong> Se ainda precisar de ajuda, entre em contato conosco pelo link "Fale Conosco" abaixo.</li>
                            <li className='letra_help'><strong>4. Fazer cadastro com ?</strong> Se ainda preferir, faça seu login com sua conta Google ou Facebook.</li>
                        </ul>
                    </div>

                    <div className="section_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>
                        <img className='imagem_help_login' src="./src/image/help_login.png" alt="" />
                        <p className="text1_help">
                            <strong>1. Como efetuar Cadastro?</strong> Na tela de Login, clique no link <strong>Não possui conta? Cadastre-se</strong> para iniciar seu cadastro.
                        </p>

                        <p className="text1_help">
                            <strong>2. Mais ajuda?</strong> Se você tiver mais perguntas ou precisar de assistência adicional, nossa equipe de suporte está pronta para ajudar!
                        </p>
                    </div>
                </div>

                <FaleConosco />
            </div>
        </div>
    );
};

export default AjudaLogin;