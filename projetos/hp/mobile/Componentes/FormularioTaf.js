import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import stylesTaf from './Styleformulariotaf';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para converter data para UTC
function convertToUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

// Função para converter data de UTC para local
function convertFromUTC(date) {
    return new Date(date);
}

export default function FormularioTaf({ isModalVisible4, setModalVisible4, onAddTask, selectedTask }) {
    const [taskID, setTaskID] = useState(null);
    const [taskID_Usu, setTaskID_Usu] = useState(null);
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
    const [color, setColor] = useState('#252942');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (selectedTask) {
            setTaskID_Usu(selectedTask.ID_Usu);
            setTaskID(selectedTask.ID);

            // Converta a data UTC de volta para a data local
            const loadedDate = new Date(selectedTask.Data + 'T00:00:00Z');
            setSelectedDate(convertFromUTC(loadedDate));

            setStartHour(selectedTask.Hora_Ini ? new Date(`1970-01-01T${selectedTask.Hora_Ini}:00`) : null);
            setEndHour(selectedTask.Hora_Fin ? new Date(`1970-01-01T${selectedTask.Hora_Fin}:00`) : null);           
            setTitle(selectedTask.Titulo);
            setDescription(selectedTask.Descr);
            setNotificationEnabled(selectedTask.Notific);
            setSelectedRepeatOption(selectedTask.Repetir);
            setColor(selectedTask.Cor);
        } else {
            clearForm();
        }
    }, [selectedTask]);

    const toggleModal = () => {
        if (!isModalVisible4) {
            clearForm();
        }
        setModalVisible4(!isModalVisible4);
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleStartTimeChange = (event, time) => {
        setShowStartTimePicker(false);
        if (time) {
            setStartHour(time);
        }
    };

    const handleEndTimeChange = (event, time) => {
        setShowEndTimePicker(false);
        if (time) {
            setEndHour(time);
        }
    };

    const handleRepeatChange = (itemValue) => {
        setSelectedRepeatOption(itemValue);
    };

    const clearForm = () => {
        setTaskID_Usu(null);
        setTaskID(null);
        setSelectedDate(null);
        setStartHour(null);
        setEndHour(null);
        setTitle('');
        setDescription('');
        setNotificationEnabled(false);
        setSelectedRepeatOption('none');
        setColor('#252942');
        setErrorMessage('');
    };

    const saveTask = async () => {
        if (!title || !selectedDate || !startHour || !endHour) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setErrorMessage('');

        const userId = await AsyncStorage.getItem('ID_Usu'); 
        console.log('User ID:', userId); // Verifica se o valor do ID está correto

        // Converta a data para UTC
        const utcDate = convertToUTC(selectedDate);

        const task = {
            action: selectedTask ? 'atualizar_tarefa' : 'salvar_tarefa',
            Cor: color,
            Titulo: title,
            Data: utcDate.toISOString().split('T')[0], // Salve a data no formato YYYY-MM-DD
            Hora_Ini: startHour instanceof Date ? startHour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : null,
            Hora_Fin: endHour instanceof Date ? endHour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : null,
            Notific: notificationEnabled,
            Descr: description,
            Repetir: selectedRepeatOption,
            ID_Usu: userId,
            taskID: selectedTask ? selectedTask.ID : null,
        };

        console.log('Task data:', task);

        try {
            const response = await fetch(selectedTask ? 'http://10.135.60.16:8085/atualizar_tarefa' : 'http://10.135.60.16:8085/receber_dados', {
                method: selectedTask ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Response result:', result);

            if (result.erro) {
                setErrorMessage(result.mensagens);
            } else {
                console.log('Tarefa salva e adicionada ao calendário.');

                clearForm();
                toggleModal();
                onAddTask({ ...task, taskID: result.taskID || task.taskID });
            }
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
            setErrorMessage('Erro ao salvar a tarefa. Por favor, tente novamente.');
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
                                        onChange={handleDateChange}
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
                                            onChange={handleStartTimeChange}
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
                                            onChange={handleEndTimeChange}
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
                            {errorMessage && (
                                <View style={{
                                    backgroundColor: '#ffcccc',
                                    borderColor: '#ff4d4d',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    padding: 10,
                                    marginTop: 10,
                                }}>
                                    <Text style={{ color: '#b30000', textAlign: 'center' }}>
                                        {Array.isArray(errorMessage) ? errorMessage.map((msg, index) => (
                                            <Text key={index}>{msg.mensagem}</Text>
                                        )) : errorMessage}
                                    </Text>
                                </View>
                            )}

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
                </View>
            </Modal>
        </View>
    );
}