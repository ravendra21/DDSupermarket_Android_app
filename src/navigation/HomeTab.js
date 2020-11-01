import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import constants from "../constants";
import HomeScreen from '../screens/Home/HomeScreen';
import MyProfile from '../screens/User/MyProfile';

import signin from '../screens/auth/signin';
import signin2 from '../screens/auth/signin';
import CartItemScreen from '../screens/CartScreen/CartItemScreen';


import TestScreen from '../screens/Home/TestScreen';
import WishProductList from '../screens/Home/WishProductList'

const Tab = createBottomTabNavigator();
//function HomeTab (navigation,cartItems){
function HomeTab({navigation,cartItems}){
  let totalItemsInCart = cartItems.length;
return(
 
    <Tab.Navigator
      initialRouteName={constants.Screens.HomeScreen.name}
      tabBarOptions={{
        activeTintColor: constants.Colors.color_activeBottomTab,
        inactiveTintColor:constants.Colors.color_inactiveIcon,
        showLabel:false,
      }}
    >
      <Tab.Screen
        name={constants.Screens.HomeScreen.name}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={constants.Screens.CartItemScreen.name}
        component={CartItemScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
          ),
          tabBarBadge:totalItemsInCart,
        }}
      />
      
      <Tab.Screen
        name={"WishProductList1"}
        component={WishProductList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />

    <Tab.Screen
        name={constants.Screens.Profile.name}
        component={MyProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
    )
  }

const mapStateToProps = state => ({
    cartItems :state.data.cartItem,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);