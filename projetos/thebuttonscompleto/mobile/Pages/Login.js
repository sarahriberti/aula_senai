import React from 'react'; 
import { StatusBar } from 'expo-status-bar'; 
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native'; 
import Loginstyles from '../Componentes/Loginstyles'; 
function LoginForm({navigation}) {
  return (
    // View para evitar que o teclado cubra os inputs
    <KeyboardAvoidingView style={Loginstyles.background}>
      <ScrollView contentContainerStyle={Loginstyles.scrollViewContent}> 
        {/* Permite rolagem dos componentes, útil em telas pequenas */}
        <View style={Loginstyles.containerLogo}>
          {/* Container para a logo */}
          <Image style={Loginstyles.logo} resizeMode='contain' source={require('../assets/Images/corujalogocima.png')} />
          {/* Imagem da logo */}
        </View>
        <View style={Loginstyles.container}>
          {/* Container para os campos de entrada */}
          <Text style={Loginstyles.label}>E-mail</Text>
          {/* Label para o campo de e-mail */}
          <TextInput style={Loginstyles.inputs} autoCorrect={false} onChange={() => { }} />
          {/* Campo de entrada para o e-mail */}
          <Text style={Loginstyles.label}>Senha</Text>
          {/* Label para o campo de senha */}
          <TextInput style={Loginstyles.inputs} autoCorrect={false} onChange={() => { }} />
          {/* Campo de entrada para a senha */}
          <View style={Loginstyles.botoes}>
            {/* Container para os botões */}
            <TouchableOpacity style={Loginstyles.btnSubmit} onPress={() => navigation.navigate('Calendario')}>
              {/* Botão para entrar */}
              <Text style={Loginstyles.submitTxt}>Entrar</Text>
              {/* Texto do botão "Entrar" */}
            </TouchableOpacity>
            <TouchableOpacity style={Loginstyles.btnSubmit}>
              {/* Botão para cancelar */}
              <Text style={Loginstyles.submitTxt}>Cancelar</Text>
              {/* Texto do botão "Cancelar" */}
            </TouchableOpacity>
          </View>
          <Text style={Loginstyles.textCad} onPress={() => navigation.navigate('Cadastro')}>Não possui uma conta? Cadastre-se</Text>
          {/* Texto para navegar para a tela de cadastro */}
          <Text style={Loginstyles.textLogar}>Logar com:</Text>
          {/* Texto para logar com outras contas */}
          <View style={Loginstyles.logarInferior}>
            {/* Container para os ícones de login com outras contas */}
            <Image style={Loginstyles.logarCom} resizeMode='contain' source={require('../assets/Images/facebook.png')} />
            {/* Ícone do Facebook */}
            <Image style={Loginstyles.logarCom} resizeMode='contain' source={require('../assets/Images/@google.png')} />
            {/* Ícone do Google */}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
      {/* Barra de status do aplicativo */}
    </KeyboardAvoidingView>
  );
}
export default LoginForm; 