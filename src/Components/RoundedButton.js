import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

export default function RoundedButton(props) {
    return (
        <TouchableOpacity onPress={props.onTouch} activeOpacity={0.5} style={style.container}>
            <View style={style.button}>
                <Text style={style.text}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    button: {
        width: '100%',
        paddingVertical: 20,
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: '#888D89'
    },
    text: {
        color: '#eee',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
    }
})