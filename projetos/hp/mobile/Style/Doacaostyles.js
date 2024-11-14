import { StyleSheet } from "react-native"
export default Doacaostyles = StyleSheet.create({

    informacoesTextHeader: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 70,
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#252942',

    },
    informacoes: {
        backgroundColor: '#546594',
        color: '#fff',
        borderRadius: 20,
    },
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

    informacoesText: {
        color: '#fff', // Mudança na cor do texto de informações
        fontSize: 18,
        padding: 5,
        textAlign: 'center',
        marginBottom: 10
    },
    informacoesTextquestion: {
        color: '#fff', // Mudança na cor do texto de informações
        fontSize: 21,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#C39910', // Cor de fundo do botão
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
        width: '40%',
        alignItems: 'center',
        marginLeft: 100,

    },
    informacoesTextfooter: {
        textAlign: 'center',
        color: '#fff', // Mudança na cor do texto de informações
        fontSize: 18,
        padding: 5,
    },
    buttonText: {
        color: '#fff', // Cor do texto dentro do botão
        fontSize: 20,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        color: '#007bff',
        fontWeight: 'bold',
    },
})