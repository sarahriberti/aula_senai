
import { StyleSheet } from "react-native"; 

export default Gerenciarstyles = StyleSheet.create({
    background: { // Estilo para o plano de fundo
        backgroundColor: '#252942', // Cor de fundo
        width: '100%', // Largura total
        flex: 1, // Preenchimento do espaço disponível
        alignItems: 'center', // Alinhamento dos itens no centro horizontalmente
        justifyContent: 'center', // Alinhamento dos itens no centro verticalmente
    },
    titlebox: { // Estilo para a caixa de título
        marginTop: 20, // Margem superior
    },
    title: { // Estilo para o título
        color: '#fff', // Cor do texto
        fontWeight: "bold", // Peso da fonte
        fontSize: 30, // Tamanho da fonte
    },
    main: { // Estilo para o conteúdo principal
        backgroundColor: '#546594', // Cor de fundo
        width: '90%', // Largura de 90%
        borderRadius: 50, // Borda arredondada
        alignItems: 'center', // Alinhamento dos itens no centro horizontalmente
    },
    header: { // Estilo para o cabeçalho
        width: '100%', // Largura total
        height: 100, // Altura
        display: 'flex', // Exibição flexível
        flexDirection: 'row', // Direção do fluxo dos itens
        justifyContent: 'center', // Alinhamento dos itens no centro horizontalmente
    },
    perfil: { // Estilo para a imagem do perfil
        marginTop: 5, // Margem superior
        width: 100, // Largura
        height: 100, // Altura
    },
    container: { // Estilo para o contêiner
        borderRadius: 50, // Borda arredondada
        backgroundColor: '#546594', // Cor de fundo
        height: '90%', // Altura de 90%
        width: '100%', // Largura total
    },
    borda: { // Estilo para a borda inferior
        marginTop: 20, // Margem superior
        borderBottomWidth: 3, // Largura da borda inferior
        borderBottomColor: '#C39910', // Cor da borda inferior
    },
    dadosbasicos: { // Estilo para os dados básicos
        width: '93%', // Largura de 93%
        marginTop: 10, // Margem superior
        marginLeft: 30, // Margem esquerda
    },
    password: { // Estilo para a senha
        width: '93%', // Largura de 93%
        marginTop: 20, // Margem superior
        marginLeft: 30, // Margem esquerda
    },
    email: { // Estilo para o email
        width: '93%', // Largura de 93%
        marginTop: 20, // Margem superior
        marginLeft: 30, // Margem esquerda
    },
    telefone: { // Estilo para o telefone
        width: '93%', // Largura de 93%
        marginTop: 20, // Margem superior
        marginLeft: 30, // Margem esquerda
    },
    textNome: { // Estilo para o texto do nome
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    textData: { // Estilo para o texto da data
        marginTop: 10, // Margem superior
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    textActualSenha: { // Estilo para o texto da senha atual
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    textNewSenha: { // Estilo para o texto da nova senha
        marginTop: 10, // Margem superior
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    textConfSenha: { // Estilo para o texto da confirmação de senha
        marginTop: 10, // Margem superior
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    textExEmail: { // Estilo para o texto do email atual
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },

    textNewEmail: { // Estilo para o texto do novo email
        marginTop: 10, // Margem superior
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    textActualTelefone: { // Estilo para o texto do telefone atual
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    textNewTelefone: { // Estilo para o texto do novo telefone
        marginTop: 10, // Margem superior
        color: '#fff', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    input: { // Estilo para a entrada de dados
        marginTop: 10, // Margem superior
        backgroundColor: '#252942', // Cor de fundo
        width: '90%', // Largura de 90%
        height: 50, // Altura de 50
    },
    btnBox: { // Estilo para a caixa de botões
        width: '93%', // Largura de 93%
        marginTop: 20, // Margem superior
        marginLeft: 15, // Margem esquerda
        display: "flex", // Exibição flexível
        flexDirection: 'row', // Direção do fluxo dos itens
        justifyContent: 'space-around', // Alinhamento dos itens com espaço entre eles
    },
    btnSave: { // Estilo para o botão de salvar
        backgroundColor: '#252942', // Cor de fundo
        justifyContent: 'center', // Alinhamento do conteúdo no centro horizontalmente
        alignItems: 'center', // Alinhamento do conteúdo no centro verticalmente
        width: 100, // Largura de 100
        height: 35, // Altura de 35
        marginBottom: 10, // Margem inferior
    },
    btnCancel: { // Estilo para o botão de cancelar
        backgroundColor: '#252942', // Cor de fundo
        justifyContent: 'center', // Alinhamento do conteúdo no centro horizontalmente
        alignItems: 'center', // Alinhamento do conteúdo no centro verticalmente
        width: 100, // Largura de 100
        height: 35, // Altura de 35
        marginBottom: 10, // Margem inferior
    },
    submitTxt: { // Estilo para o texto do botão de envio
        color: '#fff', // Cor do texto
        fontSize: 17, // Tamanho da fonte
    },
});
