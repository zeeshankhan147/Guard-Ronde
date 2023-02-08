import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator, ScrollView, TextInput, Linking, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { setUser } from './Redux/Actions/AuthAction';
import { useDispatch, useSelector } from "react-redux";

export default function Register({ navigation }) {
    const colors = useSelector(state => state.colors.currentTheme);
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Number, setNumber] = useState("")
    const [Password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const heightAnim = new Animated.Value(1000)

    useEffect(() => {
        Animated.timing(heightAnim, { toValue: 0, duration: 600, useNativeDriver: false }).start()
    }, [colors])

    const register = () => {
        setLoader(true)
        if (FirstName) {
            if (LastName) {
                if (Email.length >= 8) {
                    if (Number.length == 11) {
                        if (Password.length >= 8) {
                            auth()
                                .createUserWithEmailAndPassword(Email, Password)
                                .then((user) => {
                                    console.log('User account created & signed in!');
                                    let userDetails = {
                                        email: user.user.email,
                                        familyName: LastName,
                                        givenName: FirstName,
                                        id: user.user.uid,
                                        name: FirstName + " " + LastName,
                                        photo: null
                                    }
                                    dispatch(setUser(userDetails))
                                    setLoader(false)
                                    Alert.alert(
                                        "Successfully Registration",
                                        ``,
                                        [
                                            { text: "Ok", onPress: () => { navigation.navigate('Home') }, style: "cancel" },

                                        ],
                                        { cancelable: false }
                                    );
                                })
                                .catch(error => {
                                    if (error.code === 'auth/email-already-in-use') {
                                        alert('That email address is already in use!');
                                        setLoader(false)
                                    }

                                    if (error.code === 'auth/invalid-email') {
                                        Alert.alert('Invalid Email!', 'Please try again later!')
                                        setLoader(false)
                                    }
                                    if (error.code === 'auth/network-request-failed') {
                                        Alert.alert('Network Check', 'Please check your internet connection and try again later')
                                        setLoader(false)
                                    }

                                    console.error(error);
                                    setLoader(false)
                                });
                        }
                        else {
                            setLoader(false)
                            Alert.alert('Password', 'Please fill the field & create strong password 8 or more than 8 character!')
                        }
                    }
                    else {
                        setLoader(false)
                        Alert.alert('Number Error!', 'Please fill the field!')
                    }
                }
                else {
                    setLoader(false)
                    Alert.alert('Email Address', 'Please fill the field!')
                }

            }
            else {
                setLoader(false)
                Alert.alert('Last Name', 'Please fill the field!')
            }
        }
        else {
            setLoader(false)
            Alert.alert('First Name', 'Please fill the field!')
        }
    }

    return (
        <View style={[Styles.mainContainer, { backgroundColor: colors.background }]}>
            {/* header */}
            <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>

                <SafeAreaView>
                    <View style={Styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={Styles.leftHeader}>
                                <Feather name='chevron-left' size={16} color={colors.black} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>

                <Animated.View style={{ width: '100%', height: heightAnim, }} />
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '30%', width: '100%', }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: colors.primary, fontFamily: 'Montserrat-Bold' }}>
                        CREATE A ACCOUNT
                    </Text>
                    <View style={{ height: '100%' }}>
                        <TextInput
                            placeholderTextColor={'grey'}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 30, }}
                            placeholder={'First Name'}
                            onChangeText={(FN) => setFirstName(FN)}


                        >
                        </TextInput>
                        <TextInput
                            placeholderTextColor={'grey'}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Last Name'}
                            onChangeText={(LN) => setLastName(LN)}
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput
                            placeholderTextColor={'grey'}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Email Address'}
                            onChangeText={(EM) => setEmail(EM)}
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput
                            placeholderTextColor={'grey'}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Phone Number EX: 333-111-888'}
                            onChangeText={(NUM) => setNumber(NUM)}
                            keyboardType='number-pad'
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput
                            placeholderTextColor={'grey'}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Create New Password'}
                            onChangeText={(PASS) => setPassword(PASS)}
                            secureTextEntry
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TouchableOpacity style={{ width: 300, height: 50, backgroundColor: '#ff4e4e', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
                            onPress={() => register()}
                        >
                            {loader ? <ActivityIndicator size="small" color={colors.background} /> :
                                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Montserrat-Bold' }}>Register</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 30 }}
                            onPress={() => Linking.openURL("https://loremipsum.com")}
                        >
                            <Text style={{ color: colors.textTheme, marginBottom: 1, fontFamily: 'Montserrat-Regular', fontSize: 12, }}>Privacy Policy - Terms & Condition  </Text>

                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>

        </View>
    )
}
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
        width: '100%'
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    leftHeader: {
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#CDCDCD',
        borderWidth: 2,
    },
    rightHeader: {
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',

    },

})