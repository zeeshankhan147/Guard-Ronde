import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../Components/Header";
import RoundsAccordian from "../Components/RoundsAccordian";

export default function Rounds({ navigation }) {
  const [date, setDate] = useState("1");

  const data = [
    { id: "1", color: "green", number: 5 },
    { id: "2", color: "green", number: 15 },
    { id: "3", color: "green", number: 25 },
    { id: "4", color: "red", number: 35 }
  ];
  const checkpoint = [
    {
      id: "1",
      title: "Round 2",
      checkpoint: "Checkpoints (4)",
      image: require("../assets/images/home.png"),
      time: '9 AM',
      data: data,
    },
    {
      id: "2",
      title: "Round 3",
      checkpoint: "Checkpoints (4)",
      image: require("../assets/images/home.png"),
      time: '9 AM',
      data: data,
    },
    {
      id: "3",
      title: "Round 4",
      checkpoint: "Checkpoints (4)",
      image: require("../assets/images/home.png"),
      time: '9 AM',
      data: data,
    },
    {
      id: "4",
      title: "Round 5",
      checkpoint: "Checkpoints (4)",
      image: require("../assets/images/home.png"),
      time: '9 AM',
      data: data,
    },
    {
      id: "5",
      title: "Round 5",
      checkpoint: "Checkpoints (4)",
      image: require("../assets/images/home.png"),
      time: '9 AM',
      data: data,
    },
    {
      id: "6",
      title: "Round 5",
      checkpoint: "Checkpoints (4)",
      image: require("../assets/images/home.png"),
      time: '9 AM',
      data: data,
    },
    {
      id: "7",
      title: "Round 8",
      checkpoint: "Checkpoints (4)",
      image: require("../assets/images/home.png"),
      time: '9 AM',
      data: data,
    }
  ];
  const dayDate = [
    { id: "1", day: "Monday", date: "11" },
    { id: "2", day: "Tuesday", date: "12" },
    { id: "3", day: "Wednesday", date: "13" },
    { id: "4", day: "Thursday", date: "14" },
    { id: "5", day: "Friday", date: "15" },
    { id: "6", day: "Saturday", date: "16" },
    { id: "7", day: "Sunday", date: "17" }
  ];
  return (
    <SafeAreaView style={style.container}>
      {/* HEADER */}
      <View style={{ marginTop: 20 }}>
        <Header
          title={"Rounds"}
          titleColor={"#000"}
          leftIcon={"arrow-back"}
          leftPress={() => navigation.goBack()}
          leftIconColor={"#000"}
          rightIcon={"bells"}
          rightIconColor={"#000"}
        />
      </View>

      <ScrollView style={{ marginBottom: 10 }}>

        {/* GUARDIANS */}
        <TouchableOpacity style={style.guardianBox}>
          <View style={style.box}>
            <View style={style.guardianImg}>
              <Image style={style.dpGuardian} source={require("../assets/images/guardianImg.png")} />
            </View>
            <View style={style.guardianName}>
              <Text style={style.guardianText}>Guardian Name</Text>
              <View style={style.textIcon}>
                <MaterialIcons name={"star"} size={20} color="orange" />
                <Text style={style.houseText}>House Cocody</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* ACCORDIANS */}
        <View style={style.today}>
          <Text style={style.todayText}>Today</Text>
          <Text style={style.addText}>Add</Text>
        </View>
        <View style={style.checkpointSec}>
          {checkpoint.map((item) => (
            <View style={{ marginTop: 10 }}>
              <RoundsAccordian
                id={item.id}
                time={item.time}
                title={item.title}
                desc={item.checkpoint}
                circle={item.data}
                icon={item.image} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CALENDERS */}
      <View style={style.fourthSection}>
        <FlatList
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={dayDate}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) =>
            <TouchableOpacity activeOpacity={0.6} key={index} onPress={() => setDate(item.id)}
              style={[
                style.dayDate,
                {
                  borderLeftWidth: item.id == 1 ? 0 : 0.7,
                  borderLeftColor: "#000"
                }
              ]}>
              {item.id == date ? <View style={style.dateLine} /> : null}
              <Text
                style={[
                  style.dayText,
                  { color: item.id === date ? "green" : "grey" }
                ]}>
                {item.day}
              </Text>
              <Text
                style={[
                  style.dateText,
                  { color: item.id === date ? "green" : "grey" }
                ]}>
                {item.date}
              </Text>
            </TouchableOpacity>}
        />
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  guardianBox: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  box: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  guardianImg: {
    width: 105,
    height: 76,
    borderRadius: 10,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  },
  dpGuardian: {
    width: 105,
    height: 76
  },
  guardianName: {
    marginLeft: 20
  },
  guardianText: {
    color: "#000",
    fontFamily: "Montserrat-Bold"
  },
  textIcon: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center"
  },
  houseText: {
    marginLeft: 8,
    color: "grey",
    fontFamily: "Montserrat-Regular"
  },
  today: {
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 22,
    justifyContent: "space-between"
  },
  todayText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Montserrat-Medium"
  },
  addText: {
    color: "#000",
    fontSize: 14,
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
    marginLeft: 30
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
  sectionThree: {
    width: "100%",
    // height: 300,
    paddingBottom: 110,
    paddingHorizontal: 20
  },
  fourthSection: {
    position: "absolute",
    bottom: -10,
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 13
    },
    shadowOpacity: 0.24,
    shadowRadius: 14.86,
    elevation: 18
  },
  dayDate: {
    padding: 10,
    alignItems: "center"
  },
  dayText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "Montserrat-Medium"
  },
  dateText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Montserrat-Medium"
  },
  dateLine: {
    borderRadius: 10,
    width: "90%",
    height: 1.5,
    backgroundColor: "green"
  }
});
