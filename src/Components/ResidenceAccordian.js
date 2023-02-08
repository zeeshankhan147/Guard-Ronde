import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Divider from './Divider';

export default function ResidenceAccordian(props) {
    const { id, title, guardian, guardianName } = props;
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
                <Text style={style.roundText}>{title}</Text>
                <Text style={style.roundText2}>{guardian}</Text>
                <Icon name={expandle ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'grey'} />
            </TouchableOpacity>
            <View style={style.parentHr} />
            {
                expandle &&
                <View style={style.child}>
                    <View style={style.secondRow}>
                        {guardianName.map((item) => <Text style={style.checkpointText}>{item}</Text>)}
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
        marginLeft: 10
    },
    checkpointBox: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff"
    },
    firstRow: {
        padding: 4,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
        marginTop: 5,
        color: "green",
        letterSpacing: 1
    },
    secondRow: {
        marginTop: 2,
        justifyContent: 'space-between',
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