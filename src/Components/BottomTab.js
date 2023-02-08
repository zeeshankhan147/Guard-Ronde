import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

export default function BottomTab(props) {
    const { icon, onTouch, navigation } = props;
    return (
        <View style={style.tab}>
            <TouchableOpacity activeOpacity={1} onPress={onTouch}>
                <Image style={{ width: 30, height: 30 }} source={icon ? icon : require('../assets/images/bottomTab.png')} />
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    tab: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#bababa",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.22,
        shadowRadius: 10.24,
        elevation: 13
    }
})