import { useState, useEffect } from 'react';
import './Notificacao.css';

const Notificacao = () => {
    const [notificacoes, setNotificacoes] = useState([]); // Armazena as notificações
    const [aberta, setAberta] = useState(false); // Controla a abertura/fechamento do modal
    const [modalConfirmacao, setModalConfirmacao] = useState(false); // Controla a exibição do modal de confirmação
    const [notificacaoParaDeletar, setNotificacaoParaDeletar] = useState(null); // Armazena o id da notificação a ser deletada
    const [carregando, setCarregando] = useState(true); // Controla o estado de carregamento

    // Função para abrir/fechar o modal de notificações
    const abrirFecharDiv = () => {
        setAberta(!aberta);
    };

    // Função para solicitar a exclusão de uma notificação
    const deletarNotificacao = (id) => {
        setNotificacaoParaDeletar(id);
        setModalConfirmacao(true);
    };

    // Função para confirmar a exclusão de uma notificação
    const confirmarDeletar = async () => {
        try {
            const response = await fetch(`http://10.135.60.28:8085/excluir_notificacao?id=${notificacaoParaDeletar}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar a notificação');
            }

            // Remove a notificação excluída do estado
            setNotificacoes((prev) =>
                prev.filter((notificacao) => notificacao.id !== notificacaoParaDeletar)
            );
            setModalConfirmacao(false);
        } catch (error) {
            console.error('Erro ao deletar notificação:', error);
            alert('Ocorreu um erro ao tentar excluir a notificação.');
        }
    };

    // Função para cancelar a exclusão da notificação
    const cancelarDeletar = () => {
        setModalConfirmacao(false);
    };

    // Função para buscar as notificações
    useEffect(() => {
        const fetchNotificacoes = async () => {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout

                const userId = localStorage.getItem('id'); // Busca o ID no localStorage
                if (!userId) {
                    console.error('ID do usuário não encontrado no localStorage');
                    return;
                }

                const response = await fetch(
                    `http://10.135.60.28:8085/notificacoes?userId=${userId}`,
                    { signal: controller.signal }
                );

                clearTimeout(timeout);

                if (response.status === 204) {
                    setNotificacoes([]);
                    setCarregando(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Erro ao carregar notificações: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Resposta da API BLAAAAAAAAAA:', data);
                if (data.notificacoes && data.notificacoes.notificacoes) {
                    console.log('Teste de notificacao:', data.notificacoes.notificacoes);
                } else {
                    console.log('Dados de notificações não encontrados na resposta.');
                }

                setNotificacoes(Array.isArray(data.notificacoes.notificacoes) ? data.notificacoes.notificacoes : []);
                setCarregando(false);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error('A requisição foi cancelada devido ao timeout.');
                } else {
                    console.error('Erro ao carregar notificações:', error);
                }
                alert('Erro ao buscar notificações. Tente novamente.');
                setCarregando(false);
            }
        };

        fetchNotificacoes();
    }, []); // O useEffect é chamado apenas uma vez, quando o componente é montado

    return (
        <div className="notificacao-container">
            {/* Ícone do sino */}
            <div onClick={abrirFecharDiv} className="icone-sino">
                <img src="/src/image/sino.png" alt="Notificações" />
                {notificacoes.length > 0 && <div className="numero-notificacao">{notificacoes.length}</div>}
            </div>

            {/* Modal de notificações */}
            {aberta && (
                <div className="notificacao-modal">
                    {carregando ? (
                        <p>Carregando notificações...</p>
                    ) : notificacoes.length === 0 ? (
                        <p>Você ainda não tem notificações</p>
                    ) : (
                        <ul>
                            {notificacoes.map((notificacao) => (
                                <li key={notificacao.id} className="notificacao-item">
                                    <span className="notificacao-bolinha"></span>
                                    <p>
                                        {notificacao.mensagem} <br />
                                        {/* Formatando a data */}
                                        <small>{new Date(notificacao.data_hora).toLocaleString()}</small>
                                    </p>
                                    <button onClick={() => deletarNotificacao(notificacao.id)}>
                                        <img src="/src/image/fechar.png" alt="Deletar" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Modal de confirmação para exclusão */}
            {modalConfirmacao && (
                <div className="modal-confirmacao">
                    <div className="modal-content">
                        <h3>Deseja realmente deletar esta notificação?</h3>
                        <div className="modal-buttons">
                            <button onClick={confirmarDeletar}>Sim</button>
                            <button onClick={cancelarDeletar}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notificacao;