import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import { vh, vw } from '../../../utils/dimension';
import Utils from '../../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { LoginPressed } from '../auth.action';
import { Loader } from '../../../components';
export interface AccessCodeScreenProps {
  navigation: any;
}

export function AccessCodeScreen(props: AccessCodeScreenProps) {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector(
    (state: any) => state.globalLoadingReducer
  );
  const { centerName, classroom, token } = useSelector(
    (state: any) => state.authReducer,
  );

  const authData = useSelector(
    (state :any) => state.authReducer 
  )
    
  const AllStore = useSelector((state: any) => console.log("state", state));
  
  const [state, setState] = useState({
    box1: '',
    box2: '',
    box3: '',
    box4: '',
    showModal: false,
  });

  const { Mode } = useContext(Utils.DimensionContext);

  var styles =
    Mode !== Utils.Constant.Mode.PORTRAIT ? stylesL : { ...stylesL, ...stylesP };

  useEffect(() => {
    styles =
      Mode !== Utils.Constant.Mode.PORTRAIT
        ? stylesL
        : { ...stylesL, ...stylesP };
  }, [Mode]);

  const box1Ref: any = React.createRef();
  const box2Ref: any = React.createRef();
  const box3Ref: any = React.createRef();
  const box4Ref: any = React.createRef();

  function Login() {
    if(centerName && classroom && token)
    {if (state.box1 && state.box2 && state.box3 && state.box4) {
      let data = {pin : state.box1.concat(state.box2, state.box3, state.box4) };
      console.log(data);
      dispatch(
        LoginPressed(data, (response: any) => {
          Utils.Constant.setAuthorizationToken(response.data.response.jwt_token,false)
          Utils.DispatchMethod(
            props.navigation,
            Utils.ScreenNames.DASHBOARD_STACK,
          );
        }, (error: any) => {
          // Utils.Constant.showSnackbar(error.data.message)
            console.log(error.data)
           Utils.Constant.showSnackbar("Incorrect Access Code")
            
        }),
      );
    } else {
      Alert.alert(Utils.I18n.t('ENTER_ACCESS_CODE'));
    }}
    else{
      props.navigation.navigate(Utils.ScreenNames.SERVER_MODAL)
    }
  }
  return (
    <ImageBackground source={Utils.Images.BACKGROUND} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <Text style={styles.softVersion}>
            {`${Utils.I18n.t('SOFT_VER')}`}
          </Text>
          <TouchableOpacity
            onPress={() => setState({ ...state, showModal: true })}
            style={styles.ellipses}>
            <Image source={Utils.Images.ELLIPSIS} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{}}>
          <Text style={styles.pEnter}>{`${Utils.I18n.t('PLEASE_ENTER')}`}</Text>
          <Text style={styles.teacherAccessCode}>
            {`${Utils.I18n.t('TEACHER_ACCESS_CODE')}`}
          </Text>
          <Text style={styles.teacherAccessText}>
            {`${Utils.I18n.t('ACCESS_CODE_TEXT')}`}
          </Text>
        </View>
        <View style={styles.boxesContainer}>
          <View style={styles.squareBox}>
            <TextInput
              ref={box1Ref}
              style={styles.textinput}
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onSubmitEditing={() => box2Ref.current.focus()}
              // onChange={({ nativeEvent: { eventCount, target, text} }) => console.warn("onChange nativeEvent", { eventCount, target, text })}
              onChange={({ nativeEvent }) => nativeEvent.text.length==1? box2Ref.current.focus():null}
              value={state.box1}
              onChangeText={(text) => {
                let isNumber = isNaN(Number(text));
                if (!isNumber) {
                  setState({ ...state, box1: text });
                } else {
                  Alert.alert(`${Utils.I18n.t('NUMBER_ERROR')}`);
                }
              }}
            />
          </View>

          <View style={styles.squareBox}>
            <TextInput
              ref={box2Ref}
              style={styles.textinput}
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onSubmitEditing={() => box3Ref.current.focus()}
              value={state.box2}
              onChange={({ nativeEvent }) => nativeEvent.text.length==1? box3Ref.current.focus():box1Ref.current.focus()}
              onChangeText={(text) => {
                let isNumber = isNaN(Number(text));
                if (!isNumber) {
                  setState({ ...state, box2: text });
                } else {
                  Alert.alert(`${Utils.I18n.t('NUMBER_ERROR')}`);
                }
              }}
            />
          </View>

          <View style={styles.squareBox}>
            <TextInput
              ref={box3Ref}
              style={styles.textinput}
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="next"
              onSubmitEditing={() => box4Ref.current.focus()}
              value={state.box3}
              onChange={({ nativeEvent }) => nativeEvent.text.length==1? box4Ref.current.focus():box2Ref.current.focus()}
              onChangeText={(text) => {
                let isNumber = isNaN(Number(text));
                if (!isNumber) {
                  setState({ ...state, box3: text });
                } else {
                  Alert.alert(`${Utils.I18n.t('NUMBER_ERROR')}`);
                }
              }}
            />
          </View>

          <View style={styles.squareBox}>
            <TextInput
              ref={box4Ref}
              style={styles.textinput}
              keyboardType="numeric"
              maxLength={1}
              returnKeyType="done"
              onSubmitEditing={() => {
                box4Ref.current.focus();
                Login();
              }}
              value={state.box4}
              onChange={({ nativeEvent }) => nativeEvent.text.length==1? box4Ref.current.focus():box3Ref.current.focus()}
              onChangeText={(text) => {
                let isNumber = isNaN(Number(text));
                if (!isNumber) {
                  setState({ ...state, box4: text });
                } else {
                  Alert.alert(`${Utils.I18n.t('NUMBER_ERROR')}`);
                }
              }}
            />
          </View>
        </View>
      </View>

      {state.showModal && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={() => setState({ ...state, showModal: false })}>
          <View style={styles.modalView}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.modalTouchable}
                onPress={() => {
                  setState({ ...state, showModal: false });

                  authData.isDeviceConfigured ?
                  props.navigation.navigate(
                    Utils.ScreenNames.DEVICE_CONFIG_SCREEN,
                    ) : 
                    props.navigation.navigate(
                      Utils.ScreenNames.VERIFY_YOURSELF,
                    ) 
                }}>
                <Text style={styles.touchableText}>{`${Utils.I18n.t(
                  'DEVICE_CONFIG_H',
                )}`}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setState({ ...state, showModal: false });
               props.navigation.navigate(Utils.ScreenNames.OFF_ATTENDANCE)
              }}
              style={styles.modalTouchable}>
                <Text style={styles.touchableText}>{`${Utils.I18n.t(
                  'OFF_ATTENDANCE',
                )}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      {loginLoading && <Loader />}
    </ImageBackground>
  );
}

const stylesL = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', paddingHorizontal: vw(20) },
  squareBox: {
    height: vh(120),
    width: vh(120),
    borderRadius: vh(13),
    marginLeft: vh(25),
    backgroundColor: Utils.Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: { fontSize: vh(28), flex: 1, width: '100%', textAlign: 'center' },
  boxesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    height: vh(104),
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerInnerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    width: '100%',
    marginVertical: vh(70),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ellipses: {
    height: vh(40),
    width: vh(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherAccessText: {
    fontSize: vh(16),
    color: Utils.Colors.WHITE,
    marginVertical: vh(8),
  },
  teacherAccessCode: {
    fontSize: vh(28),
    fontWeight: '700',
    color: Utils.Colors.WHITE,
    marginVertical: vh(8),
  },
  pEnter: { fontSize: vh(20), color: Utils.Colors.WHITE },
  softVersion: { fontSize: vw(12), color: Utils.Colors.WHITE },
  modalContainer: {
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Utils.Colors.LIGHT_BG,
    position: 'absolute',
  },
  modalView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: vh(74),
    marginRight: vw(65),
  },
  modal: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  modalTouchable: {
    height: vh(54),
    width: vw(230),
    paddingLeft: vw(20),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  touchableText: { fontFamily: 'Nunito-SemiBold', fontSize: vh(18) },
});

const stylesP = StyleSheet.create({
  bodyContainer: {
    width: '100%',
    marginVertical: vh(70),
    justifyContent: 'space-around',
  },
  boxesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: vh(80),
  },
});