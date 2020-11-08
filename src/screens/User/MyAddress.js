import React,{useContext} from 'react';
import {View,Text, StyleSheet ,StatusBar,Alert,FlatList,SafeAreaView,ScrollView,Keyboard,TextInput,
    TouchableOpacity,Image,Platform,Modal,ToastAndroid
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
import {addNewAddress, getAddress,removeAddress }from "../../lib/data"
import SingleRowImagSkeltons from '../../components/skeltons/SingleRowImagSkeltons'
import {LocalizationContext} from '../../services/localization/LocalizationContext'
import {LayoutButton,IconBtn,AddressMenuOption} from '../../components/button'
import {PrimaryTextInput,PostTextInput,SquareTextInput} from '../../components/textInputs'
//import ImagePicker from 'react-native-image-crop-picker'
import UserProfileImage from '../../components/UserProfileImage'
import {profileUrl} from '../../constants/url'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
const { SlideInMenu,Popover } = renderers;


function MyAddress(props){
    const {translations} = useContext(LocalizationContext);
    const [data, setData] = React.useState({
        selectedImage:'',
        email:props.auth.user.email,
        address:'',
        mobile:'',
        name:'',
        district:'',
        State:'',
        pincode:'',
        address_id:0,
        defaultApicCalled:false,
        indicatorLabel:'Fetching',
    });


    React.useEffect(() => {

        if(data.defaultApicCalled == false){
            props.dispatch(getAddress());
            setData({
                ...data,
                defaultApicCalled: true,
            });
        }

      });

    const [modalVisible, setModalVisible] = React.useState(false);

    const setUserData=(type,val)=>{
        //console.log("on change text ",type,val);
        // if(type == "email"){
        //     setData({
        //         ...data,
        //         email: val,
        //     })
        // }

        if(type == "district"){
            setData({
                ...data,
                district: val,
            })
        }

        if(type == "State"){
            setData({
                ...data,
                State: val,
            })
        }

        if(type == "pincode"){
            setData({
                ...data,
                pincode: val,
            })
        }

        if(type == "address"){
            setData({
                ...data,
                address: val,
            })
        }

        if(type == "name"){
            setData({
                ...data,
                name: val,
            })
        }

        if(type == "mobile"){
            setData({
                ...data,
                mobile:val,
            })
        }
    }

    const saveAddress=()=>{
        let {mobile,name, address} = data;
        if(mobile =="" && name=="" && address==""){
            //console.log("Please fill all filed")
        }else{
            
            setData({
                ...data,
                indicatorLabel:"Saving"
            });

            Keyboard.dismiss();
            props.dispatch(addNewAddress(data));
        }
    }

    const messageRender =()=>{
        if(props.error.err =="address saved"){
            ToastAndroid.showWithGravity(
                "Your Address Successfully saved.",
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            // setModalVisible(true);
            props.dispatch({type:"REMOVE_ERROR"});
            // setData({
            //     ...data,
            //     address:'',
            //     mobile:'',
            //     name:'',
            //     district:'',
            //     State:'',
            //     pincode:'',
            //     address_id:0,
            // });
        }
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
                                        onChangeText={(text)=>setUserData( "name",text )}
                                        value={data.name}
                                    />

                                    <SquareTextInput  
                                        title="Mobile Numer"
                                        onChangeText={(text)=>setUserData( "mobile",text )}
                                        keyboardType={"phone-pad"}
                                        value={data.mobile}
                                    />

                                    <SquareTextInput
                                        title="district"
                                        onChangeText={(text)=>setUserData( "district",text )}
                                        value={data.district}
                                    />

                                    <SquareTextInput  
                                        title="State"
                                        onChangeText={(text)=>setUserData( "State",text )}
                                        value={data.State}
                                    />

                                    <SquareTextInput  
                                        title="Pincode"
                                        onChangeText={(text)=>setUserData( "pincode",text )}
                                        keyboardType={"numeric"}
                                        value={data.pincode}
                                    />

                                    <View style={{marginTop:10}}>
                                    <Text style={{color: constants.Colors.color_BLACK,fontFamily: constants.fonts.Cardo_Regular,fontSize: 14}}>Address</Text>
                                    <TextInput
                                        style={styles.textArea}
                                        title="Address"
                                        onChangeText={(text)=>setUserData( "address",text )}
                                        value={data.address}
                                        numberOfLines={4}
                                        multiline={true}
                                    />
                                    </View>                                    
                                </View>
                                <LayoutButton title={translations.save} onPress={()=>saveAddress()}/>
                            </ScrollView>
                            <ProgressView 
                                isProgress={props.indicator} 
                                title={data.indicatorLabel}
                            />
                      </View>
                    </View>
                  </Modal>
        )
    }

    const remove=(addressId)=>{
        setData({
            ...data,
            indicatorLabel:"Removing"
        });
        props.dispatch(removeAddress({address_id:addressId}));
    }

    const editAddress=(addressId)=>{
        let editingAddress = props.data.addressList.find(item=>item.id == addressId);
        console.log(editingAddress,props.data.addressList );
        setData({
            address:editingAddress.address,
            mobile:editingAddress.contactMobile,
            name:editingAddress.contactName,
            district:editingAddress.district,
            State:editingAddress.state,
            pincode:editingAddress.zipcode,
            address_id:addressId,
            indicatorLabel:"Editing"
        });
        setModalVisible(true);
    }

    const renderAddressList=()=>{
        let addressList = props.data.addressList;

        if(addressList.length >0){
            return(
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={addressList}
                    renderItem={({ item }) => (
                        <View style={{width:constants.width*0.95,borderWidth:1,borderRadius:10,padding:20,marginTop:10,borderColor:constants.Colors.color_theme}}>
                            <View style={{position:'absolute',top:3,right:2,zIndex:2}}>
                                        <Menu renderer={Popover} >
                                            <MenuTrigger>
                                                <View style={{borderRadius:12,borderColor:constants.Colors.color_threeDot,borderWidth:1,width:24,height:24,justifyContent:'center',alignItems:'center'}}>
                                                <Icons name={'dots-vertical'} size={20} color={constants.Colors.color_theme}/>
                                                </View>
                                            </MenuTrigger>
                                            <MenuOptions style={{width:constants.width*0.5,padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                                                <MenuOption {...props} style={{flexDirection:'row'}} {...props} onSelect={()=>editAddress(item.id)}>
                                                    <Text style={{...styles.dropOpt,color:constants.Colors.color_theme}}>Edit</Text>
                                                </MenuOption>
                                                <MenuOption {...props} style={{flexDirection:'row'}} onSelect={()=>remove(item.id)}>
                                                    <Text style={{...styles.dropOpt,color:constants.Colors.color_theme}}>Remove</Text>
                                                </MenuOption>
                                            </MenuOptions>
                                        </Menu>
                            </View>
                            <Text style={styles.label}>{item.contactName}</Text>
                            <Text style={styles.label}>{item.contactMobile}</Text>
                            <Text style={styles.label}>{item.district+","+item.state+","+item.zipcode}</Text>
                            <Text style={styles.label}>{item.address}</Text>
                        </View>
                    )}
                    
                    numColumns={1}
                    keyExtractor={(item) => item.id}
                />
            )
        }else{
            return(
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:18}}>No found any address</Text>
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
	        	<StatusBar backgroundColor={constants.Colors.color_statusbar} barStyle="dark-content"/>
	            <ScrollView keyboardShouldPersistTaps={'handled'}>
                    {addressFormFiled()}
                    <View style={{width:'100%',alignSelf:"center",backgroundColor:constants.Colors.color_WHITE,paddingBottom:10}}>
                        <View style={styles.labelConatainer}>
                            <IconBtn title={"Add New Address"} onPress={()=>setModalVisible(true)}/>
                        </View>
                        <View style={styles.labelConatainer}>
                            {renderAddressList()}
                        </View>
                    </View>
	            </ScrollView>
	    </KeyboardAwareScrollView>
        {messageRender()}
        <ProgressView
            isProgress={props.indicator} 
            title={data.indicatorLabel}
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
            fontSize:16,
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        fontFamily: constants.fonts.Cardo_Regular,
        color:'black',
        borderWidth:1,
        borderColor:constants.Colors.color_BLACK,
        borderRadius:10
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);