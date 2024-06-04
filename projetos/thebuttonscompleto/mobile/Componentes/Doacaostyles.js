import { StyleSheet } from "react-native"

export default Doacaostyles  = StyleSheet.create({

        // Estilo para o texto do cabeçalho das informações
        informacoesTextHeader: {
            fontSize: 25,
            color: '#fff',
            marginBottom: 70,
            marginTop: 60,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        
        // Estilo para o container principal
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            backgroundColor: '#252942',
    
        },
        
        // Estilo para as informações
        informacoes: {
            backgroundColor: '#546594',
            color: '#fff',
            borderRadius: 20,
        },
        
        // Estilo para os inputs
        input: {
            height: 50,
            borderWidth: 1,
            borderColor: '#C39910',
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 10,
            color: '#fff',
            marginLeft: 10,
            marginRight: 10,
            fontSize: 17,
            backgroundColor: '#34374F'
    
        },
        
        // Estilo para o texto das informações
        informacoesText: {
            color: '#fff', // Mudança na cor do texto de informações
            fontSize: 18,
            padding: 5,
            textAlign: 'center',
            marginBottom: 10
        },
        
        // Estilo para o texto de perguntas
        informacoesTextquestion: {
            color: '#fff', // Mudança na cor do texto de informações
            fontSize: 21,
            padding: 5,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        
        // Estilo para o botão
        button: {
            backgroundColor: '#C39910', // Cor de fundo do botão
            padding: 10,
            borderRadius: 5,
            marginTop: 30,
            width: '30%',
            alignItems: 'center',
            marginLeft: 120,
    
        },
        
        // Estilo para o texto do rodapé das informações
        informacoesTextfooter: {
            textAlign: 'center',
            color: '#fff', // Mudança na cor do texto de informações
            fontSize: 18,
            padding: 5,
        },
        
        // Estilo para o texto dentro do botão
        buttonText: {
            color: '#fff', // Cor do texto dentro do botão
            fontSize: 20
        },
        
        // Estilo para o conteúdo do modal
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        
        // Estilo para o conteúdo do modal
        modalContent: {
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
        },
        
        // Estilo para o texto dentro do modal
        modalText: {
            fontSize: 18,
            marginBottom: 10,
        },
        
        // Estilo para o botão de fechar o modal
        closeButton: {
            color: '#007bff',
            fontWeight: 'bold',
        },
})