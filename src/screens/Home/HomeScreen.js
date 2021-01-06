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
import { PrimaryButton } from "../../components/button";
import ErrorBox from '../../components/ErrorBox';
import { validate,showAlertDialog,generateOtp } from "../../constants/Utils";
import {navigate} from '../../navigation/NavigationServices'
import { getWeatherDetail } from "../../lib/auth";
import { getProdcutCat,getHomeDetails,getCartItems} from "../../lib/data";
import Geolocation from 'react-native-geolocation-service';
import {SingleRowSkeltons,FullRow} from '../../components/skeltons/RowSkeltons';
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons';
import SearchBox from '../../components/SearchBox';
import SearchBar from '../../components/SearchBar';
import Swiper from 'react-native-swiper'
import {
    ProgressView
} from '../../components/loader';


function HomeScreen(props){
    const [data, setData] = React.useState({
        waeatherApi:false,
        prodCatApi:false,
        
    });

    React.useEffect(() => {

        if(data.prodCatApi == false){
            props.dispatch(getHomeDetails());
            props.dispatch(getCartItems());
            setData({
                ...data,
                prodCatApi: true,
            });
        }

      });

    const getLatLang = async ()=>{
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
              }
            );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                props.dispatch(getWeatherDetails({lat:currentLatitude,lng:currentLongitude}));
                
                setData({
                    ...data,
                        waeatherApi: true,
                });

            },(error) => {
                console.log(error)
              },
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
              );

            }else {
              alert("Permission Denied");
            }
        } catch (err) {
        //   alert("err",err);
          console.warn(err)
        }
    }

    const select_lang = (val) => {
        if(val === "Crop Doctor"){
            props.dispatch({type:'DISABLE_LOADER'});
            props.navigation.navigate(constants.Screens.CropDrScreen.name);
        }
    }

 const _swiper=()=>{
        return(
            props.data.homeSlider.map((sliderImg,id)=>{
                return (
                    <View key={id}>
                        <Image style={styles.bannerImg} source={{ uri: banner_url+sliderImg}} />
                    </View>
                )
            })
    )
}


const renderProdCat = () => {
        let prod_cat_item =  props.data.featureProd;
        if(prod_cat_item.length > 0){
            return(
                <View style={{alignSelf:'center',alignItems:'center',width:'98%'}}>
                    <TextScreenHeader title="Featured Products"/>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={prod_cat_item}
                      renderItem={({ item }) => (
                            <ProductBlock image_url={prod_variation_url + item.fimage} pname={item.attribute}
                                sellprice={item.maxrp}
                                maxsp={item.maxsp}
                                displaySingle={item.id}
                                itemType="featureProd" //name same as reducer
                                attribute_slug={item.slug}
                                isMyWishProd={item.wish_list_id}

                                selectedVariationID = {item.selectedVariationID}
                                defaultVariationID = {item.deafultVariationId}
                                selectedQty = {item.selectedQty}
                                productId = {item.product}
                            />
                      )}
                      //Setting the number of column
                      numColumns={2}
                      keyExtractor={(item) => item.id}
                    />
                    
                    {
                        (props.data.banner.length >0)?(
                            props.data.banner.map((banner, i) => {
                                return (
                                    <View key={i} style={{}}>
                                        <Image style={styles.bannerImg} source={{ uri: banner_url+banner}} />
                                    </View>
                                );
                            })):<View/>

                        
                    }

                    <View style={{marginTop:50,marginBottom:20}}>
                    <TextScreenHeader title="Top Brands, Great Prices"/>
                    </View>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      horizontal={true}
                      data={prod_cat_item}
                      renderItem={({ item }) => (
                            <ProductBlock image_url={prod_variation_url + item.fimage} pname={item.attribute}
                                sellprice={item.maxrp}
                                maxsp={item.maxsp}
                                displaySingle={item.id}
                                itemType="featureProd" //name same as reducer
                                attribute_slug={item.slug}
                                isMyWishProd={item.wish_list_id}
                                selectedVariationID = {item.selectedVariationID}
                                defaultVariationID = {item.deafultVariationId}
                                selectedQty = {item.selectedQty}
                                productId = {item.product}
                            />
                      )}
                      
                      keyExtractor={(item) => item.id}
                    />
                </View>
            )
        }else{
            return(
                    <View style={{width:'90%',alignSelf:'center'}}>
                        <View style={{...styles.skeltons,marginTop:-20}}>
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
    

    const renderProductCat = () => {
        let prod_cat_item =  props.data.productCat;
        if(prod_cat_item.length > 0){
        return(
                <View style={{alignSelf:'center'}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={prod_cat_item}
                      renderItem={({ item }) => (
                            <View style={{...styles.prodBlock,alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>{navigate(constants.Screens.ProductList.name,{"prodCatId":item.id})}}>
                                    <Image style={styles.labelCatImg} source={{ uri: prod_image + item.img}} />
                                    <Text style={styles.labelText}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                      )}
                      //Setting the number of column
                      numColumns={3}
                      keyExtractor={(item) => item.id}
                />
            </View>
        )
    }else{
        return(
            <View/>
        )
    }
    }

	return(
		<SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
            <SearchBox/>
		      <KeyboardAwareScrollView 
		      		keyboardShouldPersistTaps={'handled'}
		      		extraScrollHeight={140}
		      		enableOnAndroid={true}
	     	 	>
	            <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={{flex:1,width:'102%',alignSelf:'center',marginTop:constants.vh(52),marginBottom:constants.vh(-10)}}>
                        {props.data.homeSlider.length>0?(
                            <Swiper style={{height:constants.width*0.49}} loop={true} autoplay={true} autoplayDirection={true} autoplayTimeout={6} scrollEnabled={true}>
                                {_swiper()}
                            </Swiper>
                            ):<View/>
                        } 
                    </View>
                    <View style={[styles.labelConatainer,{marginBottom:constants.vh(10),marginTop:constants.vh(10)}]}>
                        {renderProductCat()}
                    </View>
                    <View style={[styles.labelConatainer]}>
	                    {renderProdCat()}
	                </View>
	            </ScrollView>
	    </KeyboardAwareScrollView>
            <ProgressView
                isProgress={props.indicator} 
                title={"Saving..."}
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
    labelText:{
        width:constants.vw(100),
        alignSelf:'center',
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:14,
        textAlign:'center',
    },
    labelCatImg:{
        alignSelf:'center',
        width:constants.vw(50),
        height:constants.vw(50),
        resizeMode:'contain'
    },
    bannerImg:{
        alignSelf:'center',
        width:constants.width,
        height:constants.width*0.50,
        resizeMode:'contain',
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);