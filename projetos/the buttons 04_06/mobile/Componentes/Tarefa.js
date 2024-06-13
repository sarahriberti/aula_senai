import React, { useState } from 'react';
import { Modal, Text, View, Pressable, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Tarefas({ modalVisible3, setModalVisible3, navigation, openTodoListModal }) {
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false); // Estado para controlar se a tarefa foi concluída
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleEditar = () => {
    setModalVisible3(false);
    openTodoListModal();
  };

  const toggleTaskCompleted = () => {
    setIsTaskCompleted(!isTaskCompleted);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
   

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3 || modalVisible}
        onRequestClose={() => {
          setModalVisible3(false);
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ borderColor: '#546594', backgroundColor: '#546594', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => { setModalVisible3(false); setModalVisible(false); }}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginRight: 90 }}>Dentista</Text>
              <TouchableOpacity onPress={toggleTaskCompleted} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -30 }}>
                <Icon name={isTaskCompleted ? 'check-box' : 'check-box-outline-blank'} size={24} color={isTaskCompleted ? '#54a847' : '#ccc'} />
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Tarefa Concluída</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, color: 'white', borderBottomWidth: 2, borderColor: '#546594', fontWeight: 'bold', marginRight: 225 }}>15/03</Text>

            <View style={{ borderBottomWidth: 3, width: 350, borderColor: '#C39910', marginVertical: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', padding: 5, marginRight: 200 }}>Início: 13:30</Text>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', padding: 5, marginRight: 180 }}>Término: 14:30</Text>
            <TextInput
              style={{ height: 80, width: 330, backgroundColor: '#f4efdf', borderRadius: 25 }}
              placeholder='Descrição'
              value={email}
              onChangeText={setEmail}
            />
            <View style={{ borderBottomWidth: 3, width: 350, borderColor: '#C39910', marginVertical: 10, padding: 5 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <Pressable style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={handleEditar}>
                <Text style={{ fontSize: 17, color: 'white' }}>Editar</Text>
              </Pressable>
              <Pressable style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5, marginLeft: 30 }} onPress={() => { setModalVisible3(false); setModalVisible(false); }}>
                <Text style={{ fontSize: 17, color: 'white' }}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
