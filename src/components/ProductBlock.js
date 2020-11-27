import React,{Component} from 'react'
import {View ,TouchableOpacity,StyleSheet,Image,Text,Alert,ToastAndroid} from 'react-native'
import {connect} from 'react-redux'
import constants from "../constants";
import {AddToCart,AfterAddToCart} from './button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {navigate} from '../navigation/NavigationServices'
import { addInWishList,addToCart,manageProdQty } from "../lib/data";
import {ShowToastWithGravityAndOffset} from '../constants/Utils'

const ProductBlock = props => {
    
    const viewSingleProd =(prodId, actionType,slug)=>{
        navigate(constants.Screens.SingleProduct.name,{"prodId":prodId,"type":actionType,"attribute_slug":slug });
    }

    const saveProdInWish =(prodId, actionType,slug)=>{
        props.dispatch(addInWishList({"prodId":prodId,"type":actionType,"attribute_slug":slug }));
    }

    const addToCartIntial =(prodId ,selectedQty,selectedVariationID,price)=>{
        //Alert.alert(prodId+" - "+selectedQty);
        props.dispatch(addToCart({prodVariId:prodId , prodSelectedQty:selectedQty , variation:selectedVariationID,itemPrice:price,itemType:props.itemType}));
        //props.dispatch({type:'ADD_TO_CART', prodVariId:prodId , prodSelectedQty:selectedQty , variation:selectedVariationID});
    }

    const chooseQuantity =(prodId ,variationId,actionType,selectedQty)=>{
        console.log(prodId ,variationId,actionType, selectedQty);
        if(selectedQty>1 && actionType =="minus"){
            
            props.dispatch(manageProdQty({prodVariId:prodId, variation:variationId, actionType:actionType}));

        }else if(selectedQty>=1 && actionType =="add"){
            
            props.dispatch(manageProdQty({prodVariId:prodId, variation:variationId, actionType:actionType}));

        }else{
                ToastAndroid.showWithGravityAndOffset(
                    "At Least add one item.",
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                    25,
                    50
                );
        }
    }

	return (
        <View style={styles.prodBlock}>
        	<View style={{position:'absolute',top:10,right:10,width:20,zIndex:1,backgroundColor:constants.Colors.color_WHITE,width:28,height:28,justifyContent:'center',alignItems:'center',borderRadius:14,borderWidth:1,borderColor:constants.Colors.color_WHITE,elevation:6}}>
	        	<TouchableOpacity onPress={()=>saveProdInWish(props.productId, props.itemType, props.attribute_slug)}>
                {  (props.isMyWishProd =="" || props.isMyWishProd == null)?
	                (<Icon name={"heart-o"} size={16} color={constants.Colors.color_drwaerIcon}/>):(<Icon name={"heart"} size={16} color={constants.Colors.color_theme}/>)
                }
	            </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={()=>viewSingleProd(props.productId, props.itemType, props.attribute_slug)}>
                    
                    <Image style={styles.labelImg} source={{ uri: ((props.image_url).replace(/ /g, "_"))}}/>
                    <Text style={styles.labelText}>{props.pname}</Text>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
	                    <Text style={{...styles.price,textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rs.{props.sellprice}</Text>
	                    <Text style={styles.price}>Rs.{props.maxsp}</Text>
                    </View>

                </TouchableOpacity>
                <View>
                    { props.selectedVariationID !=""?
                        (
                            <View style={{flexDirection:'row',marginBottom:10}}>
                                <TouchableOpacity style={styles.cartIcons} onPress={()=>{chooseQuantity(props.productId,props.defaultVariationID ,'minus',props.selectedQty)}}>
                                    <Icon name={'minus'} size={10} color={constants.Colors.color_WHITE}/>
                                </TouchableOpacity>
                                <View style={{width:30, justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{...styles.addToCartbtnTitle,fontSize:18,color:constants.Colors.color_addToCart}}>{props.selectedQty}</Text>
                                </View>
                                <TouchableOpacity style={styles.cartIcons} onPress={()=>{chooseQuantity(props.productId,props.defaultVariationID,'add',props.selectedQty)}}>
                                    <Icon name={'plus'} size={10} color={constants.Colors.color_WHITE}/>
                                </TouchableOpacity>
                            </View>
                        ):
                        (<AddToCart title="ADD TO CART" onPress={()=>addToCartIntial(props.productId, props.selectedQty,props.defaultVariationID,props.maxsp)}/>)
                    }
                </View>
            </View>
        </View>
	)
};

const styles =StyleSheet.create({
	prodBlock:{
        alignSelf:'center',
        backgroundColor:"white",
        borderRadius:0,
        elevation:2,
        padding:constants.vw(2),
        margin: constants.vw(5)
    },
    labelText:{
        width:constants.vw(100),
        alignSelf:'center',
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:14,
        textAlign:'center',
    },
    price:{
    	fontFamily:constants.fonts.Cardo_Bold,
        fontSize:14,
        textAlign:'center',
        padding:10
    },
    labelImg:{
        width:constants.width*0.45,
        height:constants.width*0.4,
        resizeMode:'contain'
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

function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state) {
    let auth = state.auth;
    let indicator = state.indicator;
    let data = state.data;
    let error = state.error;
    return {
        auth,indicator,data,error
};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductBlock);