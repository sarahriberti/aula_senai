import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Delete from './Delete';
import Check from '../Check';

// Função para formatar a data
const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
};

const RepetirTxt = (value) => {
    switch (value) {
        case 1:
            return 'Diariamente';
        case 2:
            return 'Semanalmente';
        case 3:
            return 'Mensalmente';
        case 4:
            return 'Anualmente';
        case 5:
            return 'Nunca';
        default:
            return 'Não definido';
    }
};

const TaskModal = ({ task, onClose, onEdit }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isConcluded, setIsConcluded] = useState(task.Concluida || false); // Estado para armazenar se a tarefa está concluída

    const handleDelete = async (task) => {
        if (task && task.ID) {
            try {
                const response = await fetch(`http://10.135.60.38:8085/delete_task?taskId=${task.ID}`, {
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

    const handleConclude = async () => {
        try {
            const response = await fetch(`http://10.135.60.38:8085/update_task?taskId=${task.ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...task, Concluida: !isConcluded }),
            });
            const result = await response.json();
            if (response.ok) {
                setIsConcluded(!isConcluded); // Atualiza o estado local da tarefa
                console.log(result.message); // Mensagem de sucesso
            } else {
                console.error(result.error); // Mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao atualizar a tarefa:', error);
        }
    };

    return (
        <>
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton className='Header_Titulo_TaskModal'>
                    <Modal.Title className='Titulo_ModalTask'>Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body className='Body_TaskModal'>
                    <div className='Color_TaskModal' style={{ backgroundColor: task.Cor }}>
                        <Check className="check"/>
                    </div>
                    <p className='Nome_TaskModal'><strong>Título:</strong> {task.Titulo}</p>
                    <p className='HrInicial_TaskModal'><strong>Hora Inicial:</strong> {task.Inicio}</p>
                    <p className='HrFinal_TaskModal'><strong>Hora Final:</strong> {task.Termino}</p>
                    <p className='Descr_TaskModal'><strong>Descrição:</strong> {task.Descr}</p>
                    <p className='Notf_TaskModal'><strong>Notificação:</strong> {task.Notific ? 'Sim' : 'Não'}</p>
                    <p className='Rept_TaskModal'><strong>Repetir:</strong> {RepetirTxt(task.Repetir)}</p>
                    {/* Checkbox para marcar como concluída */}

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