import React from "react";
import { View, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import HomeA from "../Screens/HomeA";
import HomeB from "../Screens/HomeB";
import Rounds from "../Screens/Rounds";
import ManagementPanel from "../Screens/ManagementPanel";
import QrScanner from "../Screens/QrScanner";
import Notification from "../Screens/Notification";
import Guardians from "../Screens/Guardians";
import Residences from "../Screens/Residences";
import Settings from "../Screens/Settings";
import MyDrawer from "./MyDrawer";

// Import Stacks
const Stack = createNativeStackNavigator();

function Route() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={"HomeStack"}>
          <Stack.Screen name="HomeStack" component={MyDrawer} />
          <Stack.Screen name="HomeA" component={HomeA} />
          <Stack.Screen name="HomeB" component={HomeB} />
          <Stack.Screen name="Rounds" component={Rounds} />
          <Stack.Screen name="ManagementPanel" component={ManagementPanel} />
          <Stack.Screen name="QrScanner" component={QrScanner} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Guardians" component={Guardians} />
          <Stack.Screen name="Residences" component={Residences} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Route;
