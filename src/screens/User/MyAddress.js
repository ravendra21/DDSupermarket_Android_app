import React,{useContext} from 'react';
import {View,Text, StyleSheet ,StatusBar,Alert,FlatList,SafeAreaView,ScrollView,Keyboard,TextInput,
    TouchableOpacity,Image,Platform,Modal,
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
import {PrimaryTextInput,PostTextInput,SquareTextInput} from '../../components/textInputs'
//import ImagePicker from 'react-native-image-crop-picker'
import UserProfileImage from '../../components/UserProfileImage'
import {profileUrl} from '../../constants/url'
import Icon from 'react-native-vector-icons/FontAwesome'

function MyAddress(props){
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
    const [modalVisible, setModalVisible] = React.useState(false);
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

    const addressFormFiled=()=>{
        return(
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
                            <Text style={styles.textStyle}>Add new address</Text>
                            <TouchableOpacity
                              style={{ ...styles.openButton}}
                              onPress={() => {
                                setModalVisible(!modalVisible);
                              }}
                            >
                                <Icon name={'close'} size={20} color={constants.Colors.color_grey}/>
                            </TouchableOpacity>
                        </View>
                            <ScrollView keyboardShouldPersistTaps={'handled'}>
                                <View style={styles.labelConatainer}>
                                    <SquareTextInput
                                        title="Contact Name"
                                        onChangeText={(text)=>setUserData( "first_name",text )}
                                        keyboardType={"email-address"}
                                        value={data.first_name}
                                    />

                                    <SquareTextInput  
                                        title="Mobile Numer"
                                        onChangeText={(text)=>setUserData( "last_name",text )}
                                        keyboardType={"email-address"}
                                        value={data.last_name}
                                    />

                                    <SquareTextInput  
                                        title="House No"
                                        onChangeText={(text)=>setUserData( "email",text )}
                                        keyboardType={"email-address"}
                                        value={data.email}
                                    />

                                    <SquareTextInput
                                        title="Address"
                                        onChangeText={(text)=>setUserData( "address",text )}
                                        value={data.address}
                                    />
                                </View>
                                <LayoutButton title={translations.save} onPress={()=>saveProfileImage()}/>
                            </ScrollView>
                      </View>
                    </View>
                  </Modal>
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
                    {addressFormFiled()}
                    <View style={{width:'100%',alignSelf:"center",backgroundColor:constants.Colors.color_WHITE,paddingBottom:10}}>
                        <View style={styles.labelConatainer}>
                            <TouchableOpacity style={{flexDirection:'row',borderWidth:1,borderRadius:10,borderColor:constants.Colors.color_theme,padding:10}} onPress={()=>setModalVisible(true)}>
                                <Icon name={"plus"} size={20} color={constants.Colors.color_drwaerIcon} style={{paddingTop:5}}/>
                                <Text style={{...styles.label,paddingLeft:10}}>Add New Address</Text>
                            </TouchableOpacity>
                        </View>
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
        width: '95%',
        alignSelf: 'center',
    },
    label:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:20,
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

normalText:{
    fontFamily:constants.fonts.Cardo_Bold,
    fontSize:20,
    color:constants.Colors.color_grey,
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);