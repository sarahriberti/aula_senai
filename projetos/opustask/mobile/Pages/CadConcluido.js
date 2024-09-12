import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CadastroConcluido() { 
    const navigation = useNavigation(); // Hook para navegação

    return (
        <View style={styles.cadSucess}>
            <Text style={styles.title}>Cadastro Concluído</Text>
            <Text style={styles.message}>Seu cadastro foi concluído com sucesso! Você pode fazer login agora.</Text>
            <TouchableOpacity 
                style={styles.linkToLogin} 
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.linkText}>Fazer Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cadSucess: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor:'rgb(25, 29, 42)'
    },
    title: {
        color: 'rgb(214, 189, 1)',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 16,
    },
    message: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 24,
        color:'white'
    },
    linkToLogin: {
        padding: 10,
    },
    linkText: {
        fontSize: 20,
        color: 'rgb(214, 189, 1)',
    },
});

export default CadastroConcluido;
