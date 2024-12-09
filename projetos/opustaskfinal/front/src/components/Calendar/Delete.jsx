import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Delete = ({ show, onClose, onDelete, task }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton className='Header_delete'>
                <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body className='body_delete'>
                <p>Deseja realmente excluir esta tarefa?</p>
            </Modal.Body>
            <Modal.Footer className='Footer_Del'>
                <Button variant="secondary" onClick={onClose}>
                    Não
                </Button>
                <Button variant="danger" onClick={() => onDelete(task)}>
                    Sim
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Delete;