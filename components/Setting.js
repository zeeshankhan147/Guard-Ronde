import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert
} from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import colors from '../assets/colors/colors';
import { logoutUser } from './Redux/Actions/AuthAction';
import { darkTheme, lightTheme } from './Redux/Actions/ThemeAction';

export default function Setting({ navigation }) {
  const dispatch = useDispatch();
  const myUser = useSelector(state => state.auth.user)
  const colors = useSelector(state => state.colors.currentTheme);
  const [isEnabled, setIsEnabled] = useState(false)
  const [isTheme, setIsTheme] = useState(false)
  const [isEmail, setIsEmail] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('DARK_THEME').then((value) => {
      if (value === 'false') {
        setIsTheme(true)
      }
      else {
        setIsTheme(false)
      }
    })
  })

  const toggleSwitch = (toggles) => {
    if (toggles === 'push') {
      isEnabled ? setIsEnabled(false) : setIsEnabled(true);
    } else if (toggles === 'email') {
      isEmail ? setIsEmail(false) : setIsEmail(true);
    } else if (toggles === 'theme') {
      isTheme ? setIsTheme(false) : setIsTheme(true);
      isTheme ? dispatch(lightTheme()) : dispatch(darkTheme());

    }
  }
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure logout user ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(logoutUser())
            navigation.navigate("Home")
          }
        },
      ],
      { cancelable: false }
    )
  }

  const Devider = (props) => {
    return (
      <View style={{ marginTop: props.marginTop, alignSelf: props.align, width: props.width, height: props.height, backgroundColor: props.bgColor }} />
    )
  }

  return (
    <ScrollView style={[styles.mainContainer, { backgroundColor: colors.theme }]}>

      {/* HEADER */}
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name='chevron-back' size={24} color={colors.textDark} style={{ padding: 5 }} />
        </TouchableOpacity>
        <Text style={[styles.mainTitle, { color: colors.textDark }]}>Setting</Text>
      </View>

      {/* PROFILES SECTION */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={!myUser ? () => navigation.navigate("SignUp") : null} style={[styles.profileBox, { backgroundColor: colors.secondTheme }]}>
          <View style={styles.imgContainer}>
            {
              myUser && myUser.photo !== null ? <Image style={styles.pfImg} source={myUser.photo} /> :
                <Image source={require('../assets/images/user2.png')} style={styles.pfImg} />
            }
          </View>
          <View style={styles.pfTextContainer}>
            <Text style={[styles.title, { color: colors.textDark }]}>{myUser && myUser.name !== null ? myUser.name : "Login"}</Text>
            <Text style={[styles.email, { color: colors.textDark }]}>{myUser && myUser.name !== null ? myUser.email : "You are not a authorized \nuser so please login"}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* NOTIFICATION & THEMES SECTION*/}
      <View style={[styles.commonSettingSec, { backgroundColor: colors.secondTheme }]}>
        <Text style={[styles.notifyText, { color: colors.textDark }]}>General Settings</Text>

        <View style={styles.notificationSec}>
          <View style={styles.textSec}>
            <Text style={[styles.headingText, { color: colors.textDark }]}>Push Notification</Text>
            <Text style={[styles.descText, { color: colors.textDark }]}>Recieve weekly notifications</Text>
          </View>
          <View style={styles.switchSec}>
            <Switch
              trackColor={{ false: "#767577", true: colors.background }}
              thumbColor={isEnabled ? colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch('push')}
              value={isEnabled}
            />
          </View>
        </View>
        <Devider width={'100%'} height={0.5} bgColor={'#000'} marginTop={20} align={'center'} />

        <TouchableOpacity style={styles.notificationSec}>
          <View style={[styles.textSec, { color: colors.textDark }]}>
            <Text style={[styles.headingText, { color: colors.textDark }]}>Edit Profile</Text>
            <Text style={[styles.descText, { color: colors.textDark }]}>Easily customize your profile & pictures etc.</Text>
          </View>
          <View style={styles.switchSec}>
            <View style={styles.switchSec}>
              <Ionicons name='chevron-forward' size={24} color={colors.textDark} style={{ padding: 5 }} />
            </View>
          </View>
        </TouchableOpacity>
        <Devider width={'100%'} height={0.5} bgColor={'#000'} marginTop={20} align={'center'} />

        <View style={[styles.notificationSec, { paddingBottom: 10 }]}>
          <View style={styles.textSec}>
            <Text style={[styles.headingText, { color: colors.textDark }]}>{`Switch ${isTheme ? 'Light' : 'Dark'}`}</Text>
            <Text style={[styles.descText, { color: colors.textDark }]}>{`Customize your app themes `}</Text>
          </View>
          <View style={styles.switchSec}>
            <Switch
              trackColor={{ false: "#767577", true: colors.background }}
              thumbColor={isTheme ? colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch('theme')}
              value={isTheme}
            />
          </View>
        </View>
      </View>

      {/* SUPPORT CONTACT ABOUT SECTION */}
      <View style={[styles.commonSettingSec, { backgroundColor: colors.secondTheme }]}>
        <Text style={[styles.notifyText, { color: colors.textDark }]}>Support</Text>

        <TouchableOpacity onPress={() => navigation.navigate("TextComponent",
          {
            text: {
              header: 'About Us',
              Description: `Welcome to the home of delicious gourmet Pizzas. GuardRonde is a modern restaurant that exists to delight 
              passionate Pizza lovers. Walk in and place your order and sit back and relax and soak in our attractive ambiance as 
              you wait for your order to be prepared. All Pizzas are cooked to order and we pride ourselves on serving fresh, delicious
              and hygienic Pizzas that tantalize the taste buds and excite your senses. We have perfected the optimized packaging to 
              enhance your Pizza experience. Our packaging is designed to be easy to hold and carry as well as ensure that your Pizzas
              maintain their flavour and shape. For those who do not prefer a dine in or takeaway experience, we offer our patrons the 
              option to have their order delivered at their home or office. What makes us O-So-Special? We only use premium meat 
              that is guaranteed for its freshness. What's more, our sauces are hand-crafted with secret spices and herbs that leaves
              you drooling for more. If its your first trip you would love our gourmet Pizzas Crunchos with fried mozzarella cheese 
              patty and crisp nachos or Messy meat with crispy onion rings and saucy chili. For the sides, we are loved for our
              Gourmet fries - potatoes topped with a variety of, sauces, nacho cheese, jalapeños, pepperoni and so much more!`
            }
          }

        )}
          style={styles.notificationSec}>
          <View style={styles.textSec}>
            <Text style={[styles.headingText, { color: colors.textDark }]}>About</Text>
          </View>
          <View style={styles.switchSec}>
            <Ionicons name='chevron-forward' size={24} color={colors.textDark} style={{ padding: 5 }} />
          </View>
        </TouchableOpacity>

        <Devider width={'100%'} height={0.5} bgColor={'#000'} marginTop={20} align={'center'} />

        <TouchableOpacity onPress={() => navigation.navigate("TextComponent",
          {
            text: {
              header: 'Contact',
              Description: `PHONE : 0336815335 \n\nADDRESS : DHA Phase 6 Khada Market Karachi Pakistan
              \nMAIN BRANCH : Clifton Boot Basen nearest.
              `
            }
          }

        )} style={[styles.notificationSec, { paddingBottom: 10 }]}>
          <View style={styles.textSec}>
            <Text style={[styles.headingText, { color: colors.textDark }]}>Contact Us</Text>
          </View>
          <View style={styles.switchSec}>
            <Ionicons name='chevron-forward' size={24} color={colors.textDark} style={{ padding: 5 }} />
          </View>
        </TouchableOpacity>

        {myUser && <Devider width={'100%'} height={0.5} bgColor={'#000'} marginTop={20} align={'center'} />}

        {myUser && <TouchableOpacity onPress={() => logout()} style={[styles.notificationSec, { paddingBottom: 10 }]}>
          <View style={styles.textSec}>
            <Text style={[styles.headingText, { color: colors.textDark }]}>Logout</Text>
          </View>
          <View style={styles.switchSec}>
            <MaterialIcons name='logout' size={24} color={colors.textDark} style={{ padding: 5 }} />
          </View>
        </TouchableOpacity>}

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginTop: 30,
    paddingVertical: 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'

  },
  mainTitle: {
    marginLeft: 4,
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    // color: colors.textDark,
  },
  profileContainer: {
    marginTop: 20,
    width: '100%',
    padding: 10,
  },
  profileBox: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: '#d7d7d7',
    borderRadius: 18,
    elevation: 8
  },
  imgContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,

  },
  pfImg: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  pfTextContainer: {
    paddingLeft: 2,
    width: '70%',
    justifyContent: 'center'
  },
  title: {
    // color: colors.textDark,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',

  },
  email: {
    // color: colors.textLight,
    marginTop: 5,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
  commonSettingSec: {
    width: '100%',
    marginTop: 30,
    borderRadius: 20,
    padding: 20,
    // backgroundColor: '#d7d7d7',
    elevation: 2
  },
  notifyText: {
    // color: colors.textDark,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  notificationSec: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
  },
  textSec: {
    width: '70%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  descText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  switchSec: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  }

})