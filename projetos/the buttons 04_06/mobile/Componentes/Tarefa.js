import React, { useState } from 'react';
import { Modal, Text, View, Pressable, TextInput,  } from 'react-native';

export default function Tarefas({modalVisible3, setModalVisible3, navigation}) {
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

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
            <Text style={{ fontSize: 25, color: 'white', borderBottomWidth:5, borderColor:'#546594', fontWeight: 'bold' }}>Dentista</Text>
            <Text style={{ fontSize: 20, color: 'white', borderBottomWidth:5, borderColor:'#546594', fontWeight: 'bold' }}>15/03</Text>

            <View style={{ borderBottomWidth: 3,width:350, borderColor: '#C39910' , marginVertical: 10 }} />
            <Text style={{color:'#fff', fontSize:18, fontWeight: 'bold',padding:5}}>Início: 13:30</Text>
            <Text style={{color:'#fff', fontSize:18, fontWeight: 'bold', padding:5}}>Término: 14:30</Text>
            <TextInput
              style={{padding:30, backgroundColor:'#f4efdf', borderRadius:25}}
              placeholder='Descrição'
              value={email}
              onChangeText={setEmail}
            />
            <View style={{ borderBottomWidth: 3,width:350, borderColor: '#C39910' , marginVertical: 10 , padding: 5}} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <Pressable style={{ height:40, width:110, justifyContent:'center',alignItems:'center', backgroundColor: '#34374F', borderRadius: 5 }}>
                <Text style={{ fontSize: 17, color: 'white' }}>Editar</Text>
              </Pressable>
              <Pressable style={{ height:40, width:110, justifyContent:'center',alignItems:'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={() => setModalVisible3(false)}>
                <Text style={{ fontSize: 17, color: 'white' }}>Excluir</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>
  );
}
