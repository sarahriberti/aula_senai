import React, { useState } from "react";
import { View, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Alert, Linking } from "react-native";
import { TextInputMask } from 'react-native-masked-text';
import Cadastrostyles from "../Style/Cadastrostyles";
import { Ionicons } from "@expo/vector-icons";

const CadastroForm = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    celular: '',
    dataNascimento: '',
    senha: '',
    confirmsenha: '',
  });

  const [formErrors, setFormErrors] = useState({
    nome: '',
    email: '',
    celular: '',
    dataNascimento: '',
    senha: '',
    confirmsenha: '',
  });

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    let error = '';

    if (name === 'nome') {
      error = validarNome(value);
    } else if (name === 'email') {
      error = validarEmail(value);
    } else if (name === 'celular') {
      error = validarCelular(value);
    } else if (name === 'senha') {
      error = validarSenha(value);
    } else if (name === 'confirmsenha') {
      error = value !== formValues.senha ? 'Senhas não correspondem.' : '';
    } else if (name === 'dataNascimento') {
      error = validarDataNascimento(value);
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const passwordValidation = (senha) => {
    return {
      minLength: senha.length >= 8,
      hasUpperCase: /[A-Z]/.test(senha),
      hasLowerCase: /[a-z]/.test(senha),
      hasNumber: /\d/.test(senha),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
    };
  };



  const validarNome = (nome) => {
    const nomeLimpo = nome.trim();
    if (nomeLimpo.length === 0) {
      return 'O nome não pode ser vazio ou conter apenas espaços.';
    }
    if (nomeLimpo.replace(/ /g, '').length < 3) {
      return 'O nome deve ter no mínimo 3 caracteres sem contar espaços.';
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(nomeLimpo)) {
      return 'O nome deve conter apenas letras, sem números ou caracteres especiais.';
    }
    return '';
  };

  const validarEmail = (email) => {
    const partes = email.split('@');
    if (partes[0].length < 3) {
      return 'O nome de usuário no e-mail deve ter pelo menos 3 caracteres.';
    }
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email) ? '' : 'E-mail inválido.';
  };

  const validarCelular = (celular) => {
    const celularLimpo = celular.replace(/[^\d]/g, '');
    if (celularLimpo.length !== 11) {
      return 'O número de celular deve ter 11 dígitos.';
    }
    const ddd = celularLimpo.slice(0, 2);
    const dddsValidos = ['21', '22', '24', '32', '33', '34', '35', '37', '38', '11', '12', '13', '14', '15', '16', '17', '18', '19', '41', '42', '43', '44', '45', '46', '51', '53', '54', '55', '47', '48', '49', '61', '62', '64', '65', '66', '67', '82', '71', '73', '74', '75', '77', '85', '88', '98', '99', '83', '81', '87', '86', '89', '84', '79', '68', '96', '92', '97', '91', '93', '94', '69', '95', '63'];
    if (!dddsValidos.includes(ddd)) {
      return 'DDD inválido.';
    }
    return '';
  };

  const validarSenha = (senha) => {
    if (senha.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (!/[A-Z]/.test(senha)) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!/[a-z]/.test(senha)) {
      return 'A senha deve conter pelo menos uma letra minúscula.';
    }
    if (!/[0-9]/.test(senha)) {
      return 'A senha deve conter pelo menos um número.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      return 'A senha deve conter pelo menos um caractere especial.';
    }
    return '';
  };

  const validarDataNascimento = (dataNascimento) => {
    const data = dataNascimento.replace(/\D/g, '');
    if (data.length !== 8) {
      return 'A data de nascimento deve ser no formato DD/MM/AAAA.';
    }
    const dia = parseInt(data.slice(0, 2), 10);
    const mes = parseInt(data.slice(2, 4), 10);
    const ano = parseInt(data.slice(4), 10);

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const idadeMinima = 13;
    const idadeMaxima = 120;

    if (ano > anoAtual) {
      return 'Ano de nascimento não pode ser no futuro.';
    }

    const idade = anoAtual - ano;
    if (idade < idadeMinima) {
      return 'A idade mínima para cadastro é de 13 anos.';
    }
    if (idade > idadeMaxima) {
      return 'A idade máxima permitida para cadastro é de 120 anos.';
    }

    const dataValida = new Date(ano, mes - 1, dia);
    if (dataValida.getDate() !== dia || dataValida.getMonth() !== mes - 1 || dataValida.getFullYear() !== ano) {
      return 'Data de nascimento inválida.';
    }

    return '';
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/sua-pagina-do-facebook');
  };

  const handleGooglePress = () => {
    Linking.openURL('https://www.google.com');
  };

  const toggleSenhaVisibilidade = () => setSenhaVisivel(!senhaVisivel);
  const toggleConfirmSenhaVisibilidade = () => setConfirmSenhaVisivel(!confirmSenhaVisivel);

  const handleSubmit = async () => {
    const erros = Object.values(formErrors).some((erro) => erro !== '');
    const camposVazios = Object.values(formValues).some((valor) => valor.trim() === '');

    if (erros || camposVazios) {
      alert('Por favor, preencha todos os campos corretamente.');
    } else {
      try {
        // Convertendo a data para o formato YYYY-MM-DD
        const [dia, mes, ano] = formValues.dataNascimento.split('/');
        const dataConvertida = `${ano}-${mes}-${dia}`;

        // Preparando os dados para envio
        const dadosEnvio = { ...formValues, dataNascimento: dataConvertida };

        const resposta = await fetch('http://10.135.60.28:8085/receber_dados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosEnvio),
        });
        const resultado = await resposta.json();
        if (resultado.erro) {
          Alert.alert('Erro', 'Valores inválidos');
        } else {
          // Limpar os campos após o envio
          setFormValues({
            nome: '',
            email: '',
            celular: '',
            dataNascimento: '',
            senha: '',
            confirmsenha: '',
          });
          navigation.navigate('CadConcluido');
        }
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        Alert.alert('Erro ao enviar dados:', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={Cadastrostyles.background} behavior="padding">
      <ScrollView contentContainerStyle={Cadastrostyles.scrollViewContent}>
      <TouchableOpacity onPress={() => navigation.navigate('HelpCad')}  >
            <Image source={require('../assets/ponto-de-interrogacao.png')}  style={Cadastrostyles.iconAjudaCad}/>
          </TouchableOpacity>
        <View style={Cadastrostyles.containerlogo}>
          <Image style={Cadastrostyles.logo} resizeMode='contain' source={require('../assets/corujalogocima.png')} />
        </View>
        <View style={Cadastrostyles.container}>
          <Text style={Cadastrostyles.cores}>Nome Completo</Text>
          <View style={Cadastrostyles.inputContainer}>
            <TextInput
              style={Cadastrostyles.inputs}
              value={formValues.nome}
              onChangeText={(value) => handleChange('nome', value)}
              maxLength={50}
            />
          </View>
          {formErrors.nome ? <Text style={Cadastrostyles.errorText}>{formErrors.nome}</Text> : null}

          <Text style={Cadastrostyles.cores}>Data de Nascimento</Text>
          <View style={Cadastrostyles.inputContainer}>
            <TextInputMask
              style={Cadastrostyles.inputs}
              type={'datetime'}
              options={{ format: 'DD/MM/YYYY' }}
              value={formValues.dataNascimento}
              onChangeText={(value) => handleChange('dataNascimento', value)}
              maxLength={10}
            />
          </View>
          {formErrors.dataNascimento ? <Text style={Cadastrostyles.errorText}>{formErrors.dataNascimento}</Text> : null}

          <Text style={Cadastrostyles.cores}>Celular</Text>
          <View style={Cadastrostyles.inputContainer}>
            <TextInputMask
              style={Cadastrostyles.inputs}
              type={'cel-phone'}
              value={formValues.celular}
              onChangeText={(value) => handleChange('celular', value)}
              maxLength={15}
            />
          </View>
          {formErrors.celular ? <Text style={Cadastrostyles.errorText}>{formErrors.celular}</Text> : null}


          <Text style={Cadastrostyles.cores}>E-mail</Text>
          <View style={Cadastrostyles.inputContainer}>
            <TextInput
              style={Cadastrostyles.inputs}
              value={formValues.email}
              onChangeText={(value) => handleChange('email', value)}
              maxLength={50}
            />
          </View>
          {formErrors.email ? <Text style={Cadastrostyles.errorText}>{formErrors.email}</Text> : null}

          <View>
            <Text style={Cadastrostyles.cores}>Senha</Text>
            <View style={Cadastrostyles.inputContainer}>
              <TextInput
                style={Cadastrostyles.inputs}
                secureTextEntry={!senhaVisivel}
                value={formValues.senha}
                onChangeText={(value) => {
                  handleChange('senha', value);
                }}
                maxLength={12}
                onFocus={() => setShowPasswordRequirements(true)}
                onBlur={() => setShowPasswordRequirements(false)}
              />
              <TouchableOpacity onPress={toggleSenhaVisibilidade}>
                <Ionicons
                  name={senhaVisivel ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {showPasswordRequirements && (
              <View style={Cadastrostyles.passwordRequirements}>
                {Object.entries(passwordValidation(formValues.senha)).map(([key, isValid]) => (
                  <View key={key} style={Cadastrostyles.requirementContainer}>
                    <Ionicons
                      name={isValid ? "checkmark-circle" : "close-circle"}
                      size={20}
                      color={isValid ? "#006400" : "red"}
                      style={Cadastrostyles.icon}
                    />
                    <Text style={Cadastrostyles.requirementText}>
                      {key === 'minLength' && 'Pelo menos 8 caracteres'}
                      {key === 'hasUpperCase' && 'Uma letra maiúscula'}
                      {key === 'hasLowerCase' && 'Uma letra minúscula'}
                      {key === 'hasNumber' && 'Um número'}
                      {key === 'hasSpecialChar' && 'Um caractere especial'}
                    </Text>
                  </View>
                ))}
              </View>
            )}



          </View>


          <Text style={Cadastrostyles.cores}>Confirmar Senha</Text>
          <View style={Cadastrostyles.inputContainer}>
            <TextInput
              style={Cadastrostyles.inputs}
              secureTextEntry={!confirmSenhaVisivel}
              value={formValues.confirmsenha}
              onChangeText={(value) => handleChange('confirmsenha', value)}
              maxLength={12}
            />
            <TouchableOpacity onPress={toggleConfirmSenhaVisibilidade}>
              <Ionicons
                name={confirmSenhaVisivel ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 10 }} />
          {formErrors.confirmsenha ? <Text style={Cadastrostyles.errorText}>{formErrors.confirmsenha}</Text> : null}
          <View>
            <Text style={Cadastrostyles.Txt} onPress={() => navigation.navigate('Login')}>Já possui conta? Faça login</Text>
          </View>
          <TouchableOpacity style={Cadastrostyles.btnSubmit} onPress={handleSubmit}>
            <Text style={Cadastrostyles.submitTxt}>Cadastrar</Text>
          </TouchableOpacity>
          <View style={Cadastrostyles.footerlogos}>
            <TouchableOpacity onPress={handleFacebookPress}>
              <Image style={Cadastrostyles.facebook} resizeMode='contain' source={require('../assets/facebook.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGooglePress}>
              <Image style={Cadastrostyles.google} resizeMode='contain' source={require('../assets/@google.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CadastroForm;