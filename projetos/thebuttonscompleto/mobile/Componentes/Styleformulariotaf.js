import { StyleSheet } from 'react-native'

export default stylesTaf = StyleSheet.create({
    main: {
        marginTop: 15,
        justifyContent: 'center',
    },
    btnToDo:{
        alignItems: 'center',
    },
    btnImage: {
        width: 60,
        height: 60,
    },
    modalMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#546594',
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    container: {
        alignItems: 'center',
    },
    nameBox: {
        borderBottomWidth: 2,
        borderBottomColor: '#C39910',
        marginTop: 10,
        width: '100%',
    },
    titleModal: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    titleTarefa: {
        marginTop: 20,
        width: '90%',
    },
    txtTitle: {
        color: 'white',
        fontSize: 20,
    },
    titleBox: {
        backgroundColor: '#252942',
        width: '100%',
        height: 40,
    },
    dateTarefa: {
        marginTop: 20,
        width: '90%'
    },
    txtDate: {
        color: 'white',
        fontSize: 20,
    },
    dateBoxBtn: {
        backgroundColor: '#252942',
        width: '100%',
        height: 40,
    },
    txtDateInt: {
        marginTop: 8,
        height: '100%',
        color: 'white',
        fontSize: 20,
    },
    colorPicker: { 
        width: 300, 
        height: 500, 
        borderRadius: 10, 
        marginBottom: 20, 
    }, 
    hourTarefa: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
    },
    btnHour: {
        backgroundColor: '#252942',
        height: 40,
    },
    txtBtnHour: {
        color: 'white',
        fontSize: 20,
        marginTop: 8,
    },
    hourIni: {
        width: '45%',
    },
    txthourIni: {
        color: 'white',
        fontSize: 20,
    },
    hourFim: {
        marginLeft: '10%',
        width: '45%',
    },
    txthourFim: {
        color: 'white',
        fontSize: 20,
    },
    notiTarefa:{
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    notifBall: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 10,
    },
    notifBallSelected: {
        backgroundColor: '#252942',
    },
    txtNotifTarefa: {
        color: 'white',
        fontSize: 18,
    },
    descrTarefa: {
        backgroundColor: '#252942',
        marginTop: 20,
        width: '90%',
        height: '20%',
    },
    repeatTarefa: {
        marginTop: 20,
        width: '90%',
        height: 40,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#252942',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dropdown: {
        backgroundColor: '#252942', // Altere 'blue' para a cor desejada do dropdown
        borderRadius: 10,
        marginTop: 2, // Ajuste conforme necessário
    },
    pickerItemNone: {
        color: 'white', // Cor desejada para a opção "Não Repetir"
        backgroundColor:'#252942'
    },
    pickerItemDaily: {
        color: 'white', // Cor desejada para a opção "Diariamente"
        backgroundColor:'#252942'
    },
    pickerItemWeekly: {
        color: 'white', // Cor desejada para a opção "Semanalmente"
        backgroundColor:'#252942'
    },
    pickerItemMonthly: {
        color: 'white', // Cor desejada para a opção "Mensalmente"
        backgroundColor:'#252942'
    },
    pickerItemYearly: {
        color: 'white', // Cor desejada para a opção "Anualmente"
        backgroundColor:'#252942'
    },
    btnBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnCancelar: {
        backgroundColor: '#252942',
        padding: 17,
        color: 'white',
        fontSize: 17,
    },
    btnSave: {
        backgroundColor: '#252942',
        padding: 17,
        color: 'white',
        fontSize: 17,
    },
});