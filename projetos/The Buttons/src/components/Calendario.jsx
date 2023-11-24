import Tarefa from "./Tarefa"
import Calendar from "./Calendar/Calendar"
import './Calendario.css'
import MenuLateral from "./Menu_Lateral"
import 'bootstrap/dist/css/bootstrap.min.css'


function Calendario () {
    return (
        <div className="abobora">
            <div className='containe'>
                <MenuLateral/>
                <Calendar/>
                <Tarefa />

            </div>
            
        </div>
    )
}
export default Calendario;