import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import stylesTaf from '../Style/Styleformulariotaf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorPicker from 'react-native-wheel-color-picker'
// Funções para manipulação de data e hora
function combineDateTime(date, time) {
    const combined = new Date(date);
    combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return combined;
}

function extractDate(datetime) {
    return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate());
}

function extractTime(datetime) {
    return new Date(1970, 0, 1, datetime.getHours(), datetime.getMinutes());
}

export default function FormularioTaf({ isModalVisible4, setModalVisible4, onAddTask, selectedTask }) {
    const [taskID, setTaskID] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskID_Usu, setTaskID_Usu] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startHour, setStartHour] = useState(null);
    const [endHour, setEndHour] = useState(null);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [selectedCategOption, setSelectedCategOption] = useState('');
    const [selectedRepeatOption, setSelectedRepeatOption] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#252942');
    const [errorMessage, setErrorMessage] = useState('');
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    useEffect(() => {
        if (selectedTask) {
            setTaskID_Usu(selectedTask.ID_Usu);
            setTaskID(selectedTask.ID);
            const startDate = new Date(selectedTask.Inicio);
            const endDate = new Date(selectedTask.Termino);
            setSelectedStartDate(extractDate(startDate));
            setSelectedEndDate(extractDate(endDate));
            setStartHour(extractTime(startDate));
            setEndHour(extractTime(endDate));
            setTitle(selectedTask.Titulo);
            setDescription(selectedTask.Descr);
            setNotificationEnabled(selectedTask.Notific);
            setSelectedCategOption(selectedTask.Categoria);
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

    const handleStartDateChange = (event, date) => {
        setShowStartDatePicker(false);
        if (date) {
            setSelectedStartDate(date);
        }
    };

    const handleEndDateChange = (event, date) => {
        setShowEndDatePicker(false);
        if (date) {
            setSelectedEndDate(date);
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

    const updateTaskInList = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskID === updatedTask.taskID ? updatedTask : task
            )
        );
    };

    const clearForm = () => {
        setTaskID_Usu(null);
        setTaskID(null);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setStartHour(null);
        setEndHour(null);
        setTitle('');
        setDescription('');
        setNotificationEnabled(false);
        setSelectedCategOption('');
        setSelectedRepeatOption('');
        setColor('#252942');
        setErrorMessage('');
    };

    const refreshTaskList = async () => {
        try {
            const userId = await AsyncStorage.getItem('id');
            if (!userId) {
                setErrorMessage('ID do usuário não encontrado');
                return;
            }

            const response = await fetch(`http://10.135.60.28:8085/tasks?userId=${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const result = await response.json();

            if (result.erro) {
                setErrorMessage(result.mensagens);
            } else {
                setTasks(result.tarefas || []);  // Garantir que tasks seja sempre um array
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            setErrorMessage('Erro ao carregar tarefas');
        }
    };

    const saveTask = async () => {
        if (!title || !selectedStartDate || !startHour || !selectedEndDate || !endHour) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setErrorMessage('');

        const userId = await AsyncStorage.getItem('id');
        const inicio = combineDateTime(selectedStartDate, startHour);
        const termino = combineDateTime(selectedEndDate, endHour);

        const task = {
            action: selectedTask ? 'atualizar_tarefa' : 'salvar_tarefa',
            Cor: color,
            Titulo: title,
            Inicio: inicio.toISOString(),
            Termino: termino.toISOString(),
            Notific: notificationEnabled,
            Descr: description,
            Categoria: selectedCategOption,
            Repetir: selectedRepeatOption,
            ID_Usu: userId,
            taskID: selectedTask ? selectedTask.ID : null,
        };

        try {
            const response = await fetch(selectedTask ? 'http://10.135.60.28:8085/atualizar_tarefa' : 'http://10.135.60.28:8085/receber_dados', {
                method: selectedTask ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });

            const result = await response.json();

            if (result.erro) {
                setErrorMessage(result.mensagens);
            } else {
                clearForm();
                toggleModal();
                if (selectedTask) {
                    // Atualiza diretamente a lista no estado
                    updateTaskInList({
                        ...task,
                        taskID: selectedTask.ID, // Atualize a tarefa existente
                        Inicio: inicio.toISOString(),
                        Termino: termino.toISOString(),
                    });
                } else {
                    // Adiciona uma nova tarefa
                    onAddTask({ ...task, taskID: result.taskID });
                }

                // Atualiza a lista de tarefas após salvar
                refreshTaskList();
            }
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
            setErrorMessage('Erro ao salvar a tarefa. Por favor, tente novamente.');
        }
    };

    return (
        <View style={stylesTaf.main}>
            <Pressable style={stylesTaf.btnToDo} onPress={toggleModal}>
                <Image style={stylesTaf.btnImage} resizeMode='contain' source={require('../assets/maizola.png')} />
            </Pressable>
            <Modal isVisible={isModalVisible4} onBackdropPress={toggleModal}>
                <View style={stylesTaf.modalMain}>
                    <View style={stylesTaf.modal}>
                        <View style={stylesTaf.container}>
                            <View style={stylesTaf.nameBox}>

                                <Text style={stylesTaf.titleModal}>TAREFA</Text>

                            </View>
                            <View style={stylesTaf.row}>

                                <TouchableOpacity
                                    style={[stylesTaf.colorCircle, { backgroundColor: color }]}
                                    onPress={() => setColorPickerVisible(true)}
                                />
                                <Text style={stylesTaf.txtDate2}>Cor</Text>
                            </View>


                            {colorPickerVisible && (
                                <Modal
                                    isVisible={colorPickerVisible}
                                    
                                >
                                    <View style={stylesTaf.colorPickerContainer}>
                                        <TouchableOpacity
                                            style={stylesTaf.closeButton}
                                            onPress={() => setColorPickerVisible(false)}

                                        >
                                            <Image
                                                source={require('../assets/x.png')} // Coloque o caminho correto para sua imagem
                                                style={stylesTaf.closeButtonImage} // Estilos para a imagem
                                            />

                                        </TouchableOpacity>
                                        <ColorPicker
                                            color={color}
                                            onColorChange={setColor}
                                            style={{ height: 50, width: 200 }}
                                        />

                                    </View>
                                </Modal>
                            )}
                            <View style={stylesTaf.titleTarefa}>
                                <Text style={stylesTaf.txtTitle}>Título</Text>
                                <TextInput
                                    style={stylesTaf.titleBox}
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>



                            {/* Data e Horário de Início */}
                            <View style={stylesTaf.datetimeInicioTarefa}>
                                <View style={stylesTaf.dateInicioTarefa}>
                                    <Text style={stylesTaf.txtDate}>Início</Text>
                                    <TouchableOpacity style={stylesTaf.dateBoxBtn} onPress={() => setShowStartDatePicker(true)}>
                                        <Text style={stylesTaf.txtDateInt}>
                                            {selectedStartDate ? selectedStartDate.toLocaleDateString('pt-BR') : 'dd/mm/aaaa'}
                                        </Text>
                                    </TouchableOpacity>
                                    {showStartDatePicker && (
                                        <DateTimePicker
                                            value={selectedStartDate || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleStartDateChange}
                                        />
                                    )}
                                </View>
                                <View style={stylesTaf.hourIni}>
                                    <Text style={stylesTaf.txthourIni}></Text>
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
                            </View>

                            <View style={stylesTaf.datetimeTerminoTarefa}>
                                {/* Data e Horário de Término */}
                                <View style={stylesTaf.terminoDataHora}>
                                    <Text style={stylesTaf.txtDate}>Término</Text>
                                    <TouchableOpacity style={stylesTaf.dateBoxBtn} onPress={() => setShowEndDatePicker(true)}>
                                        <Text style={stylesTaf.txtDateInt}>
                                            {selectedEndDate ? selectedEndDate.toLocaleDateString('pt-BR') : 'dd/mm/aaaa'}
                                        </Text>
                                    </TouchableOpacity>
                                    {showEndDatePicker && (
                                        <DateTimePicker
                                            value={selectedEndDate || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={handleEndDateChange}
                                        />
                                    )}
                                </View>
                                <View style={stylesTaf.hourFim}>
                                    <Text style={stylesTaf.txthourFim}></Text>
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
                            <View style={stylesTaf.categTarefa}>
                                <Picker
                                    selectedValue={selectedCategOption} // Corrigido para usar o estado correto
                                    onValueChange={(itemValue) => setSelectedCategOption(itemValue)} // Garante que o estado correto seja atualizado
                                    style={stylesTaf.pickerCateg}
                                    mode="dropdown"
                                    dropdownIconColor={'white'}
                                    dropdownStyle={stylesTaf.dropdown}
                                >
                                    <Picker.Item label="Lazer" value="1" style={stylesTaf.pickerItemFun} />
                                    <Picker.Item label="Escola" value="2" style={stylesTaf.pickerItemStudy} />
                                    <Picker.Item label="Trabalho" value="3" style={stylesTaf.pickerItemWork} />
                                    <Picker.Item label="Saúde" value="4" style={stylesTaf.pickerItemHealth} />
                                    <Picker.Item label="Família" value="5" style={stylesTaf.pickerItemFamily} />
                                </Picker>

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
                                        label="Diariamente"
                                        value="1"
                                        style={stylesTaf.pickerItemDaily}
                                    />
                                    <Picker.Item
                                        label="Semanalmente"
                                        value="2"
                                        style={stylesTaf.pickerItemWeekly}
                                    />
                                    <Picker.Item
                                        label="Mensalmente"
                                        value="3"
                                        style={stylesTaf.pickerItemMonthly}
                                    />
                                    <Picker.Item
                                        label="Anualmente"
                                        value="4"
                                        style={stylesTaf.pickerItemYearly}
                                    />
                                    <Picker.Item
                                        label="Nunca"
                                        value="5"
                                        style={stylesTaf.pickerItemNone}
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