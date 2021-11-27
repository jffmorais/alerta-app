import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Animated } from 'react-native';
import { AuthContext } from '../../App.js';
import { AZUL_CLARO, CINZA_CLARO } from '../../assets/colors';

export default function Home({ navigation }) {

    const { signOut } = useContext(AuthContext);

    const [alert, setAlert] = useState('');
    const [animation, setAnimation] = useState(new Animated.Value(0))

    useEffect(() => {
        //handleAnimation();
        setInterval(() => {
            handleAnimation();
        }, 3000);

    }, []);

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
        warning: {
            width: 150,
            height: 150,
        },
        box: {
            width: 200,
            height: 200,
            backgroundColor: '#fcf003',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
        },
    });

    const onLogoffHandler = () => {
        signOut();
    }

    const handleAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(animation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }).start()
        })
    }

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(252, 240, 3)", "rgb(255, 79, 33)"]
    })

    const animatedStyle = {
        backgroundColor: boxInterpolation
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Animated.View style={{ ...styles.box, ...animatedStyle }} >
                <Image style={styles.warning} source={require('../../assets/warning.png')} />
            </Animated.View>
            <Text>Home Screen</Text>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={onLogoffHandler}
            ><Text style={styles.txtLogin}>LOG OFF</Text></TouchableOpacity>
        </View>
    );
}