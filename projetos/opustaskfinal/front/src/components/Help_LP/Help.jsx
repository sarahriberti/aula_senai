import React from 'react';
import './Help.css';
import { useNavigate } from 'react-router-dom';
import { FaleConosco } from "../Fale Conosco/Fale_Conosco";

const Ajuda = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='sair_help_lp'>
                {/* Imagem de sair para voltar ao Home */}
                <img src="./src/image/seta-esquerda.png" alt="Voltar para Home" className="sair_help_botao" onClick={() => navigate('/')} />

            </div>
            <div className="container_help">
                <div>
                    <h1 className="header">Precisa de Ajuda?</h1>

                    <p className="text_help">
                        Olá! Seja Bem-vindo a Opus Task!
                        <br />Estamos aqui para ajudar! Se você está tendo dificuldades em usar o site, veja abaixo algumas instruções para resolver problemas comuns.
                    </p>
                </div>

                <div className='container_help_filho'>
                    <div className="section_um">
                        <h2 className="subHeader_help">Passos para Usar o Site</h2>
                        <ul className="list_help">
                            <li className='letra_help'>1. <strong>Bem-vindo à Opus!</strong>:Nossa página inicial oferece uma visão rápida e acolhedora do que temos a oferecer. Aqui você encontra todas as informações essenciais para começar.</li>
                            <li className='letra_help'>2. <strong>O que você encontrará por aqui?</strong>:Mergulhe no mundo de possibilidades da Opus! Criamos um espaço repleto de ferramentas para tornar sua rotina mais organizada e produtiva.</li>
                            <li className='letra_help'>3. <strong>Explore e navegue à vontade!</strong>:Descubra funcionalidades criadas para atender suas necessidades diárias de organização. Sinta-se em casa e aproveite tudo o que a Opus oferece para facilitar o seu dia a dia! </li>
                        </ul>
                    </div>

                    <div className="section_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>

                        <p className="text1_help">
                            <img className='imagem_help_lp' src="./src/image/help_lp.png" alt="" />
                            <br /><strong>1. Como efetuar Login ?</strong> Clique no botão no canto superior direito da tela "Login". Se precisar de mais assistência, não hesite em nos contatar no 'Fale Conosco' abaixo.

                        </p>

                        <p className="text1_help">
                            <strong>2. Como efetuar Cadastro?</strong> Não se preocupe! Utilize novamente no canto superior direito para explorar todas as funções no botão 'Login'. Ao localizar a tela clique no link abaixo dos campos   <br /> <strong>Não possui conta ? Cadastre-se</strong>. Se ainda assim não encontrar o que precisa, nossa equipe de suporte está pronta para ajudar!
                        </p>

                    </div>
                </div>

                <FaleConosco />



            </div>
        </div>
    );
};

export default Ajuda;