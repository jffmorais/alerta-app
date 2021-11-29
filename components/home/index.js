import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Animated } from 'react-native';
import { AuthContext, NotificationContext } from '../../App.js';
import { AZUL_CLARO } from '../../assets/colors';
import Sound from 'react-native-sound';
import Siren from './Siren/index.js';

export default function Home({ navigation }) {

    const { signOut } = useContext(AuthContext);

    const [animation, setAnimation] = useState(new Animated.Value(0));

    useEffect(() => {

        setInterval(() => {
            handleAnimation();
        }, 600);

        /*return () => {
            siren.release();
        }*/

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
        titulo: {
            fontSize: 18,
            color: '#ff4f21',
            fontWeight: 'bold',
        },
        texto: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#000',
            padding: 6,
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
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
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
            <NotificationContext.Consumer>
                {
                    ({ name, description, district, threatLevel, active }) => (
                        <>
                            {active &&
                                <>                                    
                                    <Text style={styles.titulo}>Atenção! Emergência em andamento</Text>
                                    <Text style={styles.texto}>{name}</Text>
                                    <Text style={styles.texto}>{description}</Text>
                                    <Animated.View style={{ ...styles.box, ...animatedStyle }} >
                                        <Image style={styles.warning} source={require('../../assets/warning.png')} />
                                    </Animated.View>
                                    <Text style={styles.texto}>Local: {district}</Text>
                                    <Text style={styles.texto}>Nivel de ameaça: {threatLevel}/5</Text>
                                    <Siren />
                                </>
                            }
                        </>
                    )
                }
            </NotificationContext.Consumer>

            <TouchableOpacity
                style={styles.btnLogin}
                onPress={onLogoffHandler}
            ><Text style={styles.txtLogin}>LOG OFF</Text></TouchableOpacity>
        </View>
    );
}