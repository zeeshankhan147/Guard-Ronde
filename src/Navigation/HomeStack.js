import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import Screens
import HomeA from "../Screens/HomeA";
import HomeB from "../Screens/HomeB";
import Notification from "../Screens/Notification";
import Guardians from "../Screens/Guardians";
import Residences from "../Screens/Residences";
import Settings from "../Screens/Settings";

const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeA" >
            <Stack.Screen name="HomeA" component={HomeA} />
            <Stack.Screen name="HomeB" component={HomeB} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Guardians" component={Guardians} />
            <Stack.Screen name="Residences" component={Residences} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>

    )
}