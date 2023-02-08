import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Divider from './Divider';

export default function GuardianAccordian(props) {
    const { id, title, title2, desc, image, time } = props;
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
                    <Image style={{ width: 50, height: 50 }} source={image} />
                    <View style={style.roundCheckpoint}>
                        <Text style={style.roundText}>{`${title}   `}
                            <Text style={style.roundText2}>{time}</Text>
                        </Text>
                        <Text style={style.checkpointText}>{desc}</Text>
                    </View>
                </View>
                <Icon name={expandle ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'grey'} />
            </TouchableOpacity>
            <View style={style.parentHr} />
            {
                expandle &&
                <View style={style.child}>
                    <View style={style.secondRow}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require("../assets/images/ring.png")} />
                            <View style={style.roundCheckpoint}>
                                <Text style={style.roundText}>{title2}</Text>
                            </View>
                        </View>
                        <Image
                            style={{ width: 70 }}
                            source={require("../assets/images/switch.png")} />
                    </View>
                    <Divider />
                    <View style={style.timing}>
                        <TouchableOpacity onPress={() => alert("delete")}>
                            <Text style={style.deleteText}>Delete</Text>
                        </TouchableOpacity>
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
        marginTop: 10
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
    roundCheckpoint: {
        marginLeft: 10
    },
    roundText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "Montserrat-Medium"
    },
    roundText2: {
        color: "grey",
        fontSize: 10,
        fontFamily: "Montserrat-Medium"
    },
    checkpointText: {
        color: "grey",
        fontSize: 12,
        fontFamily: "Montserrat-Medium"
    },
    secondRow: {
        marginTop: 10,
        flexDirection: "row",
        marginLeft: 0,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timing: {
        alignSelf: "flex-end",
        marginVertical: 20,
        marginRight: 10
    },
    deleteText: {
        color: "red",
        fontSize: 14,
        fontFamily: "Montserrat-Medium",
    },


});