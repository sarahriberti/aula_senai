import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';

// Importando a imagem localmente
const image = require('../assets/castelo_fundo_mobile.jpg');

export default function MyPager({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.pageone}>
        <ImageBackground source={image} style={styles.image}>
          <Image style={styles.frase} resizeMode='contain' source={require('../assets/frase.png')} />
          <View style={styles.viwBot} key="3">
            <TouchableOpacity style={styles.botao1} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textoBotao}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.textoBotao}>Cadastro</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.botaoAjuda} onPress={() => navigation.navigate('Help')}>
            <Image source={require('../assets/ponto-de-interrogacao.png')} style={styles.iconAjuda} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34374F',
  },
  pageone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  frase: {
    width: 450,
    height: 120,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 405,
  },
  botao1: {
    backgroundColor: '#546594',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 130,
    marginRight: 20,
  },
  botao: {
    backgroundColor: '#546594',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 130,
    marginRight: 20,
  },

  iconAjuda: {
    width: 50, // Ajuste o tamanho do ícone aqui
    height: 50, // Ajuste o tamanho do ícone aqui
    position: 'absolute',
    top: 25,
    left: 380,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viwBot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 80,
    marginRight: 60,
  },
});