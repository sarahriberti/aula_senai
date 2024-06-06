import {HeaderLP} from "../components/Header/HeaderLP"
import {Principal} from "../components/Principal/Principal"
import {Sobre} from "../components/Sobre/Sobre"
import {Ferramentas} from  "../components/Ferramentas/Ferramentas"
import { FaleConosco} from "../components/Fale Conosco/Fale_Conosco"
import {Footer} from "../components/Footer/Footer"
 
 export default function Home() {
    return (
    
        <>
        <HeaderLP/>
        <Principal/>
        <Sobre/>
        <Ferramentas/>
        <FaleConosco/>
        <Footer/>



        </>
    )
 }
export {Home};