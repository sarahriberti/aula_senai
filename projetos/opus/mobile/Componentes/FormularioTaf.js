import React, { useState } from 'react';
import { View, Pressable, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import stylesTaf from './Styleformulariotaf';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormularioTaf({ isModalVisible4, setModalVisible4, onAddTask }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startHour, setStartHour] = useState(null);
    const [endHour, setEndHour] = useState(null);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [selectedRepeatOption, setSelectedRepeatOption] = useState('none');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#252942'); // Adicionado para cor
    const [errorMessage, setErrorMessage] = useState(''); // Adicionado para mensagem de erro

    const toggleModal = () => {
        if (!isModalVisible4) {
            clearForm(); // Limpa o formulário ao abrir o modal
        }
        setModalVisible4(!isModalVisible4);
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date); // Atualiza o estado da data selecionada
        }
    };

    const setDate = (date) => {
        setSelectedDate(date); // Função para setar a data externamente ou limpar se for null
    };

    const handleStartTimeChange = (event, time) => {
        setShowStartTimePicker(false);
        if (time) {
            setStartHour(time); // Atualiza o estado da hora de início
        }
    };

    const handleEndTimeChange = (event, time) => {
        setShowEndTimePicker(false);
        if (time) {
            setEndHour(time); // Atualiza o estado da hora de término
        }
    };

    const handleRepeatChange = (itemValue) => {
        setSelectedRepeatOption(itemValue); // Atualiza o estado da repetição
    };

    const clearForm = () => {
        setSelectedDate(null);
        setStartHour(null);
        setEndHour(null);
        setTitle('');
        setDescription('');
        setNotificationEnabled(false);
        setSelectedRepeatOption('none');
        setColor('#252942'); // Resetando cor
        setErrorMessage(''); // Limpa a mensagem de erro ao limpar o formulário
    };

    const saveTask = async () => {
        if (!title || !selectedDate || !startHour || !endHour) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setErrorMessage(''); // Limpa a mensagem de erro se tudo estiver preenchido

        const task = {
            acao: 'salvar_tarefa',
            cor: color,
            titulo: title,
            data: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
            hora_ini: startHour instanceof Date ? startHour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : null,
            hora_fin: endHour instanceof Date ? endHour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : null,
            notific: notificationEnabled,
            descr: description,
            repetir: selectedRepeatOption,
            ID: await AsyncStorage.getItem('ID'),
        };

        try {
            const response = await fetch('http://10.135.60.25:8085/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                if (result.erro) {
                    console.error(result.mensagens);
                } else {
                    console.log(result.mensagem);
                    clearForm();
                    toggleModal(); // Fechar o modal após salvar a tarefa
                    onAddTask(task); // Notifica o pai que uma nova tarefa foi adicionada
                }
            } else {
                console.error('Resposta do servidor não é JSON:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    return (
        <View style={stylesTaf.main}>
            <Pressable style={stylesTaf.btnToDo} onPress={toggleModal}>
                <Image style={stylesTaf.btnImage} resizeMode='contain' source={require('../assets/Images/maizola.png')} />
            </Pressable>
            <Modal isVisible={isModalVisible4} onBackdropPress={toggleModal}>
                <View style={stylesTaf.modalMain}>
                    <View style={stylesTaf.modal}>
                        <View style={stylesTaf.container}>
                            <View style={stylesTaf.nameBox}>
                                <Text style={stylesTaf.titleModal}>TAREFA</Text>
                            </View>
                            <View style={stylesTaf.titleTarefa}>
                                <Text style={stylesTaf.txtTitle}>Título</Text>
                                <TextInput
                                    style={stylesTaf.titleBox}
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                            <View style={stylesTaf.dateTarefa}>
                                <Text style={stylesTaf.txtDate}>Data</Text>
                                <TouchableOpacity style={stylesTaf.dateBoxBtn} onPress={() => setShowDatePicker(true)}>
                                    <Text style={stylesTaf.txtDateInt}>
                                        {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'dd/mm/aaaa'}
                                    </Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={selectedDate || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange} // Chamado ao selecionar a data
                                    />
                                )}
                            </View>
                            <View style={stylesTaf.hourTarefa}>
                                <View style={stylesTaf.hourIni}>
                                    <Text style={stylesTaf.txthourIni}>Início</Text>
                                    <TouchableOpacity style={stylesTaf.btnHour} onPress={() => setShowStartTimePicker(true)}>
                                        <Text style={stylesTaf.txtBtnHour}>
                                            {startHour ? startHour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'hh:mm'}
                                        </Text>
                                    </TouchableOpacity>
                                    {showStartTimePicker && (
                                        <DateTimePicker
                                            value={startHour || new Date()}
                                            mode="time"
                                            display="default"
                                            onChange={handleStartTimeChange} // Chamado ao selecionar a hora de início
                                        />
                                    )}
                                </View>
                                <View style={stylesTaf.hourFim}>
                                    <Text style={stylesTaf.txthourFim}>Final</Text>
                                    <TouchableOpacity style={stylesTaf.btnHour} onPress={() => setShowEndTimePicker(true)}>
                                        <Text style={stylesTaf.txtBtnHour}>
                                            {endHour ? endHour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'hh:mm'}
                                        </Text>
                                    </TouchableOpacity>
                                    {showEndTimePicker && (
                                        <DateTimePicker
                                            value={endHour || new Date()}
                                            mode="time"
                                            display="default"
                                            onChange={handleEndTimeChange} // Chamado ao selecionar a hora de término
                                        />
                                    )}
                                </View>
                            </View>
                            <View style={stylesTaf.notiTarefa}>
                                <TouchableOpacity
                                    style={stylesTaf.TarefaBTN}
                                    onPress={() => setNotificationEnabled(!notificationEnabled)}
                                >
                                    <View style={[stylesTaf.notifBall, notificationEnabled && stylesTaf.notifBallSelected]}></View>
                                </TouchableOpacity>
                                <Text style={stylesTaf.txtNotifTarefa}>Notificação</Text>
                            </View>
                            <View style={stylesTaf.descrTarefa}>
                                <TextInput
                                    style={stylesTaf.descrCampo}
                                    placeholder='Descrição'
                                    placeholderTextColor={'white'}
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>
                            <View style={stylesTaf.repeatTarefa}>
                                <Picker
                                    selectedValue={selectedRepeatOption}
                                    onValueChange={handleRepeatChange}
                                    style={stylesTaf.pickerRepeat}
                                    mode='dropdown'
                                    dropdownIconColor={'white'}
                                    dropdownStyle={stylesTaf.dropdown}
                                >
                                    <Picker.Item
                                        label="Não Repetir"
                                        value="none"
                                        style={stylesTaf.pickerItemNone}
                                    />
                                    <Picker.Item
                                        label="Diariamente"
                                        value="daily"
                                        style={stylesTaf.pickerItemDaily}
                                    />
                                    <Picker.Item
                                        label="Semanalmente"
                                        value="weekly"
                                        style={stylesTaf.pickerItemWeekly}
                                    />
                                    <Picker.Item
                                        label="Mensalmente"
                                        value="monthly"
                                        style={stylesTaf.pickerItemMonthly}
                                    />
                                     <Picker.Item
                                        label="Anualmente"
                                        value="yearly"
                                        style={stylesTaf.pickerItemYearly}
                                    />
                                </Picker>
                            </View>
                        </View>
                        
                        {errorMessage ? (
                            <View style={{
                                backgroundColor: '#ffcccc',
                                borderColor: '#ff4d4d',
                                borderWidth: 1,
                                borderRadius: 5,
                                padding: 10,
                                marginBottom: 10,
                            }}>
                                <Text style={{ color: '#b30000', textAlign: 'center' }}>
                                    {errorMessage}
                                </Text>
                            </View>
                        ) : null}

                        <View style={stylesTaf.btnBox}>
                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={stylesTaf.btnCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={saveTask}>
                                <Text style={stylesTaf.btnSave}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
