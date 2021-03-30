import React, {Component, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import { DataTable } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';



export default class CouponList extends Component {
    state= {
        storedData: [],
        keysArray: [],
    };

    componentDidMount() {
        this.getData();
    }

    // récupère la data dans l'AsyncStorage
    getData = async () => {
        // fonction qui récupère toutes les clés enregistrés
        await AsyncStorage.getAllKeys((err, keys) =>{
            this.setState({keysArray: keys})
        });
        // en suite, on récupère toutes les données à l'aide des clés récupérées au dessus
        const test = await AsyncStorage.multiGet(this.state.keysArray)
        if(test != null){
            this.setState({storedData: test})
        }
    }

    // fonction qui prend en param la clé et qui supprime le coupôn dans l"AsyncStorage
    deleteCoupon = async (key) => {
        if(key != null){
            await AsyncStorage.removeItem(key)
            this.getData();
        }
    }

    render() {
        // on regarde si il y a des coupons dans l'AsyncStorage
        if(this.state.storedData.length <= 0){
            return (
                <LinearGradient colors={['#973DDD', '#644ECF', '#2E5FBE']} style={styles.gradient}>
                    <View style={styles.container}>
                        <Text h4>Auncun coupon disponible !</Text>
                    </View>
                </LinearGradient>
            );
        }else{
            return (
            <LinearGradient colors={['#973DDD', '#644ECF', '#2E5FBE']} style={styles.gradient}>
                <View style={styles.container}>
                    <Text h4 style={{color: 'white'}}>Liste des coupons scannés :</Text>
                    <DataTable>
                        {
                            this.state.storedData.map(array => {
                                const obj = JSON.parse(array[1])
                                console.log(obj)
                                return(
                                    <View style={styles.coupons}>
                                        <Text style={{padding:20, textAlign:"center" }}>
                                            <Text>Code promo : </Text>
                                            <Text style={{fontSize:22, fontWeight:"bold"}}>{obj.code} {"\n"} </Text>
                                            <Text>{obj.description} {"\n"}</Text>
                                                <Button style={styles.boutons} title="Supprimer" onPress={() => this.deleteCoupon(obj.code)}/>
                                                <Button style={styles.boutons} title="test"/>
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </DataTable>
                </View>
            </LinearGradient>
            );
        }
    }

}


const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    cell: {
        height:'100%',
    },
    coupons: {
        marginTop: 10,
        backgroundColor: '#FFC350',
        borderRadius: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    textContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boutons: {
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 80
    }
});
