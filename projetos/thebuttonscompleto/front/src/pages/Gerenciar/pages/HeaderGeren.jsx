
export default function Header() {
    return (
        <header>
            {/* Div para agrupar os elementos do cabeçalho com a classe "cabecalho" */}
            <div className="cabecalho">
                {/* Imagem do ícone do menu */}
                <img 
                    className="img-menu" 
                    src="https://cdn-icons-png.flaticon.com/128/4294/4294414.png" 
                    alt="menu"
                />
                {/* Imagem do logo */}
                <img 
                    className="img-logo" 
                    src="./corujalogo.png" 
                    alt="logo" 
                />
            </div>
        </header>
    )
}
