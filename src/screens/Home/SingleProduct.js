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
import constants from "../../constants";
import {prod_variation_url} from "../../constants/url";
import { AddToCartBg } from "../../components/button";
import { validate,showAlertDialog,generateOtp } from "../../constants/Utils";
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import { getSingleProduct,addInWishList } from "../../lib/data";
import Geolocation from 'react-native-geolocation-service';
import {SingleRowSkeltons,FullRow} from '../../components/skeltons/RowSkeltons';
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    ProgressView
} from '../../components/loader';
import {Picker} from '@react-native-community/picker';
import SearchBox from '../../components/SearchBox';


function SingleProduct(props){
    const [data, setData] = React.useState({
        prodCatApi:false,
        query: '',
        selectedVariation:'Select'
    });

    React.useEffect(() => {
        
        if( data.prodCatApi == false){
            props.dispatch(getSingleProduct({prod_id:props.route.params.prodId,attribute_slug:props.route.params.attribute_slug }));
            setData({
                ...data,
                prodCatApi: true,
            });
        }

      });
    
    const setVariationType=(value, id)=>{
        setData({
            ...data,
            selectedVariation:value,  
        });
    }

    const saveProdInWish =(prodId, actionType,slug)=>{
        console.log(prodId, actionType,slug);
        props.dispatch(addInWishList({"prodId":prodId,"type":actionType,"attribute_slug":slug }));
    }

    const wishButton =(productDetails)=>{
        
        if(productDetails['prodetail'].is_MyWish == true){
            return(
                <Icon name={"heart"} size={20} color={constants.Colors.color_active_wish}/>
            )
        }else{
            return(
                <>
                    <Icon name={"heart-o"} size={20} color={constants.Colors.color_drwaerIcon}/>
                    <Text style={{marginLeft:7,color:constants.Colors.color_main_heading,fontSize:16}}>Add to wish</Text>
                </>
            )
        } 
    }

	const renderProdCat = () => {
        let productDetails = props.data.singleProdDetails;
        console.log("Single  pp" ,productDetails);
        if( productDetails.length > 0){
                return(
                    <View style={{alignSelf:'center',width:'98%'}}>
                        <Text style={styles.labelText}>{productDetails[0]['prodetail'].attribute_name}</Text>
                        <View style={{flexDirection:'row',marginBottom:constants.vh(10)}}>
                            <Text style={styles.labelText}><Text style={{color:constants.Colors.color_theme}}>{"Rs. "+productDetails[0]['prodetail'].minrp}</Text>
                                <Text style={{fontSize:18}}>{" - Rs. "+productDetails[0]['prodetail'].maxsp}</Text>
                            </Text>
                        </View>

                        {productDetails[0]['prodetail'].images.length>0?(
                            <Swiper style={{height:constants.width*0.49}} loop={true} autoplay={true} autoplayDirection={true} autoplayTimeout={6} scrollEnabled={true}>
                                {productDetails[0]['prodetail'].images.map((sliderImg,id)=>{
                                    return (
                                        <View key={id}>
                                            <Image style={styles.bannerImg} source={{ uri: prod_variation_url+sliderImg.image}} />
                                        </View>
                                    )
                                })}
                            </Swiper>
                            ):(<Image style={styles.bannerImg} source={{ uri: prod_variation_url+productDetails[0]['prodetail'].fimage }}/>)
                        }
                                                                        
                        <Text style={{...styles.labelText,color:constants.Colors.color_main_heading}}>Available Options</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue = {data.selectedVariation}
                                    style={styles.pickerBlock}
                                    onValueChange={ (value,label) => (setVariationType(value,label))}
                                >
                                    <Picker.Item label={"Select"} value={"Select"}  />
                                    {
                                        productDetails[0]['prodetail'].variation_details.map((item,index) => {
                                            return( <Picker.Item label={item.varition} key={index} value={item.varition_detail_id}  />)
                                        })
                                    }
                                </Picker>
                            </View>

                        <Text style={styles.prodDesc}>{productDetails[0]['prodetail'].short_description}</Text>

                        <View style={{flexDirection:'row'}}>
                            <AddToCartBg title="Add to Cart"/>
                            <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:10}}
                             onPress={()=>saveProdInWish(productDetails[0]['prodetail'].id,"", productDetails[0]['prodetail'].attribute_slug)}>
                                {wishButton(productDetails[0])}
                            </TouchableOpacity>
                        </View>
                    </View>
                )
        }else{
            return(
                    <View style={{width:'90%',alignSelf:'center'}}>
                        <View style={{...styles.skeltons,marginTop:0}}>
                            <View style={{alignItems:'center'}}>
                                <FullRow/>     
                            </View>
                        </View>

                        <View style={styles.skeltons}>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>     
                            </View>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>
                            </View>
                        </View>

                        <View style={styles.skeltons}>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>     
                            </View>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>
                            </View>
                        </View>

                        <View style={styles.skeltons}>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>     
                            </View>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <SingleRowImagSkeltons/>
                            </View>
                        </View>

                        <View style={styles.skeltons}>
                            <View style={{alignItems:'center'}}>
                                <FullRow/>     
                            </View>
                        </View>
                    </View>
            )
        }
    }

  return(
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
        <SearchBox screenName={"SingleProductScreenDisplay"}/>
        <KeyboardAwareScrollView 
              keyboardShouldPersistTaps={'handled'}
              extraScrollHeight={140}
              enableOnAndroid={true}
          >
              <ScrollView keyboardShouldPersistTaps={'handled'}>             
                    <View style={{flex:1,width:'100%',alignSelf:'center',marginTop:constants.vh(62)}}>
                      {renderProdCat()}
                    </View>
              </ScrollView>
      </KeyboardAwareScrollView>
        <ProgressView 
            isProgress={props.indicator} 
            title={"Fetching"}
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
    singleImage:{
        marginTop:20,
        alignSelf:'center',
        width:constants.width*0.9,
        height:constants.width/2,
        resizeMode:'contain',
    },
    bannerImg:{
        alignSelf:'center',
        width:constants.width,
        height:constants.width*0.51,
        resizeMode:'contain',
    },
    labelText:{
        width:constants.width*0.98,
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:20,
        marginTop:10,
    },
    prodDesc:{
        width:constants.width*0.98,
        fontFamily:constants.fonts.Cardo_Regular,
        color:constants.Colors.color_main_heading,
        fontSize:16,
        marginTop:6,
        marginBottom:6,
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
        margin: constants.vw(5)
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    pickerBlock:{
        width:constants.width*0.3,
        height: 30,
        fontFamily:constants.fonts.Cardo_Bold,
    },
    pickerContainer:{
        width:constants.width*0.3,
        borderWidth:1,
        borderRadius:10,
        borderColor:constants.Colors.color_lineGrey,
        marginLeft:5,
        marginBottom:5
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);