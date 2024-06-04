/*Nome: App*/
/*Descrição : Traz o componente Content para ser exibido na tela desktop*/

import {BrowserRouter} from 'react-router-dom';  
import Content from './components/Content';     
import './components/Calendario.css';          
import React from 'react';                    
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {  
  return (
    <div className='app'>  
      <BrowserRouter>  {/* Envolve o componente Content com BrowserRouter para habilitar o roteamento */}
        <Content/>  {/* Renderiza o componente Content */}
      </BrowserRouter>
    </div>
  )
}

export default App; 
