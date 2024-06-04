import { StyleSheet } from 'react-native';

// Estilos para o componente de Tarefa
export default stylesTaf = StyleSheet.create({
    // Estilo principal para o componente
    main: {
        marginTop: 15, // Margem superior de 15 unidades
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
    },
    // Estilo para o botão de adicionar nova tarefa
    btnToDo: {
        alignItems: 'center', // Alinha os itens ao centro horizontalmente
    },
    // Estilo para a imagem do botão
    btnImage: {
        width: 60, // Largura da imagem do botão
        height: 60, // Altura da imagem do botão
    },
    // Estilo para o modal principal
    modalMain: {
        flex: 1, // Ocupa todo o espaço disponível
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
    },
    // Estilo para o modal secundário
    modal: {
        backgroundColor: '#546594', // Cor de fundo do modal
        width: '100%', // Largura total do modal
        height: '100%', // Altura total do modal
        borderRadius: 40, // Borda arredondada do modal
    },
    // Estilo para o container principal
    container: {
        alignItems: 'center', // Alinha os itens ao centro horizontalmente
    },
    // Estilo para a caixa de nome da tarefa
    nameBox: {
        borderBottomWidth: 2, // Largura da borda inferior
        borderBottomColor: '#C39910', // Cor da borda inferior
        marginTop: 10, // Margem superior de 10 unidades
        width: '100%', // Largura total da caixa
    },
    // Estilo para o título do modal
    titleModal: {
        alignSelf: 'center', // Alinha o texto ao centro horizontalmente
        color: 'white', // Cor do texto
        fontSize: 25, // Tamanho da fonte
        fontWeight: 'bold', // Peso da fonte
    },
    // Estilo para o título da tarefa
    titleTarefa: {
        marginTop: 20, // Margem superior de 20 unidades
        width: '90%', // Largura de 90% do container
    },
    // Estilo para o texto do título da tarefa
    txtTitle: {
        color: 'white', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    // Estilo para a caixa do título
    titleBox: {
        backgroundColor: '#252942', // Cor de fundo da caixa
        width: '100%', // Largura total da caixa
        height: 40, // Altura da caixa
    },
    // Estilo para a data da tarefa
    dateTarefa: {
        marginTop: 20, // Margem superior de 20 unidades
        width: '90%', // Largura de 90% do container
    },
    // Estilo para o texto da data
    txtDate: {
        color: 'white', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    // Estilo para o contêiner da data
    dateBoxBtn: {
        backgroundColor: '#252942', // Cor de fundo do contêiner
        width: '100%', // Largura total do contêiner
        height: 40, // Altura do contêiner
    },
    // Estilo para o texto da data interna
    txtDateInt: {
        marginTop: 8, // Margem superior de 8 unidades
        height: '100%', // Altura total do texto
        color: 'white', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    // Estilo para o seletor de cores
    colorPicker: {
        width: 300, // Largura do seletor de cores
        height: 500, // Altura do seletor de cores
        borderRadius: 10, // Borda arredondada do seletor de cores
        marginBottom: 20, // Margem inferior de 20 unidades
    },
    // Estilo para o seletor de hora da tarefa
    hourTarefa: {
        marginTop: 20, // Margem superior de 20 unidades
        display: 'flex', // Exibe os elementos como flexíveis
        flexDirection: 'row', // Organiza os elementos em linha
        width: '90%', // Largura de 90% do container
    },
    // Estilo para o botão de seleção de hora
    btnHour: {
        backgroundColor: '#252942', // Cor de fundo do botão
        height: 40, // Altura do botão
    },
    // Estilo para o texto do botão de seleção de hora
    txtBtnHour: {
        color: 'white', // Cor do texto
        fontSize: 20, // Tamanho da fonte
        marginTop: 8, // Margem superior de 8 unidades
    },
    // Estilo para a hora de início
    hourIni: {
        width: '45%', // Largura de 45%
    },
    // Estilo para o texto da hora de início
    txthourIni: {
        color: 'white', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    // Estilo para a hora de fim
    hourFim: {
        marginLeft: '10%', // Margem esquerda de 10%
        width: '45%', // Largura de 45%
    },
    // Estilo para o texto da hora de fim
    txthourFim: {
        color: 'white', // Cor do texto
        fontSize: 20, // Tamanho da fonte
    },
    // Estilo para a notificação da tarefa
    notiTarefa: {
        width: '90%', // Largura de 90% do container
        display: 'flex', // Exibe os elementos como flexíveis
        flexDirection: 'row', // Organiza os elementos em linha
        marginTop: 20, // Margem superior de 20 unidades
    },
    // Estilo para a bola de notificação
    notifBall: {
        width: 25, // Largura da bola de notificação
        height: 25, // Altura da bola de notificação
        borderRadius: 50, // Borda arredondada da bola de notificação
        borderWidth: 1, // Largura da borda da bola de notificação
        borderColor: 'white', // Cor da borda da bola de notificação
        marginRight: 10, // Margem direita de 10 unidades
    },
    // Estilo para a bola de notificação selecionada
    notifBallSelected: {
        backgroundColor: '#252942', // Cor de fundo da bola de notificação
    },
    // Estilo para o texto da notificação da tarefa
    txtNotifTarefa: {
        color: 'white', // Cor do texto
        fontSize: 18, // Tamanho da fonte
    },
    // Estilo para a descrição da tarefa
    descrTarefa: {
        backgroundColor: '#252942', // Cor de fundo da descrição da tarefa
        marginTop: 20, // Margem superior de 20 unidades
        width: '90%', // Largura de 90% do container
        height: '20%', // Altura de 20% do container
    },
    // Estilo para a repetição da tarefa
    repeatTarefa: {
        marginTop: 20, // Margem superior de 20 unidades
        width: '90%', // Largura de 90% do container
        height: 40, // Altura do container
    },
    // Estilo para o seletor de repetição da tarefa
    picker: {
        height: 50, // Altura do seletor de repetição
        width: '100%', // Largura total do seletor de repetição
        backgroundColor: '#252942', // Cor de fundo do seletor de repetição
        borderRadius: 10, // Borda arredondada do seletor de repetição
        paddingHorizontal: 10, // Preenchimento horizontal de 10 unidades
        marginBottom: 20, // Margem inferior de 20 unidades
    },
    // Estilo para o dropdown do seletor de repetição da tarefa
    dropdown: {
        backgroundColor: '#252942', // Cor de fundo do dropdown
        borderRadius: 10, // Borda arredondada do dropdown
        marginTop: 2, // Margem superior de 2 unidades
    },
    // Estilo para a opção "Não Repetir" do seletor de repetição da tarefa
    pickerItemNone: {
        color: 'white', // Cor do texto da opção
        backgroundColor: '#252942' // Cor de fundo da opção
    },
    // Estilo para a opção "Diariamente" do seletor de repetição da tarefa
    pickerItemDaily: {
        color: 'white', // Cor do texto da opção
        backgroundColor: '#252942' // Cor de fundo da opção
    },
    // Estilo para a opção "Semanalmente" do seletor de repetição da tarefa
    pickerItemWeekly: {
        color: 'white', // Cor do texto da opção
        backgroundColor: '#252942' // Cor de fundo da opção
    },
    // Estilo para a opção "Mensalmente" do seletor de repetição da tarefa
    pickerItemMonthly: {
        color: 'white', // Cor do texto da opção
        backgroundColor: '#252942' // Cor de fundo da opção
    },
    // Estilo para a opção "Anualmente" do seletor de repetição da tarefa
    pickerItemYearly: {
        color: 'white', // Cor do texto da opção
        backgroundColor: '#252942' // Cor de fundo da opção
    },
    // Estilo para o container dos botões
    btnBox: {
        display: 'flex', // Exibe os elementos como flexíveis
        flexDirection: 'row', // Organiza os elementos em linha
        justifyContent: 'space-around', // Distribui o espaço entre os elementos
    },
    // Estilo para o botão de cancelar
    btnCancelar: {
        backgroundColor: '#252942', // Cor de fundo do botão
        padding: 17, // Preenchimento interno de 17 unidades
        color: 'white', // Cor do texto do botão
        fontSize: 17, // Tamanho da fonte do texto do botão
    },
    // Estilo para o botão de salvar
    btnSave: {
        backgroundColor: '#252942', // Cor de fundo do botão
        padding: 17, // Preenchimento interno de 17 unidades
        color: 'white', // Cor do texto do botão
        fontSize: 17, // Tamanho da fonte do texto do botão
    },
});