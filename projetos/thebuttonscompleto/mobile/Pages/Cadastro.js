import React, { useState } from "react";
import Cadastrostyles from "../Componentes/Cadastrostyles";
import { View, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Alert } from "react-native";

const CadastroForm = ({navigation}) => {

  const [nome, setnome] = useState('')
  const [datadenascimento, setDataNascimento] = useState('')
  const [celular, setcelular] = useState('')
  const [email, setemail] = useState('')
  const [senha, setsenha] = useState('')
  const [confirmarSenha, setconfirmarSenha] = useState('')

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro: As senhas não coincidem!")
      return;
    }
    console.log("Nome:", nome);
    console.log("Data de Nascimento:", datadenascimento);
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
        <Text style={Cadastrostyles.cores}>Nome Completo</Text>
        <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={nome} onChangeText ={setnome} />
        <Text style={Cadastrostyles.cores}>Data de Nascimento</Text>
        <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={datadenascimento} onChangeText={setDataNascimento} />
        <Text style={Cadastrostyles.cores}>Celular</Text>
        <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={celular} onChangeText={setcelular} />
        <Text style={Cadastrostyles.cores}>Email</Text>
        <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={email} onChangeText={setemail} />
        <Text style={Cadastrostyles.cores}>Senha</Text>
        <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={senha} onChangeText={setsenha} />
        <Text style={Cadastrostyles.cores}>Confirmar Senha</Text>
        <TextInput style={Cadastrostyles.inputs} autoCorrect={false} value={confirmarSenha} onChangeText={setconfirmarSenha} />
        <View>
          <Text style={Cadastrostyles.Txt} onPress={() => navigation.navigate('Login')}>Já possui conta? Faça login</Text>
        </View>
        <TouchableOpacity style={Cadastrostyles.btnSubmit} onPress={handleCadastro}>
          <Text style={Cadastrostyles.submitTxt}>Cadastrar</Text>
        </TouchableOpacity>
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