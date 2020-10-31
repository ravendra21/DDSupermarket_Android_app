import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import constants from "../constants";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
const { SlideInMenu } = renderers;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    btnBox:{
        alignSelf:'center',
        marginTop:40,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    btnTitle:{
        fontSize:20,
        color:constants.Colors.color_intro,
        fontFamily:constants.fonts.Cardo_Bold
    },
    addToCartbtnBox:{
        borderRadius:5,
        borderWidth:1,
        borderColor:constants.Colors.color_addToCart,
        alignSelf:'center',
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center',
    },
    addToCartPlusbtnBox:{
        backgroundColor:constants.Colors.color_addToCart,
        alignSelf:'center',
        marginBottom:5,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:-1,
    },
    addToCartbtnTitle:{
        fontSize:12,
        color:constants.Colors.color_intro,
        fontFamily:constants.fonts.Cardo_Bold
    },
    addToCartbtnBoxBg:{
        borderRadius:10,
        borderWidth:0,
        backgroundColor:constants.Colors.color_addToCart,
        alignSelf:'center',
        marginBottom:5,
        padding:10,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    addToCartbtnTitleBg:{
        fontSize:constants.vw(14),
        color:constants.Colors.color_WHITE,
        fontFamily:constants.fonts.Cardo_Bold
    },
    dropOpt:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:18,
        color:constants.Colors.color_WHITE
    },
    cartIcons:{
        backgroundColor:constants.Colors.color_addToCart,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        width:25,
        height:25
    }

});


export const DefaultMenuOption = props => {

    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>
                <View style={{borderRadius:12,borderColor:constants.Colors.color_threeDot,borderWidth:1,width:24,height:24,justifyContent:'center',alignItems:'center'}}>
                <Icon name={'dots-vertical'} size={20} color={constants.Colors.color_threeDot}/>
                </View>
            </MenuTrigger>
            <MenuOptions style={{width:constants.width,padding:10,backgroundColor:constants.Colors.color_theme,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <MenuOption {...props} style={{flexDirection:'row'}}>
                    <Icon name={'trash-can'} size={25} color={constants.Colors.color_WHITE}/>
                    <Text style={styles.dropOpt}>Remove</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

export const PrimaryButton = (props) => {
    return (
        <View>
            <TouchableOpacity style={styles.btnBox} {...props}>
                <Text style={styles.btnTitle}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}


export const LayoutButton = (props) => {
    return (
        <View style={{justifyContent:'center',alginItems:'center'}}>
            <TouchableOpacity style={{...styles.btnBox,backgroundColor:constants.Colors.color_theme,paddingTop:8,paddingBottom:8}} {...props}>
                <Text style={{...styles.btnTitle,color:constants.Colors.color_WHITE}}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export const AddToCart = (props) => {
    return (
        <View style={{justifyContent:'center',alginItems:'center'}}>
            <TouchableOpacity style={{...styles.addToCartbtnBox,backgroundColor:constants.Colors.color_WHITE,paddingTop:0,flexDirection:'row'}} {...props}>
                <Text style={{...styles.addToCartbtnTitle,color:constants.Colors.color_addToCart,padding:4}}>{props.title}</Text>
                <View style={{backgroundColor:constants.Colors.color_addToCart,borderTopRightRadius:3,borderBottomRightRadius:4,padding:6}}>
                    <Icon name={'plus'} size={12} color={constants.Colors.color_WHITE}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export const AfterAddToCart = (props) => {
    return (
        <View style={{flexDirection:'row',marginBottom:10}}>
            <TouchableOpacity style={styles.cartIcons}>
                <Icon name={'minus'} size={15} color={constants.Colors.color_WHITE}/>
            </TouchableOpacity>
            <View style={{width:30, justifyContent:'center',alignItems:'center'}}>
            <Text style={{...styles.addToCartbtnTitle,fontSize:18,color:constants.Colors.color_addToCart}}>1</Text>
            </View>
            <TouchableOpacity style={styles.cartIcons}>
                <Icon name={'plus'} size={15} color={constants.Colors.color_WHITE}/>
            </TouchableOpacity>
        </View>
    );
}

export const AddToCartBg = (props) => {
    return (
        <View style={{justifyContent:'center',alginItems:'center'}}>
            <TouchableOpacity style={{...styles.addToCartbtnBoxBg,paddingTop:8,paddingBottom:8}} {...props}>
                <Text style={{...styles.addToCartbtnTitleBg}}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}