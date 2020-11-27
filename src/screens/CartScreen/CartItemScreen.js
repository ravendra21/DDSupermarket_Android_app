import React from 'react';
import {
    View, 
    Text, 
    StyleSheet ,
    StatusBar,
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    Platform,
    ToastAndroid
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import { PrimaryTextInput,TextScreenHeader} from '../../components/textInputs'
import ProductBlock from '../../components/ProductBlock'
import constants from "../../constants"
import {prod_image,prod_variation_url} from "../../constants/url"
import { PrimaryButton,DefaultMenuOption} from "../../components/button"
import ErrorBox from '../../components/ErrorBox';
import EmptyBox from '../../components/EmptyBox';
import { validate,showAlertDialog,generateOtp} from "../../constants/Utils"
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import { manageProdQty,getCartItems} from "../../lib/data"
import {SingleRowSkeltons,FullRow,ProductBlockSkelton} from '../../components/skeltons/RowSkeltons'
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons'
import SearchBox from '../../components/SearchBox'
import {
    ProgressView
} from '../../components/loader';
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
//   renderers,
// } from 'react-native-popup-menu';
// const { SlideInMenu } = renderers;
import Icon from 'react-native-vector-icons/FontAwesome';

function CartItemScreen(props){
    const [data, setData] = React.useState({
        waeatherApi:false,
        prodCatApi:false,
    });

    React.useEffect(() => {
        if(data.waeatherApi == false){
            //getLatLang();
        }

        if( data.prodCatApi == false){
            props.dispatch({type : 'LOADING'});
            props.dispatch(getCartItems());
            setData({
                ...data,
                prodCatApi: true,
            });
        }

      });

    const redirectOnPayment=()=>{
        props.navigation.navigate(constants.Screens.PaymentOptionScreen.name);
    }

    const checkOutButton=()=>{
        let subTotal = props.data.subtotal;
        let total = subTotal;
        let prod_cat_item =  props.data.cartItem;
        if(prod_cat_item.length>0){
        return(
            <View style={styles.checkoutBtn}>
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-evenly'}} onPress={()=>{redirectOnPayment()}}>
                    <Text style={[styles.checkout]}>CHECKOUT </Text>
                    <Text style={styles.checkout}> Rs. {total} </Text> 
                </TouchableOpacity>
            </View>
                    
        )}else{
            return(
                <View/>
            )
        }
    }

    const viewSingleProd =(prodId, actionType,slug)=>{
        props.navigation.navigate(constants.Screens.SingleProduct.name,{"prodId":prodId,"type":actionType,"attribute_slug":slug });
    }

    const removeFromWish =(prodId)=>{
        Alert.alert(
                    "DDEnterprise",
                    "Do you want reomve?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => props.dispatch(removeWishProduct({prodID:prodId}))}
          ],
          { cancelable: false }
        );
    }

    const showSelectedVariation=(item)=>{
        let variationName = item.variation_details.find(variation=>variation.varition_detail_id == item.selectedVariationID);
        return(
            <Text style={styles.labelText}>
                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16}}>{" QTY:"+item.selectedQty+" X "}</Text>
                {variationName.varition}
            </Text>
        )
    }
    
    const chooseQuantity =(prodId ,variationId,actionType,selectedQty)=>{
        console.log(prodId ,variationId,actionType,"selectedQty=>",selectedQty);
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

	const renderProdCat = () => {
        let prod_cat_item =  props.data.cartItem;
        if(prod_cat_item.length>0){
            return(
                <View style={{alignSelf:'center',width:'98%'}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={prod_cat_item}
                      renderItem={({ item }) => (
                            <View style={{...styles.prodBlock,flexDirection:'row'}}>
                                <View style={{width:constants.width*0.4}}>
                                <Image style={styles.labelImg} source={{ uri:prod_variation_url + item.fimage}}/>
                                </View>
                                <View style={{width:constants.width*0.5,padding:10}}>
                                    <View style={{flexDirection:'row'}}>
                                    <Text style={{...styles.labelText,fontSize:20,fontFamily:constants.fonts.Cardo_Bold}}>Rs. {item.minsp}</Text>
                                    <Text style={{...styles.price,textDecorationLine: 'line-through', textDecorationStyle: 'solid',marginLeft:10,marginTop:5}}>Rs.{item.minrp}</Text>
                                    </View>
                                    <Text style={styles.labelText}>{item.attribute_name}</Text>
                                    <Text style={styles.labelText}>{item.short_description}</Text>

                                    <View style={{flexDirection:'row'}}>
                                            {showSelectedVariation(item)}
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <View style={{flexDirection:'row',marginBottom:10}}>
                                            <TouchableOpacity style={styles.cartIcons} onPress={()=>{chooseQuantity(item.prod_id,item.selectedVariationID ,'minus',item.selectedQty)}}>
                                                <Icon name={'minus'} size={10} color={constants.Colors.color_WHITE}/>
                                            </TouchableOpacity>
                                            <View style={{width:30, justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{...styles.addToCartbtnTitle,fontSize:18,color:constants.Colors.color_addToCart}}>{item.selectedQty}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.cartIcons} onPress={()=>{chooseQuantity(item.prod_id,item.selectedVariationID,'add',item.selectedQty)}}>
                                                <Icon name={'plus'} size={10} color={constants.Colors.color_WHITE}/>
                                            </TouchableOpacity>
                                        </View>

                                        <View>
                                            <TouchableOpacity style={{borderWidth:1,borderRadius:5,borderColor:constants.Colors.color_lineGrey,padding:3,width:70,elevation:3,backgroundColor:constants.Colors.color_WHITE}}>
                                                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16}}> Remove </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                      )}
                      //Setting the number of column
                      numColumns={1}
                      keyExtractor={(item) => item.id}
                      ListFooterComponent={
                        <View style={{height:40}}/>
                      }
                    />
                </View>
            )
        }else{
            if(props.error.err == "Your Cart is empty" && prod_cat_item.length == 0){
                return(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:constants.height*0.09,marginBottom:constants.vh(20)}}>
                        <EmptyBox imageUrl={constants.image.emptyCart} 
                            button_title={"SHOP NOW"}
                            mainHeading={"Your Cart is empty !"}
                            subHeading={"Explore More and shortlist some items."}
                            onPress={()=>{props.navigation.navigate(constants.Screens.HomeScreen.name, { screen: constants.Screens.HomeScreen.name })}}
                        />
                    </View>
                )
            }else{
                if(props.error.err == "getting error in cart" && prod_cat_item.length == 0){
                    return(
                        <View style={{flex:1,width:'90%',alignSelf:'center',justifyContent:'center', alignItems:'center'}}>
                            <ErrorBox
                                errorMessage={"Somthing went wrong. Please try again later"}
                                onPress={()=>{props.dispatch(getCartItems())}}
                           />
                        </View>
                    )
                }else{
                    return(
                            <View style={{flex:1,width:'90%',alignSelf:'center',justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:20,marginTop:constants.height/4}}>Loading...</Text>
                            </View>
                    )
                }
            }
        }
    }
    
  return(
    <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
          <SearchBox screenName={"ProductScreenDisplay"}/>
          <KeyboardAwareScrollView 
              keyboardShouldPersistTaps={'handled'}
              extraScrollHeight={140}
              enableOnAndroid={true}
          >
              <ScrollView keyboardShouldPersistTaps={'handled'}>
             
                    <View style={{flex:1,width:'102%',alignSelf:'center',marginTop:constants.vh(62),marginBottom:constants.vh(10)}}>
                      {renderProdCat()}
                  </View>
              </ScrollView>
        </KeyboardAwareScrollView>
        <ProgressView
            isProgress={props.indicator} 
            title={"Fetching..."}
        />
        {checkOutButton()}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: constants.Colors.color_WHITE,
    },
    
    labelConatainer: {
        flex:1,
        paddingTop: 31,
        width: '99%',
        alignSelf: 'center'
    },
    skeltons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:constants.vh(20)
    },
    prodBlock:{
        alignSelf:'center',
        backgroundColor:"white",
        borderRadius:0,
        elevation:2,
        padding:constants.vw(2),
        margin: constants.vw(5),
        padding:7
    },
    labelText:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:14,
        marginBottom:10
    },
    labelImg:{
        width:constants.width*0.40,
        height:constants.width*0.38,
        resizeMode:'contain'
    },
    dropOpt:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:18,
        color:constants.Colors.color_WHITE
    },
    checkout:{
        fontFamily:constants.fonts.Cardo_Bold, 
        textAlign:'center',
        color: constants.Colors.color_WHITE,
        fontSize:constants.vw(18),
        padding:5
    },
    checkoutBtn:{
        width:'100%',
        backgroundColor:constants.Colors.color_statusbar,
        position:'absolute',
        bottom:0,
        zIndex:2,
        elevation:60,
        padding:7
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItemScreen);