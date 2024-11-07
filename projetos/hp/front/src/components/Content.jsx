import React from "react";
import { Home } from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import Cadastro from "../pages/Cadastrar/Cadastro";
import Calendario from "./CalendarioOFC";
import CadConcluido from "../pages/Cadastrar/CadConcluido";
import Confirmacao from "./confirmacao";
import Gerenciar from "../pages/Gerenciar/Gerenciar";
import Compartilhar from "../pages/Gerenciar/Compartilhar";
import EsqueciSenha from "../pages/Gerenciar/EsqueciSenha";
import PagDoacao from "../pages/Doacao/Doacao";
import Ajuda from "./Help_LP/Help";
import AjudaLogin from "./Help_LP/HelpLogin";
import AjudaCadastro from "./Help_LP/HelpCad";
import AjudaCalend from "./Help_LP/HelpCalend";
import BotaoAjuda from "./BotoesAjuda/BotaoAjuda";

const Content = props => (
    <main className="Content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/Calendario" element={<Calendario />} />
            <Route path="/CadConcluido" element={<CadConcluido />} />
            <Route path="/Gerenciar" element={<Gerenciar />} />
            <Route path="/EsqueciSenha" element={<EsqueciSenha />} />
            <Route path="/Conf" element={<Confirmacao />} />
            <Route path="/Compartilhar" element={<Compartilhar />} />
            <Route path="/Doacao" element={<PagDoacao />} />
            <Route path="/Help" element={<Ajuda/>} />
            <Route path="/HelpLogin" element={<AjudaLogin/>} />
            <Route path="/HelpCad" element={<AjudaCadastro/>} />
            <Route path="/HelpCalend" element={<AjudaCalend/>} />
            <Route path="/BotaoAjuda" element={<BotaoAjuda/>} />
            {/* <Route path="/Paginadedoacao" element={<Compartilhar />} />*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
)
export default Content;