import React, { useState } from 'react';
import { Modal, Text, View, Pressable, TextInput, Button } from 'react-native';

/* Componente funcional para exibir detalhes de uma tarefa em um modal.*/
export default function Tarefas({ modalVisible3, setModalVisible3, navigation }) {
  // Estado para armazenar o email digitado
  const [email, setEmail] = useState('');
  // Estado para armazenar a opção selecionada
  const [selectedOption, setSelectedOption] = useState(null);

  // Função para lidar com a seleção de opção
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={modalVisible3}
      onRequestClose={() => setModalVisible3(false)}
    >
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ borderColor:'#546594',backgroundColor: '#546594', padding: 20, borderRadius: 10 }}>
          {/* Título da tarefa */}
          <Text style={{ fontSize: 25, color: 'white', borderBottomWidth:5, borderColor:'#546594', fontWeight: 'bold' }}>Dentista</Text>
          {/* Data da tarefa */}
          <Text style={{ fontSize: 20, color: 'white', borderBottomWidth:5, borderColor:'#546594', fontWeight: 'bold' }}>15/03</Text>

          {/* Linha divisória */}
          <View style={{ borderBottomWidth: 3,width:350, borderColor: '#C39910' , marginVertical: 10 }} />

          {/* Horário de início */}
          <Text style={{color:'#fff', fontSize:18, fontWeight: 'bold',padding:5}}>Início: 13:30</Text>
          {/* Horário de término */}
          <Text style={{color:'#fff', fontSize:18, fontWeight: 'bold', padding:5}}>Término: 14:30</Text>

          {/* Campo de entrada para descrição da tarefa */}
          <TextInput
            style={{padding:30, backgroundColor:'#f4efdf', borderRadius:25}}
            placeholder='Descrição'
            value={email}
            onChangeText={setEmail}
          />

          {/* Linha divisória */}
          <View style={{ borderBottomWidth: 3,width:350, borderColor: '#C39910' , marginVertical: 10 , padding: 5}} />

          {/* Botões para editar e excluir */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            {/* Botão para editar */}
            <Pressable style={{ height:40, width:110, justifyContent:'center',alignItems:'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={() => navigation.navigate('FormularioTaf')}>
              <Text style={{ fontSize: 17, color: 'white' }}>Editar</Text>
            </Pressable>
            {/* Botão para excluir */}
            <Pressable style={{ height:40, width:110, justifyContent:'center',alignItems:'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={() => setModalVisible3(false)}>
              <Text style={{ fontSize: 17, color: 'white' }}>Excluir</Text>
            </Pressable>
          </View>
          
        </View>
      </View>
    </Modal>
  );
}
