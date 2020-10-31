import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/auth/signin';

import OTP from '../screens/auth/otp';
import constants from '../constants'
const RootStackAuth = createStackNavigator(); 

const RootStackScreen = ({navigation}) => (

    <RootStackAuth.Navigator initialRouteName={constants.Screens.SignInScreen.name}>
        <RootStackAuth.Screen 
            options={({ navigation }) => ({
                headerTitle: false,
                headerStyle:{backgroundColor: constants.Colors.color_theme,},
                headerTransparent:false,
            })}
        	name={constants.Screens.SignInScreen.name} component={SignInScreen}/>
        <RootStackAuth.Screen 
        	options={({ navigation }) => ({
                headerTitle: false,
                headerStyle:{backgroundColor: constants.Colors.color_theme,},
                headerTransparent:false,
            })}
        name={constants.Screens.OTPScreen.name} component={OTP.OTPScreen}/>
    </RootStackAuth.Navigator>
);

export default RootStackScreen;