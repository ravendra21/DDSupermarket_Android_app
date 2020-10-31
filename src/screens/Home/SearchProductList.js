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
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import { getWeatherDetail } from "../../lib/auth";
import { getProdcutCat,getProdcutList,searchProductsList } from "../../lib/data";
import Geolocation from 'react-native-geolocation-service';
import {SingleRowSkeltons,FullRow,ProductBlockSkelton} from '../../components/skeltons/RowSkeltons';
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons';
import SearchBox from '../../components/SearchBox'
import Swiper from 'react-native-swiper'
import {
    ProgressView
} from '../../components/loader';


function SearchProductList(props){
    const [data, setData] = React.useState({
        waeatherApi:false,
        prodCatApi:false,
    });

    React.useEffect(() => {
        if(data.waeatherApi == false){
            //getLatLang();
        }

        if( data.prodCatApi == false){

        	console.log(props.route.params);
            props.dispatch(searchProductsList({term:props.route.params.keyword}));
            setData({
                ...data,
                prodCatApi: true,
            });
        }

      });

	const renderProdCat = () => {
        let prod_cat_item =  props.data.searchProductLIst;
        if(prod_cat_item.length>0){
            return(
                <View style={{alignSelf:'center',alignItems:'center',width:'98%'}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={prod_cat_item}
                      renderItem={({ item }) => (
                            <ProductBlock image_url={prod_variation_url + item.fimage} pname={item.attribute_name}
                                sellprice={item.minrp}
                                maxsp={item.minsp}
                                displaySingle={item.id}
                                itemType="productList" //name same as reducer
                                attribute_slug={item.attribute_slug}
                            />
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
          <SearchBox screenName={"SearchProductListScreen"}/>
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
    autocompleteContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height:60,
        backgroundColor: constants.Colors.color_searchBox,
        borderRightWidth: 20,
        borderLeftWidth: 20,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderColor: constants.Colors.color_searchBox,
        zIndex: 2,
    },
    innerLayoutSeachBox:{
        borderRadius:10,
        borderColor:constants.Colors.color_WHITE,
        backgroundColor: constants.Colors.color_WHITE
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductList);