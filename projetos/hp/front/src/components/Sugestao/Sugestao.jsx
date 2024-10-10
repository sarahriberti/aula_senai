import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sugestao.css'

const Sugestao = ({ userId }) => {
    const [sugestao, setSugestao] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Controle de carregamento
    const [feedbackMessage, setFeedbackMessage] = useState(''); // Mensagem de feedback

    const handleSave = async () => {
        if (sugestao.trim()) {
            setLoading(true);
            setFeedbackMessage('');

            try {
                const response = await fetch('http://10.135.60.18:8085/receber_dados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Texto: sugestao, // Envia apenas o texto
                        ID_Usu: userId, // Envia o ID do usuário
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error('Erro do servidor:', data);
                    setFeedbackMessage('Erro ao salvar sugestão. Tente novamente.');
                    throw new Error('Erro ao enviar sugestão');
                }

                console.log('Sugestão salva:', data);
                setSugestao(''); // Limpa o campo de sugestão
                setIsOpen(false); // Fecha o modal
                setFeedbackMessage('Sugestão salva com sucesso!'); // Feedback de sucesso
            } catch (error) {
                console.error('Erro ao salvar sugestão:', error);
                setFeedbackMessage('Erro ao salvar sugestão. Tente novamente.');
            } finally {
                setLoading(false);
            }
        } else {
            setFeedbackMessage('Campo de sugestão vazio.'); // Mensagem se o campo estiver vazio
        }
    };

    return (
        <>
            <Button variant="primary2" onClick={() => setIsOpen(true)} style={{ backgroundColor: 'none' }}>
                Sugestão
            </Button>

            <Modal show={isOpen} onHide={() => setIsOpen(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Sugestão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        value={sugestao}
                        onChange={(e) => setSugestao(e.target.value)}
                        placeholder="Digite sua sugestão aqui..."
                        className="form-control"
                        rows="4"
                    />
                    {feedbackMessage && <div className="alert alert-info mt-2">{feedbackMessage}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>Fechar</Button>
                    <Button variant="primary" onClick={handleSave} disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Sugestao;