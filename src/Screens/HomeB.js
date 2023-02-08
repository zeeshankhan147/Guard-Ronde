import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Header from "../Components/Header";
import { Dropdown } from "react-native-element-dropdown";
import ScanTimeBox from "../Components/ScanTimeBox";
import Boxes from "../Components/Boxes";
import RoundedButton from "../Components/RoundedButton";

export default function HomeB({ navigation }) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "Guardian time : 6hrs 32min", value: "1" },
    { label: "Guardian time : 6hrs 32min", value: "2" },
    { label: "Guardian time : 6hrs 32min", value: "3" },
    { label: "Guardian time : 6hrs 32min", value: "4" },
    { label: "Guardian time : 6hrs 32min", value: "5" },
    { label: "Guardian time : 6hrs 32min", value: "6" },
    { label: "Guardian time : 6hrs 32min", value: "7" },
    { label: "Guardian time : 6hrs 32min", value: "8" }
  ];
  function drawerOpening() {
    navigation.openDrawer()
  }
  return (
    <SafeAreaView style={style.container}>
      {/* HEADER SECTION */}
      <View style={style.headerSection}>
        {/* HEADER */}
        <View style={{ marginTop: 20 }}>
          <Header
            title={"Home"}
            titleColor={"white"}
            leftIcon={"menu"}
            leftIconColor={"white"}
            leftPress={() => drawerOpening()}
            rightIcon={"bells"}
            rightIconColor={"white"}
            rightPress={() => navigation.navigate("Notification")}
          />
        </View>
        {/* SEARCH OR DROPDOWN SECTION */}
        <TouchableOpacity activeOpacity={0.8} style={style.searchContainer}>
          <Dropdown
            style={[style.dropdown, isFocus && { backgroundColor: "#fff" }]}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={[style.selectedTextStyle, isFocus && { color: "#000" }]}
            inputSearchStyle={style.inputSearchStyle}
            iconColor={isFocus ? "#000" : '#fff'}
            iconStyle={style.iconStyle}
            data={data}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Please Select a Guardian time" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </TouchableOpacity>
      </View>
      {/* BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.navigate("QrScanner")}
        activeOpacity={0.8} style={style.button}>
        <Image
          style={{ width: 140, height: 140, }}
          source={require("../assets/images/button2.png")}
        />
      </TouchableOpacity>

      <ScrollView>
        <View style={style.scan}>
          <Text style={style.scanText}>Scan #1</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <ScanTimeBox
            title1={"Next Scan in"}
            time={"22 min 26sec"}
            img={require("../assets/images/icon1.png")}
            icon={"chevron-forward"}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Boxes />
        </View>
        <View style={{ marginTop: 20 }}>
          <RoundedButton
            onTouch={() => navigation.navigate("ManagementPanel")}
            text={"Scan"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingBottom: 30
  },
  headerSection: {
    width: "100%",
    height: "30%",
    backgroundColor: "#888d89"
  },
  searchContainer: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20
  },
  searchBox: {
    backgroundColor: "#6d7278",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  searchText: {
    color: "#eee",
    fontSize: 14,
    fontFamily: "Montserrat-Regular"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    marginTop: -70,
    width: 140,
    height: 140,
    borderRadius: 200,
    marginBottom: 15,
    backgroundColor: "#ffe8de"
  },
  scan: {
    marginTop: 2,
    alignItems: "center"
  },
  scanText: {
    color: "#333",
    fontSize: 22,
    fontFamily: "Montserrat-Bold"
  },
  dropdown: {
    height: 50,
    borderColor: "#6d7278",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#6d7278"
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    color: "#eee",
    fontSize: 14,
    fontFamily: "Montserrat-Regular"
  },
  selectedTextStyle: {
    color: "#eee",
    fontSize: 14,
    fontFamily: "Montserrat-Regular"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});
