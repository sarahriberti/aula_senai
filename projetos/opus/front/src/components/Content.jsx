import React from "react";
import { Home } from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Cadastro } from "../pages/Cadastrar/Cadastro";
import Calendario from "./CalendarioOFC";
import CadConcluido from "../pages/Cadastrar/CadConcluido";
import Confirmacao from "./confirmacao";
import Gerenciar from "../pages/Gerenciar/Gerenciar";
import Compartilhar from "../pages/Gerenciar/pages/Compartilhar";
import EsqueciSenha from "../pages/Gerenciar/pages/EsqueciSenha";
import PagDoacao from "../pages/Doacao/Doacao";

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
            {/* <Route path="/Paginadedoacao" element={<Compartilhar />} />*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
)
export default Content;
