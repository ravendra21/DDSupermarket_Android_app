import React from 'react'
import {View,StyleSheet,Text,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NavigationDrawerStructure = (props)=> {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer();
    };
  
    return (
      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=> toggleDrawer()} style={{paddingLeft:10}}>
          <MaterialCommunityIcons name="menu" color={constants.Colors.color_WHITE} size={30} />
        </TouchableOpacity>
      </View>
    );
  }

export default NavigationDrawerStructure;