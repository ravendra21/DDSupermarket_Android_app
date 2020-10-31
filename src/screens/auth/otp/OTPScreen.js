import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Platform,
    Keyboard,
    TextInput,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {TextScreenHeader} from '../../../components/textInputs'; 
import constants from "../../../constants";
import { vh, vw } from "../../../constants/Dimension";
import {showAlertDialog} from '../../../constants/Utils'
import {ProgressView} from '../../../components/loader';
import { LayoutButton } from "../../../components/button";
import { login } from "../../../lib/auth";

const OTPScreen = (props) => {

    const box1Ref: any = React.createRef();
    const box2Ref: any = React.createRef();
    const box3Ref: any = React.createRef();
    const box4Ref: any = React.createRef();

    const [state, setState] = React.useState({
        box1: '',
        box2: '',
        box3: '',
        box4: '',
    });

    //const [otp, setOTP] = React.useState("");
    const otpHandle = async () => {
        //props.dispatch(byPassLogOut("auth"))
        Keyboard.dismiss()
        const otp = `${state.box1}${state.box2}${state.box3}${state.box4}`;
        
        if(otp == props.auth.otp){
                //setOTP("")
                setState({
                    box1: '',
                    box2: '',
                    box3: '',
                    box4: '',
                });

                props.dispatch(login({mobile:props.auth.registerMobile,otp:props.auth.otp}));

        }else{
            showAlertDialog(constants.AppConstant.WrongOtp)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
             <KeyboardAwareScrollView 
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={constants.vh(140)}
                enableOnAndroid={true}>

            <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content" />
            <View style={{alignSelf:'center',marginTop:constants.vh(100)}}>
                <View style={[styles.text_beginContainer,{width:constants.DesignWidth-constants.vw(40), height:constants.vh(40)}]}>
                    <Text style={styles.formatted_text}>Enter Verification Code</Text>
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={styles.header}>

                        <View style={[{width:constants.DesignWidth-constants.vw(40), height:constants.vh(50)}]}>
                            <Text style={styles.text_begin}>{'We have sent a verification code to your mobile number '+props.auth.registerMobile+', Please enter the same.'}</Text>
                        </View>
                        <View style={{backgroundColor:constants.Colors.color_WHITE,padding:10,borderRadius:20,marginTop:constants.vh(30)}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box1Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    secureTextEntry={true}
                                    onSubmitEditing={() => box2Ref.current.focus()}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    onChange={({ nativeEvent }) => nativeEvent.text.length==1? box2Ref.current.focus():null}
                                    value={state.box1}
                                    onChangeText={(text) => {
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box1: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>

                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box2Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    onSubmitEditing={() => box2Ref.current.focus()}
                                    secureTextEntry={true}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    onChange={({ nativeEvent }) => nativeEvent.text.length==1? box3Ref.current.focus():null}
                                    value={state.box2}
                                    onChangeText={(text) => {
                                        if(text === ""){
                                            box1Ref.current.focus()
                                        }
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box2: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>
                                
                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box3Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    secureTextEntry={true}
                                    onSubmitEditing={() => box2Ref.current.focus()}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    onChange={({ nativeEvent }) => nativeEvent.text.length==1? box4Ref.current.focus():null}
                                    value={state.box3}
                                    onChangeText={(text) => {
                                        if(text === ""){
                                            box2Ref.current.focus()
                                        }
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box3: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>

                                <View style={styles.OTPBoxes}>
                                    <TextInput
                                    ref={box4Ref}
                                    style={styles.textinput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    returnKeyType="next"
                                    onSubmitEditing={() => box4Ref.current.focus()}
                                    secureTextEntry={true}
                                    // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
                                    //onChange={({ nativeEvent }) => nativeEvent.text.length==1? box4Ref.current.focus():null}
                                    value={state.box4}
                                    onChangeText={(text) => {
                                        console.log("text", text)
                                        if(text === ""){
                                            box3Ref.current.focus()
                                        }
                                        let isNumber = isNaN(Number(text));
                                        if (!isNumber) {
                                          setState({ ...state, box4: text });
                                        } else {
                                        }
                                    }}
                                    />
                                </View>
                            </View>
                            <View>
                                <LayoutButton  onPress={()=> otpHandle()} title={"Proceed"}/>
                            </View>
                        </View>
                </View>
            </ScrollView>
            </KeyboardAwareScrollView>
            <ProgressView
                isProgress={props.indicator}
                title={constants.progressMessages.Login}
            />
        </SafeAreaView>
    );
};


function mapDispatchToProps(dispatch) {
    return ({
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

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.Colors.color_auth_bg,
    },
    crossContainer: {
        alignSelf: 'flex-end',
        right: vw(10),
        padding: vw(10)
    },
    crossImg: {
        height: (Platform.OS === 'android' ? vw(35) : vw(35)),
        width: vw(35),
        borderRadius:vw(17)
    },
    bg_top: {
        width: '100%',
        height: 323
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    submit_button: {
        marginTop: vh(110),
        alignSelf: 'center'
    },
    footer: {
        flex: 3,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_beginContainer: {
        width: (Platform.OS === 'ios' ? vw(300) : vw(315)),
        height: vh(60),
        alignSelf: 'center',
        marginTop: constants.vh(30),
        marginBottom: constants.vh(30),
    },
    text_begin: {
        color: constants.Colors.color_47474d,
        fontSize: 16,
        fontFamily: constants.fonts.Cardo_Regular,
        textAlign: 'center',
        lineHeight:20
    },
    formatted_text: {
        color: constants.Colors.color_theme,
        fontSize: 25,
        fontFamily: constants.fonts.Cardo_Italic,
        textAlign: 'center',
        lineHeight:20,
        padding:10
    },
    OPTcontainer: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    textInputContainer: {
        alignSelf: 'center',
        paddingTop: vh(29),
    },
    textinput: { 
        borderRadius: 0,
        borderBottomWidth:3,
        height: vh(70),
        width: vw(50),
        fontSize: vh(28), 
        textAlign: 'center',
        borderColor: constants.Colors.color_e6e5e5 
    },
    OTPBoxes: {padding:5}
});
