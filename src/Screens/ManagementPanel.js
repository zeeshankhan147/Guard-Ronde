import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Button from "../Components/Button";
import Header from "../Components/Header";
import ManageBox from "../Components/ManageBox";

export default function ManagementPanel({ navigation }) {
  const [selected, setSelected] = useState("");

  const residency = () => {
    navigation.navigate("Residences");
    setSelected("Residency");
  };
  const round = () => {
    navigation.navigate("Rounds");
    setSelected("Round");
  };
  const guardian = () => {
    navigation.navigate("Guardians");
    setSelected("Guardian");
  };
  const setting = () => {
    navigation.navigate("Settings");
    setSelected("Setting");
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={{ marginTop: 20 }}>
          <Header
            title={"Management Panel"}
            titleColor={"#000"}
            rightIcon={"bells"}
            rightIconColor={"#000"}
          />
        </View>

        <View style={style.hexCode}>
          <Text style={style.codeText}>#128392028</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Button onTouch={() => alert("ok")} title={"Client"} />
        </View>

        <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <ManageBox
              title={"Residency"}
              icon={require("../assets/images/residence.png")}
              selected={selected}
              onTouch={() => residency()}
            />
            <ManageBox
              title={"Round"}
              icon={require("../assets/images/round.png")}
              selected={selected}
              onTouch={() => round()}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <ManageBox
              title={"Guardian"}
              icon={require("../assets/images/guardian.png")}
              selected={selected}
              onTouch={() => guardian()}
            />
            <ManageBox
              title={"Setting"}
              icon={require("../assets/images/setting.png")}
              selected={selected}
              onTouch={() => setting()}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => alert("")}
          activeOpacity={0.6}
          style={style.closeBtn}
        >
          <Fontisto name="close-a" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  hexCode: {
    marginTop: 25,
    width: "100%",
    alignItems: "center"
  },
  codeText: {
    color: "#333",
    fontSize: 20,
    fontFamily: "Montserrat-Medium"
  },
  closeBtn: {
    marginTop: 20,
    padding: 30,
    borderRadius: 100,
    backgroundColor: "#8B9C8C",
    alignSelf: "center"
  }
});
