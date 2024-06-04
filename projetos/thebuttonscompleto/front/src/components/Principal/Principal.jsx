/*Nome: Principal */
/*Autor: Anna */
/*Data da criação:  2023 */
/*Descrição : página inicial da laddingpage */
import './Principal.css'; 
import '../Reset.css'; 

function Principal() {
    return (
        <>
            {/* Elemento principal do componente */}
            <main id="container_menu">
                {/* Div que contém a frase e a descrição */}
                <div className="frase">
                    {/* Imagem da frase com estilo aplicado */}
                    <img src="./src/image/frase.png" alt="" width="2000" className='letra'/>
                    {/* Parágrafo que descreve a empresa e seus objetivos */}
                    <p>
                        A empresa de gerenciamento de tarefas certa para você, com o estilo "List page" que concede ao usuário a
                        melhor maneira de organização. Temos como objetivo manter a sintonia e cumprimento de tarefas, prazos e metas
                        do usuário. Os nossos projetos incluem atingir objetivos com disposição, acompanhar etapas e detalhes do seu dia a
                        dia e trabalho em um só lugar.
                    </p>
                </div>
            </main>
        </>
    );
}

export { Principal }; 