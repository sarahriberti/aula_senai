import {BrowserRouter} from 'react-router-dom';
import Content from './components/Content';
import React from 'react';


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
