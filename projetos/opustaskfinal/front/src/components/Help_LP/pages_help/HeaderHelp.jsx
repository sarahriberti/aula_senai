import MenuLateral from '../../Menu_Lateral';
import './PagesHelp.css';
import { useNavigate } from 'react-router-dom';
// Importa o estilo CSS para ser aplicado ao componente HeaderLP


// Definição do componente HeaderLP
function HeaderHelp() {
    const navigate = useNavigate();
    return (
        <>
            {/* Início do cabeçalho */}
            <header>
                <div className='menu_fixo'>
                    <MenuLateral />
                </div>
                {/* Navegação do cabeçalho */}
                <ul className="inicio_help">
                    {/* Link para a página Home */}
                    <a className="Gerenciar_help_a" href="#gerenciar_help">
                        <li className="menu_header_help">Gerenciar</li>
                    </a>
                    <a className="Sugestao_help_a" href="#sugestao_help">
                        <li className="menu_header_help">Sugestão</li>
                    </a>
                    <a className="Sugestao_help_a" href="#doacao_help">
                        <li className="menu_header_help">Doação</li>
                    </a>
                    <a className="Sugestao_help_a" href="#sair_help">
                        <li className="menu_header_help">Sair</li>
                    </a>
                </ul>
                {/* Navegação do cabeçalho */}
            </header>
        </>
    )





}

// Exporta o componente HeaderLP para ser utilizado em outras partes do código
export { HeaderHelp };