import React,{useState} from 'react';
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
    ToastAndroid,
    Modal
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import { SquareTextInput} from '../../components/textInputs'
import constants from "../../constants"
import {prod_image,prod_variation_url} from "../../constants/url"
import { PrimaryButton,DefaultMenuOption} from "../../components/button"
import ErrorBox from '../../components/ErrorBox';
import { validate,showAlertDialog,generateOtp} from "../../constants/Utils"
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import { manageProdQty,getCartItems,checkCouponCode,checkOut,checkOutOnCOD} from "../../lib/data"
import RadioButton from '../../components/RadioButton'
import {
    ProgressView
} from '../../components/loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
var moment = require('moment'); // require

function PaymentOptionScreen(props){
    const [data, setData] = useState({
        prodCatApi:false,
        option1:'select',
        option2:'notselect',
        couponCode:'',
        deliveryDate:'Select Delivery Date',
        timeSlot:'',
        selectedDay:[],
    });
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        if( data.prodCatApi == false){
            //props.dispatch({type : 'LOADING'});
            props.dispatch(getCartItems());
            setData({
                ...data,
                prodCatApi: true,
            });
        }

    });

    const _radioHandler=()=>{
        let {option1,option2} = data;
        if(option1 == "select")
        {
            setData({
                ...data,
                option1:"notselect",
                option2:"select"
            });
        }else{
            setData({
                ...data,
                option1:"select",
                option2:"notselect"
            });
        }
    }
    
    let today = moment();
    let day = today.clone().startOf('month');
    let customDatesStyles = [];
    // data.selectedDay.map(item=>{
    //     customDatesStyles.push({
    //         date: item.clone(),
    //         style: {backgroundColor:'red'},
    //         textStyle: {color: 'black'},
    //         containerStyle: [],
    //     })
    // })

    const onDatesChange=(date)=>{
        //console.log("date Ravendra",date.format("YYYY-MM-DD"));
        setData({
             ...data,
             deliveryDate:date.format("YYYY-MM-DD"),
        });
        setModalVisible(false);
    }


    let userEmail = props.auth.user.email;
    let userMobile = props.auth.user.mobile;
    let subtotal = props.data.subtotal;
    let deliveryCharges = 0;
    let discount = props.data.coupon_value !=""? props.data.coupon_value :0 ;
    let total = subtotal+parseFloat(deliveryCharges)-parseFloat(discount);

    const getCouponCodeDetails=()=>{
        let coupon_Code =data.couponCode;
        if(coupon_Code != ''){
            props.dispatch(checkCouponCode({code:coupon_Code,subTotal:props.data.subtotal }));
            // this.couponCodeText.clear();
        }else{
            // ToastAndroid.showWithGravity("Please enter vaild coupon code", ToastAndroid.SHORT, ToastAndroid.TOP);
            ToastAndroid.showWithGravityAndOffset(
                "Please enter vaild coupon code",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
        }
    }

    const renderCouponMsg=()=>{
        if(props.data.coupon_msg !=''){
            let msg = props.data.coupon_msg;
            if(props.data.coupon_value ==""){
                setTimeout(()=>{props.dispatch({type:'ERROR_COUPON_CODE',payload:''})},2000);
            }

            return(
                <View style={{backgroundColor:constants.Colors.color_lineGrey,borderRadius:4}}>
                    <Text style={{color:constants.Colors.color_WHITE,fontFamily:constants.fonts.Cardo_Regular,fontSize:16,padding:5}}>{ msg }</Text>
                </View>
            )
        }
    }

    const redirectOnPayment=()=>{
        let cartItemIds = "";
        let cartItems= props.data.cartItem;
        let totalItem =cartItems.length;
        for(var i=0;i<totalItem ;i++){
            if(cartItems[i]["selectedQty"]!="" && parseInt(cartItems[i]["selectedQty"]) > 0 ){
                if(i < totalItem-1)
                {
                    cartItemIds += cartItems[i]["cart_item_id"]+",";
                }else{
                    cartItemIds += cartItems[i]["cart_item_id"];
                }
            }
        }

        if(userEmail =="" && userMobile==""){
            ToastAndroid.showWithGravityAndOffset(
                "Please Enter Correct Email Id or Mobile Number .",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                2,
                50
            );
        }else if(props.data.defaultAddress ==""){
            ToastAndroid.showWithGravityAndOffset(
              "Please Select Delivery Address.",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
              50,
              100
            );

        }else if(data.deliveryDate == 'Select Delivery Date'){
            ToastAndroid.showWithGravityAndOffset(
                "Please Select Delivery Date.",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
        }else{
            let {option1,option2} = data;
            if(option1 == 'select'){
                console.log("Online Payment");
                props.dispatch(checkOut({
                        user_id:props.auth.user.id,
                        address_id:props.data.defaultAddress,
                        usr_mob:userMobile,
                        subtotal:subtotal,
                        shhipingCost:deliveryCharges,
                        coupon_id:props.data.coupon_id,
                        total_cost:total,
                        paymentOption:4,
                        deliveryDate:data.deliveryDate,
                        cart_items:cartItemIds
                    }));
            }else{
                console.log("COD");
                props.dispatch(checkOutOnCOD({
                    user_id:props.auth.user.id,
                    address_id:props.data.defaultAddress,
                    usr_mob:userMobile,
                    subtotal:subtotal,
                    shhipingCost:deliveryCharges,
                    coupon_id:props.data.coupon_id,
                    total_cost:total,
                    paymentOption:2,
                    deliveryDate:data.deliveryDate,
                    cart_items:cartItemIds
                }));
            }
        }
    }

    const checkOutButton=()=>{
        return(
            <View style={styles.checkoutBtn}>
                <TouchableOpacity onPress={()=>{redirectOnPayment()}}>
                    <Text style={[styles.checkout]}>Place Order</Text>
                </TouchableOpacity>
            </View>
                    
        )
    }

    const renderDeliveryAddress=()=>{
        let newaddressList = props.data.addressList;
        let deliverAddressId = props.data.defaultAddress;
        if(newaddressList.length>0 && deliverAddressId !=''){
            let deliveyAddress = (props.data.addressList).find(item=>item.id == deliverAddressId);
            return(
                <View>
                    <Text style={styles.text}>{deliveyAddress.contactName}</Text>
                    <Text style={styles.text}>{deliveyAddress.contactMobile}</Text>
                    <Text style={styles.text}>{deliveyAddress.district+","+deliveyAddress.state+","+deliveyAddress.zipcode}</Text>
                    <Text style={styles.text}>{deliveyAddress.address}</Text>
                </View>
            )
        }else{
            return(
                <Text style={styles.text}>Please Select Delivery Address.</Text>
            )
        }
    }

  return(
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:0,shadowColor: "#000",elevation:2,width:constants.width,alignSelf:'center',marginTop:-12,padding:20}}>
                        <Text style={{color:constants.Colors.color_statusbar,fontFamily:constants.fonts.Cardo_Bold,fontSize:constants.vw(20)}}>Select Delivery Date</Text>
                        <TouchableOpacity
                            style={{ ...styles.openButton}}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Icon name={'close'} size={constants.vw(18)} color={constants.Colors.color_lineGrey}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:constants.width*0.95,marginTop:20,elevation:10,backgroundColor:constants.Colors.color_statusbarLight,borderColor:'#EBF4FA',alignSelf:'center',borderRadius:10}}>
                        <CalendarPicker
                                // weekdays={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
                                // months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                                // previousTitle="Anterior"
                                // nextTitle="Próximo"
                                textStyle={{
                                    fontFamily:constants.fonts.Cardo_Bold,
                                    color: constants.Colors.color_WHITE,
                                }}


                                disabledDatesTextStyle={{
                                    fontFamily:constants.fonts.Cardo_Regular,
                                    color: constants.Colors.color_grey,  
                                }}

                                selectedDayStyle={{
                                    backgroundColor:constants.Colors.color_tab,
                                    borderColor:constants.Colors.color_heading,
                                    borderWidth:2,
                                }}

                                selectedDayColor="#7300e6"
                                selectedDayTextStyle={constants.fonts.Cardo_Regular}
                                selectedDayTextColor={constants.Colors.color_WHITE}

                                onDateChange={(text)=>onDatesChange(text)}

                                todayTextStyle={{fontWeight: 'bold'}}
                                todayBackgroundColor={constants.Colors.color_statusbar}
                                todayTextColor={constants.Colors.color_WHITE}
                                customDatesStyles={customDatesStyles}
                                minDate={today}
                                dayShape='square'
                            />
                    </View>
                </View>
            </View>
        </Modal>
          <KeyboardAwareScrollView 
              keyboardShouldPersistTaps={'handled'}
              extraScrollHeight={140}
              enableOnAndroid={true}
          >
              <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.labelConatainer}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.heading}>Delivery Address</Text>
                            <View>
                                <TouchableOpacity onPress={()=>{props.navigation.navigate(constants.Screens.MyAddress.name,{screen_name:'PaymentOption'})}}>
                                    <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16,color:constants.Colors.color_statusbar}}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop:10,marginBottom:10}}>
                            {renderDeliveryAddress()}
                        </View>
                    </View>

                    <View style={styles.labelConatainer}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.heading}>Saved Email Address</Text>
                            <View>
                                { userEmail !="" ?(<View/>):(
                                    <TouchableOpacity onPress={()=>{props.navigation.navigate("EditProfile",{screen_name:'PaymentOption'})}}>
                                        <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:16,color:constants.Colors.color_statusbar}}>+ Add</Text>
                                    </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                        <View style={{marginTop:10,marginBottom:10}}>
                            <Text style={styles.text}>{userEmail !=""?userEmail:"Please add email."}</Text>
                            <Text style={{...styles.text, marginTop:5}}>{userMobile !=""?userMobile:""}</Text>
                        </View>

                        <View style={{marginTop:constants.vh(10)}}>
                            <Text style={styles.heading}>Delivery Date:</Text>
                            <TouchableOpacity onPress={()=>{setModalVisible(true);}}>
                                <Text style={styles.text}>{data.deliveryDate}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.heading,{marginBottom:constants.vh(10),marginTop:constants.vh(10)}]}>Payment Method</Text>
                        <View style={styles.prodBlock}>
                            <View style={{flexDirection: 'row',paddingTop:10}}>
                                <View style={{width:"20%"}}><RadioButton  checked={data.option1} onPress={()=>_radioHandler()}/></View>
                                <View style={{width:"80%"}}><Text style={{fontSize:constants.vw(16),fontFamily:constants.fonts.Cardo_Bold,marginTop:1}}>Credit Card/Debit Card/NetBanking(Razorpay)</Text></View>
                            </View>
                                
                            <View style={{flexDirection: 'row',marginTop:10,marginBottom:10}}>
                                <View style={{width:"20%"}}><RadioButton  checked={data.option2} onPress={()=>_radioHandler()}/></View>
                                <View style={{width:"80%"}}><Text style={{fontSize:constants.vw(16),fontFamily:constants.fonts.Cardo_Bold,marginTop:3}}> Cash on Delivery</Text></View>
                            </View>
                        </View>

                        <View style={{marginTop:constants.vh(10)}}>
                            <View style={styles.paymentValue}>
                                <Text style={styles.text}>Subtotal</Text>
                                <Text style={styles.textInt}>{subtotal}</Text>
                            </View>
                            <View style={styles.paymentValue}>
                                <Text style={styles.text}>Delivery Charges</Text>
                                <Text style={styles.textInt}>{deliveryCharges}</Text>
                            </View>
                            <View style={styles.paymentValue}>
                                <Text style={styles.text}>Discount</Text>
                                <Text style={styles.textInt}>{discount == 0?0:"-"+discount}</Text>
                            </View>
                            <View style={{marginTop:10}}>
                                {renderCouponMsg()}
                                <Text style={styles.heading}>Apply Coupon</Text>
                                <View style={{marginTop:-10}}>
                                    <SquareTextInput
                                        placeholder="Enter coupon code" 
                                        value={data.couponCode}
                                        onChangeText={(text)=>setData({...data,couponCode:text})}
                                        onSubmitEditing={()=>getCouponCodeDetails()}
                                    />
                                </View>    
                            </View>
                            <View style={[styles.paymentValue,{marginTop:15}]}>
                                <Text style={styles.textInt}>Total</Text>
                                <Text style={styles.textInt}>{total}</Text>
                            </View>
                        </View>
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
        paddingTop: 10,
        width: '90%',
        alignSelf: 'center'
    },
    prodBlock:{
        alignSelf:'center',
        backgroundColor:"white",
        borderRadius:0,
        elevation:2,
        padding:constants.vw(2),
        margin: constants.vw(5),
        padding:7,
        width:"98%",
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
    heading:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(16),
        color:constants.Colors.color_BLACK,
    },
    text:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(16),
    },
    textInt:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(16),
        color:constants.Colors.color_BLACK,
    },
    placeButton:{
        borderWidth:2,
        borderRadius:10,
        borderColor:constants.Colors.color_cartText,
        backgroundColor:constants.Colors.color_btn,
        padding:5,
        width:'98%',
        alignSelf:'center',
        marginBottom:10
    },
    buttonText:{
        textAlign:'center',
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(18),
        padding:10,
        color:constants.Colors.color_WHITE
    },
    paymentValue:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width:constants.width,
        height:constants.height,
        backgroundColor: "white",
        padding: 10,
        shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle:{
        color: constants.Colors.color_grey,
        fontFamily: constants.fonts.Cardo_Bold,
        fontSize:22
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptionScreen);