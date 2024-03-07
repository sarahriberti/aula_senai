import './Gerenciar.css'
import { BrowserRouter as Roteador, Routes, Route } from 'react-router-dom'
import HeaderGeren from './pages/HeaderGeren';
import MenuGeren from './pages/MenuGeren';
import DadosBasicos from './pages/DadosBasicos';
import Avatar from './pages/Avatar';
import Senha from './pages/Senha';
import Email from './pages/Email';
import Telefone from './Telefone';

function Gerenciar() {
    return (
      <Roteador>
        <HeaderGeren />
        <MenuGeren />
        <Routes>
          <Route path="/" element={<DadosBasicos />} />
          <Route path="/Avatar" element={<Avatar />} />
          <Route path="/Senha" element={<Senha />} />
          <Route path="/Email" element={<Email />} />
          <Route path="/Telefone" element={<Telefone />} />
        </Routes>
      </Roteador>
    )
  }
export default Gerenciar