// TaskModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Delete from './Delete';


// Função para formatar a data
const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
};

// Função para mapear os valores numéricos para os nomes das categorias
const getCategoriaTexto = (categoria) => {
    switch (categoria) {
        case 1:
            return 'Lazer';
        case 2:
            return 'Estudo';
        case 3:
            return 'Trabalho';
        case 4:
            return 'Saúde';
        case 5:
            return 'Família';
        case 6:
            return 'Outro';
        default:
            return 'Sem categoria';
    }
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

const TaskModal = ({ task, onClose, onEdit, updateTaskStatus }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isConcluded, setIsConcluded] = useState(false);

    // Carrega o estado da tarefa do localStorage quando o modal é aberto
    useEffect(() => {
        const savedTask = localStorage.getItem(`task_${task.ID}_concluded`);
        if (savedTask !== null) {
            setIsConcluded(JSON.parse(savedTask));
        } else {
            setIsConcluded(task.Concluida);
        }
    }, [task.ID, task.Concluida]);

    const handleDelete = async (task) => {
        if (task && task.ID) {
            try {
                const response = await fetch(`http://10.135.60.33:8085/delete_task?taskId=${task.ID}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                if (response.ok) {
                    console.log(result.message);
                    onClose();
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error('Erro ao excluir a tarefa:', error);
            }
        }
    };

    const handleSave = async () => {
        const novo_status = isConcluded ? 1 : 0;
        const ID_Tarefa = task.ID;

        try {
            const response = await fetch('http://10.135.60.33:8085/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ID_Tarefa,
                    novo_status,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem(`task_${task.ID}_concluded`, JSON.stringify(novo_status === 1));
                console.log('Tarefa salva com sucesso:', result);
                updateTaskStatus(task.ID, novo_status === 1); // Atualiza o estado no frontend
                onClose();
            } else {
                console.error('Erro ao salvar a tarefa:', result);
            }
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    const handleCheckboxChange = () => {
        setIsConcluded(!isConcluded);
    };

    return (
        <>
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton className='Header_Titulo_TaskModal' style={{ display: 'flex', alignItems: 'center' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isConcluded} // Usa o estado correto
                            onChange={() => setIsConcluded(!isConcluded)} // Atualiza o estado local
                        />
                        Concluído
                    </label>
                    <div className='Titulo_geral' style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                        <div className='Color_TaskModal' style={{ backgroundColor: task.Cor, width: '35px', height: '35px', marginRight: '10px' }}></div>
                        <Modal.Title className='Titulo_ModalTask' style={{ fontSize: '25px' }}>{task.Titulo}</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body className='Body_TaskModal'>
                    <div className='Tempo_Task'>
                        <p><strong>Início:</strong> {formatDate(task.Inicio.split(' ')[0])} {task.Inicio.split(' ')[1]}</p>
                        <p><strong>Final:</strong> {formatDate(task.Termino.split(' ')[0])} {task.Termino.split(' ')[1]}</p>
                    </div>
                    <div className='Descr_TaskModal'>
                        <p><strong>Descrição:</strong> {task.Descr}</p>
                    </div>
                    <div className='NCR'>
                        <p><strong>Notificação:</strong> {task.Notific ? 'Sim' : 'Não'}</p>
                        <p><strong>Categoria:</strong> {getCategoriaTexto(task.Categoria)}</p>
                        <p><strong>Repetir:</strong> {RepetirTxt(task.Repetir)}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(true)}>
                        <img src="/src/image/delete.png" alt="" />
                    </Button>
                    <Button className='editar-btn' variant="primary" onClick={() => onEdit(task)}>
                        <img src="/src/image/pencil.png" alt="" />
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Confirmação de Exclusão */}
            <Delete
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={() => handleDelete(task)}
                task={task} // Passa a tarefa para o Delete.jsx
            />

        </>
    );

};

export default TaskModal;
