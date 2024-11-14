import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { HeaderHelp } from './Pages_Calend/HeaderAjuda';
import DoacaoHelp from './Pages_Calend/Doacao_mobile';

const AjudaCalend = () => {
    return (
        <View style={styles.container}>


            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <HeaderHelp />
                <Text style={styles.header}>Precisa de Ajuda com o Calendário?</Text>
                <Text style={styles.textHelp}>
                    Olá! Seja bem-vindo à central de ajuda da Opus Task!{"\n"}
                    Estamos aqui para ajudar! Veja abaixo algumas instruções para navegar e utilizar o calendário de forma eficiente.
                </Text>

                <View style={styles.section}>
                    <Text style={styles.subHeaderHelp}>Passos para Usar o Calendário</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>1. Conheça o Calendário:</Text> Clique no dia desejado no "Calendário" para visualizar e gerenciar suas tarefas e compromissos.</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>2. Adicione uma Tarefa:</Text> Clique no botão "+" no calendário. Preencha as informações, como título, horário de início e fim, descrição, categoria, notificações, e se deseja repetir a tarefa.</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>3. Edite ou Exclua uma Tarefa:</Text> Para editar uma tarefa, clique sobre ela e faça as alterações. Para excluir, clique no ícone de lixeira.</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>4. Visualize Tarefas:</Text> Todas as tarefas salvas aparecerão no campo de tarefas do dia. Use as setas para navegar em meses anteriores ou futuros.</Text>
                    <Text style={styles.letraHelp}><Text style={styles.bold}>5. Personalize suas Tarefas:</Text> Escolha categorias e cores para identificar melhor cada tipo de compromisso.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeaderHelp}>Dúvidas Frequentes</Text>

                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>1. Não consigo adicionar uma tarefa?</Text> Verifique se todos os campos obrigatórios estão preenchidos.
                    </Text>

                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>2. Como altero o horário de uma tarefa?</Text> Para ajustar, clique na tarefa, em seguida em 'Editar', mude as informações e salve.
                    </Text>

                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>3. Posso ver tarefas de meses anteriores ou marcar tarefas para os próximos meses?</Text> Sim! Use as setas para navegar entre os meses.
                    </Text>

                    <Text style={styles.text1Help}>
                        <Text style={styles.bold}>4. Posso marcar as minhas tarefas como concluídas?</Text> Sim! Clique na tarefa e marque o checkbox de conclusão para riscar a tarefa.
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191d2a',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'white'
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
        fontSize: 24,
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
    imagemHelp: {
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

export default AjudaCalend;