import React,{useContext} from 'react';
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
    Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import {TextScreenHeader,HtmlContainer} from '../../components/textInputs';
import constants from "../../constants";
import {organic_comp} from "../../constants/url";
import {showAlertDialog} from "../../constants/Utils";
import {navigateWithOutParams,navigate} from '../../navigation/NavigationServices'
import {ProgressView} from '../../components/loader';
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons';
import {LocalizationContext} from '../../services/localization/LocalizationContext';
import ErrorBox from '../../components/ErrorBox'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

function ViewNotification(props){
    const {translations} = useContext(LocalizationContext);
    const [data, setData] = React.useState({
        page_no:0,
        byDefaultApiCall:false,
    });

    const renderReadMore = () => {
        console.log(props.route.params)
        let userNotifications = props.data.user_notification;

        if(userNotifications.length >  0){
            let getSingleItem = userNotifications.filter(item=> (props.route.params.notificationId == item.id ));
            return(
                <View style={{alignSelf:'center',width:constants.width*0.95}}>
                    <View>
                        <Image style={styles.symptomsImage} source={{ uri:getSingleItem[0].image_url}} />
                    </View>
                        
                    <View style={{paddingLeft:10,paddingRight:10,width:constants.width*0.9,marginTop:constants.vw(10)}}>
                        <Text style={{fontSize:constants.vw(18),marginBottom:5,color:constants.Colors.color_intro,fontFamily:constants.fonts.Cardo_Bold}}>{getSingleItem[0].title}</Text>
                    </View>

                    <View style={{paddingLeft:10,paddingRight:10,width:constants.width*0.9,marginTop:constants.vw(6)}}>
                        {/*<Text style={{fontSize:20,marginTop:5}}>{getSingleItem[0].message}</Text>*/}
                        <HtmlContainer description={getSingleItem[0].message}/>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={{justifyContent:'center',alignItems:'center',height:constants.height*0.7}}>
                    <ErrorBox errorMessage={"Something went wrong,Please try again."} onPress={()=>{props.navigation.goBack()}}/>
                </View>
            )
        }
        
    }

    
	return(
		<SafeAreaView style={styles.container}>
		      <KeyboardAwareScrollView 
		      		keyboardShouldPersistTaps={'handled'}
		      		extraScrollHeight={140}
		      		enableOnAndroid={true}
	     	 	>
                <StatusBar translucent backgroundColor="transparent" />
	            <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={[styles.labelConatainer]}>
	                       {renderReadMore()}
	                </View>
	            </ScrollView>
	    </KeyboardAwareScrollView>
        
        <ProgressView
            isProgress={props.indicator}
            title={translations.fetching}
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
        width: '100%',
        alignSelf: 'center',
    },
    symptomsImage:{
        alignSelf:'center',
        width:constants.width,
        height:constants.width,
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
    let data = state.data;
    return {
        auth,indicator,data
};
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewNotification);