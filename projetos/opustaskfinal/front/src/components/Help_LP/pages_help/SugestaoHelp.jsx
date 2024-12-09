import React from 'react';
import './PagesHelp.css';

const SugestaoHelp = () => {
    return (
        <section id="sugestao_help">
            <div className="container_help">
                <h1 className="header">Fazer uma Sugestão</h1>
                <div className='container_help_filho'>
                    <div className="section_link">
                        <h2 className="subHeader_help">Como Enviar Sua Sugestão para a Opus</h2>
                        <ul className="list_help">
                            <li className='letra_help'>
                                <strong>1. Acesse Sua Conta:</strong> Clique no ícone do menu no canto superior esquerdo da tela para abrir o menu.
                                <img className='imagem_help_login' src="./src/image/menu_help.png" alt=""  />
                            </li>
                            <li className='letra_help'>
                                <strong>2. Vá até a Seção de Sugestões:</strong> No menu, selecione a opção "Sugestões" para acessar o formulário de feedback.
                                <img className='imagem_help_login' src="./src/image/sugestao_help.png" alt=""  />
                            </li>
                            <li className='letra_help'>
                                <strong>3. Preencha o campo:</strong> Escreva sua sugestão no campo indicado, fornecendo detalhes que possam nos ajudar a melhorar. Lembre-se de ser claro e conciso.
                            </li>
                            <li className='letra_help'>
                                <strong>4. Envie sua Sugestão:</strong> Após preencher o formulário, clique no botão "Enviar". Sua sugestão será enviada diretamente para nossa equipe.
                                <img className='imagem_help_login' src="./src/image/sugestao_help2.png" alt=""  />
                            </li>
                        </ul>
                    </div>

                    <div className="section_link_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>

                        <p className="text1_help">
                            <strong>1. O que acontece após enviar minha sugestão?</strong> Nós analisaremos sua sugestão e, se necessário, entraremos em contato para mais informações.
                        </p>

                        <p className="text1_help">
                            <strong>2. Posso sugerir novas funcionalidades?</strong> Sim! Ficaremos felizes em receber suas ideias sobre novas funcionalidades ou melhorias.
                        </p>

                        <p className="text1_help">
                            <strong>3. Existe um limite para o número de sugestões?</strong> Sim! Você tem o limite de 100 caracteres.
                        </p>

                        <p className="text1_help">
                            <strong>4. Como posso entrar em contato com o suporte?</strong> Se tiver dúvidas ou precisar de assistência adicional, utilize a seção "Fale Conosco" no rodapé da página para entrar em contato com nossa equipe.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SugestaoHelp;