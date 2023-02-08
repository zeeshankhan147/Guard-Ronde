import React from 'react'
import { View } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem

} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
Feather.loadFont();
MaterialCommunityIcons.loadFont();
const Drawer = createDrawerNavigator();

export default function MyDrawer(props) {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName="Tab">
            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ headerShown: false, drawerType: 'slide' }} />

        </Drawer.Navigator>
    );
}
const CustomDrawer = props => {
    const { navigation } = props;
    const gotoHome = () => {
        navigation.popToTop();
        navigation.closeDrawer()
    }

    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            <View style={{ paddingLeft: 20, marginTop: 20 }}>
                {/* HOME */}
                <DrawerItem
                    label="Home"
                    onPress={() => gotoHome()}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: "#888d89" }}
                    icon={() => <Feather name="home" size={22} color={"#888d89"} />}
                    pressColor={'grey'}
                />
                {/* ROUNDS */}
                <DrawerItem
                    label="Round"
                    onPress={() => navigation.navigate('Rounds')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: "#888d89" }}
                    icon={() => <Feather name="arrow-up" size={22} color={"#888d89"} />}
                    pressColor={'grey'}
                />
                {/* NOTIFICATION */}
                <DrawerItem
                    label="Notification"
                    onPress={() => navigation.navigate('Notification')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: "#888d89" }}
                    icon={() => <Feather name="bell" size={22} color={"#888d89"} />}
                    pressColor={'grey'}
                />
                {/* SETTINGS */}
                <DrawerItem
                    label="Setting"
                    onPress={() => navigation.navigate('Settings')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: "#888d89" }}
                    icon={() => <Feather name="settings" size={22} color={"#888d89"} />}
                    pressColor={'grey'}
                />
            </View>
        </DrawerContentScrollView>
    )
}



