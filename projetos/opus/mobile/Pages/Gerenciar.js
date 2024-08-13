import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import Gerenciarstyles from '../Componentes/Gerenciarstyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gerenciarr = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senhaGer, setSenhaGer] = useState('');
    const [confirmarSenhaGer, setConfirmarSenhaGer] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [novaSenhaGer, setNovaSenhaGer] = useState('');
    const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário

    useEffect(() => {
        // Recuperar o ID do usuário armazenado no AsyncStorage
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('ID');
                if (id !== null) {
                    setUserId(id);
                }
            } catch (error) {
                console.error('Erro ao recuperar o ID do usuário:', error);
            }
        };

        getUserId();
    }, []);

    const handleGerenciar = async () => {
        if (novaSenhaGer !== confirmarSenhaGer) {
            Alert.alert("Erro: As senhas não coincidem!");
            return;
        }

        const data = {
            id: userId, // Usar o ID do usuário recuperado
            nome: nome,
            data_nascimento: dataNascimento,
            senha: novaSenhaGer, // Usando a nova senha inserida
            email: email,
            celular: telefone
        };

        try {
            await fetch('http://10.135.60.21:8085/atualizar_cad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  acao: 'update_cad',
                                        id: data.id, 
                                        nome: data.nome, 
                                        data_nascimento: data.data_nascimento,
                                        celular: data.celular,
                                        email: data.email,
                                        senha: data.senha
                                    }),
            });

            Alert.alert("Dados atualizados com sucesso!");
        } catch (error) {
            console.error(error);
            Alert.alert("Erro ao atualizar dados!");
        }
    };

    const [senhaVisivel, setSenhaVisivel] = useState({
        senhaGer: false,
        novaSenhaGer: false,
        confirmarSenhaGer: false
    });

    const toggleSenhaVisibilidade = (campo) => {
        setSenhaVisivel(prevState => ({
            ...prevState,
            [campo]: !prevState[campo]
        }));
    };

    return (
        <KeyboardAvoidingView style={Gerenciarstyles.background}>
            <View style={Gerenciarstyles.main}>
                <ScrollView keyboardShouldPersistTaps='handled' style={Gerenciarstyles.container}>
                    <View style={Gerenciarstyles.header}>
                        <Image style={Gerenciarstyles.perfil} resizeMode='contain' source={require('../assets/Images/user.png')} />
                    </View>
                    <View style={Gerenciarstyles.dadosbasicos}>
                        <Text style={Gerenciarstyles.textNome}>Nome:</Text>
                        <TextInput style={Gerenciarstyles.input} value={nome} onChangeText={setNome} />
                        <Text style={Gerenciarstyles.textData}>Data de Nascimento:</Text>
                        <TextInput style={Gerenciarstyles.input} value={dataNascimento} onChangeText={setDataNascimento} />
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.password}>
                        <Text style={Gerenciarstyles.textActualSenha}>Senha atual:</Text>
                        <View style={Gerenciarstyles.inputContainer}>
                            <TextInput
                                style={Gerenciarstyles.inputField}
                                autoCorrect={false}
                                value={senhaGer}
                                onChangeText={setSenhaGer}
                                accessibilityLabel="Senha Gerenciar"
                                secureTextEntry={!senhaVisivel.senhaGer}
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={() => toggleSenhaVisibilidade('senhaGer')} style={Gerenciarstyles.iconWrapper}>
                                <Ionicons name={senhaVisivel.senhaGer ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <Text onPress={() => navigation.navigate('EsqueciSenha', { originScreen: 'Gerenciar' })} style={Gerenciarstyles.textEsqueciSenha}>Esqueceu sua senha ?</Text>

                        <Text style={Gerenciarstyles.textNewSenha}>Nova senha:</Text>
                        <View style={Gerenciarstyles.inputContainer}>
                            <TextInput
                                style={Gerenciarstyles.inputField}
                                autoCorrect={false}
                                value={novaSenhaGer}
                                onChangeText={setNovaSenhaGer}
                                accessibilityLabel="Nova Senha Gerenciar"
                                secureTextEntry={!senhaVisivel.novaSenhaGer}
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={() => toggleSenhaVisibilidade('novaSenhaGer')} style={Gerenciarstyles.iconWrapper}>
                                <Ionicons name={senhaVisivel.novaSenhaGer ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <Text style={Gerenciarstyles.textConfSenha}>Confirmar senha:</Text>
                        <View style={Gerenciarstyles.inputContainer}>
                            <TextInput
                                style={Gerenciarstyles.inputField}
                                autoCorrect={false}
                                value={confirmarSenhaGer}
                                onChangeText={setConfirmarSenhaGer}
                                accessibilityLabel="Confirmar Senha Gerenciar"
                                secureTextEntry={!senhaVisivel.confirmarSenhaGer}
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={() => toggleSenhaVisibilidade('confirmarSenhaGer')} style={Gerenciarstyles.iconWrapper}>
                                <Ionicons name={senhaVisivel.confirmarSenhaGer ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.email}>
                        <Text style={Gerenciarstyles.textExEmail}></Text>
                        <Text style={Gerenciarstyles.textNewEmail}>Novo e-mail:</Text>
                        <TextInput style={Gerenciarstyles.input} value={email} onChangeText={setEmail} />
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.telefone}>
                        <Text style={Gerenciarstyles.textActualTelefone}></Text>
                        <Text style={Gerenciarstyles.textNewTelefone}>Novo telefone:</Text>
                        <TextInput style={Gerenciarstyles.input}  onChangeText={setTelefone} />
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.btnBox}>
                        <TouchableOpacity style={Gerenciarstyles.btnSave} onPress={handleGerenciar}>
                            <Text style={Gerenciarstyles.submitTxt}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Gerenciarstyles.btnCancel}>
                            <Text style={Gerenciarstyles.submitTxt}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Gerenciarr;