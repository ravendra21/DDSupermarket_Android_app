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
    Platform
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
import { updateUserDetail } from "../../lib/auth"
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons'
import {LocalizationContext} from '../../services/localization/LocalizationContext'
import {LayoutButton} from '../../components/button'
import {PrimaryTextInput,PostTextInput} from '../../components/textInputs'
//import ImagePicker from 'react-native-image-crop-picker'
import UserProfileImage from '../../components/UserProfileImage'
import {profileUrl} from '../../constants/url'
import Icon from 'react-native-vector-icons/FontAwesome'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

function EditProfile(props){
    const {translations} = useContext(LocalizationContext);
    const [data, setData] = React.useState({
            selectedImage:'',
            email:props.auth.user.email,
            address:'',
            mobile:props.auth.user.mobile,
            first_name:props.auth.user.first_name,
            last_name:props.auth.user.last_name,
            profile_image:props.auth.user.image,
    });
    
    const setUserData=(type,val)=>{
        //console.log("on change text ",type,val);
        if(type == "email"){
            setData({
                ...data,
                email: val,
            })
        }

        if(type == "address"){
            setData({
                ...data,
                address: val,
            })
        }

        if(type == "first_name"){
            setData({
                ...data,
                first_name: val,
            })
        }

        if(type == "last_name"){
            setData({
                ...data,
                last_name: val,
            })
        }

        // setData({
        //     ...data,
        //     mobile: props.auth.user.mobile,
        // })
    }

    // const selectUploadImage=()=>{
    //    ImagePicker.openPicker({
    //         mediaType: 'photo',
    //         cropping: true,
    //         multiple: false
    //     }).then(images => {
    //         console.log("upload group pic",images);
    //           setData({
    //             ...data,
    //             selectedImage: images,
    //             profile_image:''
    //         })
    //     });
    // }


    const saveProfileImage=()=>{
        console.log("saving data",data);
        if(data.email != "" && data.address!="" && data.first_name != "" && data.last_name != ""){
            Keyboard.dismiss();
            props.dispatch(updateUserDetail(data));
        }else{
            showAlertDialog("Please fill all detials.");
        }
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
                    <View style={{width:'100%',alignSelf:"center",backgroundColor:constants.Colors.color_WHITE,paddingBottom:10}}>
                        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
                            <View
                              style={{
                                backgroundColor: '#fff',
                                width: "100%",
                                borderRadius:10,
                                paddingBottom:constants.vh(20),
                                paddingTop:constants.vh(20),
                                justifyContent:'center',
                                alignItems:'center'
                                
                              }} 
                            >   
                                
                                    <View style={styles.touchContainer}>
                                        { data.selectedImage =="" ?(data.profile_image ==""?<Material name={"account"} color={constants.Colors.color_menuTabHigh} size={constants.vw(70)}/>:<Image 
                                                source={{ uri: profileUrl+data.profile_image}} 
                                                style={styles.userImage} 
                                            />) :(
                                            <Image 
                                                source={{ uri:data.selectedImage.path}} 
                                                style={styles.userImage} 
                                            />)
                                        }
                                    </View>
                                
                                <View style={styles.addPrfile}>
                                    <TouchableOpacity onPress={()=>{selectUploadImage()}}>
                                        <Icon name={"plus-circle"} size={25} color={constants.Colors.color_menuTabHigh}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.labelConatainer}>
                            <PrimaryTextInput  
                                placeholder="Enter First Name"
                                onChangeText={(text)=>setUserData( "first_name",text )}
                                keyboardType={"email-address"}
                                value={data.first_name}
                            />

                            <PrimaryTextInput  
                                placeholder="Enter Last Name"
                                onChangeText={(text)=>setUserData( "last_name",text )}
                                keyboardType={"email-address"}
                                value={data.last_name}
                            />

                            <PrimaryTextInput  
                                placeholder="Enter Email"
                                onChangeText={(text)=>setUserData( "email",text )}
                                keyboardType={"email-address"}
                                value={data.email}
                            />

                            <PrimaryTextInput
                                placeholder="Enter Mobile Number"
                                editable={false}
                                value={props.auth.user.mobile}
                            />

                            <PrimaryTextInput
                                placeholder="Enter Address"
                                onChangeText={(text)=>setUserData( "address",text )}
                                value={data.address}
                            />
                        </View>
                        <LayoutButton title={translations.save} onPress={()=>saveProfileImage()}/>
                    </View>
	            </ScrollView>
	    </KeyboardAwareScrollView>
        <ProgressView 
            isProgress={props.indicator} 
            title={translations.updating}
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
    goldenOutline:{
        borderRadius:10,
        borderColor:constants.Colors.color_golden_form,
        borderWidth:2,
        marginTop:10
    },
    touchContainer:{
        width:constants.vw(110),
        height:constants.vw(110),
        borderWidth:2,
        borderColor:constants.Colors.color_menuTabHigh,
        borderRadius:constants.vw(60),
        alignItems:'center',
        backgroundColor:"white",
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    userImage:{
        width:constants.vw(100),
        height:constants.vw(100),
        borderRadius:constants.vw(50)
    },
    addPrfile:{marginTop:-20,marginLeft:50,width:25,height:25,alignItems:'center',justifyContent:'center',backgroundColor:constants.Colors.color_WHITE,borderRadius:25/2}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);