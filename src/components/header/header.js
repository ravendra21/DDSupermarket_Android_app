import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux'
import constants from '../../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {navigateWithOutParams} from '../../navigation/NavigationServices'

function header({navigation,cartItems}){
    // onPress={() => {navigation.openDrawer()}}
    const openMenue =()=>{
        //navigation.openDrawer()
    }

    const nav = (route)=>{
        navigation.navigate(route);
    }

    let totalProd = cartItems.length > 0 ? cartItems.length:0;

    return(
        <View style = {styles.head}>
            <View style={{flexDirection:"row",justifyContent:'flex-end',width:'100%'}}>
                <TouchableOpacity style={{marginRight:20}} onPress={()=>nav(constants.Screens.CartItemScreen.name)}>
                    <View style={styles.cartTextContainer}>
                        <Text style={styles.cartText}>{totalProd}</Text>
                    </View>
                    <MaterialCommunityIcons name="cart-outline" color={constants.Colors.color_WHITE} size={25} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>nav(constants.Screens.Profile.name)}>
                    <MaterialCommunityIcons name="account" color={constants.Colors.color_WHITE} size={28} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    head:{
        flex:1,
        width:'100%',
        height:'100%',
        flexDirection :'row',
        alignSelf:'flex-end',
    },
    headText:{
        color:'black',
    },cartTextContainer:{
        position:'absolute',
        left:25,
        top:-5,
        zIndex:2,
    },cartText:{
        paddingLeft:5,
        paddingRight:5,
        textAlign:'center',
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:10,
        color:constants.Colors.color_WHITE,
        backgroundColor:constants.Colors.color_cartText,
        borderWidth:1,
        borderColor:constants.Colors.color_cartText,
        borderRadius:8,
    }
});


const mapStateToProps = state => ({
    cartItems :state.data.cartItem,
});

const mapDispatchToProps = dispatch => ({
    // getItemVariation: (data) => dispatch(getProductVariation(data)),
    // knowMore:(prodTypeId)=> dispatch({type:'KNOW_MORE_ABOUT_PROD',prodTypeId:prodTypeId})
});

export default connect(mapStateToProps, mapDispatchToProps)(header);