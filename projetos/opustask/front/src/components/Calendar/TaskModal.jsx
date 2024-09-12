import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TaskModal = ({ task, onClose, onEdit }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tarefa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Título:</strong> {task.Titulo}</p>
                <p><strong>Data:</strong> {task.Data}</p>
                <p><strong>Hora Inicial:</strong> {task.Hora_Ini}</p>
                <p><strong>Hora Final:</strong> {task.Hora_Fin}</p>
                <p><strong>Descrição:</strong> {task.Descr}</p>
                <p><strong>Notificação:</strong> {task.Notific ? 'Sim' : 'Não'}</p>
                <p><strong>Repetir:</strong> {task.Repetir}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={() => onEdit(task)}>
                    Editar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskModal;
