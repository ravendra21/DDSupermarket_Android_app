import React,{Component} from 'react'
import {View ,TouchableOpacity,StyleSheet,Image} from 'react-native'
import {connect} from 'react-redux'
import {Picker} from '@react-native-community/picker'
import constants from "../constants"
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {profileUrl} from '../constants/url'

function UserProfileImage(props){
	console.log("profile pic",profileUrl+props.auth.user.image)
	return (
		<View>
			<View>
                <TouchableOpacity style={styles.touchContainer}>
                    { props.auth.user.image =="" || props.auth.user.image == null?(<Material name={"account"} color={constants.Colors.color_menuTabHigh} size={constants.vw(70)}/>) :(
                          <Image 
                            source={{ uri: (profileUrl+props.auth.user.image)}} 
                            style={styles.userImage} 
                        />)
                    }
                </TouchableOpacity>
            </View>
		</View>
	)
};

const styles =StyleSheet.create({
	touchContainer:{
		width:constants.vw(100),
		height:constants.vw(100),
		borderWidth:0,
		borderRadius:constants.vw(60),
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:"white",
		alignSelf:'center'
	},
	userImage:{
		width:constants.vw(100),
		height:constants.vw(100),
		borderRadius:constants.vw(50)
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
    let data = state.data;
    return {
        auth,indicator,data
};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileImage);