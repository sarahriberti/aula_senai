import { StyleSheet } from "react-native";

export default Loginstyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#34374F',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        height: 150,
    },
    container: {
        flex: 2,
        width: 380,
        backgroundColor: '#516292',
        color: '#fff',
        borderRadius: 35,
        marginBottom: '10%',
        justifyContent: 'center',

    },
    label: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 20,
    },

    btnSubmit: {
        backgroundColor: '#34374F',
        justifyContent: 'center',
        marginBottom: 15,
        alignItems: 'center',
        width: '40%',
        height: 45,
        borderRadius: 2,
    },
    submitTxt: {
        color: '#fff',
        fontSize: 18,
    },
    botoes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    textCad: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
    },
    logarCom: {
        width: 75,
        height: 75,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#C39910',
    },
    logarInferior: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textLogar: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    senhaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#34374f',
        borderRadius: 2,
        width: '90%',

        marginBottom: 20,
        paddingRight: 10, // Espaço para o ícone
        marginLeft: 20,

        fontSize: 17,

    },
    senhaInput: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        padding: 10,

    },

    inputs: {
        backgroundColor: '#34374F',
        width: '90%',
        color: '#fff',
        marginLeft: 20,
        marginBottom: 20,
        fontSize: 17,
        borderRadius: 2,
        padding: 10,
        alignItems: 'center',
    },
});