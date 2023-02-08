import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    useWindowDimensions
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/colors/colors';

export default function ImageViewer(props) {
    const { item } = props.route.params;

    const { height: windowHeight } = useWindowDimensions()
    const { width: windowWidth } = useWindowDimensions()

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeBtn}>
                <FontAwesome name='close' size={36} color="#fff" />
            </TouchableOpacity>
            <Image resizeMode='contain' source={item} style={styles.image} />

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    image: {
        width: '100%',
    }

})