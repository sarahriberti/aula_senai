import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Esqueci({navigation}) {
  const [email, setEmail] = useState('');

  const handleChange = (text) => {
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.page2} >
        <Text style={styles.sobre}>
          Esqueceu sua senha?
        </Text>
        <Text style={styles.text}>E-mail:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleChange}
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email"
        />

        <View style={styles.viewBotao}>
          <TouchableOpacity style={styles.botao} >
            <Text style={styles.botaoText} onPress={() => navigation.navigate('Gerenciar')}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} >
            <Text style={styles.botaoText}>Recuperar</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43465C',
  },
  page2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252942',
    borderColor: '#C39910',
    borderWidth: 2,
    marginTop: 300,
    marginLeft: 50,
    marginRight: 50,
    padding: 20,
  },
  sobre: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sobre2: {
    color: 'white',
    textAlign: 'left',
    marginRight: 260,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#34374F',
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 10,
    color: 'white',
    borderRadius:4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginRight:260,
  },
  botao: {
    backgroundColor: '#C39910',
    borderWidth:10,
    borderColor:'#C39910',
    marginHorizontal:20,
    marginVertical:10,
    fontWeight: 'bold',
    borderRadius: 4,
  },
  botaoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:15,
  },
  viewBotao:{
    display: 'flex',
    flexDirection: 'row'
  },
});