import React from 'react';
import './Help.css';
import { useNavigate } from 'react-router-dom';
import { FaleConosco } from "../Fale Conosco/Fale_Conosco";
import GerenciarHelp from './pages_help/GerenciarHelp';
import { HeaderHelp } from './pages_help/HeaderHelp';
import SugestaoHelp from './pages_help/SugestaoHelp';
import DoacaoHelp from './pages_help/DoacaoHelp';
import SairHelp from './pages_help/SairHelp';

const AjudaCalend = () => {
    const navigate = useNavigate();

    return (
        <div>

            <HeaderHelp />



            <div className="container_help">
                <div>
                    <h1 className="header">Precisa de Ajuda com o Calendário?</h1>

                    <p className="text_help">
                        Olá! Seja bem-vindo à central de ajuda da Opus Task!
                        <br />Estamos aqui para ajudar! Veja abaixo algumas instruções para navegar e utilizar o calendário de forma eficiente.
                    </p>
                </div>

                <div className='container_help_filho'>
                    <div className="section_um">
                        <h2 className="subHeader_help">Passos para Usar o Calendário</h2>
                        <ul className="list_help">
                            <li className='letra_help'><strong>1. Conheça o Calendário:</strong> Clique no dia desejado no "Calendário" para visualizar e gerenciar suas tarefas e compromissos.</li>
                            <li className='letra_help'><strong>2. Adicione uma Tarefa:</strong> Clique no botão "+" no calendário. Preencha as informações solicitadas, como título, horário de início e fim, descrição, categoria, notificações, e se deseja repetir a tarefa.</li>
                            <li className='letra_help'><strong>3. Edite ou Exclua uma Tarefa:</strong> Para editar uma tarefa, clique sobre ela no campo de tarefas (exibido no lado direito ao selecionar um dia) e faça as alterações necessárias ao clicar em 'Editar'. Para excluir, clique no ícone de lixeira e confirme para removê-la.</li>
                            <li className='letra_help'><strong>4. Visualize Tarefas:</strong> Todas as suas tarefas salvas aparecerão no campo de tarefas do dia no lado direito. Use as setas de navegação para visualizar compromissos em meses anteriores ou futuros.</li>
                            <li className='letra_help'><strong>5. Personalize suas Tarefas:</strong> Escolha categorias e cores para identificar melhor cada tipo de compromisso.</li>
                        </ul>
                    </div>

                    <div className="section_dois">
                        <h2 className="subHeader_help">Dúvidas Frequentes</h2>

                        <p className="text1_help">
                            <strong>1. Não consigo adicionar uma tarefa?</strong> Verifique se todos os campos obrigatórios estão preenchidos. Se o problema persistir, entre em contato conosco através do "Fale Conosco" abaixo.
                        </p>
                        <img className='imagem_help_login' src="./src/image/help_calend_tarefa.png" alt="" />

                        <p className="text1_help">
                            <strong>2. Como altero o horário de uma tarefa?</strong> Para ajustar o horário, clique na tarefa existente.
                            <img className='imagem_help_login' src="./src/image/tarefa_help.png" alt="" />
                            <strong>Em seguida, clique em 'Editar'</strong>
                            <img className='imagem_help_login' src="./src/image/editar_help.png" alt="" />
                            <strong>Mude as informações que desejar e não esqueça de salvar!</strong>
                            <img className='imagem_help_login' src="./src/image/salvar_help_hora.png" alt="" />
                        </p>

                        <p className="text1_help">

                            <strong>3. Posso ver tarefas de meses anteriores ou marcar tarefas para os próximos meses ou anos?</strong> Sim! Use as setas para navegar entre os meses e visualizar compromissos passados ou futuros.
                            <img className='imagem_help_login' src="./src/image/help_calend_meses.png" alt="" />
                        </p>

                        <p className="text1_help">
                            <strong>4. Posso marcar as minhas tarefas como concluídas?</strong> Sim! Clique na tarefa e marque o checkbox de conclusão; assim, ela aparecerá riscada.
                            <img className='imagem_help_login' src="./src/image/taf_concluida_help.png" alt="" />
                        </p>
                    </div>

                    <GerenciarHelp />
                    <SugestaoHelp />
                    <DoacaoHelp />
                    <SairHelp />
                </div>

                <FaleConosco />
            </div>
        </div>
    );
};

export default AjudaCalend;