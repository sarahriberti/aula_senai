import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const image = require('../../assets/AjudaLog.png');
const AjudaLogin = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Precisa de Ajuda?</Text>
                <Text style={styles.textHelp}>
                    Olá! Seja Bem-vindo de volta à central de ajuda Opus!{"\n"}
                    Estamos aqui para ajudar! Se você está tendo dificuldades em efetuar Login, veja abaixo algumas instruções para resolver problemas comuns.
                </Text>

                <View style={styles.section}>
                    <Text style={styles.subHeaderHelp}>Passos para Efetuar o Login</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>1. Insira suas credenciais:</Text> Digite seu e-mail e senha nos campos apropriados.</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>2. Clique no botão de Login:</Text> Após inserir suas credenciais, clique no botão "Entrar" para acessar sua conta.</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>3. Problemas com login?</Text> Verifique se o e-mail e a senha estão corretos. Caso tenha esquecido a senha, clique no  "Esqueci minha senha" para redefini-la.</Text>

                    <Text style={styles.letraHelp}><Text style={styles.bold}>4. Fazer cadastro com?</Text> Faça seu login com sua conta Google ou Facebook.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeaderHelp}>Dúvidas Frequentes</Text>

                    <Text style={styles.text1Help}><Text style={styles.bold}>1. Como efetuar Cadastro?</Text> Na tela de Login, clique no link "Não possui conta? Cadastre-se".</Text>
                    <Image source={require('../../assets/AjudaLog.png')} style={styles.imageHelpmobile} />
                    <Text style={styles.text1Help}><Text style={styles.bold}>2. Mais ajuda?</Text> Nossa equipe de suporte está pronta para ajudar!</Text>
                </View>
            </ScrollView>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    imageHelpmobile: {
        marginLeft: 60
    },
    container: {
        flex: 1,
        backgroundColor: '#191d2a',
        padding: 16,
    },
    sairHelp: {
        marginBottom: 16,
    },
    sairHelpBotao: {
        width: 24,
        height: 24,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#c39910'
    },
    textHelp: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 20,
        color: 'white'
    },
    section: {
        marginBottom: 20,
    },
    subHeaderHelp: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    letraHelp: {
        fontSize: 18,
        marginBottom: 5,
        color: 'white'
    },
    bold: {
        fontWeight: 'bold',
    },
    imagemHelpLogin: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    text1Help: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
});

export default AjudaLogin;