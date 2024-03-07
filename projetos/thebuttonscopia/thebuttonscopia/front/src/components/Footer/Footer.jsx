// Importa o estilo CSS para ser aplicado ao componente Footer
import './Footer.css'

// Importa o componente Link da biblioteca 'react-router-dom'
import { Link } from 'react-router-dom';

// Definição do componente Footer
function Footer() {
    return (
        <>
            {/* Início da seção de rodapé */}
            <footer>
                {/* Container para organizar os elementos do rodapé */}
                <div className="container_footer">
                    {/* Menu inferior do rodapé */}
                    <div className="menu_baixo">
                        {/* Link para a página Home */}
                        <a href="">
                            <li className="menu_list">Home</li>
                        </a>
                        {/* Link para a seção 'Sobre' */}
                        <a href="#sobre">
                            <li className="menu_list">Sobre</li>
                        </a>
                        {/* Link para a seção 'Como Usar' */}
                        <a href="#comousar">
                            <li className="menu_list">Ferramentas</li>
                        </a>
                        {/* Link para a página de Login usando o componente Link */}
                        <li className="menu_list">
                                <Link to="/Login">Login</Link>
                        </li>
                        {/* Link para a página de Cadastro usando o componente Link */}
                        <li className="menu_list">
                            <Link to="/Cadastro">Cadastro</Link>
                        </li>
                        {/* Link externo para o suporte por e-mail */}
                        <a href="https://www.google.com/intl/pt-BR/gmail/about/"><li className="menu_list">opustasksuporte@gmail.com</li></a>
                    </div>
                    {/* Seção de formulário e redes sociais */}
                    <div className="abertura">
                            {/* Formulário para sugestões */}
                            <form action="">
                                <textarea name="sugestão" id="sugerido" cols="50" rows="5" placeholder="Sugestões"></textarea>
                                <input type="button" value="Enviar" />
                                {/* Lista de redes sociais */}
                                <ul className="redes_sociais">
                                    <li className="instagram"><a href="https://www.instagram.com/opus_task/"><img src="./src/image/instagram.png" alt="foto" width="40px" /></a><p className="rede">@opus_task</p></li>
                                    <li className="instagram"><a href="https://web.whatsapp.com/"><img src="./src/image/whatsapp.png" alt="foto" width="40px" /></a><p className="rede">19 9999-9999</p></li>
                                    <li className="instagram"><a href="https://www.uol.com.br/tilt/facebook/"><img src="./src/image/facebook.png" alt="foto" width="40px" /></a><p className="rede">Opus Task</p></li>
                                </ul>
                            </form>
                        {/* Logo do rodapé */}
                        <div className="logo_footer">
                            <img src="./src/image/corujalogo.png" alt="" width="187,5" height="75" className="corujita" />
                        </div>
                        
                    </div>
                </div>
            </footer>
        </>
    )
}
// Exporta o componente Footer para ser utilizado em outras partes do código
export { Footer };