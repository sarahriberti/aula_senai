// Importa o componente Link da biblioteca 'react-router-dom'
import { Link } from 'react-router-dom';

// Importa o estilo CSS para ser aplicado ao componente HeaderLP
import './HeaderLP.css'

// Definição do componente HeaderLP
function HeaderLP() {
    return (
        <>
            {/* Início do cabeçalho */}
            <header>
                {/* Navegação do cabeçalho */}
                <nav id="menu">
                    {/* Lista de itens de navegação */}
                    <ul className="inicio">
                        {/* Link para a página Home */}
                        <a href="">
                            <li className="menu_header">Home</li>
                        </a>

                        {/* Link para a seção 'Sobre' */}
                        <a href="#sobre">
                            <li className="menu_header">Sobre</li>
                        </a>

                        {/* Link para a seção 'Como Usar' */}
                        <a href="#comousar">
                            <li className="menu_header">Ferramentas</li>
                        </a>

                        {/* Link para a página de Login usando o componente Link */}
                        <li className="login">
                            <Link to="/Login">Login</Link>
                        </li>
                    </ul>
                </nav>

                {/* Logo do cabeçalho */}
                <div id="logo"><img src="./src/image/corujalogo.png" alt="coruja" width="250" height="100" /></div>
            </header>
        </>
    )
}

// Exporta o componente HeaderLP para ser utilizado em outras partes do código
export { HeaderLP };