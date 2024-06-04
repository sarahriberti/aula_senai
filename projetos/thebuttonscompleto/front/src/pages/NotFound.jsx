/*Nome: NotFound*/
/*Descrição : Componente que emite uma mensagem de erro caso a página não seja encontrada*/
import React from "react"; 

/*O componente NotFound é uma função que retorna um elemento div contendo uma mensagem de erro 404 e uma mensagem indicando que a página não foi encontrada.*/
const NotFound = props => (
    <div className="NotFound">
        <h1>404</h1> {/* Título indicando o código de erro 404 */}
        <h2>Opssss. Página não encontrada!!!</h2> {/* Mensagem indicando que a página não foi encontrada */}
    </div>
);

export default NotFound;
