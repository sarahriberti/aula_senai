import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Doacaostyles from '../Componentes/Doacaostyles';


const PagDoacaoMobile = () => {
    const [donationAmount, setDonationAmount] = useState('0'); // Estado para o valor da doação

    // Função para lidar com a mudança no valor da doação
    const handleDonationChange = (text) => {
        setDonationAmount(text);
    };

    // Estado para os dados do formulário de pagamento
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardholderName: '',
    });

    // Função para lidar com as mudanças nos campos do formulário
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value }); // Atualiza o estado do formulário com a nova entrada
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = () => {
        console.log('Dados do formulário:', formData); // Exibe os dados do formulário no console
        // Reseta os campos do formulário após o envio
        setFormData({
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            cardholderName: '',
        });
        setShowThanksScreen(true); // Mostra a tela de agradecimento ao pressionar o botão "Contribuir"
    };

    const [showThanksScreen, setShowThanksScreen] = useState(false); // Estado para controlar a exibição da tela de agradecimento

    // Renderiza a tela de doação
    return (
        <View style={Doacaostyles.container}> // Container principal com estilos
            <ScrollView>
                <Text style={Doacaostyles.informacoesTextHeader}> CONTRIBUIÇÕES </Text> // Cabeçalho da seção de contribuições

                <View style={Doacaostyles.informacoes}> // Container para as informações da contribuição

                    <Text style={Doacaostyles.informacoesTextquestion}>Por que sua contribuição é importante?</Text> // Título da seção de importância da contribuição
                    <Text style={Doacaostyles.informacoesText}>
                        Sua generosidade nos ajuda a continuar nosso trabalho e aprimorar a cada dia nosso sistema para melhor funcionamento.
                    </Text> // Texto explicativo sobre a importância da contribuição

                    <TextInput
                        style={Doacaostyles.input} // Estilo do campo de entrada
                        placeholder="Número do Cartão" // Placeholder do campo
                        value={formData.cardNumber} // Valor do campo de número do cartão
                        onChangeText={(text) => handleChange('cardNumber', text)} // Função chamada ao mudar o texto do campo
                        placeholderTextColor={'#fff'} // Cor do placeholder
                    />
                    <TextInput
                        style={Doacaostyles.input} // Estilo do campo de entrada
                        placeholder="Data de Expiração" // Placeholder do campo
                        value={formData.expirationDate} // Valor do campo de data de expiração
                        onChangeText={(text) => handleChange('expirationDate', text)} // Função chamada ao mudar o texto do campo
                        placeholderTextColor={'#fff'} // Cor do placeholder
                    />
                    <TextInput
                        style={Doacaostyles.input} // Estilo do campo de entrada
                        placeholder="CVV" // Placeholder do campo
                        value={formData.cvv} // Valor do campo de CVV
                        onChangeText={(text) => handleChange('cvv', text)} // Função chamada ao mudar o texto do campo
                        placeholderTextColor={'#fff'} // Cor do placeholder
                    />
                    <TextInput
                        style={Doacaostyles.input} // Estilo do campo de entrada
                        placeholder="Nome do Titular do Cartão" // Placeholder do campo
                        value={formData.cardholderName} // Valor do campo de nome do titular
                        onChangeText={(text) => handleChange('cardholderName', text)} // Função chamada ao mudar o texto do campo
                        placeholderTextColor={'#fff'} // Cor do placeholder
                    />
                    <TextInput
                        style={Doacaostyles.input} // Estilo do campo de entrada
                        placeholder="Valor da Doação" // Placeholder do campo
                        value={donationAmount} // Valor do campo de valor da doação
                        onChangeText={handleDonationChange} // Função chamada ao mudar o texto do campo
                        keyboardType="numeric" // Define o tipo de teclado como numérico
                    />

                </View>
                <TouchableOpacity style={Doacaostyles.button} onPress={handleSubmit}> // Botão para enviar o formulário
                    <Text style={Doacaostyles.buttonText}>Contribuir</Text> // Texto do botão
                </TouchableOpacity>
                
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={showThanksScreen}
                    onRequestClose={() => setShowThanksScreen(false)}
                >
                    <View style={Doacaostyles.modalContainer}>
                        <View style={Doacaostyles.modalContent}>
                            <Text style={Doacaostyles.modalText}>Obrigado por sua contribuição!</Text>
                            <TouchableOpacity onPress={() => setShowThanksScreen(false)}>
                                <Text style={Doacaostyles.closeButton}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> 

            </ScrollView>
        </View>
    );
};

export default PagDoacaoMobile;