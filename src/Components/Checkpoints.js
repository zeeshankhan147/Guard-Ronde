import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Checkpoints(props) {
  const { id, title, checkpoint, image, time } = props;
  return (
    <View style={style.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {image &&
          <Image
            style={{ width: image ? 40 : 40, height: image ? 40 : 40 }}
            source={image ? image : null}
          />}
        <View style={style.roundCheckpoint}>
          <Text style={style.roundText}>
            {title}
          </Text>
          {checkpoint &&
            <Text style={style.checkpointText}>
              {checkpoint}
            </Text>}
        </View>
      </View>
      {time &&
        <Text style={style.timeText}>
          {time}
        </Text>}
      <MaterialCommunityIcons name={"chevron-up"} size={22} color="#000" />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  checkpointText: {
    color: "grey",
    fontSize: 12,
    fontFamily: "Montserrat-Medium"
  },
  timeText: {
    color: "grey",
    fontSize: 10,
    fontFamily: "Montserrat-Medium"
  }
});
