import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { HeaderHelp } from './HeaderAjuda';

const SugestaoHelp = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderHelp />

            <View style={styles.innerContainer}>
                <View style={styles.sectionLink}>
                    <Text style={styles.subHeader}>Como Enviar Sua Sugestão para a Opus?</Text>
                    <Text style={styles.textHelp}>
                        Olá! Seja bem-vindo à central de ajuda da Opus Task!{"\n"}
                        Estamos aqui para ajudar! Veja abaixo algumas instruções para utilizar o sugestão de forma eficiente.
                    </Text>
                    <View style={styles.list}>
                        <Text style={styles.subHeader2}>Passos para enviar uma Sugestão para a Opus</Text>
                        <Text style={styles.listItem}>
                            <Text style={styles.bold}>1. Acesse Sua Conta:</Text> Clique no ícone do menu no canto superior esquerdo da tela para abrir o menu.

                        </Text>
                        <Text style={styles.listItem}>
                            <Text style={styles.bold}>2. Vá até a Seção de Sugestões:</Text> No menu, selecione a opção "Sugestões" para acessar o formulário de feedback.

                        </Text>
                        <Text style={styles.listItem}>
                            <Text style={styles.bold}>3. Preencha o campo:</Text> Escreva sua sugestão no campo indicado, fornecendo detalhes que possam nos ajudar a melhorar. Lembre-se de ser claro e conciso.
                        </Text>
                        <Text style={styles.listItem}>
                            <Text style={styles.bold}>4. Envie sua Sugestão:</Text> Após preencher o formulário, clique no botão "Enviar". Sua sugestão será enviada diretamente para nossa equipe.

                        </Text>
                    </View>
                </View>

                <View style={styles.sectionLinkDois}>
                    <Text style={styles.subHeader2}>Dúvidas Frequentes</Text>

                    <Text style={styles.text1}>
                        <Text style={styles.bold}>1. O que acontece após enviar minha sugestão?</Text> Nós analisaremos sua sugestão e, se necessário, entraremos em contato para mais informações.
                    </Text>

                    <Text style={styles.text1}>
                        <Text style={styles.bold}>2. Posso sugerir novas funcionalidades?</Text> Sim! Ficaremos felizes em receber suas ideias sobre novas funcionalidades ou melhorias.
                    </Text>

                    <Text style={styles.text1}>
                        <Text style={styles.bold}>3. Existe um limite para o número de sugestões?</Text> Sim! Você tem o limite de 100 caracteres.
                    </Text>

                    <Text style={styles.text1}>
                        <Text style={styles.bold}>4. Como posso entrar em contato com o suporte?</Text> Se tiver dúvidas ou precisar de assistência adicional, utilize a seção "Fale Conosco" no rodapé da página para entrar em contato com nossa equipe.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    subHeader2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    textHelp: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 20,
        color: 'white'
    },
    container: {
        padding: 16,
        backgroundColor: '#191d2a',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    innerContainer: {
        marginBottom: 16,
    },
    sectionLink: {
        marginBottom: 16,
    },
    sectionLinkDois: {
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    },
    list: {
        marginBottom: 8,
    },
    listItem: {
        marginBottom: 12,
        lineHeight: 20,
        fontSize: 18,
        color: 'white'
    },
    bold: {
        fontWeight: 'bold',
    },
    text1: {
        marginBottom: 12,
        lineHeight: 20,
        fontSize: 18,
        color: 'white'
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1, // ajuste a proporção da imagem conforme necessário
        marginTop: 8,
        marginBottom: 8,
    },
});

export default SugestaoHelp;