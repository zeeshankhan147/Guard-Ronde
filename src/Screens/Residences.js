import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from "react-native";
import BottomTab from "../Components/BottomTab";
import Button from "../Components/Button";
import Header from "../Components/Header";
import ResidenceAccordian from "../Components/ResidenceAccordian";

export default function Residences({ navigation }) {
  const data = [
    {
      id: "1",
      title: "Entrepot Cocody",
      time: "5 Guardians",
      guardian: '3 Guardian',
      guardianName: ['Guardians Name', 'Guardians Name', 'Guardians Name']
    },
    {
      id: "2",
      title: "House Cocody 2",
      time: "1 Guardians",
      guardian: '3 Guardian',
      guardianName: ['Guardians Name', 'Guardians Name', 'Guardians Name']
    },
    {
      id: "3",
      title: "Entrepot Cocody",
      time: "5 Guardians",
      guardian: '3 Guardian',
      guardianName: ['Guardians Name', 'Guardians Name', 'Guardians Name']
    },
    {
      id: "4",
      title: "House Cocody 2",
      time: "1 Guardians",
      guardian: '3 Guardian',
      guardianName: ['Guardians Name', 'Guardians Name', 'Guardians Name']
    },
  ];
  return (
    <SafeAreaView style={style.container}>
      {/* HEADER */}
      <View style={{ marginTop: 20 }}>
        <Header
          title={"Residences"}
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
          <Button onTouch={() => alert("ok")} title={"Add New Residence"} />
        </View>

        <View style={style.today}>
          <Text style={style.todayText}>List of Residence</Text>
        </View>

        <View style={style.checkpointSec}>
          {data.map((item) => (
            <View style={{ marginTop: 10 }}>
              <ResidenceAccordian
                id={item.id}
                title={item.title}
                time={item.time}
                guardian={item.guardian}
                guardianName={item.guardianName}
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
  checkpointBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  firstRow: {
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
    fontSize: 12,
    fontFamily: "Montserrat-Medium"
  },
  checkpointText: {
    marginTop: 5,
    color: "green",
    letterSpacing: 1
  },
  secondRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  timing: {
    alignSelf: "flex-end",
    marginVertical: 20,
    marginRight: 10
  },
  deleteText: {
    color: "red",
    fontSize: 14,
    fontFamily: "Montserrat-Medium"
  },
  listGuardian: {
    width: "100%",
    paddingHorizontal: 20
  }
});
