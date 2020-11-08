import React from 'react';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import constants from "../constants";

export const TextScreenHeader = (props) => {
    return (
        
            <View style={{}}>
                <Text style={{fontSize:25,fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_main_heading}}>{props.title}</Text>
            </View>
    );
}

export const EmptyMsgDisplay = (props) => {
    return (
            <View style={{marginTop:constants.height/2.5,alignSelf:'center'}}>
                <Text style={{fontSize:20,fontFamily:constants.fonts.Cardo_Bold,color:constants.Colors.color_heading,textAlign:'center'}}>{props.msg}</Text>
            </View>
    );
}

export const PrimaryTextInput = (props) => {
    return (
        <View>
            {/* <Text style={styles.textInputTitle}>{props.title}</Text> */}
            <View style={styles.inputTextBox}>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Cardo_Regular,color:constants.Colors.color_BLACK}, styles.text]}
                />
            </View>
        </View>
    );
}


export const SquareTextInput = (props) => {
    return (
        <View style={{marginTop:10}}>
            <Text style={{color: constants.Colors.color_BLACK,fontFamily: constants.fonts.Cardo_Regular,fontSize: 14}}>{props.title}</Text>
            <View style={styles.inputTextSquareBox}>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Cardo_Regular,color:constants.Colors.color_BLACK}, styles.text]}
                />
            </View>
        </View>
    );
}


export const RoundedTextInput = (props) => {
    return (
        <View>
            {/* <Text style={styles.textInputTitle}>{props.title}</Text> */}
            <View style={styles.roundedTextBox}>
                <TextInput
                    {...props}
                    selectionColor={constants.Colors.color_BLACK}
                    style={[{ fontFamily: constants.fonts.Cardo_Regular,color:'black',textAlignVertical: 'top',}, styles.text]}
                />
            </View>
        </View>
    );
}


export const PostTextInput = (props) => {
    return (
        <View style={styles.textAreaContainer} >
            <TextInput
                {...props}
                    style={styles.textArea}
            />
        </View>
    );
}
export const TextView = (props) => {
    return (
        <View style={[styles.inputTextBox, { width: '85%', height: 127 }]}>
            <TextInput
                {...props}
                selectionColor={constants.Colors.color_BLACK}
                style={[styles.text, { fontFamily: constants.fonts.Cardo_Regular, textAlignVertical: "top", fontSize: 14 }]}
            />
        </View>
    );
}

export const PasscodeTextInput = (props) => {
    return (
        <View>
            <TextInput
                ref={(r) => { props.inputRef && props.inputRef(r) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    textInputTitle:{
        color: constants.Colors.color_intro,
        fontFamily: constants.fonts.Cardo_Regular,
        fontSize: 14
    },
    inputTextBox: {
        borderBottomWidth: 2,
        marginTop: 14,
        height: 50,
        borderColor: constants.Colors.color_WHITE
    },
    inputTextSquareBox: {
        borderWidth: 1,
        borderRadius:10,
        marginTop: 4,
        height: 50,
        borderColor: constants.Colors.color_BLACK
    },
    roundedTextBox: {
        borderWidth: 1,
        borderRadius:25,
        borderColor:constants.Colors.color_chatInput,
        width:'100%',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    text: {
        paddingHorizontal: constants.vh(15),
        paddingTop: constants.vh(10),
        fontSize: 18
    },
    textAreaContainer: {
        borderColor: constants.Colors.color_grey,
        borderWidth: 0,
        padding: 5
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
        fontFamily: constants.fonts.Cardo_Regular,
        color:'black',
        fontSize:20
    }
});