import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderHelp } from './HeaderAjuda';

const SairHelp = () => {
    return (
        <View style={styles.container}>
            <HeaderHelp />
            <Text style={styles.header}>Como Sair da Opus?</Text>
            <Text style={styles.textHelp}>
                Olá! Seja bem-vindo à central de ajuda da Opus Task!{"\n"}
                Estamos aqui para ajudar! Veja abaixo algumas instruções para sair.
            </Text>
            <Text style={styles.subHeader}>Passos para Sair da Sua Conta</Text>
            <Text style={styles.text}><Text style={styles.bold}>1. Acesse o sair:</Text> Localize o Botão "Sair" no menu lateral no canto superior direito do calendário.</Text>
            <Text style={styles.text}><Text style={styles.bold}>2.Confirmação:</Text> Confirme sua Saída.</Text>


            <Text style={styles.subHeader}>Dúvidas Frequentes</Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>1.</Text> O que acontece se eu sair da minha conta?
                Ao sair, você será desconectado e precisará fazer login novamente para acessar suas informações.
            </Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>2.</Text> Posso manter minha sessão ativa?
                Sim! Se você desejar permanecer logado, evite clicar no botão "Sair".
            </Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>3.</Text> Como posso garantir que minha conta esteja segura?
                Sempre saia da sua conta quando usar dispositivos públicos ou compartilhados e nunca compartilhe sua senha com ninguém. Outro ponto a se ter como segurança e prevenção seria seria anotar sua senha e deixar ela em um local seguro que apenas você saiba.

            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    textHelp: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 20,
        color: 'white'
    },
    container: {
        padding: 16,
        backgroundColor: '#191d2a'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    subHeader: {
        fontSize: 24,
        marginVertical: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white'
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default SairHelp;