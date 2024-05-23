import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import Loginstyles from '../Componentes/Loginstyles';

function LoginForm({navigation}) {
  return (
    <KeyboardAvoidingView style={Loginstyles.background}>
      <ScrollView contentContainerStyle={Loginstyles.scrollViewContent}>
        <View style={Loginstyles.containerLogo}>
          <Image style={Loginstyles.logo} resizeMode='contain' source={require('../assets/Images/corujalogocima.png')} />
        </View>
        <View style={Loginstyles.container}>
          <Text style={Loginstyles.label}>E-mail</Text>
          <TextInput style={Loginstyles.inputs} autoCorrect={false} onChange={() => { }} />
          <Text style={Loginstyles.label}>Senha</Text>
          <TextInput style={Loginstyles.inputs} autoCorrect={false} onChange={() => { }} />
          <View style={Loginstyles.botoes} >
            <TouchableOpacity style={Loginstyles.btnSubmit} onPress={() => navigation.navigate('Calendario')}>
              <Text style={Loginstyles.submitTxt}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Loginstyles.btnSubmit}>
              <Text style={Loginstyles.submitTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <Text style={Loginstyles.textCad} onPress={() => navigation.navigate('Cadastro')}>Não possui uma conta? Cadastre-se</Text>
          <Text style={Loginstyles.textLogar}>Logar com:</Text>
          <View style={Loginstyles.logarInferior}>
            <Image style={Loginstyles.logarCom} resizeMode='contain' source={require('../assets/Images/facebook.png')} />
            <Image style={Loginstyles.logarCom} resizeMode='contain' source={require('../assets/Images/@google.png')} />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
export default LoginForm;
