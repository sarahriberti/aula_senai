import React, { useState } from 'react';
import { Modal, Text, View, Pressable } from 'react-native';

// Componente funcional Sair é responsável por exibir um modal de confirmação de saída
export default function Saira({ modalVisible2, setModalVisible2, navigation }) {
  return (
    <View>
      {/* Modal que exibe a confirmação de saída */}
      <Modal
        animationType="slide" // Tipo de animação ao abrir o modal
        transparent={true} // Define se o modal é transparente
        visible={modalVisible2} // Define a visibilidade do modal
        onRequestClose={() => setModalVisible2(false)} // Função chamada quando o modal é fechado
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ borderColor: '#546594', backgroundColor: '#546594', padding: 20, borderRadius: 10 }}>
            {/* Título do modal */}
            <Text style={{ fontSize: 25, color: 'white', borderBottomWidth: 5, borderColor: '#546594' }}>Deseja realmente sair?</Text>
            {/* Linha divisória */}
            <View style={{ borderBottomWidth: 3, width: 260, borderColor: '#C39910', marginVertical: 10 }} />
            {/* Botões de opção */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              {/* Botão "Não" */}
              <Pressable style={{ height: 40, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C39910', borderRadius: 5 }} onPress={() => setModalVisible2(false)}>
                <Text style={{ fontSize: 18, color: 'white' }}>Não</Text>
              </Pressable>
              {/* Botão "Sim" que navega para a tela de login */}
              <Pressable style={{ height: 40, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={() => navigation.navigate('Login')}>
                <Text style={{ fontSize: 18, color: 'white' }} >Sim</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
