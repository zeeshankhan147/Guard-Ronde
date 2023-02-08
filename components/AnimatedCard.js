import React, { useEffect, useState, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    Alert,
    ToastAndroid,
    useWindowDimensions,
    Animated,
    Easing
} from 'react-native';
import CircleList from 'react-native-circle-list'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { addToCartAction } from './Redux/Actions/CartAction';
import { useDispatch, useSelector } from "react-redux";

const AnimatedCard = ({ route, navigation }) => {

    const { item } = route.params;
    const isFocused = useIsFocused();
    const [qtyPlus, setQtyPlus] = useState(1)
    const [counter, setCounter] = useState(0);
    const [size, setSize] = useState('medium');
    const [textAnim, setTextAnim] = useState(true);
    const [iconAnim, setIconAnim] = useState(false);
    const [addons, setAddons] = useState([])
    const [toppingAdd, setToppingAdd] = useState()
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cart.cartData);
    const colors = useSelector(state => state.colors.currentTheme);
    const { width: windowWidth } = useWindowDimensions();

    const spinValue = new Animated.Value(0);
    const scale = new Animated.Value(1.4)
    const woodSpin = new Animated.Value(0)
    const woodScale = new Animated.Value(1)
    const opacityAnim = new Animated.Value(0)
    const toppingScale = new Animated.Value(1)
    const widthAnim = new Animated.Value(200)

    const woodSpiner = woodSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    })

    // console.disableYellowBox = true;

    useEffect(() => {
        return () => {
            setAddons([])
            setTextAnim(true)
            setIconAnim(false)
            setQtyPlus(1)
        }

    }, [isFocused])

    useEffect(() => {
        if (toppingAdd) {
            Animated.timing(toppingScale, { toValue: 0.5, useNativeDriver: false, duration: 1000 }).start()
            Animated.timing(opacityAnim, { toValue: 1, useNativeDriver: false, duration: 1000 }).start()

        } else if (!toppingAdd) {
            Animated.timing(toppingScale, { toValue: 1, useNativeDriver: false, duration: 1000 }).start()
            Animated.timing(opacityAnim, { toValue: 0, useNativeDriver: false, duration: 1000 }).start()
        }
        else {
            null
        }
    }, [toppingAdd])

    const sizeChanger = (size) => {
        if (size == 'small') {
            Animated.spring(spinValue, { toValue: 1, duration: 1000, easing: Easing.bounce, useNativeDriver: false }).start(() => setSize(size))
            Animated.spring(scale, { toValue: 1.1, useNativeDriver: false, duration: 1000 }).start()
            Animated.timing(woodSpin, { toValue: 1, useNativeDriver: false, duration: 2000 }).start()
            Animated.timing(woodScale, { toValue: 0.75, useNativeDriver: false, duration: 1000 }).start()
        }
        else if (size == 'medium') {
            Animated.spring(spinValue, { toValue: 2, duration: 1000, easing: Easing.bounce, useNativeDriver: false }).start(() => setSize(size))
            Animated.spring(scale, { toValue: 1.3, useNativeDriver: false, duration: 1000 }).start()
            Animated.timing(woodSpin, { toValue: 2, useNativeDriver: false, duration: 2000 }).start()
            Animated.timing(woodScale, { toValue: 0.9, useNativeDriver: false, duration: 1000 }).start()
        }
        else {
            Animated.spring(spinValue, { toValue: 3, duration: 1000, easing: Easing.bounce, useNativeDriver: false }).start(() => setSize(size))
            Animated.spring(scale, { toValue: 1.5, useNativeDriver: false, duration: 1000 }).start()
            Animated.timing(woodSpin, { toValue: 3, useNativeDriver: false, duration: 2000 }).start()
            Animated.timing(woodScale, { toValue: 1, useNativeDriver: false, duration: 1000 }).start()
        }

    }

    const plus = () => {
        setQtyPlus(qtyPlus + 1)
    }
    const minus = () => {
        setQtyPlus(qtyPlus - 1)
    }
    const AddCart = () => {
        let data = {
            addons: addons,
            id: item.id,
            title: item.title,
            price: Math.round(item.price * qtyPlus),
            image: item.image,
            quantity: qtyPlus
        }
        dispatch(addToCartAction(data))
        setTimeout(() => {
            navigation.navigate('Home')
        }, 600);

    }

    const addAddon = (item) => {
        setToppingAdd(item.topping)
        let addonsArray = [];
        addonsArray.push(item)
        if (addons) {
            addons.map((addonItem) => {
                addonsArray.push(addonItem)
            })
        }
        setAddons(addonsArray)
    }

    const removeAddons = (id) => {
        let tempAddons = [...addons];
        let index = tempAddons.map(function (item) { return item.id; }).indexOf(id.id);
        tempAddons.splice(index, 1)
        setAddons(tempAddons)
        setToppingAdd()
    }

    const renderAddons = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} activeOpacity={0.4} onPress={() => addons.some((val) => val.id === item.id) ? removeAddons(item) : addAddon(item)}
                style={{ marginHorizontal: 20, padding: 10 }}>
                <View style={[
                    {
                        backgroundColor: addons.some((val) => val.id === item.id) ? colors.secondary : '#fff',
                        opacity: addons.includes(item) ? 0.5 : 1,
                        width: 60, height: 60, alignItems: 'center', justifyContent: 'center',
                        borderRadius: 60,
                        elevation: 10,
                        shadowColor: '#b8b8b8f5',
                    }
                ]}>
                    <Image
                        style={[
                            {
                                width: 40, height: 40, borderRadius: 40,
                                backgroundColor: addons.some((val) => val.id === item.id) ? colors.secondary : '#fff',
                                opacity: addons.some((val) => val.id === item.id) ? 0.4 : 1
                            }
                        ]}
                        source={item.image} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderFlavors = ({ item, index }) => {

        const spin = spinValue.interpolate({
            inputRange: [0, 1,],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View
                style={{ width: windowWidth, height: 450, justifyContent: 'center', alignItems: 'center' }}
                key={index}>
                <View style={{ position: 'absolute', top: 20 }}>
                    <Text style={{
                        fontSize: 26,
                        fontWeight: '800',
                        color: colors.primary
                    }}>{item.title}</Text>
                </View>
                {addons.map((item, index) => {
                    console.warn(item);
                    return (
                        <Animated.Image source={item.topping} style={{ top: -20, width: 500, height: 500, position: 'absolute', alignSelf: 'center', zIndex: 1000, opacity: opacityAnim, transform: [{ scale: toppingScale }] }} />
                    )
                })}

                <Animated.Image
                    key={index}
                    style={{ width: 200, height: 200, transform: [{ rotate: spin }, { scale }] }}
                    source={item.image}
                />


            </View>
        )
    }

    return (

        <View style={[styles.container, { backgroundColor: colors.secondTheme }]}>

            <View style={{ position: 'absolute', width: '100%', top: 76 }}>
                <Animated.Image
                    style={{ width: 300, height: 300, alignSelf: 'center', transform: [{ rotate: woodSpiner }, { scale: woodScale }] }}
                    source={require('../assets/images/wooden.png')} />
            </View>

            <View style={{
                width: windowWidth, height: 400,
                alignItems: 'center', justifyContent: 'center'
            }}>
                <FlatList
                    data={item.flavor}
                    renderItem={renderFlavors}
                    keyExtractor={item => item.id}
                    pagingEnabled
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior='automatic'
                />
            </View>

            <View style={{
                width: windowWidth, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
                marginTop: 5
            }}>
                <TouchableOpacity style={[styles.btn, {}]}
                    onPress={() => sizeChanger('small')}
                >
                    <Text style={[styles.btnText, { color: size == 'small' ? '#717171f5' : '#b4b4b4f5', }]} >S</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, {}]}
                    onPress={() => sizeChanger('medium')}
                >
                    <Text style={[styles.btnText, { color: size == 'medium' ? '#717171f5' : '#b4b4b4f5' }]}>M</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, {}]}
                    onPress={() => sizeChanger('large')}
                >
                    <Text style={[styles.btnText, { color: size == 'large' ? '#717171f5' : '#b4b4b4f5' }]}>L</Text>
                </TouchableOpacity>

            </View>

            {/* PRICE SECTION */}
            <View style={{
                width: windowWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                marginTop: 40,
            }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'baseline', borderColor: colors.textTheme, borderWidth: 0.5,
                    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 5
                }}>
                    <TouchableOpacity onPress={qtyPlus > 1 ? minus : null}>
                        <MaterialCommunityIcons name='minus' size={20} color={colors.textTheme} style={{ paddingRight: 10, borderRightColor: colors.textTheme, borderRightWidth: 0.4, marginRight: 15 }} />
                    </TouchableOpacity>

                    {/* <Text style={{ fontSize: 20, fontWeight: '800' }}>Price </Text> */}
                    <Animated.View>
                        <Text style={{ fontWeight: '500', fontSize: 20, color: colors.textTheme }}>{`Rs ${Math.round(item.price * qtyPlus)}`}</Text>
                    </Animated.View>
                    <TouchableOpacity onPress={plus}>
                        <MaterialCommunityIcons name='plus' size={20} color={colors.textTheme} style={{ paddingLeft: 10, borderLeftColor: colors.textTheme, borderLeftWidth: 0.4, marginLeft: 15 }} />
                    </TouchableOpacity>
                </View>

            </View>

            {/*PIZZA TOPING ANIMATION VIEW */}
            <View
                style={{ marginTop: 40 }}>
                <CircleList
                    data={item.ingredient}
                    keyExtractor={item => parseInt(item.id)}
                    renderItem={renderAddons}
                    swipeSpeedMultiplier={20}
                    selectedItemScale={1.5}
                    radius={windowWidth / 2}
                />
            </View>

            {/* ADD TO CART BUTTON */}
            <View
                style={{ width: '100%', paddingVertical: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10 }}>
                <TouchableOpacity onPress={AddCart} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.View
                        style={{
                            backgroundColor: colors.primary,
                            width: widthAnim,
                            paddingVertical: 10,
                            borderRadius: 50,
                        }}>

                        {textAnim ?
                            <Text style={{ color: colors.secondTheme, fontSize: 14, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}>
                                ADD TO CART
                            </Text> :
                            <MaterialCommunityIcons name='check' size={20} color="#fff" style={{ alignSelf: 'center' }} />
                        }


                    </Animated.View>

                </TouchableOpacity>

            </View>


        </View>

    );
}
export default AnimatedCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    btn: {
        width: 60,
        height: 60,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 19,
        shadowColor: '#959595f5'

    }



});