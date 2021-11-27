import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput } from 'react-native';
import { AuthContext } from '../../App.js';
import { AZUL_CLARO, CINZA_CLARO } from '../../assets/colors';

export default function Home({ navigation }) {

    const { signOut } = useContext(AuthContext);
    
    const styles = StyleSheet.create({
        btnLogin: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: AZUL_CLARO,
            height: 40,
            width: 220,
            borderRadius: 8,
            marginBottom: 8,
        },
        txtLogin: {
            fontSize: 16,
            color: '#FFF',
            fontWeight: 'bold',
        },
    });

    const onLogoffHandler = () => {
        signOut();
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={onLogoffHandler}
            ><Text style={styles.txtLogin}>LOG OFF</Text></TouchableOpacity>
        </View>
    );
}