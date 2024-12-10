import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable,TouchableOpacity,Image} from 'react-native';
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
        const response = await fetch(`http://10.135.60.28:8085/tasks?userId=${userId}&date=${localDate}`);
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
        const id = await AsyncStorage.getItem('id');
        console.log('busca async id', id);
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
  }, [userId, selectedDate]);

  useEffect(() => {
    const filteredTasks = tasks.filter(
      (task) => moment(task.Inicio).format('YYYY-MM-DD') === selectedDate
    );

    setRenderedTasks(
      filteredTasks.map((task, index) => (
        <Pressable
          key={task.ID || index}
          style={styles.taskContainer}
          onPress={() => openTodoListModal(task)}
        >
          {/* Aqui garantimos que 'task.Cor' será aplicada ou usaremos '#252942' como fallback */}
          <View style={[styles.circleColor, { backgroundColor: task.Cor || '#252942' }]} />
          <Text style={task.Concluida === 1 ? styles.completedText : styles.normalText}>
            {task.Titulo}
          </Text>
        </Pressable>

      ))
    );
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
    // Se for uma tarefa existente, atualize
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === selectedTask.id ? task : t)
      );
    } else {
      // Se for uma nova tarefa, adicione ao estado
      setTasks(prevTasks => [...prevTasks, task]);
    }

    // Fecha o modal
    setModalVisible4(false);

    // Chama a função para recarregar as tarefas imediatamente
    refreshTaskList();  // Aqui é onde a lista será recarregada
  };


  const openTodoListModal = (task) => {
    setSelectedTask(task);
    setModalVisible3(true);
  };

  const refreshTaskList = async () => {
    await fetchTasks(selectedDate);  // Chama a função fetchTasks para recarregar as tarefas
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            ...tasks.reduce((acc, task) => {
              const taskDate = moment(task.Inicio).format('YYYY-MM-DD');

              if (taskDate) {
                if (!acc[taskDate]) {
                  acc[taskDate] = { dots: [] };
                }

                if (!acc[taskDate].dots.find(dot => dot.color === task.Cor)) {
                  acc[taskDate].dots.push({
                    color: task.Cor || '#C0C0C0', // Cor do dot
                    selectedDotColor: task.Cor || '#C0C0C0', // Mesma cor do dot
                  });
                }
              }

              return acc;
            }, {}),
            [selectedDate]: {
              selected: true,
              marked: true,
              dots: tasks
                .filter(task => moment(task.Inicio).format('YYYY-MM-DD') === selectedDate)
                .map(task => ({
                  color: task.Cor || '#C0C0C0',
                  selectedDotColor: task.Cor || '#C0C0C0',
                })),
              selectedColor: '#ffcc00', // Fundo dourado para o dia selecionado
            },
          }}
          markingType={'multi-dot'}
          theme={{
            backgroundColor: '#34374f',
            calendarBackground: '#34374f',
            textSectionTitleColor: '#ffcc00',
            selectedDayBackgroundColor: '#ffcc00',
            selectedDayTextColor: '#34374f',
            todayTextColor: '#ffcc00',
            dayTextColor: '#ffffff',
            dotColor: '#ffcc00',
            selectedDotColor: '#ffcc00',
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
            // Aumentando o tamanho dos dots e adicionando espaçamento
            'stylesheet.dot': {
              dot: {
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 2,
              },
            },
            'stylesheet.calendar.header': {
              week: {
                flexDirection: 'row',
                justifyContent: 'space-between', // Alterado para "space-evenly" para remover o espaçamento entre as colunas
                backgroundColor: '#c39910',
                borderWidth: 1,
                borderColor: '#efcd5e',
                height: 35,
                width: 440, // Ajuste para largura flexível
              },
              dayHeader: {
                paddingTop: 5,
                color: 'black',
                textAlign: 'center',
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#efcd5e',
                width: 62.7, // Ajuste para dividir igualmente os dias da semana
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
                width: 63, // Mantém a largura original dos dias
                height: 63, // Mantém a altura original dos dias
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#34374f',
                borderWidth: 1.5,
                borderColor: '#ffcc00',
                marginBottom: -15, // Ajuste para remover o espaçamento abaixo dos dias
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
            }

          }}
        />
        <View style={styles.caixa_tarefas}>
          <Text style={styles.TextHeader}>
            {getFormattedDate(selectedDate)}
          </Text>
          <ScrollView style={styles.scrollTarefas}>
            {renderedTasks.length === 0 ? (
              <Text style={styles.Text}>Nenhuma tarefa para hoje</Text>
            ) : (
              renderedTasks
            )}
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
          refreshTaskList={refreshTaskList}
        />
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('HelpCalend')}  >
            <Image source={require('../assets/ponto-de-interrogacao.png')}  style={styles.iconAjudaCalend}/>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34374f',
  },
  caixa_tarefas: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#516292',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  iconAjudaCalend:{
    width: 50, // Ajuste o tamanho do ícone aqui
        height: 50, // Ajuste o tamanho do ícone aqu
        left:200,
  },
  TextHeader: {
    color: '#ffcc00',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Text: {
    color: '#ffffff',
    fontSize: 16,
    marginVertical: 5,
  },
  scrollTarefas: {
    maxHeight: 300,
  },
  Tarefa: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#ffffff',
  },
  normalText: {
    color: '#ffffff',
  },
  taskContainer: {
    flexDirection: 'row', // Organiza os elementos lado a lado
    alignItems: 'center', // Alinha verticalmente no centro
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2c3542',
  },
  circleColor: {
    width: 20, // Tamanho do círculo
    height: 20,
    borderRadius: 10, // Deixa redondo
    marginRight: 10, // Espaço entre o círculo e o título
  },
  // Estilo do calendário
  calendar: {
    width: '100%',
    height: 200, // Ajuste a altura do calendário para o tamanho da caixa de tarefa
    marginBottom: 10, // Adiciona um pequeno espaço entre o calendário e a caixa de tarefas
  },

});

export default TodoListScreen;