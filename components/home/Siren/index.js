import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AZUL_CLARO } from '../../../assets/colors';
import Sound from 'react-native-sound';

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

export default function Siren() {

    Sound.setCategory('Playback');
    var siren = new Sound('siren.wav', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // when loaded successfully
        console.log('duration in seconds: ' + siren.getDuration() + 'number of channels: ' + siren.getNumberOfChannels());
        siren.setNumberOfLoops(-1);
        siren.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    });
    const handleImSafe = () => {
        siren.stop();
    }
    return (
        <>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={handleImSafe}
            ><Text style={styles.txtLogin}>ESTOU SEGURO</Text></TouchableOpacity>
        </>
    )
}