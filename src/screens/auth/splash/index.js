import React, {useEffect,useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native'; 
import constants from "../../../constants";
import {LocalizationContext} from '../../../services/localization/LocalizationContext';



const SplashScreen = ({navigation}) => {
  const {appLanguage, initializeAppLanguage,translations} = useContext(LocalizationContext);
  
  useEffect(() => {
    initializeAppLanguage();
    const timer = setTimeout(() => {
      // navigation.navigate('Main');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, initializeAppLanguage]);

  const { colors } = useTheme();
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor='#FFFFFF' barStyle="dark-content"/>
        <View style={styles.header}>

         <Animatable.Image 
            style={styles.logo}
            duraton="1500"
            resizeMode="contain"
            source={constants.image.bg_splash}
        />
        <ActivityIndicator size="large" color={constants.Colors.color_theme} style={{marginTop:15}}/>
        {/*<Animatable.Text animation="zoomInUp" style={styles.shadow}>{translations.WELCOME}</Animatable.Text>*/}
        </View>
      </View>
  );
}

export default SplashScreen;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.38;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  shadow:{
    width:'90%',
    marginTop:constants.vh(20),
    alignSelf:'center',
    textAlign:'center',
    color:constants.Colors.color_intro,
    fontSize:25,
    fontFamily:"Cardo-Bold"
  }
});