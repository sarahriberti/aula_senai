import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BotaoAjuda.css';



const BotaoAjudaCalend = ({ texto }) => {
    const navigate = useNavigate();

    return (
        <button className="botao_ajuda" onClick={() => navigate('/HelpCalend')}>
            <img src="./src/image/ponto-de-interrogacao.png" alt="" />
        </button>
    );
};

export default BotaoAjudaCalend;