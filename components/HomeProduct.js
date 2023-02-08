import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCartAction, removeCart, updateCart } from './Redux/Actions/CartAction';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';


export default HomeProduct = (props) => {
    const {
        index,
        itemId,
        image,
        title,
        price,
        addons,
        minusQty,
        qty,
        item,
        navigation,
        deleteItem,
        from,
        cartBtn,
        hiddenBtn
    } = props;
    const [qtyPlus, setQtyPlus] = useState(1)
    const [quick, setQuick] = useState(false)
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cart.cartData);
    const colors = useSelector(state => state.colors.currentTheme);
    const isFocused = useIsFocused();

    useEffect(() => {
        setQuick(hiddenBtn)
    }, [hiddenBtn])

    useEffect(() => {
        Object.values(myCart).map((i, ind) => {
            if (i.id == itemId) {
                setQtyPlus(myCart[ind].quantity)
                setQuick(true)
            }

        })
    }, [isFocused])

    const AddCart = (item) => {
        cartBtn(item)
        setQuick(true)

    }

    const addQty = () => {
        let data = myCart;
        Object.values(data).map((idCheck, ind) => {
            if (idCheck.id == itemId) {
                data[ind].quantity = data[ind].quantity + 1
                dispatch(updateCart(data))
                setQtyPlus(data[ind].quantity)

            }
        })

    }

    const removeQty = () => {
        let data = myCart;
        Object.values(data).map((idCheck, ind) => {
            if (idCheck.id == itemId) {
                data[ind].quantity = data[ind].quantity - 1
                dispatch(updateCart(data))
                setQtyPlus(data[ind].quantity)

            }
        })
    }


    const itemDelete = () => {
        deleteItem(itemId)
        setQuick(false)

    }

    return (

        <View>
            <View style={{ marginBottom: 10, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: colors.textLight, paddingBottom: 8 }}>
                <View style={{ width: 100, alignItems: 'center' }}>
                    {/* <Text>Category here</Text> */}
                    <Image source={item.image}
                        style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: 'white' }}
                    />
                    {quick ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 8,

                            }}>

                            <TouchableOpacity onPress={() => qtyPlus > 1 ? removeQty() : itemDelete()}
                                style={{ backgroundColor: colors.primary, paddingVertical: 3, paddingHorizontal: 3, borderRadius: 4 }}>
                                <MaterialCommunityIcons name="minus" size={17} color={colors.black_white}
                                />
                            </TouchableOpacity>

                            <Text style={{ marginHorizontal: 15, color: colors.textLight }}>{qtyPlus}</Text>

                            <TouchableOpacity onPress={() => addQty()}
                                style={{ backgroundColor: colors.primary, paddingVertical: 3, paddingHorizontal: 3, borderRadius: 4 }}>
                                <MaterialCommunityIcons name="plus" size={17} color={colors.black_white}
                                />
                            </TouchableOpacity>

                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => AddCart(item)}
                            style={{
                                flexDirection: 'row', backgroundColor: colors.primary, paddingHorizontal: 15,
                                borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 8, paddingVertical: 3

                            }}>
                            <MaterialCommunityIcons name="cart" size={17} color={colors.black_white} />
                            <Text style={{ marginLeft: 3, color: colors.black_white }}>ADD</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Animated', { item: item })} style={{ width: 300, }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, color: colors.textTheme }}>{item.title}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, marginTop: 6, color: 'grey' }}>{item.description}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold', marginTop: 6, color: colors.textTheme }}>Rs. {item.price}</Text>

                </TouchableOpacity>
            </View>

        </View>






    );

}
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white

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

    container: {

        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent:'space-between',
        backgroundColor: '#fff',
        marginHorizontal: 25,
        paddingVertical: 10,
        // marginTop:20,
        // borderRadius:20,
        paddingHorizontal: 10,
        // borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5
        },
        elevation: 4,
        marginBottom: 10,


    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 70,
        borderColor: 'grey',
        borderWidth: 0.3,
        // backgroundColor:'red',
        borderRadius: 10,



    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    textView: {
        justifyContent: 'center',
        marginLeft: 15,
        width: '80%'


    },
    title: {
        fontSize: 12,
        fontWeight: '600'

    },
    addon: {
        fontSize: 10,
        color: Colors.textLight,
        fontWeight: '400',
        width: '60%',
        // position:'absolute',
        // right:22,
        // top:26
    },
    price: {
        fontSize: 10,
        color: Colors.textDark,
        fontWeight: '800'
        // position:'absolute',
        // right:22,
        // top:26
    },
    cartTitle: {
        fontSize: 30,
        marginHorizontal: 30,
        marginVertical: 15,
        fontFamily: 'Montserrat-SemiBold'

    },
    quantityController: {
        position: 'absolute',
        right: 35,
        // top:1,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    qtyPlus: {
        padding: 3,
        borderWidth: 1.5,
        borderColor: colors.secondary,
        backgroundColor: colors.white,
        marginLeft: 28,
        borderRadius: 6
    },
    qtyMinus: {
        padding: 3,
        borderWidth: 1.5,
        // borderColor: colors.secondary,
        // backgroundColor:colors.white,
        borderRadius: 6
    },
    count: {
        marginLeft: 10,
        marginRight: 10,
    }
})