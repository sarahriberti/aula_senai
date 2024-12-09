import React from 'react';
import './PagesHelp.css';

const GerenciarHelp = () => {
    return (
        <section id="gerenciar_help">
            <div className="container_help">
                <h1 className="header">Gerenciar Conta</h1>
                <div className='container_help_filho'>
                    <div className="section_link">
                        <h2 className="subHeader_help">Como Gerenciar sua Conta na Opus</h2>
                        <ul className="list_help">
                            <li className='letra_help'>
                                <strong>1. Acesse sua Conta:</strong> Clique no ícone do menu no canto superior esquerdo da tela para abrir o menu .
                                <img className='imagem_help_login' src="./src/image/menu_help.png" alt=""  />
                                <strong className='centro_help'>Clique em 'Gerenciar Conta'</strong>
                                <img className='imagem_help_login' src="./src/image/gerenciar_help2.png" alt=""  />
                            </li>
                            <li className='letra_help'>
                                <strong>2. Atualize suas Informações Pessoais:</strong> Você pode atualizar seu nome, data de nascimento, e-mail, telefone, senha e avatar. Lembre-se de clicar em "Salvar" após fazer as alterações.
                            </li>
                            <li className='letra_help'>
                                <strong>3. Alterar Senha:</strong> Para mudar sua senha, vá até "Gerenciar Conta" e preencha os campos de nova senha. Siga as instruções: coloque sua senha atual, digite a nova senha e confirme-a.
                            </li>
                        </ul>
                    </div>

                    <div className="section_link_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>

                        <p className="text1_help">
                            <strong>1. O que fazer se esquecer minha senha?</strong> Clique em "Esqueceu a senha?" na tela de login e siga as instruções para redefinir sua senha via e-mail.
                        </p>

                        <p className="text1_help">
                            <strong>2. Como posso verificar meu e-mail cadastrado?</strong> Acesse "Gerenciar Conta" e verifique o campo de e-mail. Se precisar atualizar, faça isso e salve as alterações.
                        </p>

                        <p className="text1_help">
                            <strong>3. Como entrar em contato com o suporte?</strong> Se tiver alguma dúvida ou problema, utilize a seção "Fale Conosco" disponível no rodapé da página para enviar uma mensagem à nossa equipe.
                        </p>

                        <p className="text1_help">
                            <strong>4. Posso reativar minha conta após desativá-la?</strong> Não! Uma vez excluída, os dados serão apagados do nosso banco de dados.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GerenciarHelp;