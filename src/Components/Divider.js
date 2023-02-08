import { View, Text } from 'react-native'
import React from 'react'

export default function Divider(props) {
    const { width = '100%', height = 0.5, color = '#D8D8D8', top = 20 } = props;
    return (
        <View
            style={{
                alignSelf: 'center',
                width: width,
                height: height,
                backgroundColor: color,
                marginTop: top
            }} />
    )
}