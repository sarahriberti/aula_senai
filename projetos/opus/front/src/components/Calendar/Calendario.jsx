/*Nome: Calendário */
/*Autor: Emily */
/*Data da criação: setembro/outubro de 2023 */
/*Descrição : Neste componente se trata a estrutura do calendário */
/*Observações : Este documento possui import do formulário to-do, css, event e useState*/

/* >>> INÍCIO DAS IMPORTAÇÕES <<< */
import React, { useState, useEffect } from 'react';
import Formulario from '../Formulario';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
/* >>> FIM DAS IMPORTAÇÕES <<< */

const CalendarioOFC = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [tasksForDate, setTasksForDate] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Função para buscar as tarefas da API
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://10.135.60.16:8085/tasks');
      const data = await response.json();
      console.log('Tarefas recuperadas:', data);
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDateClick = (value) => {
    setDate(value);

    //const selectedDate = value.toISOString().split('T')[0];
    const selectedDate = value.toLocaleDateString('en-CA');

    console.log('Data selecionada:', selectedDate);
    console.log('Tarefas gerais:', tasks);

    tasks.forEach((task) => {
      console.log('Tarefa:', task);  // Inspecione o objeto completo da tarefa
      console.log(`task.date: ${task.Data}`);  // Verifique se a data está presente
    });

    const tasksForSelectedDate = tasks.filter(
      (task) => task.Data === selectedDate
    );

    console.log('Tarefas para a dia:', tasksForSelectedDate);
    setTasksForDate(tasksForSelectedDate);

  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    fetchTasks();
  };

  const handleAddTask = () => {
    setSelectedTask(null);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar onClickDay={handleDateClick} />
      </div>
      <div className="tasks-list">
        <h3>Tarefas para {date.toDateString()}</h3>
        <Formulario
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          taskData={selectedTask}
          refreshTasks={fetchTasks}
        />
        <ul>
          {tasksForDate.map((task) => (
            <li key={task.id}>
              <span>{task.Cor} - {task.Titulo}</span>
              <button className="btn btn-secondary ml-2" onClick={() => handleEditTask(task)}>
                Editar
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default CalendarioOFC;