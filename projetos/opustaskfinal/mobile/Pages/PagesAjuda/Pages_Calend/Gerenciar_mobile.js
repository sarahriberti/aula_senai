import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { HeaderHelp } from './HeaderAjuda';

const GerenciarHelp = () => {
    return (
        <ScrollView style={styles.container}>
            <HeaderHelp />

            <View style={styles.containerFilho}>
                <View style={styles.sectionLink}>
                    <Text style={styles.subHeaderHelp}>Como Gerenciar sua Conta na Opus?</Text>
                    <Text style={styles.textHelp}>
                        Olá! Seja bem-vindo à central de ajuda da Opus Task!{"\n"}
                        Estamos aqui para ajudar! Veja abaixo algumas instruções para navegar e utilizar o gerenciar de forma pratica.
                    </Text>
                    <Text style={styles.header}>Precisa de Ajuda com o Gerenciar?</Text>

                    <View style={styles.listHelp}>
                        <Text style={styles.letraHelp}>
                            <Text style={styles.bold}>1. Acesse sua Conta:</Text> Clique no ícone do menu no canto superior esquerdo da tela para abrir o menu.

                            <Text style={styles.bold}>Clique em 'Gerenciar Conta'</Text>

                        </Text>
                        <Text style={styles.letraHelp}>
                            <Text style={styles.bold}>2. Atualize suas Informações Pessoais:</Text> Você pode atualizar seu nome, data de nascimento, e-mail, telefone, senha e avatar. Lembre-se de clicar em "Salvar" após fazer as alterações.
                        </Text>
                        <Text style={styles.letraHelp}>
                            <Text style={styles.bold}>3. Alterar Senha:</Text> Para mudar sua senha, vá até "Gerenciar Conta" e preencha os campos de nova senha. Siga as instruções: coloque sua senha atual, digite a nova senha e confirme-a.
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionLinkDois}>
                    <Text style={styles.subHeaderHelp}>Dúvidas Frequentes</Text>
                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>1. O que fazer se esquecer minha senha?</Text> Clique em "Esqueceu a senha?" na tela de login e siga as instruções para redefinir sua senha via e-mail.
                    </Text>
                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>2. Como posso verificar meu e-mail cadastrado?</Text> Acesse "Gerenciar Conta" e verifique o campo de e-mail. Se precisar atualizar, faça isso e salve as alterações.
                    </Text>
                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>3. Como entrar em contato com o suporte?</Text> Se tiver alguma dúvida ou problema, utilize a seção "Fale Conosco" disponível no rodapé da página para enviar uma mensagem à nossa equipe.
                    </Text>
                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>4. Posso reativar minha conta após desativá-la?</Text> Não! Uma vez excluída, os dados serão apagados do nosso banco de dados.
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
        padding: 20,
        backgroundColor: '#191d2a',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    containerFilho: {
        marginBottom: 20,
    },
    sectionLink: {
        marginBottom: 20,
    },
    subHeaderHelp: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white'
    },

    letraHelp: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
    imagemHelpLogin: {
        width: '100%', // Ajuste conforme necessário
        height: 150,  // Ajuste conforme necessário
        marginVertical: 10,
    },
    bold: {
        fontWeight: 'bold',
        color: 'white'
    },
    sectionLinkDois: {
        marginBottom: 20,
    },
    text1Help: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
});

export default GerenciarHelp;