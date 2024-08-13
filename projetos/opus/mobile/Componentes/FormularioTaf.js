import React, { useState } from 'react';
import { View, Pressable, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import stylesTaf from '../Componentes/Styleformulariotaf'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ToDoList({ isModalVisible4, setModalVisible4 }) {
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

    const toggleModal = () => {
        if (isModalVisible4) {
            clearForm();
        }
        setModalVisible4(!isModalVisible4);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setSelectedDate(new Date(selectedDate));
        }
    };

    const handleStartTimeChange = (event, selectedTime) => {
        setShowStartTimePicker(false);
        if (selectedTime) {
            setStartHour(new Date(selectedTime));
        }
    };

    const handleEndTimeChange = (event, selectedTime) => {
        setShowEndTimePicker(false);
        if (selectedTime) {
            setEndHour(new Date(selectedTime));
        }
    };

    const handleRepeatChange = (itemValue) => {
        setSelectedRepeatOption(itemValue);
    };

    const clearForm = () => {
        setSelectedDate(null);
        setStartHour(null);
        setEndHour(null);
        setTitle('');
        setDescription('');
        setNotificationEnabled(false);
        setSelectedRepeatOption('none');
    };

    const saveTask = async () => {
        const task = {
            acao: 'salvar_tarefa',
            cor: null,
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
            const response = await fetch('http://10.135.60.16:8085/receber_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            const result = await response.json();

            if (result.erro) {
                console.error(result.mensagens);
            } else {
                console.log(result.mensagem);
                clearForm(); // Limpar o formulário após salvar a tarefa
                toggleModal(); // Fechar o modal após salvar a tarefa
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
                            <View style={stylesTaf.color}>
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
                                        value={selectedDate || new Date()} // Passe a data atual se a data ainda não foi selecionada
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
                                    style={stylesTaf.picker}
                                    mode="dropdown" // Define o modo como dropdown
                                    dropdownIconColor={'white'} // Define a cor do ícone de dropdown
                                    dropdownStyle={stylesTaf.dropdown} // Estiliza o dropdown
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
            </Modal >
        </View >
    )
}