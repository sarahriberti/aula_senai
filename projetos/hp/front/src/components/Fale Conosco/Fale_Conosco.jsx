import './Fale_Conosco.css'
/*Nome: Fale_conosco */
/*Autor: Julia */
/*Data da criação: abril de 2023 */
/*Descrição : Neste componente se trata a parte de link para o WhatsApp presente na lading page fixo */
/*Observações : Este documento possui import apenas de css*/
function FaleConosco() {
    return (
        <>
            <div className="fale">
                <div id="butao">
                    <a href="https://www.whatsapp.com/?lang=pt_br">
                        <p>Fale Conosco</p>
                    </a>
                </div>
            </div>
        </>
    )
}

export { FaleConosco };