import {BrowserRouter} from 'react-router-dom';
import Content from './components/Content';
import './components/Calendario.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Content/>
      </BrowserRouter>
 
    </div>
  )
}

export default App
