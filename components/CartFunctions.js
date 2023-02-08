// import React from 'react'
// import { Text, View, Image, ToastAndroid } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';



// export const addToCartAction = (item) => {
//     const datarray = [];
//         datarray.push(item);
   
//           AsyncStorage.getItem('@cartItem').then((valo) => {
//             const data = JSON.parse(valo)
//             if (data != null) {
//                 data.forEach(element => {
//                     if (element.id != item.id) {
//                         datarray.push(element)
//                         // ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);

                        
//                     }
//                     else{
//                         ToastAndroid.show(`Warning this item is already in your cart`, ToastAndroid.LONG);
//                     }
                    
//                 });
                
//                 AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
//                 console.log('next time run', JSON.stringify(datarray));
                
                


//             }
//             else {
//                 AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
//                 console.log('1st time', JSON.stringify(datarray));
//                 ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);


//             }

//         })
// }
// export const updateCart = (item,itemIndex) => {
//     alert(item[itemIndex].quantity)
//     AsyncStorage.setItem('@cartItem',JSON.stringify(item))
// }
