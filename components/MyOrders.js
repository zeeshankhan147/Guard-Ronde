import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from 'reanimated-bottom-sheet';
import colors from '../assets/colors/colors';
import { addToCartAction } from './Redux/Actions/CartAction';


export default function MyOrders({ navigation }) {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.myOrders);
  const colors = useSelector(state => state.colors.currentTheme);
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  const [sheetData, setSheetData] = useState(orders ? orders[0] : [])

  const openSheet = (item) => {
    sheetRef.current.snapTo(200)
    setSheetData(item)
  }

  const renderContent = () => (
    <View style={[styles.bottomSheet, { backgroundColor: colors.background }]}>
      <View style={{ alignSelf: 'center' }}>
        <Text style={[styles.titleRegular, { fontSize: 12, color: 'grey' }]}>{sheetData.date.replace("GMT", "")}</Text>
      </View>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => sheetRef.current.snapTo(0)}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <View style={styles.amountSec}>

        <View style={styles.amountTitleSec}>
          <Text style={{ color: colors.textTheme }}>{sheetData.cartItem.length} Items</Text>
          <Text style={[styles.titleBold, { color: colors.textTheme }]}>Sub Total</Text>
          <Text style={[styles.titleRegular, { color: colors.textTheme }]}>Discount <Text style={styles.titleBold}>{sheetData.discountPercent}%</Text></Text>
          <Text style={[styles.titleRegular, { color: colors.textTheme }]}>Tax <Text style={styles.titleBold}>{sheetData.taxPercent}%</Text></Text>
          {sheetData.deliveryFee && <Text style={[styles.titleRegular, { color: colors.textTheme }]}>Delivery Fee</Text>}
          <Text style={[styles.titleBold, { color: colors.textTheme }]}>Total Amount</Text>
        </View>

        <View style={styles.amountPriceSec}>
          <Text>{``}</Text>
          <Text style={[styles.titleBold, { color: colors.textTheme }]}>Rs {sheetData.subTotal}</Text>
          <Text style={[styles.titleRegular, { color: colors.textTheme }]}>Rs {sheetData.discountAmount}</Text>
          <Text style={[styles.titleRegular, { color: colors.textTheme }]}>Rs {sheetData.taxAmount}</Text>
          {sheetData.deliveryFee && <Text style={[styles.titleRegular, { color: colors.textTheme }]}>Rs {sheetData.deliveryFee}</Text>}
          <Text style={[styles.titleBold, { color: colors.textTheme }]}>Rs {sheetData.totalAmount}</Text>
        </View>

      </View>

      <TouchableOpacity onPress={() => navigation.navigate("OrderDetail", { item: sheetData })} style={styles.cardBtn}>
        <Text style={styles.addToCart}>View Detail</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={[styles.mainContainer]}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FontAwesome5 name='chevron-left' size={22} color="#F26C68" />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Orders</Text>
      </View>

      <View style={[styles.flatListContainer, { backgroundColor: colors.black_white }]}>
        <FlatList
          data={orders}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => openSheet(item)} style={[styles.orderBox, { backgroundColor: colors.theme }]}>

                <View style={styles.orderIdSec}>
                  <Text style={[styles.orderId, { color: colors.textTheme }]}>{item.orderId}</Text>
                  <Text style={styles.dateTime}>{sheetData.date}</Text>
                </View>

                <View style={styles.priceSec}>
                  <Text style={[styles.totalAmount, { color: colors.textTheme }]}>Rs {item.totalAmount}</Text>
                  <Text style={styles.deliveryTransc}>{item.deliveryTransc}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 270]}
        callbackNode={fall}
        initialSnap={0}
        borderRadius={35}
        renderContent={renderContent}
        enabledGestureInteraction={true}

      />
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primary

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
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  flatListContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 20,
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: '#8a8a8a',
    shadowRadius: 20,
    shadowOpacity: 1

  },
  orderBox: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#e4e4e4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  orderIdSec: {
    width: '70%',
    justifyContent: 'flex-start',
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold'
  },
  dateTime: {
    marginTop: 4,
    fontSize: 10,
    color: 'grey',
    fontFamily: 'Montserrat-Regular'
  },
  priceSec: {
    width: '30%',
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  deliveryTransc: {
    marginTop: 4,
    fontSize: 10,
    color: colors.price,
    fontFamily: 'Montserrat-Bold'
  },
  bottomSheet: {
    backgroundColor: colors.background,
    padding: 16,
    height: '100%',
    elevation: 2
  },
  closeBtn: {
    borderTopRightRadius: 35,
    position: 'absolute',
    right: '1%',
    top: '1%',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'

  },
  closeText: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  cardWrapper: {
    marginTop: 20,
    width: '100%',
  },
  cardBox: {
    flexDirection: 'row',
    width: '100%'
  },
  cardImageWrapper: {
    width: '25%',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  cardImag: {
    width: 70,
    height: 40,
  },
  cardTitleWrapper: {
    width: '85%',

  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold'
  },
  cardPrice: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12

  },
  cardBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  addToCart: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16
  },
  amountSec: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row'
  },
  amountTitleSec: {
    alignItems: 'flex-start',
    width: '60%',
  },
  titleBold: {
    fontFamily: 'Montserrat-Bold'
  },
  titleRegular: {
    fontFamily: 'Montserrat-Regular'
  },
  amountPriceSec: {
    width: '40%',
    alignItems: 'flex-end',

  }

})