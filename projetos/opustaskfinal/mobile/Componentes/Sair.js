import React, { useState } from 'react';
import { Modal, Text, View, Pressable ,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Saira({ modalVisible2, setModalVisible2, navigation }) {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('ID_Usu');
      await AsyncStorage.removeItem('nome');
      // Navegue para a tela de boas-vindas após limpar o AsyncStorage
      navigation.navigate('BoasVindas');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar deslogar.');
    }
  };


  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ borderColor: '#546594', backgroundColor: '#546594', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 25, color: 'white', borderBottomWidth: 5, borderColor: '#546594' }}>Deseja realmente sair?</Text>
            <View style={{ borderBottomWidth: 3, width: 260, borderColor: '#C39910', marginVertical: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <Pressable style={{ height: 40, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C39910', borderRadius: 5 }} onPress={() => setModalVisible2(false)}>
                <Text style={{ fontSize: 18, color: 'white' }}>Não</Text>
              </Pressable>
              <Pressable style={{ height: 40, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={handleLogout}>
                <Text style={{ fontSize: 18, color: 'white' }} >Sim</Text>
              </Pressable>
              <TouchableOpacity onPress={() => navigation.navigate('SairHelp')}  >
            <Image source={require('../assets/ponto-de-interrogacao.png')}  style={{ width: 50, // Ajuste o tamanho do ícone aqui
        height: 50, // Ajuste o tamanho do ícone aqui
        position: 'absolute',
        top:560,
        left:50,}}/>
          </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>


  );
}