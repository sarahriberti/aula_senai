import React, { useState } from 'react';
import { Modal, Text, View, Pressable } from 'react-native';



export default function Saira({ modalVisible2, setModalVisible2, navigation }) {

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
              <Pressable style={{ height: 40, width: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={() => navigation.navigate('BoasVindas')}>
                <Text style={{ fontSize: 18, color: 'white' }} >Sim</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>


  );
}
