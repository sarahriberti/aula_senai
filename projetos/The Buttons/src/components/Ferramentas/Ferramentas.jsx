import './Ferramentas.css'

function Ferramentas() {
    return (
        <>
    
            <section id="comousar">
        <div className="texto_recurso">
            <img src="./src/image/pomo_ouro.png" alt="" width="550"/>

        </div>
        <div className="comousar_item" id="item_1">
            <img src="./src/image/calendario.png" alt="calendario" className="container_comousar"/>
            <p>Calendário</p>
            <p>Serve para marcar os seus compromissos, horários de consulta, além de organizar as atividades do dia da
                forma que mais lhe facilitar.</p>
        </div>
        <div className="comousar_item" id="item_2">
            <img src="./src/image/lembrete.png" alt="lembrete" className="container_comousar"/>
            <p>Lembretes</p>
            <p>Sua utilidade é lhe avisar de suas atividades, como beber água, tomar remédios, entre outras coisas
                importantes que você colocar ele irá te avisar, desse jeito nunca esquecerá de seus afazeres.</p>
        </div>
        <div className="comousar_item" id="item_4">
            <img src="./src/image/festa.png" alt="eventos" className="container_comousar"/>
            <p>Eventos</p>
            <p>Server para você deixar sempre marcado seus eventos, como festas, reuniões, aniversários, viagens e muito
                mais!</p>
        </div>
        <div className="comousar_item" id="item_5">
            <img src="./src/image/lista-de-controle.png" alt="tarefas" className="container_comousar"/>
            <p>Tarefas</p>
            <p>Serve para você organizar as suas tarefas do dia a dia, coloando-as em ordem para poder ter um controle
                do que já fez ou não, ou até mesmo de quanto tempo quer disponibilizar para elas.</p>
        </div>
        <div className="comousar_item" id="item_3">
            <img src="./src/image/caracteristicas.png" alt="personalizar" className="container_comousar"/>
            <p>Personalize o seu</p>
            <p>Este é o mais interessante, serve para você fazer suas próprias atividades, compromissos, eventos e
                lembretes, sem precisar usar as opções já existentes na plataforma. Pode modificar cores, formatos e
                muito mais! Você pode colocar sons do armazenamento do seu próprio dispositivo, alterar papel de
                parede, cores de ícones, como o item será listado. São diversas opções para você escolher, assim terá
                sua rotina muito mais organizada e de forma própria, com o seu próprio estilo! Além disso, poderá baixar
                layouts de outros usuários que disponibilizarem os que criaram, e você também poderá compartilhar o seu
                com o mundo!</p>
        </div>
    </section>
        </>
    )
}

export {Ferramentas};