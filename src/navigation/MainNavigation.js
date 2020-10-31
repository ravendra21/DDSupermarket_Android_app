import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';

import WelcomeScreen from '../Screens/WelcomeScreen'
import HomeScreen from '../Screens/HomeScreen'

const MainNavigation = ({navigation,introDoneProps}) => {

  const RootAppStack = createStackNavigator();
    <NavigationContainer ref={navigationRef}>
      <RootAppStack.Navigator>
          <RootAppStack.Screen  options={{headerShown: false}} name="WelcomeScreen" component={WelcomeScreen}/>
          <RootAppStack.Screen  options={{headerShown: false}} name="HomeScreen" component={HomeScreen}/>
      </RootAppStack.Navigator>
    </NavigationContainer>
  )
  };

  const mapStateToProps = state => ({
      introDoneProps : state.appIntro
  });
  
  const mapDispatchToProps = dispatch => ({
    // introDone: data => dispatch({ type: 'APP_INTRO_DONE', data: data }),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);