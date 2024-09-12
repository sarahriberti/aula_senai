import { StyleSheet } from "react-native";

export default Gerenciarstyles = StyleSheet.create({
    background: {
        backgroundColor: '#252942',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlebox: {
        marginTop: 20,
    },
    title: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 30,
    },
    main: {
        backgroundColor: '#546594',
        width: '90%',
        borderRadius: 50,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    perfil: {
        marginTop: 5,
        width: 100,
        height: 100,
    },
    container: {
        borderRadius: 50,
        backgroundColor: '#546594',
        height: '90%',
        width: '100%',
    },
    borda: {
        marginTop: 20,
        borderBottomWidth: 3,
        borderBottomColor: '#C39910',
    },
    dadosbasicos: {
        width: '93%',
        marginTop: 10,
        marginLeft: 30,
    },
    contato:{
        width: '93%',
        marginTop: 10,
        marginLeft: 30,
    },
    password: {
        width: '93%',
        marginTop: 20,
        marginLeft: 30,
    },
    email: {
        width: '93%',
        marginTop: 20,
        marginLeft: 30,
    },
    telefone: {
        width: '93%',
        marginTop: 20,
        marginLeft: 30,
    },
    textNome:{
        color: '#fff',
        fontSize: 20,
    },
    textData:{
        marginTop: 10,
        color: '#fff',
        fontSize: 20,
    },
    textActualSenha: {
        color: '#fff',
        fontSize: 20,
    },
    textNewSenha: {
        marginTop: 10,
        color: '#fff',
        fontSize: 20,
    },
    textConfSenha: {
        marginTop: 10,
        color: '#fff',
        fontSize: 20,
    },
    textExEmail: {
        color: '#fff',
        fontSize: 20,
    },
    textEmail: {
        marginTop: 10,
        color: '#fff',
        fontSize: 20,
    },
    textActualTelefone:{
        color: '#fff',
        fontSize: 20,
    },
    textNewTelefone:{
        marginTop: 10,
        color: '#fff',
        fontSize: 20,
    },
    input: {
        marginTop: 10,
        backgroundColor: '#252942',
        width: '90%',
        height: 50,
        color: '#fff',
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize:20,
    },
    btnBox: {
        width: '93%',
        marginTop: 20,
        marginLeft: 15,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnSave: {
        backgroundColor: '#C39910',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 35,
        borderRadius:90,
        fontSize: 20,
        color:'#fff',
        marginLeft:150,
        textAlign:'center',
        marginTop:20,
        marginBottom:20
    },
    submitTxt: {
        color: '#fff',
        fontSize: 17,
    },
    textEsqueciSenha:{
        color: '#fff',
        fontSize: 17,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252942',
        width: '90%',
        height: 50,
        color: '#fff',
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    inputField: {
        flex: 1,
        color: '#fff',
    },
    iconWrapper: {
        paddingHorizontal: 10,
    },
});