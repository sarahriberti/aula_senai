import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const image = require('../../assets/AjudaCadCamp.png');
const image2 = require('../../assets/cadLog.png');
const image3 = require('../../assets/CadHelp.png');
const AjudaCadastro = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Precisa de Ajuda?</Text>
                <Text style={styles.textHelp}>
                    Olá! Seja Bem-vindo à central de ajuda Opus!{"\n"}
                    Estamos aqui para ajudar! Se você está tendo dificuldades em efetuar o cadastro, veja abaixo algumas instruções para resolver problemas comuns.
                </Text>

                <View style={styles.section}>
                    <Text style={styles.subHeaderHelp}>Passos para Efetuar o Cadastro</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>1. Acesse a página de Cadastro:</Text> Clique no "Cadastre-se" na tela de Login ou na tela 'Boas Vindas' em 'Cadastro'.</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>2. Preencha os campos obrigatórios:</Text></Text>

                    <Text style={styles.letraHelpCentro}><Text style={styles.bold}>Nome:</Text> Insira seu nome (mínimo 3 caracteres e máximo 40).</Text>
                    <Text style={styles.letraHelpCentro}><Text style={styles.bold}>Data de Nascimento:</Text> Informe uma data válida (idade permitida a partir de 16 anos).</Text>
                    <Text style={styles.letraHelpCentro}><Text style={styles.bold}>Celular:</Text> Forneça seu número de celular com o DDD válido. <Text style={styles.exemploHelp}>Exemplo: (11) 91234-5678</Text></Text>
                    <Text style={styles.letraHelpCentro}><Text style={styles.bold}>E-mail:</Text> Digite um e-mail válido (mínimo 5 caracteres, incluindo "@"). <Text style={styles.exemploHelp}>Exemplo: usuario@opus.com</Text></Text>
                    <Text style={styles.letraHelpCentro}><Text style={styles.bold}>Senha:</Text> Crie uma senha com uma letra maiúscula, uma letra minúscula, um caractere especial, números e mínimo de 8 caracteres. <Text style={styles.exemploHelp}>Exemplo: UsuarioSenha@123</Text></Text>
                    <Text style={styles.letraHelpCentro}><Text style={styles.bold}>Confirmar Senha:</Text> Repita a senha escolhida no campo anterior.</Text>
                    <Image source={require('../../assets/AjudaCadCamp.png')} style={styles.imageHelpmobile} />
                    <Text style={styles.letraHelp}><Text style={styles.bold}>3. Clique em "Cadastrar":</Text> Após preencher todos os campos, clique no botão "Cadastrar" para criar sua conta. Você será direcionado para a página de cadastro concluído, onde poderá fazer login.</Text>
                    <Image source={require('../../assets/CadHelp.png')} style={styles.imageHelpmobile2} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeaderHelp}>Dúvidas Frequentes</Text>

                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>1. Já tenho uma conta?</Text> Se você já se cadastrou, use a tela de Login para acessar sua conta em 'Já possuí conta? Faça Login'

                    </Text>
                    <Image source={require('../../assets/cadLog.png')} style={styles.imageHelpmobile2} />
                    <Text style={styles.text1Help}><Text style={styles.bold}>2. Problemas ao cadastrar?</Text> Verifique se todos os campos foram preenchidos corretamente. Se o problema persistir, entre em contato conosco!</Text>
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
    imageHelpmobile2: {
        marginLeft: 40
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
        fontSize: 18,
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
    letraHelpCentro: {
        fontSize: 18,
        marginBottom: 5,
        paddingLeft: 10,
        color: 'white'
    },
    exemploHelp: {
        fontSize: 14,
        color: 'white',
        fontStyle: 'italic',
    },
    bold: {
        fontWeight: 'bold',
    },
    imagemHelpLogin: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    text1Help: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
});

export default AjudaCadastro;