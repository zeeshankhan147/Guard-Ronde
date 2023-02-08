import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default function Circle(props) {
    return (
        <View style={[style.circle, { borderColor: props.color, marginLeft: props.id == 1 ? 0 : 20 }]}>
            <View style={[style.dots, { backgroundColor: props.color }]}></View>
            <Text style={{ color: props.color }}>{props.number}</Text>
        </View>
    )
}
const style = StyleSheet.create({
    circle: {
        width: 37,
        height: 37,
        marginLeft: 20,
        borderRadius: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dots: {
        position: 'absolute',
        borderRadius: 10,
        top: 0,
        right: 0,
        width: 10,
        height: 10,

    }
})