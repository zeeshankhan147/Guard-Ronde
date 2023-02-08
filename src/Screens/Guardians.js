import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from "react-native";
import Button from "../Components/Button";
import Header from "../Components/Header";
import BottomTab from "../Components/BottomTab";
import GuardianAccordian from "../Components/GuardianAccordian";

export default function Guardians({ navigation }) {
  const data = [
    {
      id: "1",
      title: "Guardian Name",
      title2: 'Ring an alarm',
      checkpoint: "Entrepot Cocody",
      time: "From 8PM to 6AM",
      image: require("../assets/images/circle.png"),
    },
    {
      id: "2",
      title: "Guardian Name",
      title2: 'Ring an alarm',
      checkpoint: "house cocody",
      time: "From 8PM to 6AM",
      image: require("../assets/images/circle.png")
    },
    {
      id: "3",
      title: "Guardian Name",
      title2: 'Ring an alarm',
      checkpoint: "house cocody",
      time: "From 8PM to 6AM",
      image: require("../assets/images/circle.png")
    },
    {
      id: "4",
      title: "Guardian Name",
      title2: 'Ring an alarm',
      checkpoint: "Entrepot Cocody",
      time: "From 8PM to 6AM",
      image: require("../assets/images/circle.png")
    },
  ];
  
  return (
    <SafeAreaView style={style.container}>
      {/* HEADER */}
      <View style={{ marginTop: 20 }}>
        <Header
          title={"Guardians"}
          titleColor={"#000"}
          leftIcon={"arrow-back"}
          leftIconColor={"#000"}
          leftPress={() => navigation.goBack()}
          rightIcon={"bells"}
          rightIconColor={"#000"}
        />
      </View>

      <ScrollView style={{ marginBottom: 10 }}>
        <View style={{ marginTop: 20 }}>
          <Button onTouch={() => alert("ok")} title={"Add New Gardian"} />
        </View>
        <View style={style.today}>
          <Text style={style.todayText}>List of Guardians</Text>
        </View>
        <View style={style.checkpointSec}>
          {data.map((item) => (
            <View style={{ marginTop: 10 }}>
              <GuardianAccordian
                id={item.id}
                title={item.title}
                image={item.image}
                desc={item.checkpoint}
                title2={item.title2}
                time={item.time}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomTab onTouch={() => navigation.popToTop()} />
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  today: {
    marginTop: 25,
    paddingHorizontal: 30
  },
  todayText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Montserrat-Medium"
  },
  checkpointSec: {
    marginTop: 20,
    paddingHorizontal: 20
  },

});
