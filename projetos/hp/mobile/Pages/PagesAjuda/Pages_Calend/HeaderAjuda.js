import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Supondo que você tenha um componente MenuLateral
// import MenuLateral from '../../Menu_Lateral';

const HeaderHelp = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            {/* Componente de Menu Lateral fixo */}
            <View style={styles.menuFixo}>
                {/* <MenuLateral /> */}
            </View>

            {/* Navegação no cabeçalho */}
            <View style={styles.navContainer}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('HelpCalend')}
                >
                    <Text style={styles.navText}>Calendario</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('GerenHelp')}
                >
                    <Text style={styles.navText}>Gerenciar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('SugHelp')}
                >
                    <Text style={styles.navText}>Sugestão</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('DoacaoHelp')}
                >
                    <Text style={styles.navText}>Doação</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('SairHelp')}
                >
                    <Text style={styles.navText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#191d2a',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#191d2a',
    },
    menuFixo: {
        marginBottom: 10,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navItem: {
        padding: 8,
    },
    navText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#c39910',
    },
});

export { HeaderHelp };