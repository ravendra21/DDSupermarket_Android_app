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
import constants from "../../constants";
import {prod_image,prod_variation_url} from "../../constants/url";
import { PrimaryButton } from "../../components/button";
import ErrorBox from '../../components/ErrorBox';
import EmptyBox from '../../components/EmptyBox';
import {showAlertDialog,checkOrderStatus} from "../../constants/Utils";
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import {getOrderListList} from "../../lib/data";
import Geolocation from 'react-native-geolocation-service';
import {SingleRowSkeltons,FullRow,ProductBlockSkelton} from '../../components/skeltons/RowSkeltons';
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons';
import Swiper from 'react-native-swiper'
import {
    ProgressView
} from '../../components/loader';


function OrderList(props){
    const [data, setData] = React.useState({
        prodCatApi:false,
    });

    React.useEffect(() => {
        if( data.prodCatApi == false){
            props.dispatch(getOrderListList());
            setData({
                ...data,
                prodCatApi: true,
            });
        }

      });

    const redirectOnDetails=(id)=>{
        props.navigation.navigate(constants.Screens.OrderDetails.name,{orderDetailsId:id});
    }

    const renderOrderList=()=>{
        let orderData = props.data.orderList;
        if(orderData.length>0){
            return(
                    <View style={{alignSelf:'center',width:'98%'}}>
                        <FlatList
                          showsVerticalScrollIndicator={true}
                          data={orderData}
                          renderItem={({ item }) => (
                            <View>
                                {(item.get_cart_items).length>0?(<View style={{...styles.prodBlock}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Image style={styles.labelImg} source={{ uri:prod_variation_url + item.get_cart_items[0].fimage}}/>
                                        <View style={{width:constants.width*0.6}}>
                                            <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Order No: </Text>{item.order_no}</Text>
                                            <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(16)}}>Transaction Id: </Text>
                                            <Text style={styles.label}>{item.transaction_id}</Text>
                                            <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Expected Delivery: </Text>{item.delivery_date}</Text>
                                            <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Total Items: </Text>{(item.get_cart_items).length}</Text>
                                            <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Order Status: </Text>{checkOrderStatus(item.order_status)}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.orderDetailsBtn} onPress={()=>redirectOnDetails(item.id)}>
                                        <Text style={{fontSize:constants.vw(16),fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_statusbar}}>View Order Details</Text>
                                    </TouchableOpacity>
                                    </View>):(<></>)}

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
            if(props.error.err == "Empty Order List" && orderData.length == 0){
                return(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:constants.height*0.09,marginBottom:constants.vh(20)}}>
                        <EmptyBox imageUrl={constants.image.emptyOrderList} 
                            button_title={"SHOP NOW"}
                            mainHeading={"Your Cart is empty !"}
                            subHeading={"Explore More and shortlist some items."}
                            onPress={()=>{props.navigation.navigate(constants.Screens.HomeScreen.name, { screen: constants.Screens.HomeScreen.name })}}
                        />
                    </View>
                )
            }else{
                if(props.error.err == "not get Order List" && orderData.length == 0){
                    return(
                        <View style={{flex:1,width:'90%',alignSelf:'center',justifyContent:'center', alignItems:'center',marginTop:constants.height*0.3}}>
                            <ErrorBox
                                errorMessage={"Somthing went wrong. Please try again later"}
                                onPress={()=>{ props.dispatch(getOrderListList()) }}
                           />
                        </View>
                    )
                }else{
                    return(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text>Loading...</Text>
                        </View>
                    )   
                }             
            }
        }
    }
  return(
    <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
          <KeyboardAwareScrollView 
              keyboardShouldPersistTaps={'handled'}
              extraScrollHeight={140}
              enableOnAndroid={true}
          >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            {renderOrderList()}
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
        borderRadius:10,
        borderWidth:1,
        borderColor:constants.Colors.color_statusbar,
        padding:constants.vw(12),
        margin: constants.vw(5),
        width:constants.width*0.95
    },
    orderDetailsBtn:{
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        marginTop:10,
        borderTopWidth:0.5,
        borderBottomWidth:0,
        borderColor:constants.Colors.color_statusbar,
        width:constants.width*0.945,
        alignSelf:'center',
        marginBottom:-10
    },
    labelImg:{
        width:constants.width*0.34,
        height:constants.width*0.34,
        resizeMode:'contain'
    },
    label:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(16),
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);