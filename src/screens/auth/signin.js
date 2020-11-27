import React, {useContext} from 'react';
import { 
    View,
    Text, 
    StyleSheet,
    StatusBar,
    Alert,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import {getDeviceDetails} from '../../services/async-storage'

import { PrimaryTextInput,TextScreenHeader} from '../../components/textInputs'; 
import constants from "../../constants";
import { LayoutButton } from "../../components/button";
import { validate,showAlertDialog,generateOtp } from "../../constants/Utils";
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import {
    ProgressView
} from '../../components/loader';

import { sendOTP } from "../../lib/auth";

function SIGNIN(props){
    const [data, setData] = React.useState({
        email: '',
        isValidUser: true,
        deviceTokenSet:false,
    });

    React.useEffect(() => {
        if( data.deviceTokenSet == false){
            getDeviceDetails().then(value => {
                console.log("Device token data",value);
                let deviceDetails = JSON.parse(value);
                props.dispatch({type : 'SET-DEVICE_TOKEN',token:deviceDetails.token, os:deviceDetails.os});
            });
            setData({
                ...data,
                deviceTokenSet: true,
            });
        }
    });

    const textInputChange = (val) => {
        setData({
            ...data,
            email: val,
            isValidUser: true,
        })
    }

    const loginHandle = (val) => {
        if(val != ""){
            // navigateWithOutParams(constants.Screens.OTPScreen.name);
            // console.log(generateOtp(),"otp");
            if(val.length == 10){
                Keyboard.dismiss();
                props.dispatch(sendOTP({mobile:val,otp:generateOtp()}));
            }else{
                showAlertDialog(constants.AppConstant.Correct_Mobile);    
            }
        }else{
            showAlertDialog(constants.AppConstant.fillAllFileds);
        }

        //props.navigation.navigate(constants.Screens.Language.name);
    }

	return(
		<SafeAreaView style={styles.container}>
{/*            <View style={styles.backgroundContainer}>
                <Image style={styles.bakcgroundImage} source={constants.image.loginImage} />
            </View>*/}
		    
	        	<StatusBar backgroundColor={constants.Colors.color_theme} barStyle="dark-content"/>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Animatable.Image 
                            style={styles.logo}
                            duraton="1500"
                            resizeMode="contain"
                            source={constants.image.bg_splash}
                    />
                        
	                <View style={{...styles.contentContainer,backgroundColor:constants.Colors.color_auth_bg,padding:10,marginTop:constants.vh(20),borderRadius:constants.vw(10),paddingBottom:constants.vw(30)}}>
                        <View style={[styles.contentContainer]}>
                            <Text style={{fontFamily:constants.fonts.Cardo_Bold,fontSize:18,textAlign:'center'}}>
                                Enter your mobile number we will send OTP to verify later
                            </Text>
                        </View>
                        
	                    <PrimaryTextInput
	                        placeholder={"Enter Mobile Number"}
                            underlineColorAndroid = "transparent"
	                        autoCapitalize="none"
	                        onChangeText={(val) => textInputChange(val)}
	                        keyboardType={`phone-pad`}
    	               />

                        <LayoutButton  onPress={()=> loginHandle(data.email)} title="NEXT"/>
	                </View>
                </View>
	            
        <ProgressView 
            isProgress={props.indicator} 
            title={constants.progressMessages.SIGNUP}
        />
	    </SafeAreaView>
		)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.color_WHITE,
        alignItems: 'center',
        justifyContent: 'flex-end',   
    },
    letsBegin: {width: '85%', alignSelf: 'center'},
    bg_top: {
        width: '100%', 
        height: constants.vh(360)
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative',
      bottom:constants.vh(20)
    },
    contentContainer: {
        paddingTop: 31,
        width: '90%',
        alignSelf: 'center',
    },
    login_button: {
        marginTop: 50,
        alignSelf: 'center'
    },
    footer: {
        flex: 3,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_begin: {
        color: constants.Colors.color_161758,
        fontWeight: 'bold',
        fontSize: 28,
        fontFamily: constants.fonts.FUTURASTD_BOLD
    },
    backgroundContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }, 
    bakcgroundImage: {
        flex: 1, 
        width: null, 
        height: null,
        resizeMode:'cover'
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
return {
    auth,indicator
};
}

export default connect(mapStateToProps, mapDispatchToProps)(SIGNIN);