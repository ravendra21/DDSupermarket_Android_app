import React from 'react';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
import {connect} from "react-redux";


import { navigationRef } from './src/navigation/NavigationServices'

// import MainTabScreen from './src/navigations/MainTabScreen';
import RootStackScreen from './src/navigation/RootStackScreen';
import SplashScreenStack from './src/navigation/SplashScreenStack';
import AppIntroStackScreen from './src/navigation/AppIntroStackScreen';
import DrawerScreen from './src/navigation/DrawerScreen';

import {switchRootScreen} from './src/lib/auth';

interface Props {
  navigation: any;
}

class App extends React.Component<Props>{
  static navigationOptions = {
      header: null
  }

  constructor(props){
      super(props);
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