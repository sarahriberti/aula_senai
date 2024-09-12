import React, { useState } from 'react'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Delete from './Delete';

// Função para formatar a data
const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
};

const TaskModal = ({ task, onClose, onEdit }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (task) => {
        if (task && task.ID) {
            try {
                const response = await fetch(`http://10.135.60.16:8085/delete_task?taskId=${task.ID}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                if (response.ok) {
                    console.log(result.message); // Mensagem de sucesso
                    onClose(); // Fechar o TaskModal
                } else {
                    console.error(result.error); // Mensagem de erro
                }
            } catch (error) {
                console.error('Erro ao excluir a tarefa:', error);
            }
        }
    };

    return (
        <>
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Título:</strong> {task.Titulo}</p>
                    <p><strong>Data:</strong> {formatDate(task.Data)}</p>
                    <p><strong>Hora Inicial:</strong> {task.Hora_Ini}</p>
                    <p><strong>Hora Final:</strong> {task.Hora_Fin}</p>
                    <p><strong>Descrição:</strong> {task.Descr}</p>
                    <p><strong>Notificação:</strong> {task.Notific ? 'Sim' : 'Não'}</p>
                    <p><strong>Repetir:</strong> {task.Repetir}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(true)}>
                        Excluir
                    </Button>
                    <Button variant="primary" onClick={() => onEdit(task)}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Confirmação de Exclusão */}
            <Delete
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
                task={task} // Passa a tarefa para o Delete.jsx
            />
        </>
    );
};

export default TaskModal;