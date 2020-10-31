import { writeStorage, readStorage, removeAllStorage, removeStorage } from './Model';


/*
 * [setUserAccessToken functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserAccessTokenToStorage = async (value) =>{
  return new Promise(function(resolve) {
    resolve(writeStorage('USER_ACCESS_TOKEN', value));
  });
}


/*
 * [getUserAccessToken functions get user value from Token]  
 * @return {value}   
*/
export const getUserAccessTokenFromStorage = async () =>{
  return new Promise(function(resolve) {
    resolve(readStorage('USER_ACCESS_TOKEN'));
  });
}

/*
 * [getUserAccessToken functions get user value from Token]  
 * @return {value}   
*/
export const unsetUserAccessTokenFromStorage = async () =>{
  return new Promise(function(resolve) {
    resolve(removeStorage('USER_ACCESS_TOKEN'));
  });
}

/*
 * [setUserTempAccessTokenToStorage functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserTempAccessTokenToStorage = async (value) =>{
  return new Promise(function(resolve) {
    resolve(writeStorage('USER_TEMP_ACCESS_TOKEN', value));
  });
}


/*
 * [getUserTempAccessTokenFromStorage functions get user value from Token]  
 * @return {value}   
*/
export const getUserTempAccessTokenFromStorage = async () =>{
  return new Promise(function(resolve) {
    resolve(readStorage('USER_TEMP_ACCESS_TOKEN'));
  });
}

/*
 * [unsetUserTempAccessToken functions unset user value from Token]  
 * @return {value}   
*/
export const unsetUserTempAccessToken = async () =>{
  return new Promise(function(resolve) {
    resolve(removeStorage('USER_TEMP_ACCESS_TOKEN'));
  });
}


/*
 * [setUser functions set value of Token]
 * @param {value  string}   
 *    
*/
export const setUserToStorage = async (value) =>{
  return new Promise(function(resolve) {
    resolve(writeStorage('USER', value));
  });
}


/*
 * [getUser functions get user value from Token]  
 * @return {value}   
*/
export const getUserFromStorage = async () =>{
  return new Promise(function(resolve) {
    resolve(readStorage('USER'));
  });
}

export const unsetUserFromStorage = async () =>{
  return new Promise(function(resolve) {
    resolve(removeStorage('USER'));
  });
}