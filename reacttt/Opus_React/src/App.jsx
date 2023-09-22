import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tarefa from './components/Tarefa';
import Formulario from './components/Formulário';
import MenuLateral from './components/Menu_Lateral';

function App() {
  return (
    <div className='app'>
      <MenuLateral />
      <div className='container'>
        <img src="./src/assets/calendario (1).png"  alt="rg" className='image'/>
        <Tarefa />
      
      </div>
      <Formulario />
      <img src="./src/assets/corujalogo.png" alt="gr" className='logo'/>
    </div>
  )
}

export default App
