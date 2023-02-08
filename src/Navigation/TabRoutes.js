import React, { useEffect, useState } from 'react';

import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyDrawer from './MyDrawer';


Feather.loadFont();
MaterialCommunityIcons.loadFont();
const Tab = createBottomTabNavigator();

function TabRoutes() {

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarShowLabel: false,
        tabBarStyle: {
        }
      }}>

      <Tab.Screen name="HomeStack" component={MyDrawer}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons name="home" size={25} color={focused ? 'red' : 'grey'} />
            )
          }
        }}
      />
    </Tab.Navigator>

  );
}

export default TabRoutes;