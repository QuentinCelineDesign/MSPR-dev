import TabBar from 'react-native-nav-tabbar';
import React, {Component} from "react";
import { StyleSheet, Text, View } from 'react-native';
import Home from './home';
import QRCode from "./qrcode";
import CouponList from "./couponList";

export default class NavbarComponent extends Component{
    state={
        showForm: 0
    }


    render() {
        let form;
        if (this.state.showForm === 0) {
            form = (
                <Home/>
            );
        } else if (this.state.showForm === 1) {
            form = (
                <QRCode/>
            );
        }else if (this.state.showForm === 2) {
            form = (
                <CouponList/>
            );
        }
        return(
            <TabBar style={styles.tabbar}>
                <TabBar.Item
                    icon={require('../assets/logos/homePasive.png')}
                    selectedIcon={require('../assets/logos/homeActive.png')}
                    title="Home"
                >
                        <Home/>
                </TabBar.Item>
                <TabBar.Item
                >
                        <QRCode/>
                </TabBar.Item>
                <TabBar.Item
                    icon={require('../assets/logos/coupon.png')}
                    selectedIcon={require('../assets/logos/couponActive.png')}
                    title="Coupons"
                >
                    <CouponList/>
                </TabBar.Item>
            </TabBar>
    
        )
    }
}

const styles = StyleSheet.create({
    tabbar: {
        paddingBottom: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'

    },
    textContent: {
        flex: 1,
        alignItems: 'center',
    }
});


