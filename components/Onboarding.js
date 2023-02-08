import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native"
import OnboardingSlide from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../assets/colors/colors";

export default function Onboarding({ navigation }) {
    const onSkip = () => {
        AsyncStorage.setItem("@ONBOARDING", "Onboarding");
        navigation.replace("HomeStack")
    }
    return (
        <View style={{ flex: 1 }}>
            <OnboardingSlide
                onSkip={() => onSkip()}
                DoneButtonComponent={() => doneBtn(navigation)}
                subTitleStyles={{ paddingHorizontal: 24 }}
                pages={[
                    {
                        backgroundColor: colors.background,
                        image: <Image style={{ width: 150, height: 150 }} source={require('../assets/images/signup.png')} />,
                        title: 'Easy Social Login',
                        subtitle: 'Very easy social logins & register your account and enjoy your food',
                    },
                    {
                        backgroundColor: colors.price,
                        image: <Image style={{ width: 150, height: 150 }} source={require('../assets/images/enjoy-food.png')} />,
                        title: 'Enjoy Your Meal',
                        subtitle: 'Use app and enjoy your meal with fastest way',
                    },
                    {
                        backgroundColor: colors.primary,
                        image: <Image style={{ width: 150, height: 150 }} source={require('../assets/images/fast-delivery.png')} />,
                        title: 'Quick Delivery',
                        subtitle: 'Food Delivery is very fast & quick response in your app ordering',
                    },

                ]}
            />
        </View>
    )
}
function doneBtn(navigation) {
    const onDone = () => {
        AsyncStorage.setItem("@ONBOARDING", "Onboarding");
        navigation.replace("HomeStack")

    }
    return (
        <TouchableOpacity onPress={onDone} style={{ marginRight: 20 }}>
            <Text style={{ color: '#fff' }}>Done</Text>
        </TouchableOpacity>
    )
}
