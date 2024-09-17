import React, { useState, useEffect } from 'react';
import { Modal, Text, View, Pressable, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Tarefas({ modalVisible3, setModalVisible3, selectedTask, setSelectedTask, openTodoListModal }) {
  const [email, setEmail] = useState('');
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // Estado para modal de confirmação

  useEffect(() => {
    if (selectedTask) {
      setEmail(selectedTask.Descr || ''); // Atualizando a descrição da tarefa
      setIsTaskCompleted(selectedTask.isCompleted || false);
    }
  }, [selectedTask]);

  const formatDate = (dateString) => {
    if (!dateString) return 'dd/mm/yyyy';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleEdit = () => {
    setModalVisible3(false);
    openTodoListModal(selectedTask);
  };

  const toggleTaskCompleted = () => {
    setIsTaskCompleted(!isTaskCompleted);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setModalVisible3(false);
  };

  const handleDelete = async () => {
    if (selectedTask && selectedTask.ID) {
      try {
        const response = await fetch(`http://192.168.137.1:8085/delete_task?taskId=${selectedTask.ID}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (response.ok) {
          console.log(result.message); // Mensagem de sucesso
          setModalVisible3(false);
          setSelectedTask(null);
          openTodoListModal(null); // Atualize a lista de tarefas
        } else {
          console.error(result.error); // Mensagem de erro
        }
      } catch (error) {
        console.error('Erro ao excluir a tarefa:', error);
      }
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDeleteVisible(true); // Mostra o modal de confirmação
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteVisible(false); // Fecha o modal de confirmação
  };

  const handleConfirmDeleteYes = () => {
    handleDelete(); // Chama a função de exclusão
    setConfirmDeleteVisible(false); // Fecha o modal de confirmação
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      {/* Modal de confirmação */}
      <Modal 
        animationType="slide"
        transparent={true}
        visible={confirmDeleteVisible}
        onRequestClose={handleCloseConfirmDelete}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#546594', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:'white' }}>Deseja realmente excluir esta tarefa?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <Pressable
                style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c39910', borderRadius: 5 }}
                onPress={handleConfirmDeleteYes}
              >
                <Text style={{ fontSize: 17, color: 'white',}}>Sim</Text>
              </Pressable>
              <Pressable
                style={{ height: 40, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c39910', borderRadius: 5 }}
                onPress={handleCloseConfirmDelete}
              >
                <Text style={{ fontSize: 17, color: 'white',}}>Não</Text>
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
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={handleCloseModal}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', flex: 1, marginRight: 10 }}>
                {selectedTask ? selectedTask.Titulo : 'Tarefa'}
              </Text>
              <TouchableOpacity onPress={toggleTaskCompleted} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={isTaskCompleted ? 'check-box' : 'check-box-outline-blank'} size={24} color={isTaskCompleted ? '#54a847' : '#ccc'} />
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Tarefa Concluída</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 10 }}>
              {selectedTask ? formatDate(selectedTask.Data) : 'dd/mm/yyyy'}
            </Text>
            <View style={{ borderBottomWidth: 3, width: 350, borderColor: '#C39910', marginVertical: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Início: {selectedTask ? selectedTask.Hora_Ini : 'hh:mm'}</Text>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Término: {selectedTask ? selectedTask.Hora_Fin : 'hh:mm'}</Text>
            <TextInput
              style={{ height: 80, width: 330, backgroundColor: '#f4efdf', borderRadius: 25, padding: 10 }}
              placeholder='Descrição'
              value={email} // Exibe a descrição da tarefa
              onChangeText={setEmail}
              multiline={true}
              editable={false} // Desabilita a edição se necessário
            />
            <View style={{ borderBottomWidth: 3, width: 350, borderColor: '#C39910', marginVertical: 10, padding: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <Pressable style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={handleEdit}>
                <Text style={{ fontSize: 17, color: 'white' }}>Editar</Text>
              </Pressable>
              <Pressable style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5, marginLeft: 30 }} onPress={handleConfirmDelete}>
                <Text style={{ fontSize: 17, color: 'white' }}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}