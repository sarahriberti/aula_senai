import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Formulario from '../Formulario';
import './Calendar.css';
import TaskModal from './TaskModal';
import BotaoAjudaCalend from '../BotoesAjuda/BotaoAjudaCalend';

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

  // Função para buscar tarefas de um dia específico
  const fetchTasks = async (selectedDate) => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('Usuário não encontrado no localStorage');
      return;
    }
    try {
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
      const response = await fetch(`http://10.135.60.33:8085/tasks?userId=${userId}&date=${formattedDate}`);

      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (Array.isArray(data)) {
        setTasks(data);
        // Filtra as tarefas para uma data específica
        const tasksForSelectedDate = data.filter((task) => {
          const taskDate = task.Inicio ? new Date(task.Inicio) : null;

          // Verifica se taskDate é uma data válida antes de chamar toISOString()
          if (taskDate instanceof Date && !isNaN(taskDate)) {
            const formattedTaskDate = taskDate.toISOString().split('T')[0];
            return formattedTaskDate === formattedDate;
          }

          return false; // Exclui as tarefas sem data válida
        });
        setTasksForDate(tasksForSelectedDate);
      } else {
        console.error('A resposta da API não é um array:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para buscar todas as tarefas
  const fetchAllTasks = async () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('Usuário não encontrado no localStorage');
      return;
    }
    try {
      const response = await fetch(`http://10.135.60.33:8085/tasks?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (Array.isArray(data)) {
        setTasks(data);
        fetchTasks(date);
      } else {
        console.error('A resposta da API não é um array:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
  
      // Filtra as tarefas para essa data específica
      const tasksForThisDate = tasks.filter((task) => {
        const taskDate = task.Inicio ? new Date(task.Inicio) : null;
        
        // Verifica se taskDate é válida antes de usar toISOString()
        if (taskDate instanceof Date && !isNaN(taskDate)) {
          const formattedTaskDate = taskDate.toISOString().split('T')[0];
          return formattedTaskDate === formattedDate;
        }
        
        return false; // Exclui as tarefas com uma data inválida
      });
  
      const limitedTasks = tasksForThisDate.slice(0, 3);
  
      if (limitedTasks.length > 0) {
        return (
          <div className="task-colors">
            {limitedTasks.map((task) => (
              <div
                key={task.id}
                className="task-stripe"
                style={{
                  backgroundColor: task.Cor,
                  width: '10px',
                  height: '10px',
                  marginBottom: '2px',
                  borderRadius: '100%',
                  margin: '1px',
                }}
              />
            ))}
            {tasksForThisDate.length > 3 && (
              <div
                className="more-tasks"
                style={{ textAlign: 'center', width: '5px', height: '5px' }}
              >
                ...
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };  

  const handleDateClick = (value) => {
    setDate(value);
    fetchTasks(value);
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

  // Função para atualizar o status da tarefa concluída
  const updateTaskStatus = (taskId, isConcluded) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.ID === taskId ? { ...task, Concluida: isConcluded } : task
      )
    );
    
    setTasksForDate((prevTasksForDate) =>
      prevTasksForDate.map((task) =>
        task.ID === taskId ? { ...task, Concluida: isConcluded } : task
      )
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          onClickDay={handleDateClick}
          value={date}
          tileContent={renderTileContent}
        />
      </div>
      <div className="tasks-list">
        <h3 className='task-superior'>{formatDate(date)}</h3>
        <ul className='scroll'>
          {tasksForDate.length > 0 ? (
            tasksForDate.map((task) => (
              <li
                key={task.id}
                onClick={() => handleTaskClick(task)}
                style={{ textDecoration: task.Concluida ? 'line-through' : 'none' }}
              >
                <div className='circle-color' style={{ backgroundColor: task.Cor }}></div>
                <span className='titles-tasks'>
                  {task.Titulo}
                </span>
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
              selectedDate={date}
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
      <BotaoAjudaCalend/>
    </div>
  );
};

export default CalendarioOFC;