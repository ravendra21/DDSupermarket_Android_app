import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/auth/splash';
import constants from '../constants';
const RootStack = createStackNavigator();

const SplashScreenStack = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name={constants.Screens.SplashScreen.name} component={SplashScreen}/>
    </RootStack.Navigator>
);

export default SplashScreenStack;