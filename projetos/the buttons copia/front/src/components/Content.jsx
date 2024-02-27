/*Nome: Função Content */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata de todos os links para as páginas*/
/*Observações : Este documento contém o import do React, Home, NotFound, Route e Routes, Login, Cadastro e Calendário */
import React from "react";
import {Home} from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import {Login} from "../pages/Login/Login"
import { Cadastro} from "../pages/Cadastrar/Cadastro"
import Calendario from "./Calendario";
/*Fim das importações  */

/*Início da função content */
const Content = props =>(
    /*Esta main é para colocar os links que estão no site */
    <main className="Content">
        <Routes>
            <Route path="/" exact element = {<Home/>}/>
            <Route path="/Login" exact element = {<Login/>}/>
            <Route path="*" exact element = {<NotFound/>}/>
            <Route path="/Cadastro" exact element = {<Cadastro/>}/>
            <Route path="/Calendario" exact element = {<Calendario/>}/>
        </Routes>
    </main>
)
export default Content;
/*Término da função content */