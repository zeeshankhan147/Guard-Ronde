import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import colors from '../assets/colors/colors';
import { addToCartAction } from './Redux/Actions/CartAction';


export default function OrderDetail(props) {
    const colors = useSelector(state => state.colors.currentTheme);
    const { item } = props.route.params;
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const reorder = () => {
        setLoading(true)
        item.cartItem.map(async (item, index) => {
            let data = {
                addons: item.addons,
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            }
            await dispatch(addToCartAction(item))
        })

        setTimeout(() => {
            setLoading(false)
            props.navigation.navigate('Home')
        }, 1000);
    }

    const renderItems = ({ item, index }) => {
        return (
            <View style={styles.itemBox}>
                <View style={styles.cartImgTitle}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("ImageViewer", { item: item.image })}>
                        <Image style={styles.cartImage} source={item.image} />
                    </TouchableOpacity>
                    <Text style={[styles.cartTitle, { color: colors.textTheme }]}>{item.title}</Text>
                </View>
                <View style={styles.cartPrice}>
                    <Text style={[styles.BOLD, { fontSize: 14, color: colors.textTheme }]}>Rs {item.price}</Text>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backBtn}>
                    <FontAwesome5 name='chevron-left' size={22} color={'#F26C68'} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Orders Details</Text>
            </View>

            <ScrollView style={[styles.dataContainer, { backgroundColor: colors.black_white }]}>
                {/* MAP IMAGE SECTION */}
                <Image style={styles.mapImage} source={require('../assets/images/map.jpeg')} />
                <View style={styles.mapAddress}>
                    <Text style={[styles.addressText, styles.BOLD]}>{item.deliveryAddress}</Text>
                </View>

                {<View style={styles.mapAddressBranch}>
                    <Text style={[styles.addressText, styles.BOLD]}>{item.branch}</Text>
                </View>}

                {/* ORDER DETAIL SECTION */}
                <View style={styles.orderIdSec}>

                    <View style={styles.orderIdBox}>
                        <Text style={[styles.BOLD, styles.boldTitle, { color: colors.textTheme }]}>Order Id {item.orderId}</Text>
                        <Text style={[styles.BOLD, styles.regularTitle, { color: 'grey' }]}>{item.date.replace("GMT", "")}</Text>
                        <Text style={[styles.MEDIUM, { marginTop: 15, color: colors.textTheme }]}>{`${item.deliveryFee ? "Deliver to" : "Pickup to"}`}</Text>
                        <Text style={[styles.BOLD, styles.boldTitle, { marginTop: 4, color: colors.textTheme }]}>{`${item.deliveryFee ? item.deliveryAddress : item.branch}`}</Text>
                        <Text style={[styles.MEDIUM, { marginTop: 15, color: colors.textTheme }]}>Payment Method</Text>
                        <Text style={[styles.BOLD, styles.boldTitle, { marginTop: 4, color: colors.textTheme }]}>{item.paymentMethod == "Online" ? item.cardNumber + " Visa" : item.paymentMethod}</Text>
                    </View>

                    <View style={styles.statusBox}>
                        <View style={styles.status}>
                            <FontAwesome name='check-square-o' size={22} color="green" />
                            <Text style={[styles.BOLD, { marginLeft: 8, color: colors.textTheme }]}>{item.deliveryFee ? "Delivered" : "Ready to Pick"}</Text>
                        </View>
                    </View>

                </View>

                {/* DIVIDER LINE */}
                <View style={{ marginTop: 20, alignSelf: 'center', width: '95%', height: 0.4, backgroundColor: 'grey' }} />

                {/* RENDER ALL ORDER ITEMS */}

                <View style={styles.itemsContainer}>
                    <Text style={{ color: colors.textTheme }}>ITEM</Text>
                    <View>
                        <FlatList
                            data={item.cartItem}
                            renderItem={renderItems}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>

                {/* DIVIDER LINE */}
                <View style={{ marginTop: 20, alignSelf: 'center', width: '95%', height: 0.4, backgroundColor: 'grey' }} />

                {/* ALL AMOUNT SECTION */}
                <View style={styles.calculationSec}>
                    <View style={styles.titleAmount}>
                        <Text style={[styles.titles, { color: colors.textTheme }]}>Sub Total</Text>
                        {item.deliveryFee && <Text style={[styles.titles, { color: colors.textTheme }]}>Delivery Fee</Text>}
                        {item.discountAmount && <Text style={[styles.titles, { color: colors.textTheme }]}>Discount {item.discountPercent}%</Text>}
                        <Text style={[styles.titles, { color: colors.textTheme }]}>Tax {item.taxPercent}%</Text>
                        <Text style={[styles.titles, { color: colors.textTheme }]}>Total</Text>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.navigation.navigate("Home")}>
                            <Text style={[styles.BOLD, styles.viewMore]}>View More Item</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.amountSec}>
                        <Text style={[styles.titles, { color: colors.textTheme }]}>Rs {item.subTotal}</Text>
                        {item.deliveryFee && <Text style={[styles.titles, { color: colors.textTheme }]}>Rs {item.deliveryFee}</Text>}
                        {item.discountAmount && <Text style={[styles.titles, { color: colors.textTheme }]}>Rs {item.discountAmount}</Text>}
                        {item.taxAmount && <Text style={[styles.titles, { color: colors.textTheme }]}>Rs {item.taxAmount}</Text>}
                        <Text style={[styles.titles, { color: colors.textTheme }]}>Rs {item.totalAmount}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* RE-ORDER BUTTON */}
            <View style={[styles.btnSec, { backgroundColor: colors.black_white }]}>
                <TouchableOpacity onPress={() => reorder()} style={styles.reorderBtn}>
                    {
                        loading ? <ActivityIndicator animating={loading} color="#fff" size={"small"} /> :
                            <Text style={styles.btnText}>Re-Order</Text>

                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    titleContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainTitle: {
        marginLeft: 20,
        fontSize: 22,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
    },
    dataContainer: {
        flex: 1,
        marginTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff'
    },
    mapImage: {
        zIndex: -1,
        width: '90%',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    mapAddress: {
        width: 60,
        height: 40,
        position: 'absolute',
        top: 60,
        right: 18
    },
    mapAddressBranch: {
        width: 60,
        height: 40,
        position: 'absolute',
        top: 170,
        left: 20
    },
    addressText: {
        fontSize: 10,
        textAlign: 'center'
    },
    orderIdSec: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 25,
        marginTop: 20,
    },
    orderIdBox: {
        alignItems: 'flex-start',
        width: '60%',

    },
    statusBox: {
        alignItems: 'flex-end',
        width: '40%',
    },
    status: {
        flexDirection: 'row'
    },
    boldTitle: {
        fontSize: 14,
        color: '#000',
    },
    regularTitle: {
        marginTop: 4,
        fontSize: 10,
        color: '#000'
    },
    itemsContainer: {
        marginTop: 15,
        paddingHorizontal: 25,
    },
    itemBox: {
        width: '100%',
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center'

    },
    cartImgTitle: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    cartImage: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    cartTitle: {
        marginLeft: 20,
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        color: '#000'

    },
    cartPrice: {
        width: '30%',
        alignItems: 'flex-end'
    },
    calculationSec: {
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 25,
        flexDirection: 'row',
        paddingBottom: 40,
    },
    titleAmount: {
        width: '50%',
        alignItems: 'flex-start'
    },
    amountSec: {
        width: '50%',
        alignItems: 'flex-end',
    },
    titles: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    viewMore: {
        fontSize: 12,
        marginTop: 10,
        color: colors.primary
    },
    btnSec: {
        width: '100%',
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    reorderBtn: {
        width: '90%',
        backgroundColor: colors.primary,
        paddingVertical: 20,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },

    // FONT DEFINE CSS

    REGULAR: {
        fontFamily: 'Montserrat-Regular'
    },
    MEDIUM: {
        fontFamily: 'Montserrat-Medium'
    },
    BOLD: {
        fontFamily: 'Montserrat-Bold'
    }
})