import { HeaderLP } from "../components/Header/HeaderLP"
import { Principal } from "../components/Principal/Principal"
import { Sobre } from "../components/Sobre/Sobre"
import { Ferramentas } from "../components/Ferramentas/Ferramentas"
import { Footer } from "../components/Footer/Footer"
import BotaoAjuda from "../components/BotoesAjuda/BotaoAjuda"

export default function Home() {
    return (

        <>
            <HeaderLP />
            <Principal />
            <Sobre />
            <Ferramentas />
            <BotaoAjuda />
            <Footer />



        </>
    )
}
export { Home };