import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'

export default function SplashScreen() {
    // custom SplashScreen -->>>>
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/splash_ic.png')}
                style={styles.image}

            />
            <Text style={styles.text}>Powered by GuardRonde</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    text: {
        color: '#fff',
        position: 'absolute',
        bottom: 30
    }
})