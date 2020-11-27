import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Material from 'react-native-vector-icons/MaterialIcons';
import constants from '../constants';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    imageContainer:{
        width:constants.vw(100),
        height:constants.vw(100),
        resizeMode:'contain'
    }
});


const EmptyBox = (props) => {
        return (  
                <View style={{flex:1,alignItems: 'center', justifyContent: 'center',width:'100%', borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
                    <Image source={props.imageUrl} style={styles.imageContainer}/>
                    <Text style={{ fontFamily:constants.fonts.Cardo_Bold,fontSize: 18,textAlign:'center' }}>{props.mainHeading}</Text>
                    <Text style={{ fontFamily:constants.fonts.Cardo_Bold,fontSize: 16,textAlign:'center' }}>{props.subHeading}</Text>
                    
                    <View style={{marginTop:15,width:100,alignSelf:'center',width:constants.vw(150)}}>
                    <TouchableOpacity {...props} style={{backgroundColor:constants.Colors.color_menuTabHigh,borderRadius:3,padding:7}}>
                        <Text style={{ fontFamily:constants.fonts.Cardo_Bold,fontSize: 18,textAlign:'center',color:constants.Colors.color_WHITE }}>{props.button_title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

}


function mapDispatchToProps(dispatch){
    return({
        dispatch
    })
}

function mapStateToProps(state) {
    let indicator = state.indicator;
    let error = state.error;
    return {
        indicator,error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptyBox);