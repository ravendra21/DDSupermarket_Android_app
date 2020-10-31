import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppIntro from '../screens/AppIntro';
import constants from '../constants';
const AppIntroStack = createStackNavigator();

const AppIntroStackScreen = ({navigation}) => (
    <AppIntroStack.Navigator headerMode='none' initialRouteName={constants.Screens.AppIntro.name}>
        <AppIntroStack.Screen name={constants.Screens.AppIntro.name} component={AppIntro}/>
    </AppIntroStack.Navigator>
);

export default AppIntroStackScreen;