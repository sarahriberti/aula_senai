import { Text, View, TextInput, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native'; 
import Gerenciarstyles from '../Componentes/Gerenciarstyles'; 
import { useState } from 'react'; 

// Define o componente funcional Gerenciarr
const Gerenciarr = () => {
    const [nome, setNome] = useState(''); // Estado para armazenar o nome
    const [dataNascimento, setDataNascimento] = useState(''); // Estado para armazenar a data de nascimento
    const [senha, setSenha] = useState(''); // Estado para armazenar a senha
    const [confirmarSenha, setConfirmarSenha] = useState(''); // Estado para armazenar a confirmação da senha
    const [email, setEmail] = useState(''); // Estado para armazenar o email
    const [telefone, setTelefone] = useState(''); // Estado para armazenar o telefone

    // Função para lidar com a ação de gerenciamento (salvar dados)
    const handleGerenciar = () => {
        if (senha !== confirmarSenha) { // Verifica se as senhas coincidem
            Alert.alert("Erro: As senhas não coincidem!"); // Exibe um alerta se as senhas não coincidirem
            return;
        }
        // Log dos dados no console
        console.log("Nome: ", nome);
        console.log("Data de Nascimento: ", dataNascimento);
        console.log("Senha: ", senha);
        console.log("Confirmar Senha: ", confirmarSenha);
        console.log("E-mail: ", email);
        console.log("Telefone: ", telefone);
    }

    // Renderiza a tela de gerenciamento
    return (
        <KeyboardAvoidingView style={Gerenciarstyles.background}> // View para evitar que o teclado cubra os inputs
            <View style={Gerenciarstyles.main}> // Container principal com estilos
                <ScrollView keyboardShouldPersistTaps='handled' style={Gerenciarstyles.container}> // ScrollView para permitir a rolagem dos inputs
                    <View style={Gerenciarstyles.header}> // View para o cabeçalho
                        <Image style={Gerenciarstyles.perfil} resizeMode='contain' source={require('../assets/Images/user.png')} /> // Imagem de perfil
                    </View>
                    <View style={Gerenciarstyles.dadosbasicos}> // View para os dados básicos do usuário
                        <Text style={Gerenciarstyles.textNome}>Nome:</Text> // Texto para o campo nome
                        <TextInput style={Gerenciarstyles.input} value={nome} onChangeText={setNome} /> // Campo de entrada para o nome
                        <Text style={Gerenciarstyles.textData}>Data de Nascimento:</Text> // Texto para o campo data de nascimento
                        <TextInput style={Gerenciarstyles.input} value={dataNascimento} onChangeText={setDataNascimento} /> // Campo de entrada para a data de nascimento
                    </View>
                    <View style={Gerenciarstyles.borda}></View> // Separador visual
                    <View style={Gerenciarstyles.password}> // View para os campos de senha
                        <Text style={Gerenciarstyles.textActualSenha}>Senha atual:</Text> // Texto para o campo senha atual
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} /> // Campo de entrada para a senha atual
                        <Text style={Gerenciarstyles.textNewSenha}>Nova senha:</Text> // Texto para o campo nova senha
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} /> // Campo de entrada para a nova senha
                        <Text style={Gerenciarstyles.textConfSenha}>Confirmar senha:</Text> // Texto para o campo confirmar senha
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={confirmarSenha} onChangeText={setConfirmarSenha} /> // Campo de entrada para confirmar a nova senha
                    </View>
                    <View style={Gerenciarstyles.borda}></View> // Separador visual
                    <View style={Gerenciarstyles.email}> // View para os campos de email
                        <Text style={Gerenciarstyles.textExEmail}>example@gmail.com</Text> // Texto para o email atual
                        <Text style={Gerenciarstyles.textNewEmail}>Novo e-mail:</Text> // Texto para o campo novo email
                        <TextInput style={Gerenciarstyles.input} value={email} onChangeText={setEmail} /> // Campo de entrada para o novo email
                        <Text style={Gerenciarstyles.textNewEmail}>Senha:</Text> // Texto para o campo senha
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} /> // Campo de entrada para a senha
                    </View>
                    <View style={Gerenciarstyles.borda}></View> // Separador visual
                    <View style={Gerenciarstyles.telefone}> // View para os campos de telefone
                        <Text style={Gerenciarstyles.textActualTelefone}>(19) 994132161</Text> // Texto para o telefone atual
                        <Text style={Gerenciarstyles.textNewTelefone}>Novo telefone:</Text> // Texto para o campo novo telefone
                        <TextInput style={Gerenciarstyles.input} value={telefone} onChangeText={setTelefone} /> // Campo de entrada para o novo telefone
                        <Text style={Gerenciarstyles.textNewEmail}>Senha:</Text> // Texto para o campo senha
                        <TextInput style={Gerenciarstyles.input} secureTextEntry={true} autoCorrect={false} value={senha} onChangeText={setSenha} /> // Campo de entrada para a senha
                    </View>
                    <View style={Gerenciarstyles.borda}></View> // Separador visual
                    <View style={Gerenciarstyles.btnBox}> // View para os botões
                        <TouchableOpacity style={Gerenciarstyles.btnSave} onPress={handleGerenciar}> // Botão para salvar
                            <Text style={Gerenciarstyles.submitTxt}>Salvar</Text> // Texto do botão salvar
                        </TouchableOpacity>
                        <TouchableOpacity style={Gerenciarstyles.btnCancel}> // Botão para cancelar
                            <Text style={Gerenciarstyles.submitTxt}>Cancelar</Text> // Texto do botão cancelar
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
export default Gerenciarr; 