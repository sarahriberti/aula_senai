import React from 'react';
import './PagesHelp.css';

const DoacaoHelp = () => {
    return (
        <section id="doacao_help">
            <div className="container_help">
                <h1 className="header">Como Fazer uma Doação?</h1>
                <div className='container_help_filho'>
                    <div className="section_link">
                        <h2 className="subHeader_help">Passos para Contribuir com a Opus</h2>
                        <ul className="list_help">
                            <li className='letra_help'>
                                <strong>1. Acesse a Página de Doações:</strong> Clique no ícone do menu no canto superior esquerdo.
                                <img className='imagem_help_login' src="./src/image/menu_help.png" alt=""  />
                                <strong>E selecione "Doações" para ser direcionado à página de doações.</strong>
                                <img className='centro_texto' src="./src/image/doacao_help.png" alt=""  />
                            </li>
                            <li className='letra_help'>
                                <strong>2. Escolha o Valor da Doação:</strong> Na página de doações, você encontrará opções para escolher o valor que deseja contribuir. Você pode optar por personalizar o valor.
                            </li>
                            <li className='letra_help'>
                                <strong>3. Preencha Seus Dados:</strong> Insira as informações solicitadas, incluindo número do cartão, data de expiração, CVV, nome do titular e o valor da doação.
                            </li>
                            <li className='letra_help'>
                                <strong>4. Confirme Sua Doação:</strong> Após preencher os dados, clique no botão "Confirmar Doação". Você receberá um e-mail de confirmação e um recibo da sua contribuição.
                            </li>
                        </ul>
                        <p className="text1_help">
                            Sua generosidade é fundamental! Cada doação, por menor que seja, contribui para melhorarmos nosso sistema e alcançarmos o maior número possível de pessoas com o nosso site.
                        </p>
                    </div>

                    <div className="section_link_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>

                        <p className="text1_help">
                            <strong>1. Posso fazer doações mensais?</strong> Sim! Na página de doações, você pode escolher a opção de doação recorrente para contribuir mensalmente.
                        </p>

                        <p className="text1_help">
                            <strong>2. Existe um valor mínimo para doações?</strong> Não, você pode contribuir com qualquer valor que desejar.
                        </p>

                        <p className="text1_help">
                            <strong>3. Como posso entrar em contato caso tenha mais dúvidas?</strong> Utilize a seção "Fale Conosco" disponível no rodapé da página para enviar suas perguntas à nossa equipe.
                        </p>
                        
                        <p className="text1_help">
                            <strong>4. Qual é o objetivo da doação?</strong> Sua generosidade nos ajuda a continuar nosso trabalho e aprimorar a cada dia nosso sistema para melhor funcionamento. Cada doação, por menor que seja, contribui para alcançarmos nosso objetivo de ajudar o maior número possível de pessoas com o nosso site.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoacaoHelp;