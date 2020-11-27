import React,{Component} from 'react'
import {View ,Text,StyleSheet,Image ,Dimensions,SafeAreaView,Keyboard,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import constants from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const width = Dimensions.get('window').width;
export default function OrderSuccuess(props){
        return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                <KeyboardAwareScrollView 
                    keyboardShouldPersistTaps={'handled'}
                    extraScrollHeight={140}
                    enableOnAndroid={true}
                >
                <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',marginTop:constants.height*0.2}}>
                    <View style={{marginTop:constants.vw(20)}}>
                        <Text style={styles.text}>Your Order was succesfully</Text>
                        <Text style={styles.text}>submitted</Text>
                    </View>

                    <View style={{marginTop:constants.vw(40)}}>
                        <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>props.navigation.navigate("HomeScreen")}>
                            <Text style={{color:constants.Colors.color_intro,fontSize:constants.vw(25),fontFamily:constants.fonts.Cardo_Bold}}>Back to main Menu</Text>
                        </TouchableOpacity>
                    </View>
                    

                    <View style={{flex: 1,justifyContent: 'flex-end',marginBottom:constants.vw(20)}}>
                        <Text style={styles.infoText}>Please write to us at</Text>
                        <Text style={styles.infoText}>info@farmstop.in for any queries</Text>     
                    </View>
                </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.color_WHITE,
    },
    inputBox:{
        marginTop:20
    },
    text:{
        alignSelf:'center',
        fontSize:constants.vw(20),
        fontFamily:constants.fonts.Cardo_Bold,
        color:constants.Colors.color_theme,
    },
    infoText:{
        alignSelf:'center',
        fontSize:constants.vw(20),
        fontFamily:constants.fonts.Cardo_Bold,
        color:'red'
    }

});