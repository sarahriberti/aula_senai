import React, { useState } from "react";
import Cadastrostyles from "../Componentes/Cadastrostyles";
import { View, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Alert,Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter instalado @expo/vector-icons
import { TextInputMask } from 'react-native-masked-text'; // Adicione esta linha

const CadastroForm = ({ navigation }) => {

  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    celular: '',
    dataNascimento: '',
    senha: '',
    confirmsenha: '',
  });

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const toggleSenhaVisibilidade = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const toggleConfirmSenhaVisibilidade = () => {
    setConfirmSenhaVisivel(!confirmSenhaVisivel);
  };

  const handleSubmit = async () => {
    try {
      const resposta = await fetch('http://10.135.60.23:8085/receber_dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const resultado = await resposta.json();
      console.log(resultado)
      if (resultado.erro) {
        Alert.alert('Erro', 'Valores inválidos');
      } else {
        navigation.navigate('CadConcluido');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro ao enviar dados:', error.message);
    }
  };
  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/sua-pagina-do-facebook');
  };

  const handleGooglePress = () => {
    Linking.openURL('https://www.google.com');
  };

  return (
    <KeyboardAvoidingView style={Cadastrostyles.background} behavior="padding">
      <ScrollView contentContainerStyle={Cadastrostyles.scrollViewContent}>
        <View style={Cadastrostyles.containerlogo}>
          <Image style={Cadastrostyles.logo} resizeMode='contain' source={require('../assets/Images/corujalogocima.png')} />
        </View>
        <View style={Cadastrostyles.container}>
          <Text style={Cadastrostyles.cores}>Nome Completo</Text>
          <TextInput
            style={Cadastrostyles.inputs}
            autoCorrect={false}
            name="nome"
            value={formValues.nome}
            onChangeText={(value) => handleChange('nome', value)}
            maxLength={39}
          />
          <Text style={Cadastrostyles.cores}>Data de Nascimento</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            style={Cadastrostyles.inputs}
            autoCorrect={false}
            name="dataNascimento"
            value={formValues.dataNascimento}
            onChangeText={(value) => handleChange('dataNascimento', value)}
          />
          <Text style={Cadastrostyles.cores}>Celular</Text>
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            style={Cadastrostyles.inputs}
            autoCorrect={false}
            name="celular"
            value={formValues.celular}
            onChangeText={(value) => handleChange('celular', value)}
          />
          <Text style={Cadastrostyles.cores}>Email</Text>
          <TextInput
            style={Cadastrostyles.inputs}
            autoCorrect={false}
            name="email"
            value={formValues.email}
            onChangeText={(value) => handleChange('email', value)}
            maxLength={39}
          />
          <Text style={Cadastrostyles.cores}>Senha</Text>
          <View style={Cadastrostyles.senhaContainer}>
            <TextInput
              style={Cadastrostyles.senhaInput}
              autoCorrect={false}
              name="senha"
              value={formValues.senha}
              onChangeText={(value) => handleChange('senha', value)}
              secureTextEntry={!senhaVisivel}
              maxLength={30}
            />
            <TouchableOpacity onPress={toggleSenhaVisibilidade}>
              <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <Text style={Cadastrostyles.cores}>Confirmar Senha</Text>
          <View style={Cadastrostyles.senhaContainer}>
            <TextInput
              style={Cadastrostyles.senhaInput}
              autoCorrect={false}
              name="confirmsenha"
              value={formValues.confirmsenha}
              onChangeText={(value) => handleChange('confirmsenha', value)}
              secureTextEntry={!confirmSenhaVisivel}
              maxLength={30}
            />
            <TouchableOpacity onPress={toggleConfirmSenhaVisibilidade}>
              <Ionicons name={confirmSenhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={Cadastrostyles.Txt} onPress={() => navigation.navigate('Login')}>Já possui conta? Faça login</Text>
          </View>
          <TouchableOpacity style={Cadastrostyles.btnSubmit} onPress={handleSubmit}>
            <Text style={Cadastrostyles.submitTxt}>Cadastrar</Text>
          </TouchableOpacity>
          <View style={Cadastrostyles.footerlogos}>
          <TouchableOpacity onPress={handleFacebookPress}>
              <Image style={Cadastrostyles.facebook} resizeMode='contain' source={require('../assets/Images/facebook.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGooglePress}>
              <Image style={Cadastrostyles.google} resizeMode='contain' source={require('../assets/Images/@google.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CadastroForm;