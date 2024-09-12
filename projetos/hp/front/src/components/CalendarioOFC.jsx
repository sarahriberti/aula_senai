/*Nome: Calendário geral */
/*Data da criação: outubro de 2023 */
/*Descrição : Neste componente se trata a função de 'chamar' os componentes, nessa situação a pagina de calendário */
/*Observações : Este documento contém o import de um CSS corresponde exclusivamente ap componente, e também o importe dos componentes de tarefa,
calendário e o menu lateral  */
import CalendarioOFC from "./Calendar/Calendario"
import './Calendario.css'
import MenuLateral from "./Menu_Lateral"
import 'bootstrap/dist/css/bootstrap.min.css'
/*Fim das importações*/

/*Inicia o calendário*/
function Calendario() {
    return (
        <div className="container">
            {/*Div que se tem dentro dela os links para os componentes do menu lateral, calendar e tarefa */}
            <div className="menu-box">
                <MenuLateral />
            </div>
            <div className="calendar-box">
                <CalendarioOFC />
            </div>
        </div>
    )
}
export default Calendario;
/*Termina o calendário*/