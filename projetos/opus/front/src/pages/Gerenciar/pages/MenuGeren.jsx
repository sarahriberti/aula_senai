import { Link } from "react-router-dom";
export default function Menu() {
    return (
        <div className="menu-main">
            <div className="menu-inform">
                <h2>Editar Perfil | </h2>
            </div>
            <nav className="menu-box">
                <ul>
                    <div className="pages">
                        <Link to="/"><li>Dados Básicos</li></Link>
                        |
                        <Link to="Avatar"><li>Avatar</li></Link>
                        |
                        <Link to="Senha"><li>Senha</li></Link>
                        |
                        <Link to="Email"><li>E-mail</li></Link>
                        |
                        <Link to="Telefone"><li>Telefone</li></Link>
                    </div>
                </ul>
            </nav>
        </div>
    )
}