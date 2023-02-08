import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCart from './productCart';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { removeAllCart, removeCart, updateCart } from './Redux/Actions/CartAction';





export default AddToCart = ({ route, navigation }) => {
    let currency = 'Rs';
    let DiscountPercent = 50;
    let TaxPercent = 20;
    let deliveryFee = 50;
    // const [quantity, setQuantity] = useState(1)
    const [updateTotalAmount, setUpdateTotalAmount] = useState(0)
    const [discountTotalAmount, setDiscountTotalAmount] = useState(0)
    const [taxTotalAmount, setTaxTotalAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const isFocused = useIsFocused();
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cart.cartData)
    const myUser = useSelector(state => state.auth.user);
    const colors = useSelector(state => state.colors.currentTheme);


    const clearCartItem = () => {
        Alert.alert(
            "Clear All",
            "Do you want to clear all item from cart ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => dispatch(removeAllCart())
                },
            ],
            { cancelable: false }
        )


    }


    const deleteItem = (index) => {

        Alert.alert(
            "Delete Item",
            "Do you want to remove item from cart ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => del(index)
                },
            ],
            { cancelable: false }
        )
    }

    const del = (index) => {
        let data = [...myCart]
        data.splice(index, 1)
        dispatch(removeCart(data))
        updateAmount()

    }

    const addQuantity = (price, index) => {
        let data = myCart;
        data[index].quantity = data[index].quantity + 1
        dispatch(updateCart(data))
    }

    const removeQuantity = (price, index) => {
        let data = myCart;
        data[index].quantity = data[index].quantity - 1
        dispatch(updateCart(data))
    }

    function updateAmount() {
        let subTotal = 0;
        let discountTotal = 0;
        let taxTotal = 0;
        let grandTotal = 0;
        myCart.map((i) => {
            subTotal += i.price * i.quantity;
            discountTotal += ((i.price * DiscountPercent / 100) * i.quantity);
            taxTotal += ((i.price * TaxPercent / 100) * i.quantity);

        })
        grandTotal = discountTotal + taxTotal;
        setUpdateTotalAmount(Math.round(subTotal))
        setDiscountTotalAmount(Math.round(subTotal * DiscountPercent / 100))
        setTaxTotalAmount(Math.round(subTotal * TaxPercent / 100))
        setTotalAmount(Math.round(grandTotal + deliveryFee));


    }


    useEffect(() => {
        updateAmount()
        // Will Unmount //
        return () => {

        }

    })


    const renderComponentItem = ({ item, index }) => {
        return (
            <ProductCart
                item={item}
                addons={item.addons}
                index={index}
                itemId={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                qty={item.quantity}
                navigation={() => navigation.navigate('DetailView', { item: item })}
                addQuantity={addQuantity}
                removeQuantity={removeQuantity}
                deleteItem={deleteItem}
                updateAmount={updateAmount}

            />
        );


    }

    return (

        <View style={[Styles.mainContainer, { backgroundColor: colors.theme }]}>
            <SafeAreaView>
                <View style={Styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={Styles.leftHeader}>
                            <Feather name='chevron-left' size={12} color={colors.black} />
                        </View>
                    </TouchableOpacity>

                    {myCart.length > 0 ? (
                        <TouchableOpacity onPress={() => clearCartItem()}>
                            <View style={Styles.rightHeader}>
                                <Feather name='trash' size={16} color={colors.secondary} />
                            </View>
                        </TouchableOpacity>
                    ) : (null)}


                </View>
            </SafeAreaView>

            <Text style={[Styles.cartTitle, { color: colors.textTheme }]}>Cart Item</Text>

            <ScrollView style={Styles.flexContainer} contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
                <FlatList
                    data={myCart}
                    renderItem={renderComponentItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={
                        <View
                            style={{
                                height: 500,
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <Image style={{ width: '80%', borderRadius: 20, }} source={require("../assets/images/empty-cart.gif")} />
                            <Text
                                style={{
                                    marginTop: 15,
                                    fontSize: 16,
                                    color: "#c5c5c5",
                                    fontFamily: "Montserrat-Regular",
                                }}>
                                Your cart is empty
                            </Text>
                            <TouchableOpacity onPress={() => navigation.popToTop()} style={{
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary,
                                paddingHorizontal: 10, paddingVertical: 3, borderRadius: 5, marginTop: 12
                            }}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, color: colors.theme }}>Go Menu</Text>
                            </TouchableOpacity>
                        </View>
                    }


                />
                {myCart.length > 0 ? <View style={{ height: 0.2, backgroundColor: colors.textLight, width: '90%', alignSelf: 'center' }} /> : null}
                {myCart.length > 0 ? (
                    <View style={{ paddingHorizontal: 30, marginTop: 30, marginBottom: 90, justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start', width: '50%', }}>
                            <Text style={{ color: colors.textLight, fontSize: 18, fontFamily: 'Montserrat-SemiBold' }}>{`Total`}</Text>

                        </View>
                        <View style={{ alignItems: 'flex-end', width: '50%' }}>
                            <Text style={{ color: colors.textDark, fontWeight: '600', fontFamily: 'Montserrat-Bold', fontSize: 18 }}>{`${currency} ${Math.floor(updateTotalAmount)}.00`}</Text>
                        </View>
                    </View>
                ) : (
                    <View></View>
                )}
            </ScrollView>




            {myCart.length > 0 ? (
                <View style={[Styles.modal, { backgroundColor: colors.theme }]}>

                    <TouchableOpacity onPress={() => navigation.navigate(myUser ? 'Checkout' : 'SignUp')} style={{ flexDirection: 'row', width: '90%', height: 70, backgroundColor: colors.primary, borderRadius: 15, }}>
                        <Text style={{ width: '90%', justifyContent: 'flex-start', alignSelf: 'center', paddingLeft: 30, color: colors.black_white, fontWeight: 'bold', fontSize: 18 }}>
                            Address
                        </Text>
                        <Feather style={{ width: '10%', justifyContent: 'flex-end', alignSelf: 'center', }} name='chevron-right' size={20} color={colors.black_white} />

                    </TouchableOpacity>
                </View>
            ) : (
                <View></View>
            )}

        </View>


    );
}
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'

    },
    flexContainer: {
        flex: 1,
        marginBottom: 20,
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
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#CDCDCD',
        borderWidth: 2,

    },

    container: {

        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent:'space-between',
        backgroundColor: '#fff',
        // marginHorizontal:25,
        // marginTop:20,
        // borderRadius:20,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'

    },
    imageView: {
        justifyContent: 'center',
        width: 90,
        height: 90,

    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    textView: {
        justifyContent: 'center',
        marginLeft: 15,
        width: '80%'


    },
    title: {
        fontSize: 16,
        fontWeight: '400'

    },
    price: {
        fontSize: 15,
        color: 'red',
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
        borderWidth: 1,
        borderColor: colors.textDark,
        marginLeft: 28,
        borderRadius: 6
    },
    qtyMinus: {
        padding: 3,
        borderWidth: 1,
        borderColor: colors.textDark,
        borderRadius: 6
    },
    count: {
        marginLeft: 10,
        marginRight: 10,
    },
    modal: {
        // flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        // shadowColor: colors.black,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.05,
        // shadowRadius: 20,
        // elevation: 10,
        // overflow: 'hidden',

    },

})