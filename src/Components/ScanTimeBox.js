import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ScanTimeBox(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} style={style.container}>
            <View style={style.box}>
                <Image style={{ width: 50, height: 50 }} source={props.img} />
                <Text style={style.text}>{props.title1} : <Text style={style.text2}>{props.time}</Text></Text>
                {props.icon ? <Ionicons style={style.forwardIcon} name={props.icon} size={26} color="grey" /> : null}
            </View>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    box: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: '#C3C3C3',
        paddingVertical: 30
    },
    text: {
        marginTop: 10,
    },
    text2: {
        color: 'red'
    },
    forwardIcon: {
        position: 'absolute',
        bottom: 20,
        right: 10
    }
})