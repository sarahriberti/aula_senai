import React, { useState } from 'react';
import { Modal, Text, View, Pressable, TextInput } from 'react-native';

export default function Compartilho({ modalVisible, setModalVisible }) {
    const [email, setEmail] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ borderColor: '#546594', backgroundColor: '#546594', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 25, color: 'white', borderBottomWidth: 5, borderColor: '#546594' }}>Compartilhar calendário</Text>
                    <View style={{ borderBottomWidth: 3, width: 260, borderColor: '#C39910', marginVertical: 10 }} />
                    <Text style={{ color: '#fff', fontSize: 18 }}>E-mail:</Text>
                    <TextInput
                        style={{ padding: 10, backgroundColor: '#f4efdf', borderRadius: 10 }}
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Pressable
                            onPress={() => handleOptionSelect('option1')}
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: selectedOption === 'option1' ? '#C39910' : '#fff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                                backgroundColor: selectedOption === 'option1' ? '#C39910' : 'transparent',
                            }}
                        >
                            {selectedOption === 'option1' && <Text style={{ color: 'white' }}>✓</Text>}
                        </Pressable>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Pode editar</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Pressable
                            onPress={() => handleOptionSelect('option3')}
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: selectedOption === 'option3' ? '#C39910' : '#fff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                                backgroundColor: selectedOption === 'option3' ? '#C39910' : 'transparent',
                            }}
                        >
                            {selectedOption === 'option3' && <Text style={{ color: 'white' }}>✓</Text>}
                        </Pressable>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Pode visualizar</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <Pressable style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C39910', borderRadius: 5 }} onPress={() => setModalVisible(false)}>
                            <Text style={{ fontSize: 17, color: 'white' }}>Compartilhar</Text>
                        </Pressable>
                        <Pressable style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5 }} onPress={() => setModalVisible(false)}>
                            <Text style={{ fontSize: 17, color: 'white' }}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

    );
}