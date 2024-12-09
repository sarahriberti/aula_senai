import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sugestao = ({ modalVisible5, setModalVisible5 }) => {
    const [sugestao, setSugestao] = useState('');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [erro, setErro] = useState('');
    const [submitted, setSubmitted] = useState(false); // Estado para rastrear se a sugestão foi enviada

    useEffect(() => {
        // Verificação de ID de usuário no armazenamento local do dispositivo
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('id'); // Obtém o ID do armazenamento local
                if (id) {
                    setUserId(id);
                } else {
                    console.error('ID do usuário não encontrado no armazenamento local');
                }
            } catch (error) {
                console.error('Erro ao recuperar o ID do usuário:', error);
            }
        };
        fetchUserId();
    }, []);

    // Reseta a mensagem de feedback e o texto ao abrir o modal
    useEffect(() => {
        if (modalVisible5) {
            setFeedbackMessage('');
            setSugestao('');
            setSubmitted(false); // Reseta o estado de enviado ao abrir o modal
        }
    }, [modalVisible5]);

    const handleChange = (text) => {
        if (text.length <= 200) {
            setSugestao(text);
            if (text.length < 10) {
                setErro('A sugestão deve ter pelo menos 10 caracteres.');
            } else {
                setErro('');
            }
        }
    };

    const handleSave = async () => {
        if (sugestao.trim().length < 10 || sugestao.trim().length > 50) {
            setFeedbackMessage('A sugestão deve ter entre 10 e 50 caracteres.');
            return;
        }

        if (userId) {
            setLoading(true);
            setFeedbackMessage('');

            try {
                const response = await fetch('http://10.135.60.33:8085/receber_sugestao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Texto: sugestao,
                        ID_Usu: userId,
                    }),
                });

                if (!response.ok) {
                    setFeedbackMessage('Erro ao salvar sugestão. Tente novamente.');
                    throw new Error('Erro ao enviar sugestão');
                }

                setSugestao(''); // Limpa a sugestão após o envio
                setFeedbackMessage('Obrigado pela sua sugestão!'); // Mensagem de agradecimento
                setSubmitted(true); // Marca a sugestão como enviada
            } catch (error) {
                setFeedbackMessage('Erro ao salvar sugestão. Tente novamente.');
            } finally {
                setLoading(false);
            }
        } else {
            setFeedbackMessage('ID do usuário não encontrado.');
        }
    };

    return (
        <Modal visible={modalVisible5} animationType="slide" transparent={true} onRequestClose={() => setModalVisible5(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sugestão</Text>
                    <TextInput
                        value={sugestao}
                        onChangeText={handleChange}
                        placeholder="Digite sua sugestão aqui..."
                        placeholderTextColor='#fff'
                        color="#fff"
                        style={styles.textInput}
                        multiline
                        numberOfLines={4}
                    />
                    {erro ? <Text style={styles.errorText}>{erro}</Text> : null}
                    {/* Mostra a mensagem de agradecimento se a sugestão foi enviada */}
                    {submitted && (
                        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                    )}
                    {loading ? <ActivityIndicator size="small" color="#fff" /> : null}
                    <View style={styles.buttonContainer}>
                        <Button title="Fechar" onPress={() => setModalVisible5(false)} color="#c39910" />
                        <Button title="Enviar" onPress={handleSave} disabled={loading} color="#c39910" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido para modal
        color: 'white',
    },
    modalContent: {
        width: '80%', // Ajuste de largura para mobile
        padding: 20,
        borderRadius: 10,
        alignItems: 'center', // Centraliza o conteúdo
        borderColor: '#546594',
        backgroundColor: '#546594',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    textInput: {
        width: '100%', // Ajuste de largura para preencher o modal
        borderColor: '#c39910', // Cinza claro para o contorno
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        textAlignVertical: 'top', // Alinha o texto no topo quando multiline
        color: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center', // Centraliza o texto de erro
    },
    feedbackText: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center', // Centraliza o feedback de sucesso/erro
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%', // Faz os botões ocuparem toda a largura do modal
        backgroundcolor: '#c39910',
    },
});

export default Sugestao;