import React, { useEffect, useState, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ScrollView,
    ToastAndroid,
    TextInput,
    Dimensions,
    Alert,
    Animated,
    useWindowDimensions
} from 'react-native';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import category from '../assets/data/category';
import popular from '../assets/data/popular';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import BANNER_IMAGE from '../assets/images/banner1.png'
import ProductCart from './productCart';
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, getCart, removeCart, updateCart } from './Redux/Actions/CartAction';
import Banners from '../assets/images/headerBanners'
import HomeProduct from './HomeProduct';
import { getUser } from './Redux/Actions/AuthAction';
import { getProduct } from './Redux/Actions/ProductAction';
import { getAllOrders } from './Redux/Actions/OrdersAction';
import { darkTheme, lightTheme } from './Redux/Actions/ThemeAction';

Feather.loadFont();
MaterialCommunityIcons.loadFont();
const BannerWidth = Dimensions.get("window").width;
const BannerHeight = (BannerWidth / 7) * 2;

export default Home = ({ navigation, route, props }) => {
    const isFocused = useIsFocused();
    const [catSelected, setCatSelected] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [popularData, setPopularData] = useState(popular);
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cart.cartData);
    const menu = useSelector(state => state.menu.product);
    const colors = useSelector(state => state.colors.currentTheme);

    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();


    function drawerOpening() {
        navigation.openDrawer()
    }

    function categorySelection(cat) {
        setCatSelected(cat.id)
        let data = [];
        popular.map((item) => {
            if (item.category == cat.title) {
                data.push(item)

            }

        })
        setPopularData(data)

    }

    const deleteItem = (itemId) => {
        let data = [...myCart]
        Object.values(data).map((checkId, ind) => {
            if (checkId.id == itemId) {
                data.splice(ind, 1)
                dispatch(removeCart(data))
            }
        })


    }
    const AddtoCart = (item) => {
        let data = {
            addons: [],
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: quantity
        }
        dispatch(addToCartAction(data))
    }

    const navigate = (screen) => {
        navigation.navigate(screen)
    }

    useEffect(() => {
        // FOR THEMES CHANGING
        AsyncStorage.getItem('DARK_THEME').then((value) => {
            if (value !== null) {
                if (value === 'true') {
                    dispatch(lightTheme())
                } else {
                    dispatch(darkTheme())
                }
            } else {
                dispatch(lightTheme())
            }
        })

        dispatch(getUser())
        setCatSelected(1)
        dispatch(getCart())
        dispatch(getAllOrders())
        // dispatch(getProduct())   

    }, [isFocused])



    const renderCategoryItem = ({ item }) => {


        return (
            <TouchableOpacity style={[styles.categoryListBox,
            {
                backgroundColor: item.id == catSelected ? colors.primary : colors.black_white,
                marginLeft: item.id == 1 ? 30 : 0,
                elevation: item.id == catSelected ? 3 : 8,


            }
            ]} onPress={() => categorySelection(item)}>
                <Image style={styles.categoryListImage} source={item.image} />
                <Text style={[styles.categorylistText, {
                    color: item.id == catSelected ? colors.theme : colors.textTheme
                }]}>{item.title}</Text>
                <View style={[styles.categoryIconCircle,
                {
                    backgroundColor: item.id == catSelected ? colors.black_white : colors.primary,
                }
                ]}>
                    <Feather style={[styles.categoryListIcon,
                    {
                        color: item.id == catSelected ? colors.primary : colors.black_white,
                    }
                    ]} name="chevron-right" size={15} />
                </View>
            </TouchableOpacity>

        );
    }
    const renderPopularItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                key={item.id} onPress={() => navigation.navigate('DetailView', { item: item })}>
                <View style={[styles.popularCardWrapper,
                {
                    backgroundColor: colors.black_white,
                    marginLeft: item.id == 1 ? 30 : 0,
                }
                ]}>
                    <View>

                        <View style={styles.popularTopWrapper}>
                            <MaterialCommunityIcons style={styles.crownIcon} name="crown" size={15} color={colors.primary} />
                            <Text style={[styles.popularTopTitle, { color: colors.textTheme }]}>top of the week</Text>
                        </View>

                        <Text style={[styles.popularTitle]}>{item.title}</Text>
                        <Text style={styles.popularWeight}>Weight  {item.weight}</Text>

                        <View style={styles.popularBottomItem}>

                            <View style={styles.ratingWrapper}>
                                <MaterialCommunityIcons name="star" size={15} color={colors.primary} />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.popularImageWrapper}>
                        <Image style={styles.popularImage} source={item.image} />
                    </View>

                </View>
            </TouchableOpacity>

        );

    }
    const renderBanner = ({ item, imageIndex }) => {
        return (
            <View style={[
                {
                    width: windowWidth - 60,
                    height: 150,
                }
            ]} key={imageIndex}>
                <Image source={item.image}
                    style={{ width: '100%', height: 150, alignSelf: 'center', borderRadius: 8 }}
                    resizeMode='stretch'
                />
            </View>
        )
    }

    return (

        <View style={[styles.container, { backgroundColor: colors.theme }]}>
            {/* header */}
            <SafeAreaView style={styles.navBar}>

                <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('AddToCart')}>
                    {myCart.length > 0 ? (
                        <View style={{ position: 'absolute', top: -8, right: -8, backgroundColor: colors.background, width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: colors.textDark, fontWeight: '600' }}>
                                {myCart.length}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    <MaterialCommunityIcons name='shopping' size={22} color={colors.white} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => drawerOpening()}>
                    <Image style={styles.dp} source={require('../assets/images/drawer_ic.webp')} />
                    {/* <Feather style={styles.ic_menu} name='menu' size={26} color={colors.textDark} /> */}
                </TouchableOpacity>

            </SafeAreaView>
            <ScrollView
                stickyHeaderIndices={[2]}
                scrollEnabled={true}
                contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>


                {/* Banner */}
                <View style={styles.bannerWrapper}>

                    <View style={{ width: windowWidth - 60, alignSelf: 'center', }}>
                        <FlatList
                            data={Banners}
                            renderItem={renderBanner}
                            keyExtractor={item => item.id}
                            pagingEnabled
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentInsetAdjustmentBehavior='automatic'
                            onScroll={Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: scrollX
                                        }
                                    }
                                }
                            ])}
                            scrollEventThrottle={1}
                        />
                    </View>
                </View>

                {/* Dots Banner */}
                <View style={styles.dotConatiner}>
                    <View style={styles.indicatorContainer}>
                        {Banners.map((item, imageIndex) => {
                            const width = scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1)
                                ],
                                outputRange: [8, 20, 8],
                                extrapolate: "clamp"
                            });
                            return (
                                <Animated.View
                                    key={imageIndex}
                                    style={[styles.normalDot, { width: width, backgroundColor: colors.primary }]}
                                />
                            );
                        })}
                    </View>
                </View>


                {/* search */}
                <View style={[styles.searchWrapper, { backgroundColor: colors.theme }]} >
                    <View style={[styles.searchBox, { backgroundColor: colors.black_white, borderRadius: 8, }]} >
                        <TouchableOpacity>
                            <Feather name="search" size={20} color={colors.textDark} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.searchTextWrapper} onPress={() => navigation.navigate('Search')}>
                            <Text style={styles.searchText}>Explore your food</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* category */}
                <View style={[styles.categoryWrapper, { backgroundColor: colors.theme }]}>
                    <Text style={[styles.categoryText, { color: colors.textDark }]}>Category</Text>
                    <View style={[styles.categoryListWrapper]}>
                        <FlatList
                            data={category}
                            renderItem={renderCategoryItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentInsetAdjustmentBehavior='automatic'
                        />
                    </View>
                </View>

                {/* populars */}
                <View style={styles.popularWrapper}>
                    <Text style={[styles.popularText, { color: colors.textTheme }]}>20% Off Exclusive Deal</Text>
                    <View style={{ flex: 1, paddingVertical: 10, marginTop: 10 }}>
                        <FlatList
                            data={popular}
                            renderItem={renderPopularItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentInsetAdjustmentBehavior='automatic'
                        />
                    </View>

                </View>
                {/* Menu Item */}
                <View style={{
                    flex: 1, marginTop: 20, marginHorizontal: 10, paddingBottom: 100
                }}>

                    {popularData.map((item, index) => {
                        return (
                            <HomeProduct
                                from={'home'}
                                item={item}
                                hiddenBtn={myCart.some((val) => val.id === item.id)}
                                index={index}
                                itemId={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                qty={item.quantity}
                                navigation={navigation}
                                deleteItem={deleteItem}
                                cartBtn={AddtoCart}
                            />
                        );
                    })}
                </View>

            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff'
    },

    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
        marginHorizontal: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    rightHeader: {
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',

    },
    dp: {
        width: 25,
        height: 25,
        // borderRadius: 40,
        // borderColor: colors.textLight,
        // borderWidth: 1,
    },
    bannerWrapper: {
        marginTop: 20,
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'

    },
    subTitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        color: colors.textDark,

    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.textDark,
        marginTop: 10,

    },
    searchWrapper: {
        marginTop: 2,
        // backgroundColor: '#fff',


    },
    searchBox: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        // backgroundColor: '#e4e4e4f5',
        marginHorizontal: 30,
        // borderRadius: 8,
        paddingVertical: 12,
    },
    searchTextWrapper: {
        marginLeft: 14,
        flex: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.textDark,


    },
    searchText: {
        fontFamily: 'Montserrat-Semibold',
        fontSize: 16,
        color: colors.textLight,

    },
    categoryWrapper: {
        marginTop: 20,
        // backgroundColor: '#fff',

    },
    categoryText: {
        paddingLeft: 30,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: colors.textDark,
    },
    categoryListBox: {
        backgroundColor: colors.background,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 20,
        marginTop: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 20,

    },
    categoryListImage: {
        marginTop: 15,
        width: 60,
        height: 60,

    },
    categorylistText: {
        fontSize: 14,
        color: colors.textDark,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 10,
        textAlign: 'center',

    },
    categoryIconCircle: {
        width: 26,
        height: 26,
        borderRadius: 26,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 20,

    },
    categoryListIcon: {
        alignSelf: 'center',
        color: '#000',

    },
    popularWrapper: {
        // paddingHorizontal: 30,
        // marginTop: 20,
        // marginBottom:180,
        // backgroundColor:'red',
    },
    popularText: {
        paddingLeft: 30,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: colors.black,

    },
    popularCardWrapper: {
        backgroundColor: colors.white,
        marginRight: 20,
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 10,
        width: 300,



    },
    popularTopWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 24,
    },
    crownIcon: {},
    popularTopTitle: {
        marginLeft: 10,
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: colors.black,

    },
    popularTitle: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 22,
        fontSize: 14,
        color: colors.textDark,
        marginTop: 20,

    },
    popularWeight: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 22,
        marginTop: 5,
        color: colors.textLight,
    },
    popularBottomItem: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        marginLeft: -20,
        marginBottom: -1,
    },
    addItemBtn: {
        width: 90,
        height: 53,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 45,
        marginBottom: 20

    },
    ratingText: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 8,
        color: colors.textDark,
    },
    popularImageWrapper: {
        marginLeft: 20,
        alignItems: 'center',


    },
    popularImage: {
        width: 210,
        height: 125,
        resizeMode: 'contain',
        marginTop: 20,
    },
    dotConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 20
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }


});
