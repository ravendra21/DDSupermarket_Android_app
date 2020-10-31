import React from 'react';
import {
    View, 
    Text, 
    StyleSheet ,
    StatusBar,
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



function ContactUs(props){
    const [data, setData] = React.useState({
        waeatherApi:false,
        prodCatApi:false,
    });
    
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView 
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={140}
                enableOnAndroid={true}
            >
                <StatusBar backgroundColor={constants.Colors.color_heading} barStyle="dark-content"/>
                <View style={{marginLeft:constants.vh(10),marginTop:constants.vh(4)}}>
                    <TextScreenHeader title="Contact Us"/>
                </View>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={[styles.labelConatainer]}>
                        <Image source={constants.image.contactus} style={{width:constants.vw(340),height:constants.vw(200),alignSelf:'center'}}/>
                    </View>
                    <View style={{width:'90%',alignSelf:'center',marginTop:constants.vw(40)}}>
                        <Text style={styles.text}>
                            Write to us at
                        </Text>
                        <Text style={styles.text}>
                            info@farmer.in
                        </Text>
                        <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:constants.vw(20),marginTop:constants.vw(10),marginBottom:constants.vw(10)}}>
                            Or
                        </Text>
                        <Text style={styles.text}>
                            Call us on 
                        </Text>
                        <Text style={styles.text}>
                            +91 8123018988
                        </Text>
                    </View>
                </ScrollView>
        </KeyboardAwareScrollView>
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
        width: '85%',
        alignSelf: 'center'
    },
    text_begin: {
        color: constants.Colors.color_161758,
        fontWeight: 'bold',
        fontSize: 28,
        fontFamily: constants.fonts.FUTURASTD_BOLD
    },
    text:{
        fontSize:constants.vw(20),
        fontFamily:constants.fonts.Cardo_Bold
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);