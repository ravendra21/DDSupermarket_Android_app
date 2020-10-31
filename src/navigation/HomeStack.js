import React from 'react';
import {Text} from 'react-native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import constants from '../constants'
//screens
import NavigationDrawerStructure from '../components/header/NavigationDrawerStructure'
import Header from '../components/header/header'

import HomeScreen from './HomeTab'
import ProductList from '../screens/Home/ProductList'
import SingleProduct from '../screens/Home/SingleProduct'
import SearchProductList from '../screens/Home/SearchProductList'
import WishProductList from '../screens/Home/WishProductList'

import ContactUs from '../screens/StaticScreens/ContactUs'
import TestScreen from '../screens/Home/TestScreen';
import MyProfile from '../screens/User/MyProfile';
import EditProfile from '../screens/User/EditProfile';

import CartItemScreen from '../screens/CartScreen/CartItemScreen';


const RootStack = createStackNavigator();

const HomeStack = ({navigation}) => (
    <RootStack.Navigator initialRouteName="HomeScreen" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}>
        <RootStack.Screen
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{backgroundColor:constants.Colors.color_theme,shadowOpacity:0,elevation: 1},
                headerTransparent:false,
            })}

            name="HomeScreen" component={HomeScreen}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{backgroundColor:constants.Colors.color_theme,shadowOpacity:0,elevation: 1},
                headerTransparent:false,
            })}

            name={constants.Screens.ProductList.name} component={ProductList}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{backgroundColor:constants.Colors.color_theme,shadowOpacity:0,elevation: 1},
                headerTransparent:false,
            })}

            name={constants.Screens.SingleProduct.name} component={SingleProduct}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{backgroundColor:constants.Colors.color_theme,shadowOpacity:0,elevation: 1},
                headerTransparent:false,
            })}

            name={constants.Screens.SearchProductList.name} component={SearchProductList}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: () => <Header navigation={navigation} />,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name={constants.Screens.ContactUs.name} component={ContactUs}
        />


        <RootStack.Screen
            options={({ navigation }) => ({
                headerTitle: <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_headerTile,fontSize:20}}>Add New Post</Text>,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name={"TestScreen"} component={TestScreen}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerTitle: <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_headerTile,fontSize:20}}>Edit Profile</Text>,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name={constants.Screens.EditProfile.name} component={EditProfile}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerTitle: <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_headerTile,fontSize:20}}>Edit Profile</Text>,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name={constants.Screens.WishProductList.name} component={WishProductList}
        />

        <RootStack.Screen
            options={({ navigation }) => ({
                headerTitle: <Text style={{fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_headerTile,fontSize:20}}>{constants.Screens.CartItemScreen.title}</Text>,
                headerStyle:{shadowOpacity:0,elevation: 0},
                headerTransparent:false,
            })}
            name={constants.Screens.CartItemScreen.name} component={CartItemScreen}
        />


    </RootStack.Navigator>
);

export default HomeStack;