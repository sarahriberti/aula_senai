import './Footer.css'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer>

                <div className="container_footer">
                    <div className="menu_baixo">
                        <a href="">
                            <li className="menu_list">Home</li>
                        </a>

                        <a href="#sobre">
                            <li className="menu_list">Sobre</li>
                        </a>

                        <a href="#comousar">
                            <li className="menu_list">Ferramentas</li>
                        </a>
                        <li className="menu_list">
                                <Link to="/Login">Login</Link>
                        </li>
                        <li className="menu_list">
                            <Link to="/Cadastro">Cadastro</Link>
                        </li>
                        <a href="https://www.google.com/intl/pt-BR/gmail/about/"><li className="menu_list">opustasksuporte@gmail.com</li></a>
                    </div>
                    <div className="abertura">
                      
                            <form action="">
                                <textarea name="sugestão" id="sugerido" cols="50" rows="5" placeholder="Sugestões"></textarea>
                                <input type="button" value="Enviar" />
                                <ul className="redes_sociais">
                                    <li className="instagram"><a href="https://www.instagram.com/opus_task/"><img src="./src/image/instagram.png" alt="foto" width="40px" /></a><p className="rede">@opus_task</p></li>
                                    <li className="instagram"><a href="https://web.whatsapp.com/"><img src="./src/image/whatsapp.png" alt="foto" width="40px" /></a><p className="rede">19 9999-9999</p></li>
                                    <li className="instagram"><a href="https://www.uol.com.br/tilt/facebook/"><img src="./src/image/facebook.png" alt="foto" width="40px" /></a><p className="rede">Opus Task</p></li>
                                </ul>
                            </form>

                        <div className="logo_footer">
                            <img src="./src/image/corujalogo.png" alt="" width="187,5" height="75" className="corujita" />
                        </div>
                        
                    </div>
                </div>
            </footer>
        </>
    )
}

export { Footer };