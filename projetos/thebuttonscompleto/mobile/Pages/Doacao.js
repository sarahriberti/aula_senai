import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Doacaostyles from '../Componentes/Doacaostyles';


const PagDoacaoMobile = () => {
    const [donationAmount, setDonationAmount] = useState('0');

    const handleDonationChange = (text) => {
        setDonationAmount(text);
    };

    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardholderName: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = () => {
        console.log('Dados do formulário:', formData);
        setFormData({
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            cardholderName: '',
        });
        setShowThanksScreen(true); // Mostrar a tela de agradecimento ao pressionar o botão "Contribuir"
    };

    const [showThanksScreen, setShowThanksScreen] = useState(false);

    return (
        <View style={Doacaostyles.container}>
            <ScrollView>
                <Text style={Doacaostyles.informacoesTextHeader}> CONTRIBUIÇÕES </Text>

                <View style={Doacaostyles.informacoes}>

                    <Text style={Doacaostyles.informacoesTextquestion}>Por que sua contribuição é importante?</Text>
                    <Text style={Doacaostyles.informacoesText}>
                        Sua generosidade nos ajuda a continuar nosso trabalho e aprimorar a cada dia nosso sistema para melhor funcionamento.
                    </Text>

                    <TextInput
                        style={Doacaostyles.input}
                        placeholder="Número do Cartão"
                        value={formData.cardNumber}
                        onChangeText={(text) => handleChange('cardNumber', text)}
                        placeholderTextColor={'#fff'}
                    />
                    <TextInput
                        style={Doacaostyles.input}
                        placeholder="Data de Expiração"
                        value={formData.expirationDate}
                        onChangeText={(text) => handleChange('expirationDate', text)}
                        placeholderTextColor={'#fff'}
                    />
                    <TextInput
                        style={Doacaostyles.input}
                        placeholder="CVV"
                        value={formData.cvv}
                        onChangeText={(text) => handleChange('cvv', text)}
                        placeholderTextColor={'#fff'}
                    />
                    <TextInput
                        style={Doacaostyles.input}
                        placeholder="Nome do Titular do Cartão"
                        value={formData.cardholderName}
                        onChangeText={(text) => handleChange('cardholderName', text)}
                        placeholderTextColor={'#fff'}
                    />
                    <TextInput
                        style={Doacaostyles.input}
                        placeholder="Valor da Doação"
                        value={donationAmount}
                        onChangeText={handleDonationChange}
                        keyboardType="numeric"

                    />


                </View>
                <TouchableOpacity style={Doacaostyles.button} onPress={handleSubmit}>
                    <Text style={Doacaostyles.buttonText}>Contribuir</Text>
                </TouchableOpacity>
                {/*   <Modal 
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
                </Modal>*/}

            </ScrollView>
        </View>
    );
};



export default PagDoacaoMobile;