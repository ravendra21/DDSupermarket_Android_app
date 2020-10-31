import React ,{useState}from 'react';
import { Alert } from "react-native";

//validation
export const validations = {
  email: {
    presence: {
      message: "Please enter email"
    },
    format: {
      //email validation
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter a valid email"
    }
  },
  otp: {
    presence: {
      message: "Please Enter OTP"
    }
  },
};

//function for validation
export const validate = (nameField: any, value: any) => {
  let result = { isError: false, messageError: "" };
  if (validations.hasOwnProperty(nameField)) {
    //@ts-ignore
    let v = validations[nameField];
    if (value == "" || value === null) {
      result = { isError: true, messageError: v.presence.message };
    } else if (v.hasOwnProperty("format") && !v.format.pattern.test(value)) {
      result = { isError: true, messageError: v.format.message };
    } else {
      result.isError = false;
    }
  } else {
    result.isError = false;
  }
  return result;
};

//function to show alert
export function showAlertDialog(message: any) {
  const _promise = (resolve: any, reject: any) => {
    Alert.alert(
      "Farmer",
      message,
      [{ text: "Ok", onPress: () => resolve() }],
      {
        cancelable: false
      }
    );
  };
  return new Promise(_promise);
}


export const generateOtp =()=>{
    return(1000+Math.floor(Math.random()*9000))
}