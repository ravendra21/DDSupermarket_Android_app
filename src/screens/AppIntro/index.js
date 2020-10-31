import React, { Component } from 'react'
import { StyleSheet ,View,Text, Image,ImageBackground,StatusBar,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import constants from "../../constants";
import {appIntroDone,getWeatherDetails} from "../../lib/auth";
//import Geolocation from 'react-native-geolocation-service';


const slides = [
  {
    key: 1,
    title: 'Welcome',
    image: constants.image.bg_splash,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: constants.image.bg_splash,
    backgroundColor: '#febe29',
  },
];
 
class AppIntro extends Component{
  constructor(props) {
    super(props);
    this.state = {
      show_Main_App: false,
    };
    
  }

  _renderItem = ({ item }) => {
    if(item.key == 1){
      return (
        <View style={styles.container}>
        <StatusBar backgroundColor={constants.Colors.color_heading} barStyle="dark-content"/>
        <ImageBackground 
          style={styles.header}
          source={constants.image.intro1}
        >
        <View style={styles.contentContainer}>
          <Text style={[styles.title,{fontSize: 25}]}>Welcome</Text>
          <Text style={[styles.title,{fontSize: 25}]}>to the new</Text>
          <Text style={[styles.title,{fontSize: 35}]}>Products and</Text>
          <Text style={[styles.title,{fontSize: 35}]}>Solutions for</Text>
          <Text style={[styles.title,{fontSize: 35}]}>your organic farms</Text>
         </View>
         </ImageBackground>
      </View>
      );
    }else{
      return (
        <View style={styles.container}>
        <StatusBar backgroundColor='#FFFFFF' barStyle="dark-content"/>
        <ImageBackground 
          style={styles.header2}
          source={constants.image.intro2}
        >
        <View style={{padding:20,marginTop:40}}>
          <Text style={[styles.title,{fontSize: 25}]}>Welcome to</Text>
          <Text style={[styles.title,{fontSize: 25}]}>Farmstop Organic Shop</Text>
         
          <View style={{marginTop:40}}>
            <Text style={[styles.title,{fontSize: 50}]}>Farmer</Text>
            <Text style={[styles.title,{fontSize: 50}]}>App.</Text>
          </View>
         </View>
         <View style={{flex:3,justifyContent:'flex-end',padding:20,marginBottom:150}}>
            <TouchableOpacity onPress={this._onDone} style={{color: 'transparent'}}>
            <Text style={styles.signinBtn}>Sign in / Register</Text>
            </TouchableOpacity>
          </View>
         </ImageBackground>
      </View>
      );
    }
  }
  _onDone = () => {
    this.props.introDone();
  }

  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}
      dotStyle={{ backgroundColor: 'black' }}
          activeDotStyle={{ backgroundColor: 'white' }}
          showNextButton = {false}
          showDoneButton = {false}
          />;
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  text: {
    color: '#7F462C',
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
    fontFamily:constants.fonts.Cardo_Regular
  },
  title: {
    color: constants.Colors.color_WHITE,
    fontFamily:constants.fonts.Cardo_Bold,
  },
  titleintro2:{
    color: constants.Colors.color_BLACK,
    fontFamily:constants.fonts.Cardo_Bold,
  },
  silde: {  
    justifyContent:'center',
    width:400,
    height:400,
    marginTop:150
  },
  header: {
      flex: 2,
      justifyContent: 'flex-end',
  },
  header2: {
      flex: 2,

  },
  contentContainer:{
    marginBottom:150,
    padding:20
  },
  signinBtn:{
    fontFamily:constants.fonts.Cardo_Bold,
    fontSize: 20,
    backgroundColor:constants.Colors.color_WHITE,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:5,
    width:"55%",
    opacity: 0.90,

  }
  
});


const mapStateToProps = state => ({
  // animate : state.indicator
});

const mapDispatchToProps = dispatch => ({
  introDone: data => dispatch(appIntroDone()),
  getWeatherDetails: (data) => dispatch(getWeatherDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppIntro);