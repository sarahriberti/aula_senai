import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

// Importando a imagem localmente//
const image = require('../../assets/AjudaLp.png');

const Help = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Precisa de Ajuda?</Text>
                <Text style={styles.textHelp}>
                    Olá! Seja Bem-vindo à Opus Task!
                    Estamos aqui para ajudar! Se você está tendo dificuldades em usar o site, veja abaixo algumas instruções para resolver problemas comuns.
                </Text>

                <View style={styles.containerFilho}>
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Passos para Usar o Site</Text>
                        <Text style={styles.listHelp}>
                            1. <Text style={styles.boldText}>Bem-vindo à Opus!</Text> Nossa página inicial oferece uma visão rápida e acolhedora do que temos a oferecer.
                        </Text>
                        <Text style={styles.listHelp}>
                            2. <Text style={styles.boldText}>O que você encontrará por aqui?</Text> Mergulhe no mundo de possibilidades da Opus!
                        </Text>
                        <Text style={styles.listHelp}>
                            3. <Text style={styles.boldText}>Explore e navegue à vontade!</Text> Descubra funcionalidades criadas para atender suas necessidades diárias.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Dúvidas Frequentes</Text>
                        <Text style={styles.text1Help}>
                            <Text style={styles.boldText}>1. Como efetuar Login?</Text> Clique no botão no canto inferior esquerdo da tela "Login".
                        </Text>
                        <Text style={styles.text1Help}>
                            <Text style={styles.boldText}>2. Como efetuar Cadastro?</Text> Utilize novamente no canto inferior direito da tela "Cadastro".
                        </Text>
                        <Image source={require('../../assets/AjudaLp.png')} style={styles.imageHelpmobile} />

                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    imageHelpmobile: {
        marginLeft: 60
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#191d2a',
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
    containerFilho: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    listHelp: {
        fontSize: 18,
        marginBottom: 5,
        color: 'white'
    },
    text1Help: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
    boldText: {
        fontWeight: 'bold',
        color: 'white'
    },
});

export default Help;