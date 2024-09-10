import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Doacaostyles from '../Componentes/Doacaostyles';

const PagDoacaoMobile = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardholderName: '',
        donationAmount: 'R$ 0,00',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // Função para formatar o valor da doação como moeda brasileira (R$)
    const handleDonationChange = (text) => {
        // Remove tudo que não for número
        let unformattedValue = text.replace(/\D/g, '');
        
        // Limite de até 99.999,99
        if (unformattedValue.length > 8) {
            unformattedValue = unformattedValue.slice(0, 8);
        }

        // Converte para número e formata em moeda com vírgula
        const formattedValue = (Number(unformattedValue) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        setFormData({ ...formData, donationAmount: formattedValue });
    };

    // Função para validar o número do cartão usando o algoritmo de Luhn
    const validateCardNumber = (number) => {
        const regex = /^\d{16}$/; // Verifica se o número contém 16 dígitos
        if (!regex.test(number)) return false;

        let sum = 0;
        let shouldDouble = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number[i]);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    };

    // Função para formatar e validar a data de expiração (MM/YY)
    const handleExpirationDateChange = (text) => {
        let formattedText = text.replace(/\D/g, ''); // Remove qualquer caractere não numérico

        if (formattedText.length > 2) {
            formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
        }

        setFormData({ ...formData, expirationDate: formattedText });
    };

    const validateExpirationDate = (expirationDate) => {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // Valida MM/YY
        if (!regex.test(expirationDate)) return false;

        const [month, year] = expirationDate.split('/').map(Number);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        // Verifica se a data de expiração já passou
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false;
        }

        return true;
    };

    // Função para validar o nome (apenas letras e espaços, sem acento, máximo 30 caracteres)
    const validateCardholderName = (name) => {
        const regex = /^[A-Za-z ]{1,30}$/; // Permite apenas letras sem acentos e espaços, máximo de 30 caracteres
        return regex.test(name);
    };

    const validateDonationAmount = (amount) => {
        const numericValue = Number(amount.replace(/\D/g, '')) / 100;
        return numericValue <= 99999.99; // Verifica se o valor é menor ou igual a 99.999,99
    };

    const handleSubmit = () => {
        if (!validateCardNumber(formData.cardNumber)) {
            Alert.alert('Número de cartão inválido', 'Por favor, insira um número de cartão válido.');
            return;
        }

        if (!validateExpirationDate(formData.expirationDate)) {
            Alert.alert('Data de expiração inválida', 'Por favor, insira uma data de expiração válida.');
            return;
        }

        if (!validateCardholderName(formData.cardholderName)) {
            Alert.alert('Nome inválido', 'Por favor, insira um nome válido (somente letras e espaços, sem acento, até 30 caracteres).');
            return;
        }

        if (!validateDonationAmount(formData.donationAmount)) {
            Alert.alert('Valor inválido', 'O valor máximo permitido é R$ 99.999,99.');
            return;
        }

        console.log('Dados do formulário:', formData);
        setFormData({
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            cardholderName: '',
            donationAmount: 'R$ 0,00',
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
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={Doacaostyles.input}
                        placeholder="Data de Expiração (MM/YY)"
                        value={formData.expirationDate}
                        onChangeText={handleExpirationDateChange}
                        placeholderTextColor={'#fff'}
                        keyboardType="numeric"
                        maxLength={5} // Limita o campo a 5 caracteres (MM/YY)
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
                        maxLength={30} // Limita o campo a 30 caracteres
                    />
                    <TextInput
                        style={Doacaostyles.input}
                        placeholder="Valor da Doação"
                        value={formData.donationAmount}
                        onChangeText={handleDonationChange}
                        placeholderTextColor={'#fff'}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={Doacaostyles.button} onPress={handleSubmit}>
                    <Text style={Doacaostyles.buttonText}>Contribuir</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default PagDoacaoMobile;