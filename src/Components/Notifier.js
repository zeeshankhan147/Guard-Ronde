import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Notifier(props) {
  const { id, image, title, time, lock } = props;
  return (
    <View style={style.container}>
      <View style={style.imageBox}>
        <Image
          style={{ width: "90%", height: 50, borderRadius: 10 }}
          source={image}
        />
        <View style={style.iconBox}>
          <Image
            style={{ width: 20, height: 20 }}
            source={
              lock
                ? require("../assets/images/lock.png")
                : require("../assets/images/unlock.png")
            }
          />
        </View>
      </View>

      <View style={style.titleBox}>
        <Text style={style.title}>
          {title}
        </Text>
      </View>

      <View style={style.timeBox}>
        <Text style={style.time}>
          {time}
        </Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 10
  },
  imageBox: {
    width: "20%",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleBox: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center"
  },
  timeBox: {
    width: "20%",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  title: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Montserrat-Medium"
  },
  time: {
    color: "grey",
    fontSize: 10,
    fontFamily: "Montserrat-Medium"
  },
  iconBox: {
    position: "absolute",
    top: 0,
    right: 5
  }
});
