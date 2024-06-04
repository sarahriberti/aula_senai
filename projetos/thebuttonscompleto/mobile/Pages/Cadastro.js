import React, { useState } from "react";
import Cadastrostyles from "../Componentes/Cadastrostyles";
import { View, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Alert } from "react-native";

const CadastroForm = ({navigation}) => {

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função para lidar com o cadastro
  const handleCadastro = () => {
    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      Alert.alert("Erro: As senhas não coincidem!");
      return;
    }
    // Exibe os dados do formulário no console
    console.log("Nome:", nome);
    console.log("Data de Nascimento:", dataDeNascimento);
    console.log("Celular:", celular);
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Confirmar senha:", confirmarSenha);
  }

  return (
    <KeyboardAvoidingView style={Cadastrostyles.background} behavior="padding">
      <ScrollView contentContainerStyle={Cadastrostyles.scrollViewContent}>
        <View style={Cadastrostyles.containerlogo}>
          <Image style={Cadastrostyles.logo} resizeMode='contain' source={require('../assets/Images/corujalogocima.png')} />
        </View>
        <View keyboardShouldPersistTaps='handled' style={Cadastrostyles.container}>
          {/* Inputs para inserção de dados */}
          <Text style={Cadastrostyles.cores}>Nome Completo</Text>
          <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={nome} onChangeText ={setNome} />
          <Text style={Cadastrostyles.cores}>Data de Nascimento</Text>
          <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={dataDeNascimento} onChangeText={setDataDeNascimento} />
          <Text style={Cadastrostyles.cores}>Celular</Text>
          <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={celular} onChangeText={setCelular} />
          <Text style={Cadastrostyles.cores}>Email</Text>
          <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={email} onChangeText={setEmail} />
          <Text style={Cadastrostyles.cores}>Senha</Text>
          <TextInput style={Cadastrostyles.inputs} autoCorrect={false} secureTextEntry={true} value={senha} onChangeText={setSenha} />
          <Text style={Cadastrostyles.cores}>Confirmar Senha</Text>
          <TextInput style={Cadastrostyles.inputs} autoCorrect={false} secureTextEntry={true} value={confirmarSenha} onChangeText={setConfirmarSenha} />
          
          {/* Link para tela de login */}
          <View>
            <Text style={Cadastrostyles.Txt} onPress={() => navigation.navigate('Login')}>Já possui conta? Faça login</Text>
          </View>

          {/* Botão de cadastro */}
          <TouchableOpacity style={Cadastrostyles.btnSubmit} onPress={handleCadastro}>
            <Text style={Cadastrostyles.submitTxt}>Cadastrar</Text>
          </TouchableOpacity>

          {/* Logos de redes sociais */}
          <View style={Cadastrostyles.footerlogos}>
            <Image style={Cadastrostyles.facebook} resizeMode='contain' source={require('../assets/Images/facebook.png')}/>
            <Image style={Cadastrostyles.google} resizeMode='contain' source={require('../assets/Images/@google.png')}/>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CadastroForm;
