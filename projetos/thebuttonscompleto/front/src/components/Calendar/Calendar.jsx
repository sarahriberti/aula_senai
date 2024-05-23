/*Nome: Calendário */
/*Autor: Emily */
/*Data da criação: setembro/outubro de 2023 */
/*Descrição : Neste componente se trata a estrutura do calendário */
/*Observações : Este documento possui import do formulário to-do, css, event e useState*/

/* >>> INÍCIO DAS IMPORTAÇÕES <<< */
import React, { useState } from 'react';
import Event from './Event';
import Formulario from '../Formulario';
import './Calendar.css';
/* >>> FIM DAS IMPORTAÇÕES <<< */

/* >>> INÍCIO DAS CONSTANTES <<< */

/* >>> CONSTANTE PARA OS MESES <<< */
const months = [
  'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
  'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
];

/* >>> CONSTANTES PARA OS DIAS DA SEMANA <<< */
const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

/* >>> CONSTANTE DO CALENDÁRIO COM USESTATE E DEMAIS FUNÇÕES <<< */
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
 
  /* >>> INÍCIO DO RETURN <<< */
  return (
    <div className="calendar"> {/* >>> DIV PRINCIPAL <<< */}
      <div className="calendar-header"> {/* >>> DIV DO HEADER <<< */}
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{months[currentMonth]} {currentYear}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid"> {/* >>> DIV DA GRID DO CALENDÁRIO <<< */}
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week">
            {day}
          </div>
        ))}
        {[...Array(firstDayOfMonth).fill(null)].map((_, index) => (
          <div key={`empty-${index}`} className="empty-day"></div>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <div key={day} className="day">
            <span className="day-number">{day + 1}</span>
            <Formulario/>
            {events.map((event, index) => {
              if (event.date === day + 1) {
                return <Event key={index} title={event.title} />;
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
  /* >>> FIM DO RETURN <<< */


};

export default Calendar;