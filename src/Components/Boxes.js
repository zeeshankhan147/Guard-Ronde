import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'

export default function Boxes(props) {
    return (
        <View style={style.container}>
            <View style={style.boxes}>
                <Image style={{ width: 50, height: 50 }} source={require('../assets/images/police.png')} />
                <Text style={style.text}>Police</Text>
            </View>
            <View style={style.boxes}>
                <Image style={{ width: 50, height: 50 }} source={require('../assets/images/fire.png')} />
                <Text style={style.text}>Fire</Text>
            </View>
            <View style={style.boxes}>
                <Image style={{ width: 50, height: 50 }} source={require('../assets/images/owner.png')} />
                <Text style={style.text}>Owner</Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between'
    },
    boxes: {
        width: '30%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        elevation: 20,
        shadowColor: '#C3C3C3',
    },
    text: {
        marginTop: 5,
        color: '#000',
        fontFamily: 'Montserrat-Medium'
    }

})