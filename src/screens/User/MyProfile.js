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
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    ImageBackground
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import {TextScreenHeader} from '../../components/textInputs'
import constants from "../../constants"
import {prod_cat_image} from "../../constants/url"
import {showAlertDialog} from "../../constants/Utils"
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import {ProgressView} from '../../components/loader'
import { getProdcutCat } from "../../lib/data"
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons'
import {LocalizationContext} from '../../services/localization/LocalizationContext'
import {PrimaryButton} from '../../components/button'
import {PrimaryTextInput,PostTextInput} from '../../components/textInputs'
import {profileUrl} from '../../constants/url'
import UserProfileImage from '../../components/UserProfileImage'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

function MyProfile(props){
    const {translations} = useContext(LocalizationContext);
    const [data, setData] = React.useState({
            selectedImages:'',
    });

    const profileContent=()=>{
        return(
            <View>
                <View style={{position:"absolute",right:10,top:20}}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate(constants.Screens.EditProfile.name)}}>
                        <Icon name={"edit"} size={25} color={constants.Colors.color_theme}/>
                    </TouchableOpacity>
                </View>
                
                <View style={{...styles.labelConatainer}}>
                    <View style={{marginTop:20}}>
                        <UserProfileImage/>
                    </View>
                    <View style={{paddingTop:constants.vw(20),justifyContent: 'center',alignItems: 'center',marginBottom:20}}>
                        <Text style={styles.userName}>Hello ! {(props.auth.user.first_name != null && props.auth.user.first_name != "" ? props.auth.user.first_name+" "+props.auth.user.last_name : 'User')}</Text>
                        <Text style={{...styles.userName,fontSize:constants.vw(16)}}>{(props.auth.user.email != '' ? props.auth.user.email: 'Not available email')}</Text>
                        <Text style={{...styles.userName,fontSize:constants.vw(16)}}>{(props.auth.user.mobile != '' ? props.auth.user.mobile: 'Not available mobile')}</Text>
                    </View>
                </View>
            </View>
        )
    }

	return(
		<SafeAreaView style={styles.container}>
		       <KeyboardAwareScrollView 
		      		keyboardShouldPersistTaps={'handled'}
		      		extraScrollHeight={140}
		      		enableOnAndroid={true}
	     	 	>

	        	<StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
                
	            <ScrollView keyboardShouldPersistTaps={'handled'}>
                    {/*<View style={{backgroundColor:constants.Colors.colors_sliderProfileSec,paddingTop:constants.vw(10),paddingBottom:constants.vw(20)}}>
                                                                {profileContent()}
                                        </View>*/}

                    {/*<ImageBackground source={{ uri: (profileUrl+props.auth.user.image)}} resizeMode='cover' style={styles.imageBackgroundConatiner}>
                                            {profileContent()}
                                        </ImageBackground>*/}
                    {
                    props.auth.user.image !=""?(
                    <ImageBackground
                        source={{ uri: (profileUrl+props.auth.user.image)}}
                        style={styles.container}>
                            <View style={styles.overlay}>
                            {profileContent()}
                            {/*<Text style = {[styles.textStyle, {paddingTop: 10}]} >My Account</Text>
                                                        <Image source= {{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOVTmb0ILbDI6ggGhPKUkn3v4UKc2dNB-Kjng7aGM14UbvzKY'}}
                                                            style={styles.avatarStyle}/>
                                                        <Text style = {styles.textStyle} > Jenifer Lawrance</Text>
                                                        <Text style = {styles.textStyle} > +14155552671</Text>*/}
                            </View>
                    </ImageBackground>):(<View style={{backgroundColor:constants.Colors.colors_sliderProfileSec,paddingTop:constants.vw(10),paddingBottom:constants.vw(20)}}>
                                                                {profileContent()}
                                        </View>)
                    }

                    <View style={{...styles.labelConatainer,width:"95%",marginTop:constants.vh(20)}}>
                        
                        <TouchableOpacity style={styles.menuTab} onPress={()=>{props.navigation.navigate(constants.Screens.OrderList.name)}}>
                            <View style={{flexDirection:'row'}}>
                                <Material name={"clipboard-list-outline"} size={25} color={constants.Colors.color_drwaerIcon}/>
                                <Text style={[styles.MenueLable]}>My Orders</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuTab} onPress={()=>{props.navigation.navigate("WishProductList1")}}>
                            <View style={{flexDirection:'row'}}>
                                <Material name={"heart"} size={25} color={constants.Colors.color_drwaerIcon}/>
                                <Text style={[styles.MenueLable]}>My WishList</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuTab} onPress={()=>{props.navigation.navigate(constants.Screens.MyAddress.name,{screen_name:'MyAddress'})}}>
                            <View style={{flexDirection:'row'}}>
                                <MaterialIcon name={"location-on"} size={23} color={constants.Colors.color_drwaerIcon}/>
                                <Text style={[styles.MenueLable]}>My Address </Text>
                            </View>
                        </TouchableOpacity>
                        
	                </View>

	            </ScrollView>
	    </KeyboardAwareScrollView>
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
      
    },
    labelConatainer: {
        flex:1,
        paddingTop:6,
        width: '85%',
        alignSelf: 'center',
    },
    skeltons:{
        width:'90%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:constants.vh(20),
    },
    userName:{
        textAlign:'center',
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vh(22),
        color:constants.Colors.color_theme,
    },
    MenueLable: {
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(18),
        paddingLeft:10,
    },
    menuTab:{
        width:'40%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:2,
        padding:5,
    },
    imageBackgroundConatiner: {
        justifyContent: "center",
        width: constants.width,
        height: constants.height/3,
        paddingTop:constants.vw(10),paddingBottom:constants.vw(20),
      },

    overlay: {
        backgroundColor:'rgba(229,84,84,0.2)',
    },
    avatarStyle: {
        width:100, 
        height: 100,
        marginTop: 10,
        borderRadius: 50,
        alignSelf: 'center',
    },
    textStyle: {
        marginTop: 10,
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    balanceContainer:{
        padding:10,
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
    return {
        auth,indicator,data
};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);