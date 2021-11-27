import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput } from 'react-native';
import { AZUL_CLARO, CINZA_CLARO } from '../../assets/colors';
import { AuthContext } from '../../App.js';

export default function SignIn({ navigation }) {

    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AuthContext);

    const styles = StyleSheet.create({
        input: {
            height: 40,
            width: 220,
            marginBottom: 8,
            padding: 4,
            fontSize: 18,
            backgroundColor: '#FFF',
            borderColor: '#376cfb',
            borderRadius: 8,
            borderWidth: 1,
            color: '#376cfb',
        },
        view: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: CINZA_CLARO,
        },
        logo: {
            height: 80,
            width: 80,
        },
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
        btnCadastrar: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: CINZA_CLARO,
            height: 40,
            width: 220,
        },
        txtCadastrar: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#376cfb',
        }
    });

    const onSubmitHandler = () => {
        signIn({userName, password});
    }

    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../../assets/alerta_logo.png')} />
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                keyboardType="email-address"
                onChangeText={setUserName}
             />
            <TextInput 
                style={styles.input} 
                placeholder="Senha" 
                textContentType="password" 
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={onSubmitHandler}
            ><Text style={styles.txtLogin}>LOGIN</Text></TouchableOpacity>
            <TouchableOpacity
                style={styles.btnCadastrar}
                onPress={() => navigation.push('Cadastro')}
            ><Text style={styles.txtCadastrar}>CRIE SUA CONTA AGORA</Text></TouchableOpacity>
        </View>
    );
}