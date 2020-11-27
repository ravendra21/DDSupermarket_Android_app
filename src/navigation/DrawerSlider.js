import React, {useContext} from 'react';
import { 
    View, 
    Text, 
    StyleSheet ,
    StatusBar,
    Alert,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import constants from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { logout } from "../lib/auth";
import {LocalizationContext} from '../services/localization/LocalizationContext';
import UserProfileImage from '../components/UserProfileImage'

function DrawerSlider(props){
    
    const {translations} = useContext(LocalizationContext);

    const [data, setData] = React.useState({
        selectedMenu: '',
    });

    const pressed = (screen) => {
        setData({
            ...data,
            selectedMenu: screen,
        })
    }

{/*
    const profileRender=()=>{

        return(
            <View style={{marginTop:20}}>
                            <TouchableOpacity style={{width:constants.vw(100),height:constants.vw(100),paddingTop:constants.vw(20),borderWidth:0,borderRadius:constants.vw(60),alignItems:'center',backgroundColor:"white",alignSelf:'center'}}>
                                { props.auth.user.image =="" || props.auth.user.image == null?(<Material name={"account"} color={constants.Colors.color_menuTabHigh} size={constants.vw(70)}/>) :(
                                      <Image 
                                        source={{ uri: props.auth.user.image}} 
                                        style={{width:constants.vw(100),height:constants.vw(100), borderRadius:constants.vw(50)}} 
                                    />)
                                }
                            </TouchableOpacity>
                        </View>
            <UserProfileImage/>
        )
    }
    */}

    const logoutAction = () => {
        props.dispatch({type : 'LOADING'});
        props.dispatch(logout());
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView 
                keyboardShouldPersistTaps={'handled'}
                extraScrollHeight={140}
                enableOnAndroid={true}
            >
                
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                {/*<ImageBackground
                    style={styles.profileContainer}
                    source={constants.image.drawerSliderBg}
                    resizeMode="stretch"
                >*/}
                <View style={styles.profileContainer}>
                    <TouchableOpacity style={[styles.menuTab]} onPress={()=>{props.navigation.navigate("HomeScreen")}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.MenueLable,{color:constants.Colors.color_WHITE}]}>{props.auth.user.mobile}</Text>
                        </View>
                    </TouchableOpacity>                
                </View>
                {/*<View style={styles.profileContainer}>
                                    {profileRender()}
                                    <View style={{marginTop:20}}>
                                        <UserProfileImage/>
                                    </View>
                                    <View style={{flex:1,marginTop:constants.vw(10),alignItems:'center'}}>
                                        <Text style={{...styles.userName,textAlign:'center'}}>{translations.hello+" ! "}{(props.auth.user.first_name != null && props.auth.user.first_name != "" ? props.auth.user.first_name+" "+props.auth.user.last_name : translations.user)}</Text>
                                        <Text style={styles.userName}>{(props.auth.user.first_name == "" || props.auth.user.last_name == "")? props.auth.user.first_name+" "+props.auth.user.last_name : translations.user}</Text>
                                    </View>
                                </View>*/}
                {/*</ImageBackground>*/}
                
                <View>
                    <TouchableOpacity style={[styles.menuTab]} onPress={()=>{props.navigation.navigate("HomeScreen")}}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name={"home"} size={25} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={[styles.MenueLable]}>Home</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuTab]} onPress={()=>{props.navigation.navigate(constants.Screens.Profile.name)}}>
                        <View style={{flexDirection:'row'}}>
                            <Material name={"account"} size={25} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={[styles.MenueLable]}>My Account</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuTab]} onPress={()=>{props.navigation.navigate(constants.Screens.OrderList.name)}}>
                        <View style={{flexDirection:'row'}}>
                            <Material name={"clipboard-list-outline"} size={25} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={[styles.MenueLable]}>My Orders</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.menuTab,data.selectedMenu =="FAQ"?styles.selectedMenu :{}]} onPress={()=>{pressed("FAQ")}}>
                        <View style={{flexDirection:'row'}}>
                            <Material name={"comment-question"} size={25} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={[styles.MenueLable,data.selectedMenu =="FAQ"?styles.selected:styles.notSelected]}>{translations.faq}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuTab,data.selectedMenu =="FAQ"?styles.selectedMenu :{}]} onPress={()=>{props.navigation.navigate("WishProductList1")}}>
                        <View style={{flexDirection:'row'}}>
                            <Material name={"heart"} size={25} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={styles.MenueLable}>My Wish</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.menuTab]} onPress={()=>{}}>
                        <View style={{flexDirection:'row'}}>
                            <Icon name={"bell"} size={23} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={[styles.MenueLable]}>Notifications</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuTab]} onPress={()=>{props.navigation.navigate(constants.Screens.MyAddress.name,{screen_name:'MyAddress'})}}>
                        <View style={{flexDirection:'row'}}>
                            <MaterialIcon name={"location-on"} size={23} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={[styles.MenueLable]}>My Addresses</Text>
                        </View>
                    </TouchableOpacity>

                    
                    <TouchableOpacity style={[styles.menuTab]} onPress={()=> {logoutAction()}}>
                        <View style={{flexDirection:'row'}}>
                            <Material name={"logout"} size={25} color={constants.Colors.color_drwaerIcon}/>
                            <Text style={[styles.MenueLable,data.selectedMenu =="Logout"?styles.selected:styles.notSelected]}>{translations.logout}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
        
            </ScrollView>
            </KeyboardAwareScrollView>
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity style={[styles.menuTab,data.selectedMenu =="Contact Us"?styles.selectedMenu :{}]} onPress={()=>{pressed("Contact Us")}}>
                    <View style={{flexDirection:'row'}}>
                        <Material name={"email"} size={30} color={data.selectedMenu == "Contact Us"?constants.Colors.color_menuTabHigh:constants.Colors.color_intro}/>
                        <Text style={[styles.MenueLable,data.selectedMenu =="Contact Us"?styles.selected:styles.notSelected]}>{translations.contact_us}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: constants.Colors.color_WHITE,
      
    },
    mainContainer: {
        paddingTop: 31,
        width: '85%', alignSelf: 'center'
    },
    MenueLable: {
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vw(18),
        paddingLeft:10,
    },
    menuTab:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:2,
        width:'95%',
        padding:5,
        marginLeft:5
    },
    selected:{
        color: constants.Colors.color_menuTabHigh,
    },
    notSelected:{
        color: constants.Colors.color_menuTab,
    },
    selectedMenu:{
        borderColor:constants.Colors.color_menuTabHigh,
        borderWidth:1,
        borderRadius:2,
        marginLeft:5,
    },
    
    userName:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:constants.vh(22),
        color:constants.Colors.color_WHITE,
    },
    profileContainer:{
        // flexDirection:"row",
        paddingBottom:constants.vw(10),
        paddingLeft:10,paddingTop:10,
        backgroundColor:constants.Colors.color_theme
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
return {
    auth,indicator
};
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerSlider);