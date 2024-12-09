import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, StyleSheet, Text, Linking, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pictures from './Pages/Calendario';
import CadastroForm from './Pages/Cadastro';
import Gerenciarr from './Pages/Gerenciar';
import PagDoacaoMobile from './Pages/Doacao';
import Saira from './Componentes/Sair';
import LoginForm from './Pages/Login';
import ToDoList from './Componentes/FormularioTaf';
import CadastroConcluido from './Pages/CadConcluido';
import MyPager from './Pages/BoasVindas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Esqueci from './Componentes/EsqueciSenha';
import Sugestao from './Componentes/Sugestao';
import Help from './Pages/PagesAjuda/AjudaLP';
import HelpLogin from './Pages/PagesAjuda/LoginAjuda';
import AjudaCad from './Pages/PagesAjuda/AjudaCad';
import AjudaCalend from './Pages/PagesAjuda/AjudaCalend';
import DoacaoHelp from './Pages/PagesAjuda/Pages_Calend/Doacao_mobile';
import SairHelp from './Pages/PagesAjuda/Pages_Calend/Sair_mobile';
import SugestaoHelp from './Pages/PagesAjuda/Pages_Calend/Sugestao_mobile';
import GerenciarHelp from './Pages/PagesAjuda/Pages_Calend/Gerenciar_mobile';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    const getNomeAsync = async () => {
      try {
        const nome = await AsyncStorage.getItem('nome') || 'erro';
        setNome(nome);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNomeAsync();
  }, []);

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com');
  };

  const handleGooglePress = () => {
    Linking.openURL('https://www.google.com');
  };
  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com');
  };

  return (
    <DrawerContentScrollView style={styles.container}>
      <Image source={require('./assets/user.png')} style={styles.logoUser} />
      <Text style={styles.textName}>{nome}</Text>
      <DrawerItem
        label="Calendário"
        labelStyle={styles.drawerItemText}
        onPress={() => navigation.navigate('CalendarioDrawer')}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Gerenciar"
        labelStyle={styles.drawerItemText}
        onPress={() => navigation.navigate('Gerenciar')}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Contribuição"
        labelStyle={styles.drawerItemText}
        onPress={() => navigation.navigate('Doacao')}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Sugestão"
        labelStyle={styles.drawerItemText}
        onPress={() => setModalVisible5(true)}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Sair"
        labelStyle={styles.drawerItemText}
        onPress={() => setModalVisible2(true)}
        style={styles.drawerItem}
      />
      <View style={styles.logos}>
        <TouchableOpacity onPress={handleFacebookPress}>
          <Image style={styles.logo} resizeMode='contain' source={require('./assets/facebook.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInstagramPress}>
          <Image style={styles.logo2} resizeMode='contain' source={require('./assets/instagramm.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGooglePress}>
          <Image style={styles.logo3} resizeMode='contain' source={require('./assets/@google.png')} />
        </TouchableOpacity>

        <Saira modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} navigation={navigation} />
        <Sugestao modalVisible5={modalVisible5} setModalVisible5={setModalVisible5} navigation={navigation} />
      </View>
    </DrawerContentScrollView>
  );
}

function Menu() {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#252942' },
          headerTintColor: '#c39910',
        }}
      >
        <Drawer.Screen name="CalendarioDrawer" component={Pictures} options={{ title: '', headerStyle: { backgroundColor: '#252942' } }} />
        <Drawer.Screen name="Gerenciar" component={Gerenciarr} options={{ title: '', headerStyle: { backgroundColor: '#252942' } }} />
        <Drawer.Screen name="Doacao" component={PagDoacaoMobile} options={{ title: '', headerStyle: { backgroundColor: '#252942' } }} />
        <Drawer.Screen name="Sugestao" component={Sugestao} />
        <Drawer.Screen name="Sair" component={Saira} />
      </Drawer.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BoasVindas'>
        <Stack.Screen name="BoasVindas" component={MyPager} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroForm} options={{ headerShown: false }} />
        <Stack.Screen name="Calendario" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioTaf" component={ToDoList} options={{ headerShown: false }} />
        <Stack.Screen name="CadConcluido" component={CadastroConcluido} options={{ headerStyle: { backgroundColor: 'rgb(25, 29, 42)' } }} />
        <Stack.Screen name="Sair" component={Saira} />
        <Stack.Screen name="EsqueciSenha" component={Esqueci} options={{ headerShown: false }} />
        <Stack.Screen name="Help" component={Help} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
        <Stack.Screen name="HelpLogin" component={HelpLogin} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
        <Stack.Screen name="HelpCad" component={AjudaCad} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
        <Stack.Screen name="HelpCalend" component={AjudaCalend} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
        <Stack.Screen name="DoacaoHelp" component={DoacaoHelp} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
        <Stack.Screen name="SairHelp" component={SairHelp} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
        <Stack.Screen name="SugHelp" component={SugestaoHelp} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
        <Stack.Screen name="GerenHelp" component={GerenciarHelp} options={{ title: '', headerStyle: { backgroundColor: '#c39910' } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34374f',
  },
  drawerItem: {
    marginVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#c39910'
  },
  drawerItemText: {
    color: 'white',
    fontSize: 19,
  },
  logos: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#c39910',
    borderRadius: 60,
  },
  logo2: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#c39910',
    borderRadius: 60,
  },
  logo3: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#c39910',
    borderRadius: 60,
  },
  logoUser: {
    width: 90,
    height: 90,
    marginLeft: 80,
    marginTop: 10
  },
  textName: {
    color: '#ffff',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 90,
    marginBottom: 30
  }
});