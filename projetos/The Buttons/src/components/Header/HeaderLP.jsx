import { Link } from 'react-router-dom';
import './HeaderLP.css'

function HeaderLP() {
    return (
        <>

            <header>
                <nav id="menu">
                    <ul class="inicio">
                        <a href="">
                            <li className="menu_header">Home</li>
                        </a>

                        <a href="#sobre">
                            <li className="menu_header">Sobre</li>
                        </a>

                        <a href="#comousar">
                            <li className="menu_header">Ferramentas</li>
                        </a>
                        
                            <li className="login">
                                <Link to="/Login">Login</Link>
                            </li>
                    
                    </ul>





                </nav>
                <div id="logo"><img src="./src/image/corujalogo.png" alt="coruja" width="250" height="100" /></div>
            </header>
        </>
    )
}

export { HeaderLP };