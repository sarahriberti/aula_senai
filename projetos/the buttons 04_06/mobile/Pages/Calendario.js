import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Tarefas from '../Componentes/Tarefa';
import ToDoList from '../Componentes/FormularioTaf';

// Configuração de localidade (opcional)
LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const TodoListScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState({});
  const [modalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const openTodoListModal = () => {
    setModalVisible3(false);
    setModalVisible4(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
        <View style={styles.caixa_tarefas}>
          <Text style={styles.TextHeader}>QUINTA - 07/05/2024</Text>
          <Pressable style={styles.Tarefa} onPress={() => setModalVisible3(true)}>
            <Text style={styles.Text}>Dentista</Text>
          </Pressable>
          <Pressable style={styles.Tarefa} onPress={() => setModalVisible3(true)}>
            <Text style={styles.Text}>Aniversario</Text>
          </Pressable>
          <Pressable style={styles.Tarefa} onPress={() => setModalVisible3(true)}>
            <Text style={styles.Text}>Espanhol</Text>
          </Pressable>
        </View>
        <Tarefas
          modalVisible3={modalVisible3}
          setModalVisible3={setModalVisible3}
          navigation={navigation}
          openTodoListModal={openTodoListModal}
        />
        <ToDoList isModalVisible4={isModalVisible4} setModalVisible4={setModalVisible4} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  teste: {
    height: 200,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#34374f',
    padding: 20,
    marginTop: 0,
  },
  taskInputContainer: {
    paddingHorizontal: 20,
    marginVertical: 25,
  },
  input: {
    borderColor: '#ffcc00',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    color: '#ffffff',
  },
  timePickerText: {
    paddingVertical: 10,
    color: '#ffcc00',
  },
  taskContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffcc00',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  taskDescription: {
    fontSize: 14,
    color: '#d9e1e8',
  },
  taskCategory: {
    fontSize: 14,
    color: '#7fffd4',
  },
  taskTime: {
    fontSize: 14,
    color: '#ff6347',
  },
  Tarefa: {
    backgroundColor: '#252942',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    width: 400,
  },
  Text: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  caixa_tarefas: {
    marginTop: 10,
    backgroundColor: '#546594',
    borderRadius: 10,
    padding: 5,
  },
  TextHeader: {
    color: 'gold',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 20,
  }
});
export default TodoListScreen;
