/*Nome: Events */
/*Autor: Emily */
/*Data da criação: setembro/outubro de 2023 */
/*Descrição : Neste componente se trata a parte de evento */
/*Observações : Este documento possui import apenas de css e react*/

/* >>> INÍCIO DAS IMPORTAÇÕES <<< */
import React from 'react';
import './Event.css';
/* >>> FIM DAS IMPORTAÇÕES <<< */

/* CONSTANTE DO EVENTO */
const Event = ({ title }) => {
  return <div className="event">{title}</div>;
};

export default Event;
/* >>> EXPORTAÇAO DO COMPONENTE <<< */