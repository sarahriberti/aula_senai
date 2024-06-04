/*Nome: Content */
/*Descrição : Neste componente a função é fazer as rotas de todas as páginas */

import React from "react"; 
import { Home } from "../pages/Home"; 
import NotFound from "../pages/NotFound"; 
import { Route, Routes } from "react-router-dom"; 
import { Login } from "../pages/Login/Login";  
import { Cadastro } from "../pages/Cadastrar/Cadastro"; 
import Calendario from "./Calendario";  
import CadConcluido from "../pages/Cadastrar/CadConcluido"; 
import Confirmacao from "./confirmacao"; 
import Gerenciar from "../pages/Gerenciar/Gerenciar"; 
import Compartilhar from "../pages/Gerenciar/pages/Compartilhar"; 
import EsqueciSenha from "../pages/Gerenciar/pages/EsqueciSenha";  
import PagDoacao from "../pages/Doacao/Doacao";  

const Content = props => (  
    <main className="Content"> 
        <Routes>  {/* Define as rotas para a aplicação */}
            <Route path="/" element={<Home />} />  {/* Rota para a página inicial */}
            <Route path="/Login" element={<Login />} />  {/* Rota para a página de login */}
            <Route path="/Cadastro" element={<Cadastro />} />  {/* Rota para a página de cadastro */}
            <Route path="/Calendario" element={<Calendario />} />  {/* Rota para a página de calendário */}
            <Route path="/CadConcluido" element={<CadConcluido />} />  {/* Rota para a página de cadastro concluído */}
            <Route path="/Gerenciar" element={<Gerenciar />} />  {/* Rota para a página de gerenciamento */}
            <Route path="/EsqueciSenha" element={<EsqueciSenha />} />  {/* Rota para a página de esqueci a senha */}
            <Route path="/Conf" element={<Confirmacao />} />  {/* Rota para a página de confirmação */}
            <Route path="/Compartilhar" element={<Compartilhar />} />  {/* Rota para a página de compartilhamento */}
            <Route path="/Doacao" element={<PagDoacao />} />  {/* Rota para a página de doação */}
            {/* <Route path="/Paginadedoacao" element={<Compartilhar />} />*/}
            <Route path="*" element={<NotFound />} />  {/* Rota para qualquer caminho não definido (404) */}
        </Routes>
    </main>
)

export default Content;  // Exporta o componente Content como o export padrão do módulo
