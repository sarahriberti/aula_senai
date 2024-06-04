import React, { useState } from 'react';
import { View, Pressable, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import stylesTaf from '../Componentes/Styleformulariotaf'

export default function ToDoList() {
    // Define os estados necessários para o componente usando useState
    const [isModalVisible4, setModalVisible4] = useState(false); // Estado para controlar a visibilidade do modal
    const [selectedDate, setSelectedDate] = useState(null); // Estado para armazenar a data selecionada
    const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar a visibilidade do DatePicker
    const [startHour, setStartHour] = useState(null); // Estado para armazenar a hora de início
    const [endHour, setEndHour] = useState(null); // Estado para armazenar a hora de fim
    const [showStartTimePicker, setShowStartTimePicker] = useState(false); // Estado para controlar a visibilidade do DatePicker de início
    const [showEndTimePicker, setShowEndTimePicker] = useState(false); // Estado para controlar a visibilidade do DatePicker de fim
    const [notificationEnabled, setNotificationEnabled] = useState(false); // Estado para controlar se a notificação está habilitada
    const [selectedRepeatOption, setSelectedRepeatOption] = useState('none'); // Estado para armazenar a opção de repetição selecionada
    
    // Função para alternar a visibilidade do modal
    const toggleModal = () => {
        setModalVisible4(!isModalVisible4);
    };

    // Função para lidar com a mudança de data no DatePicker
    const handleDateChange = (selectedDate) => {
        setShowDatePicker(false); // Fecha o DatePicker
        if (selectedDate !== undefined) {
            setSelectedDate(selectedDate); // Define a data selecionada
        }
    };

    // Função para lidar com a mudança de hora de início no DatePicker
    const handleStartTimeChange = (selectedTime) => {
        setShowStartTimePicker(false); // Fecha o DatePicker de início
        if (selectedTime !== undefined) {
            setStartHour(selectedTime); // Define a hora de início selecionada
        }
    };

    // Função para lidar com a mudança de hora de fim no DatePicker
    const handleEndTimeChange = (selectedTime) => {
        setShowEndTimePicker(false); // Fecha o DatePicker de fim
        if (selectedTime !== undefined) {
            setEndHour(selectedTime); // Define a hora de fim selecionada
        }
    };

    // Função para lidar com a mudança de opção de repetição
    const handleRepeatChange = (itemValue) => {
        setSelectedRepeatOption(itemValue); // Define a opção de repetição selecionada
    };

    // Renderiza o componente
    return (
        <View style={stylesTaf.main}> // View principal do componente, estilizada com os estilos de 'main' de stylesTaf
            <Pressable style={stylesTaf.btnToDo} onPress={toggleModal}> // Botão que, quando pressionado, alterna a visibilidade do modal
                <Image style={stylesTaf.btnImage} resizeMode='contain' source={require('../assets/Images/nha.png')} /> // Imagem do botão, estilizada com os estilos de 'btnImage' de stylesTaf
            </Pressable>
            <Modal isVisible={isModalVisible4} onBackdropPress={toggleModal}> // Modal que, quando visível, mostra o conteúdo abaixo. Fecha ao pressionar o fundo
                <View style={stylesTaf.modalMain}> // View principal do modal, estilizada com os estilos de 'modalMain' de stylesTaf
                    <View style={stylesTaf.modal}> // View do conteúdo do modal, estilizada com os estilos de 'modal' de stylesTaf
                        <View style={stylesTaf.container}> // Container principal, estilizado com os estilos de 'container' de stylesTaf
                            <View style={stylesTaf.nameBox}> // View para o título do modal, estilizada com os estilos de 'nameBox' de stylesTaf
                                <Text style={stylesTaf.titleModal}>TAREFA</Text> // Texto do título do modal, estilizado com os estilos de 'titleModal' de stylesTaf
                            </View>
                            <View style={stylesTaf.color}> // View para definir a cor, estilizada com os estilos de 'color' de stylesTaf
                                
                            </View>
                            <View style={stylesTaf.titleTarefa}> // View para o título da tarefa, estilizada com os estilos de 'titleTarefa' de stylesTaf
                                <Text style={stylesTaf.txtTitle}>Título</Text> // Texto "Título", estilizado com os estilos de 'txtTitle' de stylesTaf
                                <TextInput style={stylesTaf.titleBox} /> // Campo de entrada de texto para o título, estilizado com os estilos de 'titleBox' de stylesTaf
                            </View>
                            <View style={stylesTaf.dateTarefa}> // View para a data da tarefa, estilizada com os estilos de 'dateTarefa' de stylesTaf
                                <Text style={stylesTaf.txtDate}>Data</Text> // Texto "Data", estilizado com os estilos de 'txtDate' de stylesTaf
                                <TouchableOpacity style={stylesTaf.dateBoxBtn} onPress={() => setShowDatePicker(true)}> // Botão para abrir o DatePicker de data
                                    <Text style={stylesTaf.txtDateInt}>{selectedDate ? selectedDate.toLocaleDateString() : 'dd/mm/aaaa'}</Text> // Texto que mostra a data selecionada ou um placeholder
                                </TouchableOpacity>
                                {showDatePicker && ( // Se showDatePicker for true, mostra o DateTimePicker de data
                                    <DateTimePicker
                                        value={selectedDate || new Date()} // Define a data atual se a data ainda não foi selecionada
                                        mode="date" // Define o modo como "date" para selecionar a data
                                        display="default" // Define o display padrão
                                        onChange={handleDateChange} // Define a função de callback ao mudar a data
                                    />
                                )}
                            </View>
                            <View style={stylesTaf.hourTarefa}> // View para as horas da tarefa, estilizada com os estilos de 'hourTarefa' de stylesTaf
                                <View style={stylesTaf.hourIni}> // View para a hora de início, estilizada com os estilos de 'hourIni' de stylesTaf
                                    <Text style={stylesTaf.txthourIni}>Início</Text> // Texto "Início", estilizado com os estilos de 'txthourIni' de stylesTaf
                                    <TouchableOpacity style={stylesTaf.btnHour} onPress={() => setShowStartTimePicker(true)}> // Botão para abrir o DatePicker de hora de início
                                        <Text style={stylesTaf.txtBtnHour}>{startHour ? startHour.toLocaleTimeString() : 'hh:mm'}</Text> // Texto que mostra a hora de início selecionada ou um placeholder
                                    </TouchableOpacity>
                                    {showStartTimePicker && ( // Se showStartTimePicker for true, mostra o DateTimePicker de hora de início
                                        <DateTimePicker
                                            value={startHour || new Date()} // Define a hora atual se a hora ainda não foi selecionada
                                            mode="time" // Define o modo como "time" para selecionar a hora
                                            display="default" // Define o display padrão
                                            onChange={handleStartTimeChange} // Define a função de callback ao mudar a hora de início
                                        />
                                    )}
                                </View>
                                <View style={stylesTaf.hourFim}> // View para a hora de fim, estilizada com os estilos de 'hourFim' de stylesTaf
                                    <Text style={stylesTaf.txthourFim}>Final</Text> // Texto "Final", estilizado com os estilos de 'txthourFim' de stylesTaf
                                    <TouchableOpacity style={stylesTaf.btnHour} onPress={() => setShowEndTimePicker(true)}> // Botão para abrir o DatePicker de hora de fim
                                        <Text style={stylesTaf.txtBtnHour}>{endHour ? endHour.toLocaleTimeString() : 'hh:mm'}</Text> // Texto que mostra a hora de fim selecionada ou um placeholder
                                    </TouchableOpacity>
                                    {showEndTimePicker && ( // Se showEndTimePicker for true, mostra o DateTimePicker de hora de fim
                                        <DateTimePicker
                                            value={endHour || new Date()} // Define a hora atual se a hora ainda não foi selecionada
                                            mode="time" // Define o modo como "time" para selecionar a hora
                                            display="default" // Define o display padrão
                                            onChange={handleEndTimeChange} // Define a função de callback ao mudar a hora de fim
                                        />
                                    )}
                                </View>
                            </View>
                            <View style={stylesTaf.notiTarefa}> // View para a notificação da tarefa, estilizada com os estilos de 'notiTarefa' de stylesTaf
                                <TouchableOpacity
                                    style={stylesTaf.TarefaBTN} // Botão para alternar a habilitação da notificação, estilizado com os estilos de 'TarefaBTN' de stylesTaf
                                    onPress={() => setNotificationEnabled(!notificationEnabled)} // Alterna o estado de habilitação da notificação
                                >
                                    <View style={[stylesTaf.notifBall, notificationEnabled && stylesTaf.notifBallSelected]}></View> // View para mostrar o estado da notificação, com estilo condicional
                                </TouchableOpacity>
                                <Text style={stylesTaf.txtNotifTarefa}>Notificação</Text> // Texto "Notificação", estilizado com os estilos de 'txtNotifTarefa' de stylesTaf
                            </View>
                            <View style={stylesTaf.descrTarefa}> // View para a descrição da tarefa, estilizada com os estilos de 'descrTarefa' de stylesTaf
                                <TextInput
                                    style={stylesTaf.descrCampo} // Campo de entrada de texto para a descrição, estilizado com os estilos de 'descrCampo' de stylesTaf
                                    placeholder='Descrição' // Placeholder do campo de descrição
                                    placeholderTextColor={'white'} // Cor do texto do placeholder
                                />
                            </View>
                            <View style={stylesTaf.repeatTarefa}> // View para a repetição da tarefa, estilizada com os estilos de 'repeatTarefa' de stylesTaf
                                <Picker
                                    selectedValue={selectedRepeatOption} // Define o valor selecionado no Picker
                                    onValueChange={handleRepeatChange} // Função de callback ao mudar a opção de repetição
                                    style={stylesTaf.picker} // Estiliza o Picker com os estilos de 'picker' de stylesTaf
                                    mode="dropdown" // Define o modo como dropdown
                                    dropdownIconColor={'white'} // Define a cor do ícone de dropdown
                                    dropdownStyle={stylesTaf.dropdown} // Estiliza o dropdown
                                >
                                    <Picker.Item
                                        label="Não Repetir"
                                        value="none"
                                        style={stylesTaf.pickerItemNone} // Estiliza o item "Não Repetir" com os estilos de 'pickerItemNone' de stylesTaf
                                    />
                                    <Picker.Item
                                        label="Diariamente"
                                        value="daily"
                                        style={stylesTaf.pickerItemDaily} // Estiliza o item "Diariamente" com os estilos de 'pickerItemDaily' de stylesTaf
                                    />
                                    <Picker.Item
                                        label="Semanalmente"
                                        value="weekly"
                                        style={stylesTaf.pickerItemWeekly} // Estiliza o item "Semanalmente" com os estilos de 'pickerItemWeekly' de stylesTaf
                                    />
                                    <Picker.Item
                                        label="Mensalmente"
                                        value="monthly"
                                        style={stylesTaf.pickerItemMonthly} // Estiliza o item "Mensalmente" com os estilos de 'pickerItemMonthly' de stylesTaf
                                    />
                                    <Picker.Item
                                        label="Anualmente"
                                        value="yearly"
                                        style={stylesTaf.pickerItemYearly} // Estiliza o item "Anualmente" com os estilos de 'pickerItemYearly' de stylesTaf
                                    />
                                </Picker>
                            </View>
                        </View>
                        <View style={stylesTaf.btnBox}> // View para os botões de ações, estilizada com os estilos de 'btnBox' de stylesTaf
                            <TouchableOpacity onPress={toggleModal}> // Botão para cancelar e fechar o modal
                                <Text style={stylesTaf.btnCancelar}>Cancelar</Text> // Texto do botão "Cancelar", estilizado com os estilos de 'btnCancelar' de stylesTaf
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleModal}> // Botão para salvar e fechar o modal
                                <Text style={stylesTaf.btnSave}>Salvar</Text> // Texto do botão "Salvar", estilizado com os estilos de 'btnSave' de stylesTaf
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
