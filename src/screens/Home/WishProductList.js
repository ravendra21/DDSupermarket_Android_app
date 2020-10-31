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
    Platform
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import { PrimaryTextInput,TextScreenHeader} from '../../components/textInputs';
import ProductBlock from '../../components/ProductBlock';
import constants from "../../constants";
import {prod_cat_image,prod_image,prod_variation_url,banner_url} from "../../constants/url";
import { PrimaryButton,DefaultMenuOption} from "../../components/button";
import ErrorBox from '../../components/ErrorBox';
import { validate,showAlertDialog,generateOtp } from "../../constants/Utils";
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import { removeWishProduct,getWishList} from "../../lib/data";
import {SingleRowSkeltons,FullRow,ProductBlockSkelton} from '../../components/skeltons/RowSkeltons';
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons';
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
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function WishProductList(props){
    const [data, setData] = React.useState({
        waeatherApi:false,
        prodCatApi:false,
    });

    React.useEffect(() => {
        if(data.waeatherApi == false){
            //getLatLang();
        }

        if( data.prodCatApi == false){
            props.dispatch(getWishList());
            setData({
                ...data,
                prodCatApi: true,
            });
        }

      });

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

	const renderProdCat = () => {
        let prod_cat_item =  props.data.wishProdList;
        if(prod_cat_item.length>0){
            return(
                <View style={{alignSelf:'center',alignItems:'center',width:'98%'}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={prod_cat_item}
                      renderItem={({ item }) => (

                            <View style={styles.prodBlock}>
                                <View style={{position:'absolute',top:10,right:10,zIndex:2,width:20}}>
                                <DefaultMenuOption onSelect={()=>removeFromWish(item.id)}/>
                                {/*            <Menu renderer={SlideInMenu} >
                                                                                <MenuTrigger>
                                                                                    <View style={{borderRadius:12,borderColor:constants.Colors.color_threeDot,borderWidth:1,width:24,height:24,justifyContent:'center',alignItems:'center'}}>
                                                                                    <Icon name={'dots-vertical'} size={20} color={constants.Colors.color_threeDot}/>
                                                                                    </View>
                                                                                </MenuTrigger>
                                                                                <MenuOptions style={{width:constants.width,padding:10,backgroundColor:constants.Colors.color_theme,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                                                                                    <MenuOption onPress={()=>removeFromWish()} style={{flexDirection:'row'}}>
                                                                                        <Icon name={'trash-can'} size={25} color={constants.Colors.color_WHITE}/>
                                                                                        <Text style={styles.dropOpt}>Remove</Text>
                                                                                    </MenuOption>
                                                                                </MenuOptions>
                                                                            </Menu>*/}
                                </View>
                                <View style={{alignSelf:'center',alignItems:'center',marginTop:20}}>
                                    <TouchableOpacity onPress={()=>viewSingleProd(item.id,'',item.prod_slug )}>
                                        <Image style={styles.labelImg} source={{ uri:prod_variation_url + item.fimage}}/>
                                        <Text style={styles.labelText}>{item.attribute_name}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                      )}
                      //Setting the number of column
                      numColumns={2}
                      keyExtractor={(item) => item.id}
                    />
                </View>
            )
        }else{
            return(
                    <View style={{width:'90%',alignSelf:'center'}}>
                        <View style={{...styles.skeltons,marginTop:0}}>
                            
                                <View style={{alignItems:'center'}}>
                                    <ProductBlockSkelton/>     
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <ProductBlockSkelton/>
                                </View>
                            
                        </View>

                        <View style={styles.skeltons}>
                            <View style={{alignItems:'center'}}>
                                <ProductBlockSkelton/>     
                            </View>
                            <View style={{alignItems:'center'}}>
                                <ProductBlockSkelton/>
                            </View>
                        </View>

                        <View style={styles.skeltons}>
                            <View style={{alignItems:'center'}}>
                                <ProductBlockSkelton/>     
                            </View>
                            <View style={{alignItems:'center'}}>
                                <ProductBlockSkelton/>
                            </View>
                        </View>
                    </View>
            )
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
             
                    <View style={{flex:1,width:'102%',alignSelf:'center',marginTop:constants.vh(62),marginBottom:constants.vh(-10)}}>
                      {renderProdCat()}
                  </View>
              </ScrollView>
      </KeyboardAwareScrollView>
        <ProgressView
            isProgress={props.indicator} 
            title={"Removing..."}
        />
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
        width:constants.vw(100),
        alignSelf:'center',
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:14,
        textAlign:'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(WishProductList);