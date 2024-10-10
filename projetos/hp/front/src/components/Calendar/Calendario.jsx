import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Formulario from '../Formulario';
import './Calendar.css';
import TaskModal from './TaskModal';

// Função para formatar a data
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CalendarioOFC = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [tasksForDate, setTasksForDate] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchTasks = async (date) => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('Usuário não encontrado no localStorage');
      return;
    }
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await fetch(`http://10.135.60.18:8085/tasks?userId=${userId}&date=${formattedDate}`);

      
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.statusText}`);
      }

      const data = await response.json();

      // Logando a resposta completa para ver o que está sendo retornado
      console.log('Resposta da API:', data);

      if (Array.isArray(data)) {
        setTasks(data);
        // Filtrar as tarefas pela data, comparando somente a parte da data de 'Inicio'
        const tasksForSelectedDate = data.filter((task) => {
          const taskDate = new Date(task.Inicio).toISOString().split('T')[0]; // Extrair a parte da data de 'Inicio'
          return taskDate === formattedDate;
        });
        setTasksForDate(tasksForSelectedDate);
      } else {
        console.error('A resposta da API não é um array:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };


  const handleDateClick = (value) => {
    setDate(value);
    const selectedDate = value.toISOString().split('T')[0];
    fetchTasks(selectedDate);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    fetchTasks(date);
  };

  const openFormForAdd = () => {
    setIsEditing(false);
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const openFormForEdit = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
    setIsModalOpen(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setTaskToEdit(null);
    setIsFormOpen(false);
    fetchTasks(date);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          onClickDay={handleDateClick}
          value={date} // Definindo o valor do calendário como a data selecionada
        />
      </div>
      <div className="tasks-list">
        <h3 className='task-superior'>{formatDate(date)}</h3>
        <ul className='scroll'>
          {tasksForDate.length > 0 ? (
            tasksForDate.map((task) => (
              <li key={task.id} onClick={() => handleTaskClick(task)}>
                <div className='circle-color' style={{ backgroundColor: task.Cor }}></div>
                <span className='titles-tasks'>{task.Titulo}</span>
              </li>
            ))
          ) : (
            <li className='sem-task'>Você não tem nenhuma tarefa, adicione uma agora!</li>
          )}
        </ul>
        <div className='btn-add'>
          <button onClick={openFormForAdd} className='btn-add-task'>
            <img className='btn-add-img' src="/src/image/mais.png" alt="menu icon" width={50} />
          </button>
          {isFormOpen && (
            <Formulario
              taskToEdit={taskToEdit}
              isEditing={isEditing}
              onClose={handleCloseForm}
              selectedDate={date}  /* Passando a data como objeto Date */
            />
          )}
        </div>
      </div>
      {isModalOpen && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onEdit={openFormForEdit}
        />
      )}
    </div>
  );
};

export default CalendarioOFC;