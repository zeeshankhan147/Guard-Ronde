import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import BottomTab from "../Components/BottomTab";
import Divider from "../Components/Divider";
import Header from "../Components/Header";
import SettingBox from "../Components/SettingBox";
export default function Settings({ navigation }) {
  const settings = [
    {
      id: "1",
      title: "Payment Settings",
      icon: require("../assets/images/payment.png"),
      rightIcon: "chevron-right"
    },
    {
      id: "2",
      title: "Languages",
      icon: require("../assets/images/map.png"),
      rightIcon: "chevron-right"
    },
    {
      id: "3",
      title: "Order History",
      icon: require("../assets/images/history.png"),
      rightIcon: "chevron-right"
    },
    {
      id: "4",
      title: "Contact Us",
      icon: require("../assets/images/contact.png"),
      rightIcon: "chevron-right"
    },
    {
      id: "5",
      title: "Change Password",
      icon: require("../assets/images/password.png"),
      rightIcon: "chevron-right"
    },
    {
      id: "6",
      title: "Log Out",
      icon: require("../assets/images/logout.png")
    }
  ];
  return (
    <SafeAreaView style={style.container}>
      {/* HEADER */}
      <View style={{ marginTop: 20 }}>
        <Header
          title={"Settings"}
          titleColor={"#000"}
          leftIcon={"arrow-back"}
          leftIconColor={"#000"}
          leftPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView style={{ marginBottom: 10 }}>
        {/* EMAIL & ID SECTION */}
        <View style={style.emailSection}>
          <View style={style.textBox}>
            <Text style={style.id}>#128392022</Text>
            <Text style={style.email}>Client@email.com</Text>
          </View>
        </View>

        <View style={style.settingBox}>
          <View style={style.innerBox}>
            {settings.map((item, index) =>
              <View style={{ marginTop: 10 }}>
                <SettingBox
                  id={item.id}
                  title={item.title}
                  icon={item.icon}
                  rightIcon={item.rightIcon}
                />
                {settings.length != index + 1
                  ? <Divider width={"90%"} height={1} />
                  : null}
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
    flex: 1,
    backgroundColor: "#EFEFEF"
  },
  emailSection: {
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 20
  },
  textBox: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 50,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#b8b8b8",
    shadowOffset: {
      width: 0,
      height: 14
    },
    shadowOpacity: 0.24,
    shadowRadius: 15.38,
    elevation: 19
  },
  id: {
    color: "#000",
    fontSize: 22,
    fontFamily: "Montserrat-Medium"
  },
  email: {
    marginTop: 5,
    color: "grey",
    fontSize: 14,
    fontFamily: "Montserrat-Medium"
  },
  settingBox: {
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 20,
    shadowColor: "#b8b8b8",
    shadowOffset: {
      width: 0,
      height: 14
    },
    shadowOpacity: 0.24,
    shadowRadius: 15.38,
    elevation: 19
  },
  innerBox: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  }
});
