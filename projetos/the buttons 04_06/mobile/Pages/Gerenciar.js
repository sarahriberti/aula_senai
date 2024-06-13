import { Text, View, TextInput, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import Gerenciarstyles from '../Componentes/Gerenciarstyles';
import { useState } from 'react';

const Gerenciarr = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleGerenciar = () => {
        if (senha !== confirmarSenha) {
            Alert.alert("Erro: As senhas não coincidem!");
            return;
        }
        console.log("Nome: ", nome);
        console.log("Data de Nascimento: ", dataNascimento);
        console.log("Senha: ", senha);
        console.log("Confirmar Senha: ", confirmarSenha);
        console.log("E-mail: ", email);
        console.log("Telefone: ", telefone);
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
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} />
                        <Text onPress={() => navigation.navigate('EsqueciSenha')} style={Gerenciarstyles.textEsqueciSenha}>Esqueceu sua senha ?</Text>
                        <Text style={Gerenciarstyles.textNewSenha}>Nova senha:</Text>
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} />
                        <Text style={Gerenciarstyles.textConfSenha}>Confirmar senha:</Text>
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={confirmarSenha} onChangeText={setConfirmarSenha} />
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.email}>
                        <Text style={Gerenciarstyles.textExEmail}>example@gmail.com</Text>
                        <Text style={Gerenciarstyles.textNewEmail}>Novo e-mail:</Text>
                        <TextInput style={Gerenciarstyles.input} value={email} onChangeText={setEmail} />
                        <Text style={Gerenciarstyles.textNewEmail}>Senha:</Text>
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} />
                      
                    </View>
                    <View style={Gerenciarstyles.borda}></View>
                    <View style={Gerenciarstyles.telefone}>
                        <Text style={Gerenciarstyles.textActualTelefone}>(19) 994132161</Text>
                        <Text style={Gerenciarstyles.textNewTelefone}>Novo telefone:</Text>
                        <TextInput style={Gerenciarstyles.input} value={telefone} onChangeText={setTelefone} />
                        <Text style={Gerenciarstyles.textNewEmail}>Senha:</Text>
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} />
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
