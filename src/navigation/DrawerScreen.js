import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//stack
import HomeStack from './HomeStack'

import DrawerSlider from './DrawerSlider'
import constants from '../constants'

const Drawer = createDrawerNavigator();
const DrawerScreen = ({navigation}) => (
    <Drawer.Navigator drawerContent={props => <DrawerSlider {...props} />}>
        <Drawer.Screen name="MainHome" component={HomeStack}/>
    </Drawer.Navigator>
);

export default DrawerScreen;