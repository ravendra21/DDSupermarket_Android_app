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
    TouchableHighlight,
    Image,
    RefreshControl,
    Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'
import {TextScreenHeader,NotificationBlock} from '../../components/textInputs'
import constants from "../../constants"
import {groupProfile,ddenterpriseApi} from "../../constants/url"
import {showAlertDialog,fristLetterCapital} from "../../constants/Utils"
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import {ProgressView} from '../../components/loader'
import { getProdcutCat,removeUserNote } from "../../lib/data"
import {NormalRow} from '../../components/skeltons/RowSkeltons'
import {PrimaryButton} from '../../components/button'
import Icon from 'react-native-vector-icons/FontAwesome'
import ErrorBox from '../../components/ErrorBox'
import EmptyBox from '../../components/EmptyBox'

function NotificationScreen(props){
    const [data, setData] = React.useState({
        fetechDefaultGroupList:true,
        firstgetGroupList:false,
        retryRequest:false
    });

    const [refreshing, setRefreshing] = React.useState(false);
    React.useEffect(() => {
        if(data.fetechDefaultGroupList == true){
            setData({
                ...data,
                fetechDefaultGroupList: false,
            });
            getNotification(false);
        }

    });


    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        getNotification(true);
    },[refreshing]);

    const retryNotification=()=>{
        props.dispatch({type : 'LOADING'});
        getNotification(false);
    }

    const getNotification=(isOnRefresh)=>{
        if(!isOnRefresh){
            //props.dispatch({type : 'LOADING'});
        }   
        let url = ddenterpriseApi + 'api-get_notification';
        let token = props.auth.user.accessToken;
        var formData = new FormData();
        formData.append("userId", props.auth.user.id);

        let post_req = {
            method: 'POST',
            body: formData,
            headers: {
            'Content-Type': 'multipart/form-data',
             'token': token,
            }
        }
        
        console.log(url, post_req);
        fetch(url, post_req)
        .then(res =>{
            // console.log(res,"dasda");
            res.json()
            .then(response => {
                if(response.status == 1){
                    if(response.notification.length>0){
                        props.dispatch({ type : 'USER_NOTIFICATION', userNotification: response.notification });
                        //props.dispatch({type:'REMOVE_ERROR'});
                    }else{
                        props.dispatch({ type : 'USER_NOTIFICATION', userNotification: response.notification });
                        props.dispatch({ type : 'ERROR_SUBMIT', payload : "empty notification list"});
                    }

                    if(isOnRefresh){
                        setRefreshing(false);
                    }

                    setData({
                        ...data,
                        firstgetGroupList:true,
                        fetechDefaultGroupList:false,
                    })

                }else{
                    props.dispatch({ type : 'USER_NOTES', userNotes: [] });
                    
                    setData({
                        ...data,
                        firstgetGroupList:true,
                        fetechDefaultGroupList:false,
                    })
                    if(isOnRefresh){
                        setRefreshing(false);
                    }else{
                        props.dispatch({ type : 'ERROR_SUBMIT', payload : "get error in notificiation list"});
                    }
                }
            })
            .catch( err => {
                    if(isOnRefresh){
                        setRefreshing(false);
                    }else{
                        props.dispatch({ type : 'ERROR_SUBMIT', payload : "get error in notificiation list"});
                    }

                    setData({
                        ...data,
                        firstgetGroupList:true,
                        fetechDefaultGroupList:false,
                    })
            })
        })
        .catch( err => {
                setData({
                    ...data,
                    firstgetGroupList:true,
                    fetechDefaultGroupList:false,
                })
                if(isOnRefresh){
                    setRefreshing(false);
                }else{
                    props.dispatch({ type : 'ERROR_SUBMIT', payload : "get error in notificiation list"});
                }
        })
    }


    const select_lang = (val) => {
        setData({
            ...data,
            selectedLang: val,
        })
    }

    const loginHandle = (val) => {
        showAlertDialog(data.selectedLang+"=state");
        if(val != ""){
            // navigateWithOutParams(constants.Screens.OTPScreen.name);
            // console.log(generateOtp(),"otp");
            // props.dispatch(sendOTP({mobile:val,otp:generateOtp()}));
        }else{
            showAlertDialog(constants.AppConstant.fillAllFileds);
        }
    }

    const removeFromNotes =(noteid)=>{
        Alert.alert(
                    "Farmer",
                    "Do you want reomve note?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => props.dispatch(removeUserNote({userNoteId:noteid}))}
          ],
          { cancelable: false }
        );
    }

    const renderNotification = () => {
        let myNotification =  props.data.user_notification;
        if(myNotification.length >  0){
            return(
                <View>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      ListHeaderComponent={
                            <View style={{width:'102%',height:10,backgroundColor:constants.Colors.color_WHITE}}/>
                        }
                      data={myNotification}
                      renderItem={({ item }) => (
                        <NotificationBlock 
                            image_url={item.image_url} 
                            subTitle={item.title} 
                            message={item.message} date={item.date}
                            onPress={()=>props.navigation.navigate(constants.Screens.ViewNotification.name,{"notificationId":item.id})}
                        />
                      )}
                      //Setting the number of column
                      numColumns={1}
                      keyExtractor={(item) => item.id}
                    />
                </View>
            )
        }else {
            if(myNotification.length == 0 && props.error.err == "empty notification list"){
                return(
                    <View style={{justifyContent:'center',alignItems:'center',height:constants.height*0.7}}>
                        <EmptyBox 
                            imageUrl={constants.image.emptyNotes} 
                            mainHeading={"You have no notificiation!"}
                            subHeading={""}
                        />
                    </View>
                )
            }if(props.error.err == "get error in notificiation list"){
                return(
                    <View style={{justifyContent:'center',alignItems:'center',height:constants.height*0.7}}>
                        <ErrorBox errorMessage={"Something went wrong,Please try again."} onPress={()=>{retryNotification()}}/>
                    </View>
                )
            }else{
                return(
                        <View>
                            <View style={{...styles.skeltons,marginTop:0}}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>

                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>


                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>

                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>


                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>

                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>


                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>

                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>     
                                </View>
                            </View>

                            <View style={styles.skeltons}>
                                <View style={{alignItems:'center'}}>
                                    <NormalRow/>
                                </View>
                            </View>
                        </View>
                )
            }
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
                <ScrollView keyboardShouldPersistTaps={'handled'}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={[styles.labelConatainer]}>
                        {renderNotification()}
                    </View>
                </ScrollView>
        </KeyboardAwareScrollView>
        <ProgressView 
                    isProgress={props.indicator} 
                    title={"Loading"}
                />
        </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container:{
      flex: 1, 
      backgroundColor: constants.Colors.color_WHITE,
      margin:0,
      padding:0
    },
    labelConatainer:{
        flex:1,
        paddingTop: 1,
        width: '100%',
        alignSelf: 'center',
    },
    skeltons:{
        width:'95%',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:constants.vh(5),
    },
    prodBlock:{

        alignSelf:'center',
        backgroundColor:"white",
        borderRadius:0,
        elevation:2,
        padding:constants.vw(2),
        margin: constants.vw(5),
        width:constants.width*0.97
    },
    normalText:{
        fontFamily:constants.fonts.Cardo_Regular,
        fontSize:constants.vw(18),
        marginBottom:8,
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
    let error = state.error;
    return {
        auth,indicator,data,error
};
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);