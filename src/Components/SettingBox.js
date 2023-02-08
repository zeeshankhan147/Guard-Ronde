import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function SettingBox(props) {
  const { id, icon, title, rightIcon, onTouch } = props;
  return (
    <TouchableOpacity
      onPress={() => (onTouch ? onTouch : null)}
      style={style.container}>

      <View style={style.leftSide}>
        <Image style={{ width: 40, height: 40 }} source={icon} />
        <Text style={style.title}>
          {title}
        </Text>
      </View>

      <View style={style.rightSide}>
        <EvilIcons name={rightIcon} size={28} />
      </View>

    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftSide: {
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    marginLeft: 10,
    color: "#000",
    fontSize: 14,
    fontFamily: "Montserrat-Medium"
  },
  rightSide: {}
});
