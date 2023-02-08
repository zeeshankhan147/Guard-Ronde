import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function Button(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onTouch} style={style.button}>
            <Text style={style.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    button: {
        backgroundColor: '#2A9F33',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
        paddingHorizontal: 50,
        alignSelf: "center"
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
    }
})