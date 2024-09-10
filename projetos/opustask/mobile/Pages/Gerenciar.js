import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import Gerenciarstyles from '../Componentes/Gerenciarstyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';

const Gerenciarr = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senhaGer, setSenhaGer] = useState('');
    const [confirmarSenhaGer, setConfirmarSenhaGer] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [novaSenhaGer, setNovaSenhaGer] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [telUsuario, setTelUsuario] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const id = await AsyncStorage.getItem('ID');
                if (id !== null) {
                    setUserId(id);
                }

                const storedEmail = await AsyncStorage.getItem('Email');
                if (storedEmail) {
                    setEmailUsuario(storedEmail);
                }

                const storedTel = await AsyncStorage.getItem('Celular');
                if (storedTel) {
                    setTelUsuario(storedTel);
                }

                if (id !== null) {
                    await fetchUserData(id);
                }
            } catch (error) {
                console.error('Erro ao recuperar dados do usuário:', error);
            }
        };

        const fetchUserData = async (id) => {
            try {
                const response = await fetch('http://10.135.60.16:8085/receber_dados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_usuario: id,
                    }),
                });

                const data = await response.json();
                console.log("Dados recebidos do backend:", data);

                if (!data.erro) {
                    setNome(data.mensagem[1]);

                    const dataNasc = new Date(data.mensagem[2]);
                    setDataNascimento(
                        `${dataNasc.getDate().toString().padStart(2, '0')}/${(dataNasc.getMonth() + 1).toString().padStart(2, '0')}/${dataNasc.getFullYear()}`
                    );

                    setTelefone(data.mensagem[3]);
                    setEmail(data.mensagem[4]);
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
        const isMonthValid = month >= 1 && month <= 12;
        const isDateValid = day >= 1 && day <= 31; // Basic validation; you might want to refine this

        return isMonthValid && isDateValid;
    };

    const isAdult = (date) => {
        const [day, month, year] = date.split('/').map(Number);
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }

        return age;
    };

    const handleGerenciar = async () => {
        if (novaSenhaGer !== confirmarSenhaGer) {
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

        const data = {
            id: userId,
            nome: nome,
            data_nascimento: formattedDate,
            senhaveia: senhaGer,
            senha: novaSenhaGer,
            email: email,
            celular: telefone,
        };

        console.log("Dados enviados para o backend:", data);

        try {
            const response = await fetch('http://10.135.60.16:8085/atualizar_cad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acao: 'update_cad',
                    id: data.id,
                    nome: data.nome,
                    data_nascimento: data.data_nascimento,
                    celular: data.celular,
                    email: data.email,
                    senha: data.senha,
                    senhaveia: data.senhaveia
                }),
            });

            const result = await response.json();
            console.log("Resultado da atualização:", result);

            if (result.sucesso) {
                Alert.alert("Dados atualizados com sucesso!");
            } else {
                Alert.alert("Erro", result.mensagem || "Erro ao atualizar dados!");
            }
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
            Alert.alert("Erro ao atualizar dados!");
        }
    };
    const handlePhoneChange = (text) => {
        setTelefone(formatPhoneNumber(text));
    };

    const formatPhoneNumber = (number) => {
        const cleaned = ('' + number).replace(/\D/g, '');
        if (cleaned.length <= 10) {
            return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else {
            return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
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

                        <Text style={Gerenciarstyles.textConfirmarNovaSenha}>Confirmar nova senha:</Text>
                        <View style={Gerenciarstyles.inputContainer}>
                            <TextInput
                                style={Gerenciarstyles.inputField}
                                autoCorrect={false}
                                value={confirmarSenhaGer}
                                onChangeText={setConfirmarSenhaGer}
                                accessibilityLabel="Confirmar Nova Senha Gerenciar"
                                secureTextEntry={!senhaVisivel.confirmarSenhaGer}
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={() => toggleSenhaVisibilidade('confirmarSenhaGer')} style={Gerenciarstyles.iconWrapper}>
                                <Ionicons name={senhaVisivel.confirmarSenhaGer ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.contato}>
                        <Text style={Gerenciarstyles.textEmail}>E-mail:</Text>
                        <TextInput style={Gerenciarstyles.input} value={email} onChangeText={setEmail} />
                        <Text style={Gerenciarstyles.textTelefone}>Telefone:</Text>
                        <TextInput style={Gerenciarstyles.input} value={telefone} onChangeText={handlePhoneChange}/>
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.bottomButtons}>
                        <TouchableOpacity style={Gerenciarstyles.botaoSalvar} onPress={handleGerenciar}>
                            <Text style={Gerenciarstyles.textoBotao}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Gerenciarr;