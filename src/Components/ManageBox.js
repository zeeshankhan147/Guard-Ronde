import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function ManageBox(props) {
  const { selected, title, icon, onTouch } = props;
  return (
    <TouchableOpacity
      onPress={onTouch}
      style={[
        style.container,

        {
          borderColor: selected == title ? "#32AE3C" : "grey",
          backgroundColor: selected == title ? "#EEF5EF" : "#fff"
        }
      ]}
    >
      <View style={style.inner}>
        <Image style={style.dpGuardian} source={icon} />
        <Text
          style={[
            style.text,
            { color: selected == title ? "#32AE3C" : "grey" }
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 8,
    width: '40%',
    height: 220,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1
  },
  inner: {
    alignItems: "center"
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Montserrat-Medium"
  }
});
