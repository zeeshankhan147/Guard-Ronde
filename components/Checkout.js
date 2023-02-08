import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-native-phone-number-input";
import { orderPlaced } from "./Redux/Actions/OrdersAction";
import { removeAllCart } from "./Redux/Actions/CartAction";



const Checkout = ({ navigation }) => {
    let currency = 'Rs';
    let DiscountPercent = 50;
    let TaxPercent = 20;
    let deliveryFee = 50;

    const dispatch = useDispatch();
    const [updateTotalAmount, setUpdateTotalAmount] = useState(0)
    const [discountTotalAmount, setDiscountTotalAmount] = useState(0)
    const [taxTotalAmount, setTaxTotalAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [phWithCode, setPhWithCode] = useState("");
    const [delivery, setDelivery] = useState(true);
    const [loader, setLoader] = useState(false);

    const isFocused = useIsFocused();

    const myCart = useSelector(state => state.cart.cartData)
    const user = useSelector(state => state.auth.user)
    const orders = useSelector(state => state.orders.myOrders);
    const colors = useSelector(state => state.colors.currentTheme);

    const setDlivery = () => {
        delivery ? setDelivery(false) : setDelivery(true);
    }

    const placeOrder = async () => {
        setLoader(true)
        if (address) {
            if (phone.length === 10) {
                let orderDate = new Date().toUTCString();
                let temp = {
                    orderId: '#' + Math.floor(Math.random() * 1677721567).toString(16),
                    date: orderDate,
                    userName: user ? user.givenName + " " + user.familyName : null,
                    userEmail: user ? user.email : null,
                    phoneNumber: "+92" + phone,
                    cardNumber: cardNum ? cardNum : "Cash On Delivey",
                    paymentMethod: cardNum ? "Online" : "Cash On Delivey",
                    deliveryAddress: address,
                    branch: 'Main Orangi Town Phase 15 Karachi',
                    deliveryTransc: delivery ? 'Delivery' : 'Pickup',
                    subTotal: Math.floor(updateTotalAmount),
                    discountAmount: discountTotalAmount,
                    discountPercent: DiscountPercent,
                    taxPercent: TaxPercent,
                    taxAmount: taxTotalAmount,
                    deliveryFee: delivery ? deliveryFee : null,
                    totalAmount: Math.floor(totalAmount),
                    cartItem: myCart
                }
                await dispatch(orderPlaced(temp))
                setTimeout(() => {
                    dispatch(removeAllCart)
                    setLoader(false)
                    navigation.navigate("Home")
                }, 1000);
            }
            else {
                setLoader(false)
                Toast.showWithGravity('Please fill the number filled', Toast.SHORT, Toast.BOTTOM);
            }

        }
        else {
            setLoader(false)
            Toast.showWithGravity('Please fill the delivery address', Toast.SHORT, Toast.BOTTOM);
        }

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

    }, [isFocused])
    return (
        <View style={[Styles.mainContainer, { backgroundColor: colors.theme }]}>
            <SafeAreaView>
                <View style={Styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddToCart")}>
                        <View style={Styles.leftHeader}>
                            <Feather name='chevron-left' size={12} color={colors.black} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <Text style={[Styles.cartTitle, { color: colors.textTheme }]}>Checkout</Text>
            <View style={{ width: '100%', paddingVertical: 5 }}>

                {/* DELIVER INPUT */}
                <View style={{ alignSelf: 'center', width: '85%' }}>
                    <TextInput
                        style={{ backgroundColor: '#e9e9e9', elevation: 8, shadowColor: '#989898', paddingHorizontal: 20, borderRadius: 10, width: '100%', }}
                        onChangeText={(address) => setAddress(address)}
                        placeholder={'Enter your delivery address'}>
                    </TextInput>
                </View>

                {/* PHONE INPUT */}
                <View style={Styles.phoneInput}>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', color: '#F26C68' }}>+92</Text>
                    </View>

                    <View style={{ width: '80%' }}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder={'3368153445'}
                            onChangeText={(num) => {
                                setPhone(num);
                            }}
                            maxLength={10}
                            textValue={phone}
                            style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', color: colors.secondary }}
                        />
                    </View>
                </View>

                {/* PAYMENT SECTION */}
                <View style={Styles.cardInput}>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', color: 'blue' }}>Visa</Text>
                    </View>

                    <View style={{ width: '80%' }}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder={'XXX-151223-330-09'}
                            onChangeText={(cardNum) => {
                                setCardNum(cardNum);
                            }}
                            maxLength={7}
                            textValue={cardNum}
                            style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', color: colors.secondary }}
                        />
                    </View>
                </View>

                {/* TRANSACTION TYPE SWITCHER */}
                <View style={{ alignSelf: 'center', marginTop: 20, flexDirection: 'row', width: '85%', borderRadius: 10, backgroundColor: '#e9e9e9', borderRadius: 20 }}>
                    <TouchableOpacity onPress={setDlivery} style={
                        {
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            borderBottomRightRadius: delivery ? 20 : 0,
                            borderTopRightRadius: delivery ? 20 : 0,
                            paddingVertical: 10,
                            width: '50%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: delivery ? '#F26C68' : '#e9e9e9',
                            elevation: delivery ? 10 : 0,
                        }
                    }>
                        <Text style={{ color: delivery ? '#fff' : '#000' }}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setDlivery} style={
                        {
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: !delivery ? 20 : 0,
                            borderBottomLeftRadius: !delivery ? 20 : 0,
                            paddingVertical: 10,
                            width: '50%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: !delivery ? '#F26C68' : '#e9e9e9',
                            elevation: !delivery ? 10 : 0,
                        }
                    }>
                        <Text style={{ color: !delivery ? '#fff' : '#000' }}>Pickup</Text>
                    </TouchableOpacity>

                </View>

            </View>
            <View style={{ paddingHorizontal: 30, marginTop: 30, marginBottom: 90, justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ alignItems: 'flex-start', width: '50%', }}>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>Sub Total</Text>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>{`Discount(${DiscountPercent}%)`}</Text>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>{`Tax(${TaxPercent}%)`}</Text>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>Delivery Fee</Text>
                    <Text style={{ color: colors.textDark, fontSize: 18, fontFamily: 'Montserrat-SemiBold' }}>{`Total Amount`}</Text>

                </View>
                <View style={{ alignItems: 'flex-end', width: '50%' }}>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${Math.floor(updateTotalAmount)}`}</Text>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${discountTotalAmount}`}</Text>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${taxTotalAmount}`}</Text>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${deliveryFee}`}</Text>
                    <Text style={{ color: colors.textDark, fontWeight: '600', fontFamily: 'Montserrat-Bold', fontSize: 18 }}>{`${currency} ${Math.floor(totalAmount)}`}</Text>
                </View>
            </View>
            <View style={[Styles.modal, { backgroundColor: colors.theme }]}>
                <TouchableOpacity onPress={() => placeOrder()} style={{ flexDirection: 'row', width: '90%', height: 70, backgroundColor: colors.primary, borderRadius: 15, }}>
                    <Text style={{ width: '90%', justifyContent: 'flex-start', alignSelf: 'center', paddingLeft: 30, color: colors.black_white, fontWeight: 'bold', fontSize: 18 }}>
                        Place Order
                    </Text>
                    {
                        !loader ? <Feather style={{ width: '10%', justifyContent: 'flex-end', alignSelf: 'center', }} name='chevron-right' size={20} color={colors.black_white} /> :
                            <ActivityIndicator style={{ justifyContent: 'flex-end', alignSelf: 'center', paddingRight: 10 }} color={colors.theme} size="small" />
                    }


                </TouchableOpacity>
            </View>

        </View>
    );


}

export default Checkout;

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'

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
    cartTitle: {
        fontSize: 30,
        marginHorizontal: 30,
        marginVertical: 15,
        fontFamily: 'Montserrat-SemiBold'

    },
    phoneInput: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        width: '85%',
        backgroundColor: '#e9e9e9',
        elevation: 8,
        shadowColor: '#989898',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    cardInput: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        width: '85%',
        backgroundColor: '#e9e9e9',
        elevation: 8,
        shadowColor: '#989898',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    modal: {
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