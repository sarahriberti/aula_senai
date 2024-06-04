import { StyleSheet } from "react-native"; 
export default Cadastrostyles = StyleSheet.create({
    background: { // Estilo para o plano de fundo
        flex: 1,
        backgroundColor: '#34374f', // Cor de fundo
        alignItems: 'center', // Alinhamento dos itens no centro horizontalmente
        justifyContent: 'center', // Alinhamento dos itens no centro verticalmente
        width: '100%', // Largura total
    },
    containerlogo: { // Estilo para o contêiner do logo
        flex: 0.5, // Proporção em relação ao espaço disponível
        marginBottom: 30, // Margem inferior
        justifyContent: 'center', // Alinhamento dos itens no centro verticalmente
    },
    logo: { // Estilo para o logo
        width: 400, // Largura
        height: 150, // Altura
    },
    container: { // Estilo para o contêiner principal
        flex: 1, // Preenchimento do espaço disponível
        width: '90%', // Largura de 90%
        backgroundColor: '#546594', // Cor de fundo
        borderRadius: 10, // Borda arredondada
    },
    inputs: { // Estilo para os campos de entrada
        backgroundColor: '#34374f', // Cor de fundo
        color: '#fff', // Cor do texto
        width: "90%", // Largura de 90%
        marginBottom: 20, // Margem inferior
        fontSize: 18, // Tamanho da fonte
        padding: 10, // Preenchimento interno
        marginLeft: 10, // Margem esquerda
    },
    btnSubmit: { // Estilo para o botão de envio
        backgroundColor: '#252942', // Cor de fundo
        justifyContent: 'center', // Alinhamento dos itens no centro verticalmente
        marginBottom: 10, // Margem inferior
        alignItems: 'center', // Alinhamento dos itens no centro horizontalmente
        width: '90%', // Largura de 90%
        height: 45, // Altura
        borderRadius: 5, // Borda arredondada
        marginLeft: 12, // Margem esquerda
    },
    submitTxt: { // Estilo para o texto do botão de envio
        color: 'white', // Cor do texto
        fontSize: 18, // Tamanho da fonte
    },
    Txt: { // Estilo para texto genérico
        marginLeft: 55, // Margem esquerda
        color: 'white', // Cor do texto
        marginBottom: 12, // Margem inferior
        fontSize: 18, // Tamanho da fonte
    },
    cores: { // Estilo para texto de cores
        color: 'white', // Cor do texto
        fontSize: 17, // Tamanho da fonte
        marginLeft: 10, // Margem esquerda
    },
    facebook: { // Estilo para o ícone do Facebook
        width: 60, // Largura
        height: 60, // Altura
        borderRadius: 30, // Borda arredondada
        marginRight: 80, // Margem direita
        borderWidth: 2, // Largura da borda
        borderColor: "#C39910", // Cor da borda
    },
    google: { // Estilo para o ícone do Google
        width: 60, // Largura
        height: 60, // Altura
        borderRadius: 29, // Borda arredondada
        paddingLeft: 0, // Preenchimento à esquerda
        borderWidth: 2, // Largura da borda
        borderColor: "#C39910", // Cor da borda
    },
    footerlogos: { // Estilo para o contêiner dos ícones de redes sociais no rodapé
        display: 'flex', // Exibição flexível
        flexDirection: 'row', // Direção do fluxo dos itens
        alignItems: 'center', // Alinhamento dos itens no centro verticalmente
        justifyContent: 'center', // Alinhamento dos itens no centro horizontalmente
    },
    scrollViewContent: { // Estilo para o conteúdo da visualização de rolagem
        flexGrow: 1, // Permite que o componente cresça conforme necessário
        alignItems: 'center', // Alinhamento dos itens no centro horizontalmente
        justifyContent: 'center', // Alinhamento dos itens no centro verticalmente
    },
});
