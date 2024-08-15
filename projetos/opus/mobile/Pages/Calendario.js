import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Tarefas from '../Componentes/Tarefa';
import FormularioTaf from '../Componentes/FormularioTaf';

// Configuração de localidade
LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const TodoListScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Definir a data atual como valor inicial
  const [tasks, setTasks] = useState([]);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return ''; // Retorna vazio se dateString for inválido

    const date = new Date(dateString);
    const daysOfWeek = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek} - ${day}/${month}/${year}`;
  };

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]); // Adiciona a nova tarefa à lista
  };

  const openTodoListModal = (task) => {
    setSelectedTask(task);
    setModalVisible3(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            ...tasks.reduce((acc, task) => {
              if (task.data) {
                acc[task.data] = { marked: true, dotColor: '#546594' };
              }
              return acc;
            }, {}),
            [selectedDate]: { selected: true, marked: true, selectedColor: '#ffcc00' }
          }}
          theme={{
            backgroundColor: '#34374f',
            calendarBackground: '#34374f',
            textSectionTitleColor: '#ffcc00',
            selectedDayBackgroundColor: '#ffcc00',
            selectedDayTextColor: '#34374f',
            todayTextColor: '#ffcc00',
            dayTextColor: '#ffffff',
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
                borderWidth: 1.5,
                borderColor: '#ffcc00',
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
          <Text style={styles.TextHeader}>
            {getFormattedDate(selectedDate)}
          </Text>
          {tasks
            .filter(task => task.data === selectedDate)
            .map((task, index) => (
              <Pressable
                key={index}
                style={[styles.Tarefa, { backgroundColor: task.cor || '#252942' }]}
                onPress={() => openTodoListModal(task)}
              >
                <Text style={styles.Text}>{task.titulo}</Text>
              </Pressable>
            ))}
        </View>
        <Tarefas
          modalVisible3={modalVisible3}
          setModalVisible3={setModalVisible3}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          openTodoListModal={() => setModalVisible4(true)}
        />
        <FormularioTaf
          isModalVisible4={isModalVisible4}
          setModalVisible4={setModalVisible4}
          onAddTask={handleAddTask}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34374f',
    padding: 20,
    marginTop: 0,
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
});

export default TodoListScreen;
