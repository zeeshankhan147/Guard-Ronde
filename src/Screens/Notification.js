import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Divider from "../Components/Divider";
import Header from "../Components/Header";
import Notifier from "../Components/Notifier";
import BottomTab from "../Components/BottomTab";

export default function Notification({ navigation }) {
  const notification = [
    {
      id: "1",
      title: "Gardien Name Missed a scan",
      time: "09:32 am",
      image: require("../assets/images/guardianImg.png"),
      locker: false
    },
    {
      id: "2",
      title: "Scanned by Gardian Name",
      time: "10:12 am",
      image: require("../assets/images/guardianImg.png"),
      locker: true
    },
    {
      id: "3",
      title: "Gardien Name Missed a scan",
      time: "09:32 am",
      image: require("../assets/images/guardianImg.png"),
      locker: false
    },
    {
      id: "4",
      title: "Scanned by Gardian Name",
      time: "10:12 am",
      image: require("../assets/images/guardianImg.png"),
      locker: true
    }
  ];
  return (
    <SafeAreaView style={style.container}>
      {/* HEADER */}
      <View style={{ marginTop: 20 }}>
        <Header
          title={"Notifications"}
          titleColor={"#000"}
          leftIcon={"arrow-back"}
          leftIconColor={"#000"}
          leftPress={() => navigation.goBack()}
          rightIcon={"bells"}
          rightIconColor={"#000"}
        />
      </View>
      <ScrollView style={style.scrollView}>
        {/* TODAY SECTION */}
        <View style={style.today}>
          <Text style={style.todayText}>Today</Text>
        </View>

        <View style={style.todaySection}>
          <View style={style.todayBox}>
            {notification.map((item, index) =>
              <View style={{ paddingVertical: 10 }}>
                <Notifier
                  id={item.id}
                  title={item.title}
                  time={item.time}
                  image={item.image}
                  lock={item.locker}
                />
                {notification.length != index + 1 ? <Divider /> : null}
              </View>
            )}
          </View>
        </View>

        {/* YESTERDAY SECTION */}
        <View style={style.today}>
          <Text style={style.todayText}>Yesterday</Text>
        </View>

        <View style={style.todaySection}>
          <View style={style.todayBox}>
            {notification.map((item, index) =>
              <View style={{ paddingVertical: 10 }}>
                <Notifier
                  id={item.id}
                  title={item.title}
                  time={item.time}
                  image={item.image}
                  lock={item.locker}
                />
                {notification.length != index + 1 ? <Divider /> : null}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <BottomTab onTouch={() => navigation.popToTop()} />
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginBottom: 10
  },
  today: {
    marginTop: 20,
    paddingHorizontal: 30
  },
  todayText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Montserrat-Medium"
  },
  todaySection: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  todayBox: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#b8b8b8",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.21,
    shadowRadius: 8.19,
    elevation: 11
  }
});
