import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';



export default class Home extends Component {
    state={
    };
    render() {
        return (
            <LinearGradient colors={['#973DDD', '#644ECF', '#2E5FBE']} style={styles.gradient}>
                <View style={{height: 200}}>
                    <Image 
                        style={{
                            width: '100%', 
                            resizeMode: 'contain',
                        }} 
                        source={require('../assets/logos/qr-code.png')}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: 'white'}}>
                        Bienvenue sur GoStyle !
                    </Text>
                    <Text style={{marginTop: 10, color: 'white'}}>Profitez de bons de réduction en scannant nos QR-Code</Text>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContent: {
        flex: 1,
    },
});

