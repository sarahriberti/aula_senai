
import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, StyleSheet, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pictures from './Pages/Calendario';
import CadastroForm from './Pages/Cadastro';
import Gerenciarr from './Pages/Gerenciar';
import PagDoacaoMobile from './Pages/Doacao';
import Compartilho from './Pages/Compartilhar';
import Saira from './Componentes/Sair';
import LoginForm from './Pages/Login';
import ToDoList from './Componentes/FormularioTaf';
import CadastroConcluido from './Pages/CadConcluido';
import MyPager from './Pages/BoasVindas';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  return (
    <DrawerContentScrollView style={styles.container}>
      <Image
        source={require('./assets/Images/user.png')}
        style={styles.logoUser}
      />
      <Text style={styles.textName}>Nome</Text>
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
        label="Compartilhar"
        labelStyle={styles.drawerItemText}
        onPress={() => setModalVisible(true)}
        style={styles.drawerItem}
      />
      <DrawerItem
        label="Sair"
        labelStyle={styles.drawerItemText}
        onPress={() => setModalVisible2(true)}
        style={styles.drawerItem}
      />
      <View style={styles.logos}>
        <Image
          source={require('./assets/Images/facebook.png')}
          style={styles.logo}
        />
        <Image
          source={require('./assets/Images/instagramm.png')}
          style={styles.logo2}
        />
        <Image
          source={require('./assets/Images/Whatsaapp.png')}
          style={styles.logo3}
        />
        <Compartilho modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <Saira modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} navigation={navigation} />
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
        <Drawer.Screen name="CalendarioDrawer" component={Pictures}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#252942'
            }
          }}
        />
        <Drawer.Screen name="Gerenciar" component={Gerenciarr} options={{ title: '', headerStyle: { backgroundColor: '#252942' } }} />
        <Drawer.Screen name="Doacao" component={PagDoacaoMobile} options={{ title: '', headerStyle: { backgroundColor: '#252942' } }} />
        <Drawer.Screen name="Compartilhar" component={Compartilho} />
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
        <Stack.Screen name="CadConcluido" component={CadastroConcluido} options={{ 
          headerStyle:{
            backgroundColor:'rgb(25, 29, 42)'
          }
         }} />
        <Stack.Screen name="Sair" component={Saira} />
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
    marginTop: 60,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#c39910',
    borderRadius: 60,
  },
  logo2: {
    marginTop: 60,
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#c39910',
    borderRadius: 60,
  },
  logo3: {
    marginTop: 60,
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