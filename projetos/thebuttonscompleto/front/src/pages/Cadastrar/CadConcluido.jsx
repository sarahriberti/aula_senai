/* Nome: CadConcluido */
/*Autor: Emily*/
/* Descrição : Página que aparece após a conclusão do cadastro do usuário */

import React from 'react';
import { Link } from 'react-router-dom';
import './CadConcluido.css'

function CadastroConcluido() { {/* >>> Página que aparece quando o usuário tem sucesso ao efetuar o cadastro <<< */}
    return (
        <div className='cad_sucess'>
            <h2>Cadastro Concluído</h2>
            <p>Seu cadastro foi concluído com sucesso! Você pode fazer login agora.</p>
            <Link className='link_to_login' to="/Login">Fazer Login</Link> {/* >>> Link para o usuário voltar para a página de login para logar em sua conta <<< */}
        </div>
    );
}

export default CadastroConcluido;