import { StyleSheet } from "react-native";

export default Loginstyles = StyleSheet.create({
    background: { // Estilo para o fundo da tela de login
        flex: 1, // Ocupa todo o espaço disponível
        backgroundColor: '#34374F', // Cor de fundo
        alignItems: 'center', // Alinha os itens no centro horizontalmente
        justifyContent: 'center', // Alinha os itens no centro verticalmente
        width:'100%', // Largura de 100%
    },
    containerLogo: { // Estilo para o container do logo
        flex: 1, // Ocupa uma parte do espaço disponível
        justifyContent: 'center', // Alinha os itens no centro verticalmente
    },
    logo: { // Estilo para o logo
        width: 300, // Largura de 300
        height: 150, // Altura de 150
    },
    container: { // Estilo para o container principal
        flex: 2, // Ocupa mais espaço que o container do logo
        width: 380, // Largura de 380
        backgroundColor: '#516292', // Cor de fundo
        color: '#fff', // Cor do texto
        borderRadius: 35, // Borda arredondada
        marginBottom: '10%', // Margem inferior de 10%
        justifyContent: 'center', // Alinha os itens no centro verticalmente
    },
    label: { // Estilo para o label
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
        marginLeft: 20, // Margem esquerda
    },
    inputs: { // Estilo para as entradas de texto
        backgroundColor: '#34374F', // Cor de fundo
        width: '90%', // Largura de 90%
        color: '#fff', // Cor do texto
        marginLeft: 20, // Margem esquerda
        marginBottom: 20, // Margem inferior
        fontSize: 17, // Tamanho da fonte
        borderRadius: 2, // Borda arredondada
        padding: 10, // Preenchimento interno
        alignItems: 'center', // Alinha os itens no centro horizontalmente
    },
    btnSubmit: { // Estilo para o botão de envio
        backgroundColor: '#34374F', // Cor de fundo
        justifyContent: 'center', // Alinha os itens no centro verticalmente
        marginBottom: 15, // Margem inferior
        alignItems: 'center', // Alinha os itens no centro horizontalmente
        width: '40%', // Largura de 40%
        height: 45, // Altura de 45
        borderRadius: 2, // Borda arredondada
    },
    submitTxt: { // Estilo para o texto do botão de envio
        color: '#fff', // Cor do texto
        fontSize: 18, // Tamanho da fonte
    },
    botoes: { // Estilo para os botões inferiores
        display: 'flex', // Exibição flexível
        flexDirection: 'row', // Direção do fluxo dos itens
        justifyContent: 'space-around', // Alinhamento dos itens com espaço ao redor
    },
    textCad: { // Estilo para o texto de cadastro
        color: '#fff', // Cor do texto
        fontSize: 17, // Tamanho da fonte
        textAlign: 'center', // Alinhamento centralizado
    },
    logarCom: { // Estilo para os botões de login social
        width: 75, // Largura de 75
        height: 75, // Altura de 75
        borderRadius: 100, // Borda circular
        borderWidth: 3, // Largura da borda
        borderColor: '#C39910', // Cor da borda
    },
    logarInferior: { // Estilo para a seção de login inferior
        display: 'flex', // Exibição flexível
        flexDirection: 'row', // Direção do fluxo dos itens
        justifyContent: 'space-around', // Alinhamento dos itens com espaço ao redor
    },
    textLogar: { // Estilo para o texto de login
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
        textAlign: 'center', // Alinhamento centralizado
        marginTop: 15, // Margem superior
    },
    scrollViewContent: { // Estilo para o conteúdo da ScrollView
        flexGrow: 1, // Permite que o conteúdo seja rolado
        alignItems: 'center', // Alinha os itens no centro horizontalmente
        justifyContent: 'center', // Alinha os itens no centro verticalmente
      },
});
