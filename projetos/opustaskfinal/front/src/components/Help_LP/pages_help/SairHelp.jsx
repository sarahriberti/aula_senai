import React from 'react';
import './PagesHelp.css';

const SairHelp = () => {
    return (
        <section id="sair_help">
            <div className="container_help">
                <h1 className="header">Como Sair da Opus?</h1>
                <div className='container_help_filho'>
                    <div className="section_link">
                        <h2 className="subHeader_help">Passos para Sair da Sua Conta</h2>
                        <ul className="list_help">
                            <li className='letra_help'>
                                <strong>1. Localize o Botão "Sair":</strong> O botão "Sair" está localizado no canto superior esquerdo da tela no menu.
                                <img className='imagem_help_login' src="./src/image/menu_help.png" alt=""  />
                                <strong> Clique em 'Sair da Conta' para iniciar o processo de saída.</strong>
                                <img className='imagem_help_login' src="./src/image/sair_help.png" alt=""  />
                            </li>
                            <li className='letra_help'>
                                <strong>2. Confirmação de Saída:</strong> Após clicar no botão "Sair",você vai receber a confirmação e após confirmar será desconectado de sua conta. Não se preocupe, suas informações estão seguras.
                            </li>
                            <li className='letra_help'>
                                <strong>3. Acesso Futuro:</strong> Para voltar a acessar sua conta, você precisará fazer login novamente com seu e-mail e senha.
                            </li>
                        </ul>
                    </div>

                    <div className="section_link_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>

                        <p className="text1_help">
                            <strong>1. O que acontece se eu sair da minha conta?</strong> Ao sair, você será desconectado e precisará fazer login novamente para acessar suas informações.
                        </p>

                        <p className="text1_help">
                            <strong>2. Posso manter minha sessão ativa?</strong> Sim! Se você desejar permanecer logado, evite clicar no botão "Sair".</p>

                        <p className="text1_help">
                            <strong>3. Como posso garantir que minha conta esteja segura?</strong> Sempre saia da sua conta quando usar dispositivos públicos ou compartilhados e nunca compartilhe sua senha com ninguém.
                        </p>

                        <p className="text1_help">
                            <strong>4. O que fazer se não conseguir sair?</strong> Se houver algum problema ao sair, tente atualizar a página ou entre em contato com nossa equipe de suporte na seção "Fale Conosco".
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SairHelp;