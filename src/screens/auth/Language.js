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
    CheckBox
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable'
import {connect} from 'react-redux'

import { PrimaryTextInput,TextScreenHeader} from '../../components/textInputs';
import ModalComponet from '../../components/modal'; 
import constants from "../../constants";
import { PrimaryButton } from "../../components/button";
import { validate,showAlertDialog,generateOtp } from "../../constants/Utils";
import {navigateWithOutParams} from '../../navigation/NavigationServices'
import {
    ProgressView
} from '../../components/loader';

import { setAppLanguageInRedux } from "../../lib/auth";
import {LocalizationContext} from '../../services/localization/LocalizationContext';

function language(props){
    const {translations, appLanguage, setAppLanguage} = useContext(
        LocalizationContext,
    );

    const [data, setData] = React.useState({
        selectedLang: '',
    });

    const select_lang = (val) => {
        setData({
            ...data,
            selectedLang: val,
        })
    }


    const loginHandle = async() => {
        // showAlertDialog(data.selectedLang);
        let selectedOpt = data.selectedLang;
        if(selectedOpt != ""){
            setAppLanguage(selectedOpt);
            setTimeout(()=>{props.dispatch(setAppLanguageInRedux())},1000);
        }else{
            showAlertDialog(constants.AppConstant.fillAllFileds);
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
                <View style={{alignSelf:'center',marginTop:constants.vh(100)}}>
                <TextScreenHeader title="Choose your language"/>
                </View>
	            <ScrollView keyboardShouldPersistTaps={'handled'}>

	                <View style={[styles.emailTextBox]}>
    	                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={data.selectedLang == "en" ? styles.selected:{}}>
                                <TouchableOpacity style={styles.langBtn} onPress={()=> select_lang("en")}>
                                    <Text style={data.selectedLang == "en" ?styles.selectedText:[styles.langBtnTitle,{color:constants.Colors.color_heading}]}>
                                        English
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={data.selectedLang == "hi" ? styles.selected:{}}>
                                <TouchableOpacity style={styles.langBtn} onPress={()=> select_lang("hi")}>
                                    <Text style={data.selectedLang == "hi" ?styles.selectedText:[styles.langBtnTitle,{color:constants.Colors.color_facebook}]}>
                                    
                                        हिन्दी
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>    

                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:constants.vh(20)}}>
                            <View style={data.selectedLang == "tam" ? styles.selected:{}}>
                                <TouchableOpacity style={styles.langBtn} onPress={()=> select_lang("tam")}>
                                    <Text style={data.selectedLang == "tam" ?styles.selectedText:[styles.langBtnTitle,{color:constants.Colors.color_intro}]}>
                                        தமிழ்
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={data.selectedLang == "kn" ? styles.selected:{}}>
                                <TouchableOpacity style={styles.langBtn} onPress={()=> select_lang("kn")}>
                                    <Text style={data.selectedLang == "kn" ?styles.selectedText:[styles.langBtnTitle,{color:constants.Colors.color_youtube}]}>
                                        ಕನ್ನಡ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:constants.vh(20)}}>
                            <View style={data.selectedLang == "ml" ? styles.selected:{}}>
                                <TouchableOpacity style={styles.langBtn} onPress={()=> select_lang("ml")}>
                                    <Text style={data.selectedLang == "ml" ?styles.selectedText:[styles.langBtnTitle,{color:constants.Colors.color_Red}]}>
                                        മലയാളം
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
	                </View>
	            </ScrollView>
	    </KeyboardAwareScrollView>
        <ProgressView 
            isProgress={props.indicator} 
            title={constants.progressMessages.SIGNUP}
        />
        <View style={{width:"90%",flex:2,alignSelf:'center',justifyContent:'flex-end',marginBottom:constants.vh(20)}}>
            
            <ModalComponet titleText={translations.term_condtions}/>
    
            <View>
                <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>loginHandle()}>
                    <Text style={{fontSize:18,fontFamily:constants.fonts.Cardo_Regular,color:constants.Colors.color_intro}}>{translations.accept}</Text>
                </TouchableOpacity>
            </View>
        </View>
	    </SafeAreaView>
		)
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: constants.Colors.color_WHITE,
      
    },
    emailTextBox: {
        flex:1,
        paddingTop: 31,
        width: '70%',
        alignSelf: 'center'
    },
    langBtn:{
        padding:20
    },
    langBtnTitle:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:20,
    },
    text_begin: {
        color: constants.Colors.color_161758,
        fontWeight: 'bold',
        fontSize: 28,
        fontFamily: constants.fonts.FUTURASTD_BOLD
    },
    selected:{
        backgroundColor:constants.Colors.color_cartText,
        borderRadius:20,
    },
    selectedText:{
        fontFamily:constants.fonts.Cardo_Bold,
        fontSize:20,
        color:constants.Colors.color_WHITE,
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

export default connect(mapStateToProps, mapDispatchToProps)(language);