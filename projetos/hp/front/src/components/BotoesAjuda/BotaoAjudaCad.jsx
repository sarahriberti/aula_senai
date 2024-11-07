import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BotaoAjuda.css';

const BotaoAjudaCad = ({ texto }) => {
    const navigate = useNavigate();

    return (
        <button className="botao_ajuda" onClick={() => navigate('/HelpCad')}>
            <img src="./src/image/ponto-de-interrogacao.png" alt="" />
        </button>
    );
};

export default BotaoAjudaCad;