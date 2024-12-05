import { StyleSheet } from 'react-native'

export default stylesTaf = StyleSheet.create({
    main: {
        marginTop: 15,
        justifyContent: 'center',
    },
    btnToDo: {
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
        color: 'white',
        fontSize: 17
    },
    datetimeInicioTarefa: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        marginTop: 10,
    },
    hourIni: {
        marginLeft: 36,
    },
    datetimeTerminoTarefa: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        marginTop: 10,
    },
    txtDate: {
        color: 'white',
        fontSize: 20,
    },
    txtDate2: {
        fontSize: 20, // Tamanho da fonte do texto
        marginRight: 10, // Espaçamento opcional
        color: '#fff', // Cor do texto
    },
    dateBoxBtn: {
        backgroundColor: '#252942',
        width: 150,
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
        marginLeft: 30,
    },
    txtBtnHour: {
        color: 'white',
        fontSize: 20,
        marginTop: 8,
        width: 150,
    },
    txthourIni: {
        color: 'white',
        fontSize: 20,
    },
    hourFim: {
        marginLeft: 36,
    },
    txthourFim: {
        color: 'white',
        fontSize: 20,
    },
    notiTarefa: {
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
        height: '15%',
    },
    categTarefa: {
        marginTop: 20,
        width: '90%',
        height: 50,
        backgroundColor: '#252942',
    },
    pickerCateg: {
        height: 50,
        width: '100%',
        backgroundColor: '#252942',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    pickerItemFun: {
        color: 'white', // Cor desejada para a opção "Lazer"
        backgroundColor: '#252942'
    },
    pickerItemStudy: {
        color: 'white', // Cor desejada para a opção "Estudo"
        backgroundColor: '#252942'
    },
    pickerItemWork: {
        color: 'white', // Cor desejada para a opção "Trabalho"
        backgroundColor: '#252942'
    },
    pickerItemHealth: {
        color: 'white', // Cor desejada para a opção "Saúde"
        backgroundColor: '#252942'
    },
    pickerItemFamily: {
        color: 'white', // Cor desejada para a opção "Família"
        backgroundColor: '#252942'
    },
    pickerItemOther: {
        color: 'white', // Cor desejada para a opção "Outro"
        backgroundColor: '#252942'
    },
    repeatTarefa: {
        marginTop: 20,
        width: '90%',
        height: 50,
        backgroundColor: '#252942',
    },
    pickerRepeat: {
        height: 50,
        width: '100%',
        backgroundColor: '#252942',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dropdown: {

        borderRadius: 10,
        marginTop: 2, // Ajuste conforme necessário
    },
    pickerItemNone: {
        color: 'white', // Cor desejada para a opção "Nunca"
        backgroundColor: '#252942'
    },
    pickerItemDaily: {
        color: 'white', // Cor desejada para a opção "Diariamente"
        backgroundColor: '#252942'
    },
    pickerItemWeekly: {
        color: 'white', // Cor desejada para a opção "Semanalmente"
        backgroundColor: '#252942'
    },
    pickerItemMonthly: {
        color: 'white', // Cor desejada para a opção "Mensalmente"
        backgroundColor: '#252942'
    },
    pickerItemYearly: {
        color: 'white', // Cor desejada para a opção "Anualmente"
        backgroundColor: '#252942'
    },
    btnBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    btnCancelar: {
        backgroundColor: '#252942',
        padding: 17,
        color: 'white',
        fontSize: 17,
        marginRight: 100
    },
    btnSave: {
        backgroundColor: '#252942',
        padding: 17,
        color: 'white',
        fontSize: 17,
    },
    descrCampo: {
        color: 'white',
        fontSize: 17
    },
    colorPickerContainer: {
        position: 'absolute',
        top: '20%',                       // Mantém o container um pouco abaixo do topo
        left: 10,                          // Ajuste para um pequeno espaço da borda esquerda
        right: 20,                         // Ajuste para um pequeno espaço da borda direita
        backgroundColor: '#546594',        // Cor de fundo branca para o modal
        borderRadius: 15,                  // Bordas arredondadas
        shadowColor: '#000',               // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Definição da sombra
        shadowOpacity: 0.3,                // Transparência da sombra
        shadowRadius: 4,                   // Raio da sombra
        elevation: 5,                      // Elevação para dispositivos Android
        width: '90%',                      // Largura do modal
        height: '50%',                     // Altura do modal
        padding: 20,
        zIndex: 1000,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',              // Alinha as bolinhas horizontalmente
        justifyContent: 'space-between',   // Espaço entre as bolinhas
        alignItems: 'center',              // Alinha as bolinhas no centro verticalmente
        flexWrap: 'wrap',                  // Permite que as bolinhas se ajustem se necessário
        top: '15%'                         // Ajuste para garantir que o layout não desça muito
    },

    closeButtonImage: {
        width: 15,
        height: 15,
        marginBottom: 30
    },
    colorCircle: {
        width: 30, // Largura da bola
        height: 30, // Altura da bola
        borderRadius: 15, // Faz a bola ficar redonda
        borderWidth: 1, // Borda para destaque
        borderColor: '#ccc', // Cor da borda
    },
    row: {
        flexDirection: 'row', // Coloca os elementos lado a lado
        alignItems: 'center', // Centraliza verticalmente
        gap: 10, // Espaçamento entre os elementos
        marginTop: 10,
        marginRight: 290,
        marginBottom: 10
    },
});