import React, {Component, useState} from 'react';
import {
    Alert,
    Dimensions,
    LayoutAnimation,
    Text,
    View,
    StyleSheet,
} from 'react-native';


import getCoupon from '../services/qrCodeService'
import {BarCodeScanner} from "expo-barcode-scanner";
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import CouponList from "./couponList";




export default class App extends Component {

    state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
        scannedState: false,
        scannedData: '',
    };

    componentDidMount() {
        this._requestCameraPermission();
    }


    // Fonction pour demander la permission d'accès à l'appareil photo
    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    // Fonction qui permet de stocker le coupon dans la mémoire telephone, la clé d'identification est le code promo (this.state.scannedData.code)
    _saveCouponInStorage = async (coupon) => {
        try {
            console.log(coupon)
            await AsyncStorage.setItem(this.state.scannedData.code, coupon)
        } catch (e) {
            console.log(e)
        }
    }

    // !!S'active à la lecture d'un codeQR!! Permet de récup le json grace au service
    _handleBarCodeRead = async result => {
        this.setState({scannedState : true})
        console.log('result data : ' + result.data)
        LayoutAnimation.spring();
        const coupon = await getCoupon(result.data);
        // if(coupon.response === 200 ){
        //     console.log("oui")
        // }else{
        //     console.log('nn')
        // }

        console.log('coupon : ' + coupon)
        const couponString = JSON.parse(coupon)
        if(couponString.code != null){
            // Permet d'afficher string code promo sur l'alerte
            this.setState({ lastScannedUrl: result.data, scannedData: couponString , scannedState: true});
            await this._saveCouponInStorage(coupon)

            this._displayAlert()
        }
    };

    // On récupère affiche le code promo a l'utilisateur
    _displayAlert = () => {
        if (!this.state.lastScannedUrl) {
            return;
        }
        if(this.state.scannedState === false){
            return;
        }


        Alert.alert(
            'Bravo, vous avez obtenu le code promotionnel : ',
             this.state.scannedData.code + "\n Vous pouvez le retrouver dans la liste des coupon",
            [
                { text: 'Fermer', onPress: () => {this.setState({lastScannedUrl: null, scannedData : null, scannedState: false})}},
            ],
            {cancellable: false }
        );
    };



    render() {
        const scanned = this.state.scannedState;
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ? (
                    <Text>Demande de permission de caméra</Text>
                ) : this.state.hasCameraPermission === false ? (
                    <Text style={{ color: '#fff' }}>
                        La caméra n'est pas autorisée
                    </Text>
                ) : (
                    <View
                        style={{
                            height: Dimensions.get('window').height,
                            width: Dimensions.get('window').width,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <BarCodeScanner
                            onBarCodeScanned={
                               scanned ? undefined :  this._handleBarCodeRead
                            }
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    url: {
        flex: 1,
    },
    urlText: {
        color: '#fff',
        fontSize: 20,
    },
});
