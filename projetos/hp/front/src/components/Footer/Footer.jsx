// Importa o estilo CSS para ser aplicado ao componente Footer
import './Footer.css'

// Definição do componente Footer
function Footer() {
    return (
        <>
            {/* Início da seção de rodapé */}
            <footer>
                {/* Container para organizar os elementos do rodapé */}
                <div className="container_footer">
                    {/* Seção de formulário e redes sociais */}
                    <div className="abertura">
                        {/* Formulário para sugestões */}
                        <form action="">
                            <img src="./src/image/frase.png" alt="" width="700" height="200" className='frasinha' />
                            {/* Lista de redes sociais */}
                            <ul className="redes_sociais">
                                <li className="instagram"><a href="https://www.instagram.com/opus_task/"><img src="./src/image/instagram.png" alt="foto" width="40px" /></a><p className="rede">@opus_task</p></li>
                                <li className="instagram"><a href="https://web.whatsapp.com/"><img src="./src/image/whatsapp.png" alt="foto" width="40px" /></a><p className="rede">19 9999-9999</p></li>
                                <li className="instagram"><a href="https://www.uol.com.br/tilt/facebook/"><img src="./src/image/facebook.png" alt="foto" width="40px" /></a><p className="rede">Opus Task</p></li>
                            </ul>
                        </form>
                        {/* Logo do rodapé */}
                    </div>
                </div>
            </footer>
        </>
    )
}
// Exporta o componente Footer para ser utilizado em outras partes do código
export { Footer };