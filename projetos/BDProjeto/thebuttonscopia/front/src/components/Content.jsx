import React from "react";
import { Home } from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Cadastro } from "../pages/Cadastrar/Cadastro";
import Calendario from "./Calendario";
import CadConcluido from "../pages/Cadastrar/CadConcluido"; 

const Content = props => (
    <main className="Content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/Calendario" element={<Calendario />} />
            <Route path="/CadConcluido" element={<CadConcluido />} /> 
            <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
)
export default Content;
