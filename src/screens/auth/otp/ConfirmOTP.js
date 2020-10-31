import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import constants from "../../../constants";
import { vh, vw } from '../../../constants/Dimension';
// import { successVerifiedUser } from '../../../actions/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { PrimaryButtonWithCheckIcon } from '../../../components/buttons';
const ConfirmOTP = (props) => {
  /** patch work for home navigate ios */
  useEffect(() => {
    console.log('inside');
    //props.dispatch(successVerifiedUser());
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={constants.Colors.color_WHITE} barStyle="dark-content" />
      <ImageBackground
        style={styles.imageBackground}
        source={constants.image.bg_splash}
      >
        <View>
          {/* <TouchableOpacity onPress={() => props.dispatch(successVerifiedUser())} style={[styles.crossContainer,{paddingLeft:30, paddingTop: constants.vh(20)}]}>
                  <Image style={styles.crossImg} source={constants.image.cross} />
              </TouchableOpacity> */}
          <View style={styles.headerCenter}>
            <TouchableOpacity onPress={() => console.log('')}>
              <Image
                style={styles.tick_done}
                duraton="1500"
                resizeMode="contain"
                //animation="zoomIn" 
                source={constants.image.tick_done}
              />
            </TouchableOpacity>
            <View style={styles.text_begin_container}>
              <Text style={styles.text_begin_header}>{constants.constStrings.OTP_CONFIRM_HEADER}</Text>
            </View>
            <View style={styles.text_beginContainer}>
              <Text style={styles.text_begin}>{constants.constStrings.OTP_CONFIRM_TEXT}</Text>
            </View>
          </View>
        </View>
        {/*<View style={styles.submit_button}>
                  <PrimaryButtonWithCheckIcon
                    title={constants.constStrings.next}
                    onPress={() => props.dispatch(successVerifiedUser())}
                  />
                </View>*/}
        {/*  */}
      </ImageBackground>
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return ({
    dispatch
  })
}

function mapStateToProps(state) {
  let auth = state.auth;
  return {
    auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOTP);

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.Colors.color_WHITE
  },
  imageBackground: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginVertical: 10,
  },
  headerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: constants.vh(10),
  },
  crossContainer: {
    alignSelf: 'flex-end',
    right: vw(-30),
    bottom: vh(10)
    //paddingTop: vw(20)
  },
  crossImg: {
    height: vw(31),
    width: vw(31)
  },
  tick_done: {
    width: vw(83),
    height: vw(83),
  },
  text_begin_container: {
    marginTop: vh(17)
  },
  text_begin_header: {
    color: constants.Colors.color_161758,
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: constants.fonts.FUTURASTD_BOLD
  },
  text_beginContainer: {
    width: vw(280),
    height: vh(36),
    alignSelf: 'center',
    marginTop: vh(18)
  },
  text_begin: {
    color: constants.Colors.color_47474d,
    fontSize: constants.vw(14),
    fontFamily: constants.fonts.Futura_Std_Book,
    textAlign: 'center'
  },
  submit_button: {
    marginTop: vh(-100),
    alignSelf: 'center'
  },
});