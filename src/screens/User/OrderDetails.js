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


function OrderDetails(props){
    const [data, setData] = React.useState({
        prodCatApi:false,
    });

    // React.useEffect(() => {
    //     if( data.prodCatApi == false){
    //         props.dispatch(getOrderListList());
    //         setData({
    //             ...data,
    //             prodCatApi: true,
    //         });
    //     }

    //   });

    const renderProdOfDelivery=()=>{
        let orderData = props.data.orderList;
        let orderDetails = orderData.find(item=>item.id == props.route.params.orderDetailsId);
        console.log(orderDetails.get_cart_items);

        return(
            <View style={{width:constants.width*0.95,alignSelf:'center'}}>
                <Text style={styles.boldHeading}>View order details</Text>
                <View style={styles.prodBlock}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.heading}>Order No:</Text>
                        <Text style={styles.content}>{orderDetails.order_no}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.heading}>Order Date:</Text>
                        <Text style={styles.content}>{orderDetails.date}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.heading}>Order Total:</Text>
                        <Text style={styles.content}>Rs. {orderDetails.sub_total_cost}</Text>
                    </View>
                </View>
                
                <Text style={styles.boldHeading}>Product Delivery details</Text>
                <Text style={styles.content}>{orderDetails.delivery_date}</Text>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.boldHeading}>Order Status:</Text><Text style={{paddingLeft:3,fontSize:18,fontFamily:constants.fonts.Cardo_Regular}}>{checkOrderStatus(orderDetails.order_status)}</Text>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={orderDetails.get_cart_items}
                    renderItem={({ item }) => (
                        <View style={{...styles.prodBlock}}>
                            <View style={{flexDirection:'row'}}>
                                <Image style={styles.labelImg} source={{ uri:prod_variation_url + item.fimage}}/>
                                    <View style={{width:constants.width*0.6}}>
                                        <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Item: </Text>{item.attributename}</Text>
                                        <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Unity: </Text>{item.attribute_value}</Text>
                                        <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Quantiy: </Text>{item.total_item}</Text>
                                        <Text style={styles.label}><Text style={{fontFamily:constants.fonts.Cardo_Bold}}>Price: </Text>{item.item_price}</Text>
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
            {renderProdOfDelivery()}
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
    },
    heading:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(16),
    },
    content:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(16),  
    },
    boldHeading:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(18),  
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);