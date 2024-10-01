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

    const [showThanksScreen, setShowThanksScreen] = useState(false);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // Função para formatar o número do cartão em blocos de 4 dígitos
    const handleCardNumberChange = (text) => {
        let formattedText = text.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        if (formattedText.length > 16) {
            formattedText = formattedText.slice(0, 16); // Limita a 16 dígitos
        }
        // Insere espaços a cada 4 dígitos
        formattedText = formattedText.replace(/(\d{4})(?=\d)/g, '$1 ');
        setFormData({ ...formData, cardNumber: formattedText });
    };

    const handleDonationChange = (text) => {
        let unformattedValue = text.replace(/\D/g, '');
        if (unformattedValue.length > 8) {
            unformattedValue = unformattedValue.slice(0, 8);
        }
        const formattedValue = (Number(unformattedValue) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        setFormData({ ...formData, donationAmount: formattedValue });
    };

    const validateCardNumber = (number) => {
        const regex = /^\d{4} \d{4} \d{4} \d{4}$/; // Verifica se o número contém 16 dígitos com os espaços adequados
        if (!regex.test(number)) return false;

        const cardNumberWithoutSpaces = number.replace(/\s/g, ''); // Remove os espaços para validar
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumberWithoutSpaces.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumberWithoutSpaces[i]);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };

    const handleExpirationDateChange = (text) => {
        let formattedText = text.replace(/\D/g, '');
        if (formattedText.length > 2) {
            formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
        }
        setFormData({ ...formData, expirationDate: formattedText });
    };

    const validateExpirationDate = (expirationDate) => {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!regex.test(expirationDate)) return false;

        const [month, year] = expirationDate.split('/').map(Number);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;
        return !(year < currentYear || (year === currentYear && month < currentMonth));
    };

    // Função para validar o CVV (3 ou 4 dígitos)
    const handleCvvChange = (text) => {
        let formattedText = text.replace(/\D/g, '');
        if (formattedText.length > 3) {
            formattedText = formattedText.slice(0, 3); // Limita a 4 dígitos
        }
        setFormData({ ...formData, cvv: formattedText });
    };

    // Função para validar o nome (sem apenas espaços, e espaços permitidos apenas entre os nomes)
    const validateCardholderName = (name) => {
        const regex = /^[A-Za-z]+( [A-Za-z]+)*$/; // Permite apenas letras e um espaço entre palavras, sem espaços no início, fim ou múltiplos consecutivos.
        return regex.test(name.trim()); // O trim() remove espaços no início e no fim
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
            Alert.alert('Nome inválido', 'Por favor, insira um nome válido. O nome não pode conter apenas espaços, e os espaços são permitidos apenas entre o primeiro e último nome.');
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
        setShowThanksScreen(true);
    };

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
                        onChangeText={handleCardNumberChange}
                        placeholderTextColor={'#fff'}
                        keyboardType="numeric"
                        maxLength={19} // Limita o campo a 19 caracteres (16 dígitos + 3 espaços)
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
                        onChangeText={handleCvvChange}
                        placeholderTextColor={'#fff'}
                        keyboardType="numeric"
                        maxLength={3} // Limita o campo a 4 dígitos
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