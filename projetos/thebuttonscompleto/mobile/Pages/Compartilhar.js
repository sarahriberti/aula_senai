import React, { useState } from 'react'; 
import { Modal, Text, View, Pressable, TextInput } from 'react-native'; 


export default function Compartilho({ modalVisible, setModalVisible }) {
    const [email, setEmail] = useState(''); // Define o estado para o email
    const [selectedOption, setSelectedOption] = useState(null); // Define o estado para a opção selecionada

    // Função para lidar com a seleção de opções
    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Atualiza a opção selecionada
    };

    // Renderiza o componente Modal
    return (
        <Modal
            animationType="slide" // Define o tipo de animação do modal
            transparent={true} // Define se o modal será transparente
            visible={modalVisible} // Define se o modal está visível
            onRequestClose={() => setModalVisible(false)} // Função chamada quando o modal é fechado
        >
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}> // View principal do modal com estilo
                <View style={{ borderColor: '#546594', backgroundColor: '#546594', padding: 20, borderRadius: 10 }}> // View do conteúdo do modal com estilo
                    <Text style={{ fontSize: 25, color: 'white', borderBottomWidth: 5, borderColor: '#546594' }}>Compartilhar calendário</Text> // Texto do título
                    <View style={{ borderBottomWidth: 3, width: 260, borderColor: '#C39910', marginVertical: 10 }} /> // Linha separadora estilizada
                    <Text style={{ color: '#fff', fontSize: 18 }}>E-mail:</Text> // Texto para o campo de email
                    <TextInput
                        style={{ padding: 10, backgroundColor: '#f4efdf', borderRadius: 10 }} // Estilo do campo de entrada de email
                        placeholder='Email' // Placeholder do campo de email
                        value={email} // Valor do campo de email
                        onChangeText={setEmail} // Função chamada ao mudar o texto do campo de email
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}> // View para a primeira opção de seleção com estilo
                        <Pressable
                            onPress={() => handleOptionSelect('option1')} // Função chamada ao pressionar a opção 1
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: selectedOption === 'option1' ? '#C39910' : '#fff', // Muda a cor da borda se a opção estiver selecionada
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                                backgroundColor: selectedOption === 'option1' ? '#C39910' : 'transparent', // Muda a cor do fundo se a opção estiver selecionada
                            }}
                        >
                            {selectedOption === 'option1' && <Text style={{ color: 'white' }}>✓</Text>} // Mostra o ícone de seleção se a opção estiver selecionada
                        </Pressable>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Pode editar</Text> // Texto da opção 1
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}> // View para a segunda opção de seleção com estilo
                        <Pressable
                            onPress={() => handleOptionSelect('option3')} // Função chamada ao pressionar a opção 3
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: selectedOption === 'option3' ? '#C39910' : '#fff', // Muda a cor da borda se a opção estiver selecionada
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                                backgroundColor: selectedOption === 'option3' ? '#C39910' : 'transparent', // Muda a cor do fundo se a opção estiver selecionada
                            }}
                        >
                            {selectedOption === 'option3' && <Text style={{ color: 'white' }}>✓</Text>} // Mostra o ícone de seleção se a opção estiver selecionada
                        </Pressable>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Pode visualizar</Text> // Texto da opção 3
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}> // View para os botões de ação com estilo
                        <Pressable
                            style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C39910', borderRadius: 5 }} // Estilo do botão "Compartilhar"
                            onPress={() => setModalVisible(false)} // Função chamada ao pressionar o botão "Compartilhar"
                        >
                            <Text style={{ fontSize: 17, color: 'white' }}>Compartilhar</Text> // Texto do botão "Compartilhar"
                        </Pressable>
                        <Pressable
                            style={{ height: 40, width: 110, justifyContent: 'center', alignItems: 'center', backgroundColor: '#34374F', borderRadius: 5 }} // Estilo do botão "Cancelar"
                            onPress={() => setModalVisible(false)} // Função chamada ao pressionar o botão "Cancelar"
                        >
                            <Text style={{ fontSize: 17, color: 'white' }}>Cancelar</Text> // Texto do botão "Cancelar"
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}