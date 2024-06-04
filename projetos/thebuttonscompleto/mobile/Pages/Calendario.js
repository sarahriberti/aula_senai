import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Tarefas from '../Componentes/Tarefa';
import ToDoList from '../Componentes/FormularioTaf';

// Configuração de localidade para o calendário
LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

// Definição do componente principal TodoListScreen
const TodoListScreen = () => {
    // Estados para armazenar a data selecionada, as tarefas e a visibilidade do modal
    const [selectedDate, setSelectedDate] = useState('');
    const [tasks, setTasks] = useState({});
    const [modalVisible3, setModalVisible3] = useState(false);

    // Função para lidar com a seleção de um dia no calendário
    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    // Retorno do componente TodoListScreen
    return (
        <View style={styles.container}>
            {/* Componente de calendário */}
            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...Object.keys(tasks).reduce((acc, date) => {
                        acc[date] = { marked: true, dotColor: '#ffcc00' };
                        return acc;
                    }, {}),
                    [selectedDate]: { selected: true, marked: true, selectedColor: '#ffcc00' }
                }}

                theme={{
                    backgroundColor: '#34374f',
                    calendarBackground: '#34374f',
                    textSectionTitleColor: '#ffcc00',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#ffcc00',
                    selectedDayTextColor: '#34374f',
                    todayTextColor: '#ffcc00',
                    dayTextColor: '#ffffff',
                    textDisabledColor: 'gray',
                    dotColor: '#ffcc00',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#ffcc00',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: '#ffcc00',
                    indicatorColor: '#ffcc00',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 16,
                    'stylesheet.calendar.header': {
                        week: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#c39910',
                            borderWidth: 1,
                            borderColor: '#efcd5e',
                            height: 35,
                            width: 400,


                        },
                        dayHeader: {

                            paddingTop: 5,
                            color: 'black',
                            textAlign: 'center',
                            fontSize: 16,

                            borderWidth: 1,
                            borderColor: '#efcd5e',
                            width: 57,

                        },
                        monthText: {
                            color: '#ffcc00',
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                        arrow: {
                            padding: 10,
                        },
                    },
                    'stylesheet.day.basic': {
                        base: {
                            width: 60,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#34374f',
                            borderWidth: 1.5, // Adiciona a borda para as linhas de separação
                            borderColor: '#ffcc00', // Cor das linhas de separação
                            marginBottom: -15,
                        },
                        text: {
                            fontSize: 16,
                            color: '#ffffff',
                            backgroundColor: 'transparent',
                        },
                        selected: {
                            backgroundColor: '#ffcc00',

                        },
                        today: {

                            borderRadius: 0,
                        },
                    },
                }}

            />

            {/* Caixa de exibição de tarefas */}
            <View style={styles.caixa_tarefas}>
                {/* Lista de tarefas para um dia específico */}
                <Text style={styles.TextHeader}>QUINTA - 07/05/2024</Text>
                <Pressable style={styles.Tarefa} onPress={() => setModalVisible3(true)}>
                    <Text style={styles.Text} >Dentista</Text>
                </Pressable>
                <Pressable style={styles.Tarefa} onPress={() => setModalVisible3(true)}>
                    <Text style={styles.Text}>Aniversario</Text>
                </Pressable>
                <Pressable style={styles.Tarefa} onPress={() => setModalVisible3(true)}>
                    <Text style={styles.Text}>Espanhol</Text>
                </Pressable>
            </View>

            {/* Componente de formulário para adicionar tarefas */}
            <Tarefas modalVisible3={modalVisible3} setModalVisible3={setModalVisible3} />

            {/* Componente de lista de tarefas */}
            <ToDoList />

        </View>
    );
}
const styles = StyleSheet.create({
    // Estilo para um componente de teste, com altura de 200 e cor de fundo vermelha
    teste: {
        height: 200,
        backgroundColor: 'red',
    },
    // Estilo para o container principal, com flexível para ocupar todo o espaço disponível,
    // cor de fundo e preenchimento específicos, e margem superior de 0
    container: {
        flex: 1,
        backgroundColor: '#34374f',
        padding: 20,
        marginTop: 0,
    },
    // Estilo para o contêiner de entrada de tarefa, com preenchimento horizontal e margem vertical
    taskInputContainer: {
        paddingHorizontal: 20,
        marginVertical: 25,
    },
    // Estilo para a entrada de texto, com cor e largura da borda especificadas
    input: {
        borderColor: '#ffcc00',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        color: '#ffffff',
    },
    // Estilo para o texto do seletor de tempo, com preenchimento vertical e cor especificados
    timePickerText: {
        paddingVertical: 10,
        color: '#ffcc00',
    },
    // Estilo para o contêiner de tarefa, com borda inferior e cor específicas
    taskContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ffcc00',
    },
    // Estilo para o título da tarefa, com tamanho de fonte, peso e cor especificados
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    // Estilo para a descrição da tarefa, com tamanho de fonte e cor especificados
    taskDescription: {
        fontSize: 14,
        color: '#d9e1e8',
    },
    // Estilo para a categoria da tarefa, com tamanho de fonte e cor especificados
    taskCategory: {
        fontSize: 14,
        color: '#7fffd4',
    },
    // Estilo para o tempo da tarefa, com tamanho de fonte e cor especificados
    taskTime: {
        fontSize: 14,
        color: '#ff6347',
    },
    // Estilo para o item de tarefa, com cor de fundo, preenchimento, borda arredondada,
    // margem superior e inferior e largura especificadas
    Tarefa: {
        backgroundColor: '#252942',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        width: 400,
    },
    // Estilo para o texto, com cor e peso da fonte especificados
    Text: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    // Estilo para a caixa de tarefas, com margem superior, cor de fundo e borda arredondada especificadas
    caixa_tarefas: {
        marginTop: 10,
        backgroundColor: '#546594',
        borderRadius: 10,
        padding: 5,
    },
    // Estilo para o cabeçalho de texto, com cor, alinhamento e peso da fonte especificados
    TextHeader: {
        color: 'gold',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    // Estilo para o botão, com margem superior, borda e raio de borda especificados
    button: {
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 20,
    }
});

// Exportação dos estilos definidos
export default styles;
