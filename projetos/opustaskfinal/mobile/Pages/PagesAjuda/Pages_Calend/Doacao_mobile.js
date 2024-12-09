import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { HeaderHelp } from './HeaderAjuda';

const DoacaoHelp = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <HeaderHelp />
                <Text style={styles.header}>Como Fazer uma Doação?</Text>
                <Text style={styles.textHelp}>
                    Olá! Seja bem-vindo à central de ajuda da Opus Task!{"\n"}
                    Estamos aqui para ajudar! Veja abaixo algumas instruções para navegar e utilizar o doação de forma otimizada .
                </Text>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Passos para Contribuir com a Opus</Text>
                    <View style={styles.listItem}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>1. Acesse a Página de Doações:</Text> Clique no ícone do menu no canto superior esquerdo.
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.bold}>E selecione "Doações" para ser direcionado à página de doações.</Text>
                        </Text>

                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>2. Escolha o Valor da Doação:</Text> Na página de doações, você encontrará opções para escolher o valor que deseja contribuir. Você pode optar por personalizar o valor.
                        </Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>3. Preencha Seus Dados:</Text> Insira as informações solicitadas, incluindo número do cartão, data de expiração, CVV, nome do titular e o valor da doação.
                        </Text>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>4. Confirme Sua Doação:</Text> Após preencher os dados, clique no botão "Confirmar Doação". Você receberá um e-mail de confirmação e um recibo da sua contribuição.
                        </Text>
                    </View>

                    <Text style={styles.footerText}>
                        Sua generosidade é fundamental! Cada doação, por menor que seja, contribui para melhorarmos nosso sistema e alcançarmos o maior número possível de pessoas com o nosso site.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Dúvidas Frequentes</Text>
                    <Text style={styles.faqText}>
                        <Text style={styles.bold}>1. Posso fazer doações mensais?</Text> Sim! Na página de doações, você pode escolher a opção de doação recorrente para contribuir mensalmente.
                    </Text>
                    <Text style={styles.faqText}>
                        <Text style={styles.bold}>2. Existe um valor mínimo para doações?</Text> Não, você pode contribuir com qualquer valor que desejar.
                    </Text>
                    <Text style={styles.faqText}>
                        <Text style={styles.bold}>3. Como posso entrar em contato caso tenha mais dúvidas?</Text> Utilize a seção "Fale Conosco" disponível no rodapé da página para enviar suas perguntas à nossa equipe.
                    </Text>
                    <Text style={styles.faqText}>
                        <Text style={styles.bold}>4. Qual é o objetivo da doação?</Text> Sua generosidade nos ajuda a continuar nosso trabalho e aprimorar a cada dia nosso sistema para melhor funcionamento. Cada doação, por menor que seja, contribui para alcançarmos nosso objetivo de ajudar o maior número possível de pessoas com o nosso site.
                    </Text>
                </View>
            </View>
        </ScrollView>
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
        flex: 1,
        backgroundColor: '#191d2a',
    },
    innerContainer: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    },
    section: {
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    listItem: {
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 5,
        color: 'white'
    },
    bold: {
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    footerText: {
        fontSize: 18,
        textAlign: 'justify',
        marginTop: 15,
        color: '#f4c01e'
    },
    faqText: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 10,
        color: 'white'
    },
});

export default DoacaoHelp;
