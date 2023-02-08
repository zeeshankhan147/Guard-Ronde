import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Header(props) {
  return (
    <View style={style.header}>
      <TouchableOpacity onPress={props.leftPress} style={style.leftBox}>
        {props.leftIcon ? <Ionicons name={props.leftIcon} size={30} color={props.leftIconColor ? props.leftIconColor : '#000'} /> : null}
      </TouchableOpacity>
      <View style={style.centerBox}>
        <Text style={[style.headerTitle, { color: props.titleColor ? props.titleColor : '#000' }]}>{props.title}</Text>
      </View>
      <TouchableOpacity onPress={props.rightPress} style={style.rightBox}>
        {props.rightIcon ? <AntDesign name={props.rightIcon} size={26} color={props.rightIconColor ? props.rightIconColor : '#000'} /> : null}
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  leftBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10
  },
  centerBox: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10

  },
  rightBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10

  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  }

})