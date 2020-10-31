import React,{Component} from 'react'
import {View ,TouchableOpacity,StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'
import constants from "../constants";

function DropDown(props){

	const dropDownItems = (variation) =>{    
        return( variation.map( (item,index) => { 
              return( <Picker.Item label={item.community} key={index} value={item.id}  />)
        }));
    }

	return (
		<View style={styles.DropDownBlock}>
			<Picker {...props}>
			  	{dropDownItems(props.commuinityPost)}
			</Picker>
		</View>
	)
};

const styles =StyleSheet.create({
	DropDownBlock:{
		width:150,
		height:30,
		borderWidth:1,
	}
});
export default DropDown;