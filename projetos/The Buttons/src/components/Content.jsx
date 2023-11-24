import React from "react";
import {Home} from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import {Login} from "../pages/Login/Login"
import { Cadastro} from "../pages/Cadastrar/Cadastro"
import Calendario from "./Calendario";

const Content = props =>(
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