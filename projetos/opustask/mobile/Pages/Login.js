import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, ScrollView, Alert, Linking} from 'react-native';
import Loginstyles from '../Componentes/Loginstyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição do componente de formulário de login
function LoginForm({ navigation }) {
  // Estado local para armazenar os valores do formulário (email, senha, etc.)
  const [formValues, setFormValues] = useState({
    acao: 'login', // Ação padrão é 'login'
    email_log: '', // Valor inicial do campo de e-mail
    senha_log: '', // Valor inicial do campo de senha
  });

  // Função para atualizar os valores do formulário conforme o usuário digita
  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const toggleSenhaVisibilidade = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    const { email_log, senha_log } = formValues;

    try {
      // Faz uma solicitação para o servidor com os dados de login
      const response = await fetch('http://10.135.60.16:8085/receber_dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: 'login', email_log, senha_log }), // Envio dos dados em formato JSON
      });

      // Analisa a resposta do servidor
      const resultado = await response.json();
      console.log('resultado========',resultado);
      if (resultado.erro) {
        // Se houver erro, exibe uma mensagem de alerta
        Alert.alert('Erro', 'Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        await AsyncStorage.setItem('ID_Usu', resultado.mensagem[0].toString());
        await AsyncStorage.setItem('nome', resultado.mensagem[1]);
        // Se o login for bem-sucedido, redireciona para a tela do calendário
        navigation.navigate('Calendario');
      }
    } catch (error) {
      // Em caso de erro na solicitação, exibe uma mensagem de alerta
      console.error(error);
      Alert.alert('Erro', 'Erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
    }
    setFormValues (" ")

  };
  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/sua-pagina-do-facebook');
  };

  const handleGooglePress = () => {
    Linking.openURL('https://www.google.com');
  };

  // Renderização do componente
  return (
    <KeyboardAvoidingView style={Loginstyles.background} behavior="padding">
      <ScrollView contentContainerStyle={Loginstyles.scrollViewContent}>
        <View style={Loginstyles.containerLogo}>
          {/* Logo do aplicativo */}
          <Image style={Loginstyles.logo} resizeMode='contain' source={require('../assets/Images/corujalogocima.png')} />
        </View>
        <View style={Loginstyles.container}>
          <Text style={Loginstyles.label}>E-mail</Text>
          {/* Campo de entrada para o e-mail */}
          <TextInput
            style={Loginstyles.inputs}
            autoCorrect={false}
            value={formValues.email_log}
            onChangeText={(text) => handleChange('email_log', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email"
            maxLength={39}
          />
          {/* Rótulo para o campo de senha */}
          <Text style={Loginstyles.label}>Senha</Text>
          {/* Container para o campo de senha */}
          <View style={Loginstyles.senhaContainer}>
            {/* Campo de entrada para a senha */}
            <TextInput
              style={Loginstyles.senhaInput}
              autoCorrect={false}
              value={formValues.senha_log}
              onChangeText={(text) => handleChange('senha_log', text)}
              accessibilityLabel="Senha"
              secureTextEntry={!senhaVisivel}
              maxLength={30}

            />

            <TouchableOpacity onPress={toggleSenhaVisibilidade}>
              <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={Loginstyles.botoes}>
            {/* Botão de Entrar */}
            <TouchableOpacity
              style={Loginstyles.btnSubmit}
              onPress={handleLogin}
            >
              <Text style={Loginstyles.submitTxt}>Entrar</Text>
            </TouchableOpacity>

            {/* Botão de Cancelar */}
            <TouchableOpacity style={Loginstyles.btnSubmit} >
              <Text style={Loginstyles.submitTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          {/* Link para a tela de cadastro */}
          <Text style={Loginstyles.textCad} onPress={() => navigation.navigate('Cadastro')}>Não possui uma conta? Cadastre-se</Text>
          {/*<Text onPress={() => navigation.navigate('EsqueciSenha')} style={Loginstyles.textCad}>Esqueceu sua senha ?</Text> */}
          <Text onPress={() => navigation.navigate('EsqueciSenha', { originScreen: 'Login' })} style={Loginstyles.textCad}>Esqueceu sua senha ?</Text>
          <Text style={Loginstyles.textLogar}>Logar com:</Text>
          {/* Ícones para fazer login com redes sociais */}
          <View style={Loginstyles.logarInferior}>
            <TouchableOpacity onPress={handleFacebookPress}>
              <Image style={Loginstyles.logarCom} resizeMode='contain' source={require('../assets/Images/facebook.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGooglePress}>
              <Image style={Loginstyles.logarCom} resizeMode='contain' source={require('../assets/Images/@google.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Barra de status */}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

// Exporta o componente para ser usado em outras partes do aplicativo
export default LoginForm;