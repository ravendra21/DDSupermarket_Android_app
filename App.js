import React from 'react';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
import {connect} from "react-redux";


import { navigationRef } from './src/navigation/NavigationServices'

// import MainTabScreen from './src/navigations/MainTabScreen';
import RootStackScreen from './src/navigation/RootStackScreen'
import SplashScreenStack from './src/navigation/SplashScreenStack'
import AppIntroStackScreen from './src/navigation/AppIntroStackScreen';
import DrawerScreen from './src/navigation/DrawerScreen'
import {switchRootScreen} from './src/lib/auth'
import {setDeviceDetails} from './src/services/async-storage'

import PushNotificationIOS from "@react-native-community/push-notification-ios"
var PushNotification = require("react-native-push-notification");

interface Props {
  navigation: any;
}

var deviceData = "";
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (deviceTokenData) {
    console.log("TOKEN:", deviceTokenData);
    setDeviceDetails(JSON.stringify(deviceTokenData));
    deviceData=deviceTokenData
  },
 
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    PushNotification.localNotification({
        //showWhen:true,
        autoCancel: true,
        largeIcon: "ic_launcher",
        largeIconUrl:notification.data.largeIcon,
        smallIcon: "ic_notification",
        bigText:notification.data.message,
        title: notification.data.title,
        message: notification.data.message,
        bigPictureUrl: notification.data.image, // (optional) default: undefined
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        priority: "high",
    });


    // (required) Called when a remote is received or opened, or local notification is opened
    if(notification.userInteraction === true)
    {
        console.log("open screen on touch notification");
        //check_notification();
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
},
 
  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
    // process the action
  },
 
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
 
  senderID: "246582908079",
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
 
  // Should the initial notification be popped automatically
  // default: true
  //popInitialNotification: true,
  popInitialNotification: true,
 
  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,

});

class App extends React.Component<Props>{
  static navigationOptions = {
      header: null
  }

  constructor(props){
      super(props);
  }

  test=()=>{
          PushNotification.localNotification({
        title: "hi",
        message: "i am call",
      });
  }

  componentDidMount(){
    this.props.dispatch(switchRootScreen());
  }

  // Render any loading content that you like here
  render() {
    //console.log("app switcher ",this.props.auth.user);
    return (
      <NavigationContainer ref={navigationRef}>
          { /*this.props.auth.switchApp.isLoading ?<SplashScreenStack /> : this.props.auth.switchApp.isAppIntro ? <AppIntroStackScreen/>:
            (this.props.auth.accessToken !== null ?
              (this.props.auth.accessToken !== null ? <DrawerScreen /> : <RootStackScreen/>)
            :
            <RootStackScreen/>)
          */}

          { this.props.auth.switchApp.isLoading ?<SplashScreenStack /> :(this.props.auth.accessToken !== null ? <DrawerScreen /> : <RootStackScreen/>)
          }
      </NavigationContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
    dispatch
  })
}

function mapStateToProps(state) {
  let auth = state.auth;
  return {
    auth
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App);