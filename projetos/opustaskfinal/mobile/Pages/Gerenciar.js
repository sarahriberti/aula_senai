import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import Gerenciarstyles from '../Style/Gerenciarstyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';

const Gerenciarr = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senhaGer, setSenhaGer] = useState('');
    const [confirmarSenhaGer, setConfirmarSenhaGer] = useState('');
    const [novaSenhaGer, setNovaSenhaGer] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senhaveia, setSenhaveia] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                if (id) {
                    setUserId(id);
                    await fetchUserData(id);
                } else {
                    Alert.alert("Erro", "ID do usuário não encontrado.");
                }
            } catch (error) {
                console.error('Erro ao recuperar dados do usuário:', error);
            }
        };

        const fetchUserData = async (id) => {
            try {
                const response = await fetch('http://10.135.60.33:8085/receber_dados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_usuario: id }),
                });

                const data = await response.json();
                console.log("Dados recebidos do backend:", data);

                if (!data.erro) {
                    setNome(data.mensagem.nome);
                    const dataNasc = new Date(data.mensagem.data_nascimento);
                    setDataNascimento(
                        `${dataNasc.getDate().toString().padStart(2, '0')}/${(dataNasc.getMonth() + 1).toString().padStart(2, '0')}/${dataNasc.getFullYear()}`
                    );
                    setTelefone(data.mensagem.telefone);
                    setEmail(data.mensagem.email);
                } else {
                    Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                Alert.alert("Erro", "Ocorreu um erro ao tentar carregar os dados do usuário.");
            }
        };

        getUserData();
    }, []);

    const isValidDate = (date) => {
        const [day, month, year] = date.split('/').map(Number);
        return month >= 1 && month <= 12 && day >= 1 && day <= 31;
    };

    const isAdult = (date) => {
        const [day, month, year] = date.split('/').map(Number);
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
    };

    const handleGerenciar = async () => {
        if (novaSenhaGer !== confirmarSenhaGer && (novaSenhaGer || confirmarSenhaGer)) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        if (!isValidDate(dataNascimento)) {
            Alert.alert("Erro", "Data de nascimento inválida! O mês deve estar entre 01 e 12.");
            return;
        }

        const idade = isAdult(dataNascimento);
        if (idade < 12 || idade > 100) {
            Alert.alert("Erro", "A idade deve ser entre 12 e 100 anos.");
            return;
        }

        const formattedDate = dataNascimento.split('/').reverse().join('-');

        // Prepare os dados a serem enviados
        const data = {
            id: userId,
            nome,
            data_nascimento: formattedDate,
            email,
            celular: telefone,
            senhaveia,
            senha: novaSenhaGer || undefined,
        };

        console.log("Dados enviados para o backend:", data);

        try {
            const response = await fetch('http://10.135.60.33:8085/atualizar_cad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'update_cad',
                    ...data,
                }),
            });

            const result = await response.json();
            console.log("Resultado da atualização:", result);

            if (result.sucesso) {
                // Atualiza o nome no AsyncStorage
                await updateNomeAsync(nome);
                Alert.alert("Dados atualizados com sucesso!");
            } else {
                Alert.alert("Erro", result.mensagem || "Erro ao atualizar dados!");
            }
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
            Alert.alert("Erro ao atualizar dados:", error.message || "Erro desconhecido!");
        }
    };

    const updateNomeAsync = async (novoNome) => {
        try {
            await AsyncStorage.setItem('nome', novoNome);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePhoneChange = (text) => {
        setTelefone(formatPhoneNumber(text));
    };

    const formatPhoneNumber = (number) => {
        const cleaned = ('' + number).replace(/\D/g, '');
        return cleaned.length <= 10
            ? cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
            : cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
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
                    <TouchableOpacity onPress={() => navigation.navigate('GerenHelp')}  >
                        <Image source={require('../assets/ponto-de-interrogacao.png')} style={Gerenciarstyles.iconAjudaGe} />
                    </TouchableOpacity>
                    <View style={Gerenciarstyles.header}>
                        <Image style={Gerenciarstyles.perfil} resizeMode='contain' source={require('../assets/user.png')} />
                    </View>
                    <View style={Gerenciarstyles.dadosbasicos}>
                        <Text style={Gerenciarstyles.textNome}>Nome:</Text>
                        <TextInput style={Gerenciarstyles.input} value={nome} onChangeText={setNome} />
                        <Text style={Gerenciarstyles.textData}>Data de Nascimento:</Text>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '99/99/9999'
                            }}
                            style={Gerenciarstyles.input}
                            value={dataNascimento}
                            onChangeText={setDataNascimento}
                            placeholder="DD/MM/YYYY"
                        />
                        <Text style={Gerenciarstyles.textEmail}>Email:</Text>
                        <TextInput style={Gerenciarstyles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                        <Text style={Gerenciarstyles.textActualTelefone}>Telefone:</Text>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '(99) 9999-9999'
                            }}
                            style={Gerenciarstyles.input}
                            value={telefone}
                            onChangeText={handlePhoneChange}
                            placeholder="(XX) XXXX-XXXX"
                        />
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.password}>
                        <Text style={Gerenciarstyles.textActualSenha}>Senha atual:</Text>
                        <View style={Gerenciarstyles.inputContainer}>
                            <TextInput
                                style={Gerenciarstyles.inputField}
                                autoCorrect={false}
                                value={senhaveia}
                                onChangeText={setSenhaveia}
                                secureTextEntry={!senhaVisivel.senhaGer}
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={() => toggleSenhaVisibilidade('senhaGer')} style={Gerenciarstyles.iconWrapper}>
                                <Ionicons name={senhaVisivel.senhaGer ? 'eye-off' : 'eye'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={Gerenciarstyles.textActualSenha}>Nova Senha:</Text>
                        <View style={Gerenciarstyles.inputContainer}>
                            <TextInput
                                style={Gerenciarstyles.inputField}
                                autoCorrect={false}
                                value={novaSenhaGer}
                                onChangeText={setNovaSenhaGer}
                                secureTextEntry={!senhaVisivel.novaSenhaGer}
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={() => toggleSenhaVisibilidade('novaSenhaGer')} style={Gerenciarstyles.iconWrapper}>
                                <Ionicons name={senhaVisivel.novaSenhaGer ? 'eye-off' : 'eye'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={Gerenciarstyles.textActualSenha}>Confirmar Senha:</Text>
                        <View style={Gerenciarstyles.inputContainer}>
                            <TextInput
                                style={Gerenciarstyles.inputField}
                                autoCorrect={false}
                                value={confirmarSenhaGer}
                                onChangeText={setConfirmarSenhaGer}
                                secureTextEntry={!senhaVisivel.confirmarSenhaGer}
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={() => toggleSenhaVisibilidade('confirmarSenhaGer')} style={Gerenciarstyles.iconWrapper}>
                                <Ionicons name={senhaVisivel.confirmarSenhaGer ? 'eye-off' : 'eye'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleGerenciar} style={Gerenciarstyles.btnSave}>
                        <Text style={Gerenciarstyles.btnBox}>Atualizar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Gerenciarr;