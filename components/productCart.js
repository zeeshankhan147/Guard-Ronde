import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCartAction, removeCart, updateCart } from './Redux/Actions/CartAction';
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from 'react-native-swipe-list-view';


export default ProductCard = (props) => {
    const {
        item,
        addons,
        index,
        itemId,
        image,
        title,
        price,
        qty,
        navigation,
        addQuantity,
        removeQuantity,
        deleteItem,
        updateAmount,
    } = props;
    const [qtyPlus, setQtyPlus] = useState(qty)
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cart.cartData);
    const colors = useSelector(state => state.colors.currentTheme);


    const adding = () => {
        setQtyPlus(qtyPlus + 1)
        addQuantity(price, index)
        updateAmount()

    }
    const minus = () => {
        setQtyPlus(qtyPlus - 1)
        removeQuantity(price, index)
        updateAmount()
    }
    const itemDel = () => {
        deleteItem(index, itemId)
    }



    return (

        <View>

            <TouchableOpacity
                onLongPress={() => {
                    itemDel(index)
                }}
                delayLongPress={1000}
                activeOpacity={0.8}
                style={Styles.container}>

                <TouchableOpacity style={Styles.imageView} key={itemId} onPress={() => navigation()}>
                    <Image style={Styles.image} source={image} />
                </TouchableOpacity>

                <View style={Styles.textView}>

                    <Text style={[Styles.title, { color: colors.textTheme }]}>{title}</Text>
                    {addons && addons.map((item, index) => {
                        return <Text style={[Styles.addon, { color: 'grey' }]}>{`(${index + 1}) ${item.name}`}</Text>


                    })}
                    <Text style={[Styles.price, { color: colors.textTheme }]}>Rs.{Math.round(price) * qty}</Text>

                    <View style={Styles.quantityController}>
                        <TouchableOpacity style={Styles.qtyPlus} onPress={adding}>
                            <Feather name='plus' size={12} color={colors.secondary} />
                        </TouchableOpacity>
                        <Text style={[Styles.count, { color: colors.textTheme }]} >{qty}</Text>
                        <TouchableOpacity style={[Styles.qtyMinus,
                        {
                            backgroundColor: qty > 1 ? colors.white : colors.textLight,
                            borderColor: qty > 1 ? colors.primary : colors.textLight

                        }]} key={index} onPress={() => { qty > 1 ? minus() : itemDel() }}>
                            <Feather name={qty > 1 ? 'minus' : 'trash'} size={12} color={qty > 1 ? colors.secondary : colors.theme} />
                        </TouchableOpacity>
                    </View>

                </View>

            </TouchableOpacity>

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
        // backgroundColor: '#fff',
        marginHorizontal: 25,
        paddingVertical: 10,
        // marginTop:20,
        // borderRadius:20,
        paddingHorizontal: 10,
        // borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        // borderRadius: 10,
        // shadowOffset: {
        //     width: 0,
        //     height: 5
        // },
        // elevation: 4,
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