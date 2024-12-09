import React, { useState, useEffect } from 'react';
import { Modal, Text, View, Pressable, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação do AsyncStorage

export default function Tarefas({ modalVisible3, setModalVisible3, selectedTask, setSelectedTask, openTodoListModal }) {
  const [email, setEmail] = useState('');
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [color, setColor] = useState('#252942'); // Estado para a cor da tarefa

  // Atualiza o estado da tarefa selecionada quando ela for alterada
  useEffect(() => {
    const fetchTaskStatus = async () => {
      if (selectedTask) {
        setEmail(selectedTask.Descr || '');
        setColor(selectedTask.Cor || '#252942'); // Preenche a cor da tarefa a partir do banco de dados
        const storedStatus = await AsyncStorage.getItem(`task_${selectedTask.ID}_status`);
        setIsTaskCompleted(storedStatus === 'true');
      }
    };
    fetchTaskStatus();
  }, [selectedTask]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'dd/mm/yyyy hh:mm';
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const getRepetitionText = (value) => {
    const repetitionMapping = {
      1: 'Diariamente',
      2: 'Semanalmente',
      3: 'Mensalmente',
      4: 'Anualmente',
      5: 'Nunca',
    };
    return repetitionMapping[value] || 'Não especificado';
  };

  const getCategoryText = (value) => {
    const categoryMapping = {
      1: 'Lazer',
      2: 'Escola',
      3: 'Trabalho',
      4: 'Saúde',
      5: 'Família',
      6: 'Outro',
    };
    return categoryMapping[value] || 'Não especificado';
  };
  const getCategoryImages = (category) => {
    const categoryImages = [
      require('../assets/lazer.png'),  // 1: Lazer
      require('../assets/educ.png'),  // 2: Escola
      require('../assets/trabalho.png'),  // 3: Trabalho
      require('../assets/saude.png'),  // 4: Saúde
      require('../assets/familia.png'),  // 5: Família
    ];
    return categoryImages[category - 1] || require('../assets/semc.png');
  };

  const getNotificationIcon = (value) => {
    return value ? require('../assets/notf_atv.png') : require('../assets/notf_desat.png');
  };

  const handleEdit = () => {
    setModalVisible3(false);
    openTodoListModal(selectedTask); // Chama a função para editar a tarefa
  };

  const toggleTaskCompleted = async () => {
    const newStatus = !isTaskCompleted;
    setIsTaskCompleted(newStatus);
    // Salva o novo estado no AsyncStorage
    if (selectedTask && selectedTask.ID) {
      await AsyncStorage.setItem(`task_${selectedTask.ID}_status`, newStatus.toString());
    }
  };

  const handleSave = async () => {
    if (selectedTask && selectedTask.ID) {
      const novo_status = isTaskCompleted ? 1 : 0;
      try {
        const response = await fetch('http://10.135.60.33:8085/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ID_Tarefa: selectedTask.ID,
            novo_status,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          ToastAndroid.show('Status da tarefa salvo com sucesso!', ToastAndroid.SHORT);
          setModalVisible3(false); // Fechar o modal após salvar
        } else {
          console.error('Erro ao salvar o status da tarefa:', result);
        }
      } catch (error) {
        console.error('Erro ao salvar a tarefa:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setModalVisible3(false);
  };

  const handleDelete = async () => {
    if (selectedTask && selectedTask.ID) {
      try {
        const response = await fetch(`http://10.135.60.33:8085/delete_task?taskId=${selectedTask.ID}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (response.ok) {
          ToastAndroid.show('Tarefa excluída com sucesso!', ToastAndroid.SHORT);
          setModalVisible3(false);
          setSelectedTask(null);
          openTodoListModal(null);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Erro ao excluir a tarefa:', error);
      }
    }
  };

  const handleConfirmDelete = () => setConfirmDeleteVisible(true);
  const handleCloseConfirmDelete = () => setConfirmDeleteVisible(false);
  const handleConfirmDeleteYes = () => {
    handleDelete();
    setConfirmDeleteVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteVisible}
        onRequestClose={handleCloseConfirmDelete}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#546594', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>Deseja realmente excluir esta tarefa?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <Pressable
                style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c39910', borderRadius: 5 }}
                onPress={handleConfirmDeleteYes}
              >
                <Text style={{ fontSize: 17, color: 'white' }}>Sim</Text>
              </Pressable>
              <Pressable
                style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c39910', borderRadius: 5 }}
                onPress={handleCloseConfirmDelete}
              >
                <Text style={{ fontSize: 17, color: 'white' }}>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ borderColor: '#546594', backgroundColor: '#546594', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, marginBottom: 10 }} onPress={handleCloseModal}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <View
                style={{
                  width: 30, // Tamanho do círculo
                  height: 30,
                  borderRadius: 30, // Deixa redondo
                  backgroundColor: color, // Exibe a cor da tarefa
                  marginBottom: 10
                }}
              />
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', flex: 1, marginRight: 10, marginLeft: 5, marginBottom: 10 }}>
                {selectedTask ? selectedTask.Titulo : 'Tarefa'}
              </Text>

              <TouchableOpacity onPress={toggleTaskCompleted} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Icon name={isTaskCompleted ? 'check-box' : 'check-box-outline-blank'} size={24} color={isTaskCompleted ? '#54a847' : '#ccc'} />
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Concluída</Text>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#c39910', width: 355, height: 2 }}></View>


            <View style={{ backgroundColor: '#f4efdf', borderRadius: 20, width: 350, marginTop: 10 }}>
              <Text style={{ color: '#34374f', fontSize: 18, marginTop: 5, marginBottom: 2, marginLeft: 20 }}>Início: {formatDateTime(selectedTask ? selectedTask.Inicio : '')}</Text>

              <Text style={{ color: '#34374f', fontSize: 18, marginTop: 2, marginBottom: 5, marginLeft: 20 }}>Final: {formatDateTime(selectedTask ? selectedTask.Termino : '')}</Text>
            </View>

            <TextInput
              style={{ height: 70, width: 350, backgroundColor: '#f4efdf', borderRadius: 25, padding: 10, marginBottom: 10, marginTop: 20, color: '#34374f' }}
              placeholder="Descrição"
              value={email}
              onChangeText={setEmail}
              multiline={true}
              editable={false}
            />
            <View style={{ backgroundColor: '#f4efdf', borderRadius: 20, width: 350, marginTop: 5, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ color: '#34374f', fontSize: 18, marginLeft: 20 }}>Notificação:</Text>
                <Image source={getNotificationIcon(selectedTask ? selectedTask.Notific : 0)} style={{ width: 30, height: 30 }} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ color: '#34374f', fontSize: 18, marginLeft: 20 }}>Categoria:</Text>
                <Image source={getCategoryImages(selectedTask ? selectedTask.Categoria : 0)} style={{ width: 30, height: 30, marginLeft: 5 }} />

              </View>

              <Text style={{ color: '#34374f', fontSize: 18, marginTop: 4, marginBottom: 10, marginLeft: 20 }}>Repetição: {getRepetitionText(selectedTask ? selectedTask.Repetir : 0)}</Text>
            </View>

            <View style={{ backgroundColor: '#c39910', width: 355, height: 2 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <Pressable
                style={{ width: 80, height: 40, justifyContent: 'center', borderRadius: 5 }}
                onPress={handleConfirmDelete}
              >
                <Image source={require('../assets/delete.png')} style={{ width: 35, height: 35 }} />
              </Pressable>
              <Pressable
                style={{ width: 80, height: 40, justifyContent: 'center', borderRadius: 5, }}
                onPress={handleEdit}
              >
                <Image source={require('../assets/pencil.png')} style={{ width: 35, height: 35 }} />
              </Pressable>
              <Pressable
                style={{ width: 80, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#252942', borderRadius: 5 }}
                onPress={handleSave}
              >
                <Text style={{ color: 'white', fontSize: 17 }}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View >
  );
}