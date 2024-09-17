import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Tarefas from '../Componentes/Tarefa';
import FormularioTaf from '../Componentes/FormularioTaf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';

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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState([]);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [userId, setUserId] = useState(null);
  const [renderedTasks, setRenderedTasks] = useState([]);

  const fetchTasks = async (date) => {
    try {
      if (userId) {
        const localDate = moment(date).tz('America/Sao_Paulo').format('YYYY-MM-DD');
        console.log(`Fetching tasks for userId: ${userId} on date: ${localDate}`);
        const response = await fetch(`http://192.168.137.1:8085/tasks?userId=${userId}&date=${localDate}`);
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    const fetchUserDataAndTasks = async () => {
      try {
        const id = await AsyncStorage.getItem('ID_Usu');
        console.log('busca async id', id)
        if (id !== null) {
          setUserId(id);
          await fetchTasks(selectedDate);
        }
      } catch (error) {
        console.error('Erro ao recuperar o ID do usuário ou buscar tarefas:', error);
      }
    };

    fetchUserDataAndTasks();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTasks(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    // Atualiza a lista de tarefas renderizadas sempre que 'tasks' ou 'selectedDate' muda
    const filteredTasks = tasks.filter(task => task.Data === selectedDate);
    setRenderedTasks(filteredTasks.map((task, index) => (
      <Pressable
        key={task.id || index}
        style={[styles.Tarefa, { backgroundColor: task.Cor || '#252942' }]}
        onPress={() => openTodoListModal(task)}
      >
        <Text style={styles.Text}>{task.Titulo}</Text>
      </Pressable>
    )));
  }, [tasks, selectedDate]);

  const handleDayPress = (day) => {
    const localDate = moment(day.dateString).tz('America/Sao_Paulo').format('YYYY-MM-DD');
    setSelectedDate(localDate);
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    const date = moment(dateString).tz('America/Sao_Paulo').toDate();
    const daysOfWeek = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek} - ${day}/${month}/${year}`;
  };

  const handleAddTask = (task) => {
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === selectedTask.id ? task : t)
      );
    } else {
      setTasks(prevTasks => [...prevTasks, task]);
    }
    setModalVisible4(false);
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
              if (task.Data) {
                acc[task.Data] = { marked: true, dotColor: '#546594' };
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
                width: 300,
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
                padding: 1,
              },
            },
            'stylesheet.day.basic': {
              base: {
                width: 50,
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
          <ScrollView style={styles.scrollTarefas}>
            {renderedTasks}
          </ScrollView>
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
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34374f',
    padding: 20,
  },
  caixa_tarefas: {
    marginTop: 10,
    backgroundColor: '#546594',
    borderRadius: 10,
    padding: 5,
    flex: 1,
  },
  scrollTarefas: {
    maxHeight: 150, // Define a altura máxima para permitir o scroll
  },
  TextHeader: {
    color: 'gold',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Tarefa: {
    backgroundColor: '#252942',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  Text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#34374f',
    fontWeight: 'bold',
  },
});

export default TodoListScreen;