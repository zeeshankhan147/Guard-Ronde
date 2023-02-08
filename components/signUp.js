import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, Easing, ActivityIndicator, ScrollView, TextInput, Linking, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './Redux/Actions/AuthAction';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import { color } from 'react-native-reanimated';




export default function signUp({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userData, setUserData] = useState()
    const [loader, setLoader] = useState(false)
    const [googleLoader, setGoogleLoader] = useState(false)
    const [facebookLoader, setFacebookLoader] = useState(false)
    const [appleLoader, setAppleLoader] = useState(false)
    const dispatch = useDispatch();
    const heightAnim = new Animated.Value(1000)
    const colors = useSelector(state => state.colors.currentTheme);

    useEffect(() => {
        GoogleSignin.configure();
    }, [])
    useEffect(() => {
        Animated.timing(heightAnim, { toValue: 0, duration: 600, useNativeDriver: false }).start()
    }, [colors])

    const login = async () => {
        if (email && password) {
            setLoader(true)
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log('User account created & signed in!');
                    let userDetails = {
                        email: user.user.email,
                        familyName: null,
                        givenName: null,
                        id: user.user.uid,
                        name: null,
                        photo: null
                    }
                    dispatch(setUser(userDetails))
                    setLoader(false)
                    Toast.showWithGravity('Login Successfully', Toast.LONG, Toast.TOP);
                    navigation.goBack()
                })
                .catch(error => {
                    if (error.code === 'auth/wrong-password') {
                        setLoader(false)
                        Alert.alert('Wrong password!', 'Please enter the correct password!')
                    }
                    if (error.code === 'auth/user-not-found') {
                        Alert.alert('Invalid Email!', 'Please enter the valid email!')
                        setLoader(false)
                    }
                    if (error.code === 'auth/too-many-requests') {
                        Alert.alert('Request Failed', 'Please try again later!')
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('Invalid Email!', 'Please try again later!')
                    }
                    if (error.code === 'auth/network-request-failed') {
                        Alert.alert('Network Check', 'Please check your internet connection and try again later')
                    }
                    setLoader(false)
                    // console.error(error);

                });
        } else {
            setLoader(false)
            Alert.alert('Login Error', 'Please enter the correct email address & password!')

        }
    }


    const googleSignUp = async () => {
        setGoogleLoader(true)
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();
            // console.log('userrr', userInfo.user);
            if (userInfo) {
                dispatch(setUser(userInfo.user))
                setTimeout(() => {
                    navigation.navigate('Home')
                    setGoogleLoader(false)
                }, 3000);
            }
        }
        catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                setGoogleLoader(false)

                // user cancelled the login flow
                console.log(error);

            } else if (error.code === statusCodes.IN_PROGRESS) {
                setGoogleLoader(true)

                // operation (e.g. sign in) is in progress already
                console.log(error);

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('PLAY_SERVICES_NOT_AVAILABLE --->>', error);
                setGoogleLoader(false)



            } else {
                // some other error happened
                // console.log(error);
                setGoogleLoader(false)

            }
        }
    };

    const facebookSignUp = () => {
        setFacebookLoader(true)
        setTimeout(() => {
            alert('not ampliment')
            setFacebookLoader(false)
        }, 3000);
    }
    const appleSignUp = () => {
        setAppleLoader(true)
        setTimeout(() => {
            alert('not ampliment')
            setAppleLoader(false)
        }, 3000);
    }



    return (

        <View style={[Styles.mainContainer, { backgroundColor: colors.background }]}>
            {/* header */}
            <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <View style={Styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={Styles.leftHeader}>
                                <Feather name='chevron-left' size={16} color={color.black} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
                <Animated.View style={{ width: '100%', height: heightAnim, }} />
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '30%', width: '100%', }}>
                    <Text style={{ fontSize: 25, fontWeight: '600', color: colors.primary, fontFamily: 'Montserrat-Bold' }}>
                        PLEASE LOGIN!
                    </Text>
                    <View style={{ height: 200 }}>
                        <TextInput
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 40 }}
                            placeholder={'Email Address'}
                            placeholderTextColor={'grey'}
                            onChangeText={(em) => setEmail(em)}
                            keyboardType="email-address"
                            importantForAutofill="noExcludeDescendants">
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Password'}
                            placeholderTextColor={'grey'}
                            onChangeText={(pass) => setPassword(pass)}
                            secureTextEntry
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TouchableOpacity style={{ width: 300, height: 50, backgroundColor: '#ff4e4e', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
                            onPress={() => login()}
                        >
                            {loader ? <ActivityIndicator size="small" color={colors.background} /> :
                                <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Montserrat-Bold' }}>Login</Text>}
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginTop: 20, }}>
                            <Text style={{ marginRight: 5, fontSize: 12, fontFamily: 'Montserrat-SemiBold', color: colors.textTheme }}>Do you not have your account!</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                <Text style={{ fontSize: 12, color: '#1a73e8', fontFamily: 'Montserrat-SemiBold', }}>Register</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '50%', marginTop: 100 }}>
                        <TouchableOpacity style={{ width: 55, height: 50, backgroundColor: '#ff4e4e', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                            onPress={googleSignUp}
                        >
                            {googleLoader ? <ActivityIndicator size="small" color={colors.background} /> :
                                <MaterialCommunityIcons name='google' size={22} color={colors.white} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 55, height: 50, backgroundColor: '#1a73e8', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                            onPress={facebookSignUp}
                        >
                            {facebookLoader ? <ActivityIndicator size="small" color={colors.background} /> :
                                <MaterialCommunityIcons name='facebook' size={22} color={colors.white} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 55, height: 50, backgroundColor: '#000', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                            onPress={appleSignUp}
                        >
                            {appleLoader ? <ActivityIndicator size="small" color={colors.background} /> :
                                <MaterialCommunityIcons name='apple' size={22} color={colors.white} />}
                        </TouchableOpacity>
                    </View>


                </View>


                <TouchableOpacity style={{ alignItems: 'center', marginTop: 30 }}
                    onPress={() => Linking.openURL("https://loremipsum.com")}>
                    <Text style={{ marginBottom: 30, fontFamily: 'Montserrat-Regular', fontSize: 12, color: colors.textTheme }}>Privacy Policy - Terms & Condition  </Text>

                </TouchableOpacity>
            </ScrollView>

        </View>


    );
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