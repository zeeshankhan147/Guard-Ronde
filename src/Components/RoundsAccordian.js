import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Circle from './Circle';
import Divider from './Divider';

export default function RoundAccordian(props) {
    const { id, title, desc, circle, icon, time } = props;
    const [expandle, setExpandle] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandle(!expandle)
    }
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    return (
        <View style={style.checkpointBox}>
            <TouchableOpacity style={style.firstRow} onPress={() => toggleExpand()}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        style={{ width: 60, height: 60 }}
                        source={icon}
                    />
                    <View style={style.roundCheckpoint}>
                        <Text style={style.roundText}>{title}</Text>
                        <Text style={style.checkpointText}>{desc}</Text>
                    </View>
                </View>
                <Icon name={expandle ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'grey'} />
            </TouchableOpacity>
            <View style={style.parentHr} />
            {
                expandle &&
                <View style={style.child}>
                    {/* SECOND ROW */}
                    <View style={style.secondRow}>
                        {circle.map(item =>
                            <Circle number={item.number} color={item.color} />
                        )}
                    </View>
                    <Divider />
                    <View style={style.timing}>
                        <Text style={style.timeText}>{time}</Text>
                    </View>
                </View>
            }

        </View>
    )
}
const style = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    parentHr: {
        color: '#fff',
        width: '100%'
    },
    child: {
        backgroundColor: '#fff',
    },
    checkpointBox: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff"
    },
    firstRow: {
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    roundCheckpoint: {},
    roundText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "Montserrat-Medium"
    },
    checkpointText: {},
    secondRow: {
        marginTop: 10,
        flexDirection: "row",
        marginLeft: 10
    },
    timing: {
        alignSelf: "center",
        marginVertical: 20
    },
    timeText: {
        color: "#000",
        fontSize: 14,
        fontFamily: "Montserrat-Medium"
    },

});