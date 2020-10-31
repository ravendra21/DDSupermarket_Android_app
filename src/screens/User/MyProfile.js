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
import Octicons from 'react-native-vector-icons/Octicons'

function MyProfile(props){
    const {translations} = useContext(LocalizationContext);
    const [data, setData] = React.useState({
            selectedImages:'',
    });


    const selectUploadImage=()=>{
       ImagePicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            multiple: false
        }).then(images => {
            console.log("upload group pic",images);
              setData({
                ...data,
                selectedImages: images,
            })
        });
    }

    const profileContent=()=>{
        return(
        <View>
            <View style={{position:"absolute",right:10,top:20}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate(constants.Screens.EditProfile.name)}}>
                    <Icon name={"edit"} size={25} color={constants.Colors.color_WHITE}/>
                </TouchableOpacity>
            </View>
            
            <View style={{...styles.labelConatainer,flexDirection:'row'}}>
                <View style={{marginTop:20}}>
                    <UserProfileImage/>
                </View>
                <View style={{paddingTop:constants.vw(20),paddingLeft:constants.vw(40),justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={styles.userName}>Hello ! {(props.auth.user.first_name != null && props.auth.user.first_name != "" ? props.auth.user.first_name+" "+props.auth.user.last_name : translations.user)}</Text>
                        {/*<Text style={styles.userName}>Edit Profile</Text>*/}
                    </View>
                </View>
                <View style={styles.labelConatainer}>
                    <Text style={{...styles.userName}}>{'Total Area - 0 Hectres'}</Text>
                </View>
                <View style={{...styles.labelConatainer,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <Text style={styles.userName}>{"Followers"}</Text>
                        <Text style={styles.userName}>{"0"}</Text>
                    </View>

                    <View>
                        <Text style={styles.userName}>{"Following"}</Text>
                        <Text style={styles.userName}>{"0"}</Text>
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

	        	<StatusBar backgroundColor={constants.Colors.color_heading} barStyle="dark-content"/>
                
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
                        
                        <TouchableOpacity style={styles.menuTab} >
                            <View style={{flexDirection:'row'}}>
                                <Icon name={"th"} size={28}/>
                                <Text style={[styles.MenueLable]}>{translations.my_farms}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuTab} >
                            <View style={{flexDirection:'row'}}>
                                <Octicons name={"tasklist"} size={28}/>
                                <Text style={[styles.MenueLable]}>{translations.my_task}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuTab} >
                            <View style={{flexDirection:'row'}}>
                                <Icon name={"calendar-check-o"} size={28}/>
                                <Text style={[styles.MenueLable]}>{translations.my_schedule}</Text>
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
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vh(22),
        color:constants.Colors.color_WHITE,
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
        backgroundColor:'rgba(105,103,102,0.5)',
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