import {setUserToStorage,getUserFromStorage,unsetUserFromStorage, getUserAccessTokenFromStorage,setUserAccessTokenToStorage,
unsetUserAccessTokenFromStorage} from '../services/async-storage'
import {navigateWithOutParams} from '../navigation/NavigationServices'
import constants from '../constants';
import {weburl,ddenterpriseApi} from '../constants/url'
import {showAlertDialog} from '../constants/Utils'

export const switchRootScreen = (data) => async(dispatch,getState) => {  
	setTimeout(() => {
        getUserAccessTokenFromStorage().then(value=>{
            if(value != null){
                dispatch({type : 'AUTH_SWITCH_ROOT',
                    accessToken: value,
                    switchApp: {
                        isLoading: false,
                        isAppIntro:false,
                    }
                });

            }else{
                dispatch({type : 'AUTH_SWITCH_ROOT',
                    accessToken:null,
                    switchApp: {
                        isLoading: false,
                        isAppIntro:true,
                    }
                });
            }
        });

		getUserFromStorage().then(value => {
            // console.log("user  data =>",value);
			if(value != null){
                let loginedUser = JSON.parse(value);
                // console.log("user  data =>",loginedUser);
                // console.log("user_id",loginedUser.id);
				dispatch({type : 'AUTH_USER_ROOT',
			    	user: {
			                accessToken: loginedUser.accessToken,
                            device_token: loginedUser.device_token,
                            device_type: loginedUser.device_type,
                            email: loginedUser.email,
                            first_name: loginedUser.first_name,
                            id: loginedUser.id,
                            image: loginedUser.image,
                            last_name: loginedUser.last_name,
                            mobile: loginedUser.mobile,
			         },
			      //    switchApp: {
			      //       isLoading: false,
			      //       isAppIntro:false,
			     	// }
	    		});
            }

			// }else{
			// 	dispatch({type : 'AUTH_SWITCH_ROOT',
			//     	user: {
			//                 accessToken: null,
            //                   device_token: null,
            //                   device_type: null,
            //                   email: null,
            //                   first_name: null,
            //                   id: null,
            //                   image: null,
            //                   last_name: null,
            //                 mobile: null,
			//          },
			//          switchApp: {
			//             isLoading: false,
			//             isAppIntro:true,
			//        	}
	        //	});
			// }
    	});
	},2000);
}

export const appIntroDone = (data) => async(dispatch,getState) => {
	var user = {
		"accessToken": null,
		"device_token": null,
		"device_type": null,
		"email": null,
		"first_name": null,
		"id": null,
		"image": "",
		"last_name": null,
		"mobile": null,
		"isAppIntro":false,
	}

	setUserToStorage(JSON.stringify(user));
    dispatch({type : 'APP_INTRO_DONE',switchApp: {isLoading: false,isAppIntro:false}});
}

export const logout = (data) => async(dispatch,getState) => {
    dispatch({type : 'LOADING'});
    unsetUserFromStorage();
    unsetUserAccessTokenFromStorage();
    var user = {
        "accessToken": null,
        "device_token": null,
        "device_type": null,
        "email": null,
        "first_name": null,
        "id": null,
        "image": "",
        "last_name": null,
        "mobile": null,
        "isAppIntro":false,
    }

    setUserToStorage(JSON.stringify(user));
    dispatch({type : 'LOGOUT_SUCCESS'});
}

export const sendOTP = (data) => async(dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = weburl + 'api-sendOtp?mobile='+data.mobile+"&otp="+data.otp
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log("otp response",response);
            if(response.status == "1"){
                dispatch({ type : 'OTP_SEND', payload : response.message,otp:data.otp, mobile:data.mobile});
                navigateWithOutParams(constants.Screens.OTPScreen.name);
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
                showAlertDialog(response.message)
            }
        })
        .catch( err => {
        	// console.log("first",err);
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
             showAlertDialog(constants.AppConstant.something_went_wrong_message)
        })
    })
    .catch( err => {
    	console.log("last");
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
            // showAlertDialog(response.message)
           // navigateWithOutParams("internetError");
    })
}

export const login = (data) => async(dispatch,getState) => {
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-login?mobile='+data.mobile;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log("otp response",response);
            if(response.status == "1"){
                var user = {
                    "accessToken": response.token,
                    "device_token": null,
                    "device_type": null,
                    "email": response.user['email'],
                    "first_name": response.user['first_name'],
                    "id": response.user['id'],
                    "image": response.user['image'],
                    "last_name": response.user['last_name'],
                    "mobile": response.user['mobile'],
                    "isAppIntro":false,
                }
                
                setUserAccessTokenToStorage(response.token);
                setUserToStorage(JSON.stringify(user));

                dispatch({ type : 'LOGIN_SUCCESS', payload : response.user,token:response.token });
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : response.message});
                showAlertDialog("response.message");
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong'})
            showAlertDialog(constants.AppConstant.something_went_wrong_message)
        })
    })
    .catch( err => {
    	console.log("last");
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
            // showAlertDialog(response.message)
            //navigateWithOutParams("internetError");
    })
}


export const setAppLanguageInRedux = (data) => async(dispatch,getState) => {
    //dispatch({type : 'LOADING'});
    getUserFromStorage().then(value => {
            if(value !=null){
                //dispatch({ type : 'LOGIN_SUCCESS_RIDIRECT_LANG'});
                let user_details = JSON.parse(value);
                setUserAccessTokenToStorage(user_details.accessToken);
                console.log(user_details,"user_details");
                dispatch({ type : 'LOGIN_SUCCESS', email : user_details.email, id:user_details.id, mobile:user_details.mobile,token:user_details.accessToken,user_data:user_details });
            }else{
                navigateWithOutParams(constants.Screens.SignInScreen.name);
            }
    });
    //dispatch({type : 'LOGOUT_SUCCESS'});
}

export const getWeatherDetails=(data)=>async(dispatch,getState)=>{
    //dispatch({type : 'LOADING'});
    let url = weburl + 'api-getWeather?lat='+data.lat+"&lng="+data.lng;
    console.log(url);

    fetch(url)
    .then(res =>{
        res.json()
        .then(response => {
            console.log("weather",response);
            if(response.status == "1"){
                dispatch({ type : 'WEATHER_INFO', payload : response.weatherData,});
                // navigateWithOutParams(constants.Screens.OTPScreen.name);
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get weather"});
                //showAlertDialog(constants.AppConstant.something_went_wrong_message)
            }
        })
        .catch( err => {
            dispatch({ type : 'ERROR_SUBMIT', payload : "Not get weather"});
             //showAlertDialog(constants.AppConstant.something_went_wrong_message)
        })
    })
    .catch( err => {
        console.log("last");
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
            // showAlertDialog(response.message)
            //navigateWithOutParams("internetError");
    })   
}

export const updateUserDetail =(user_data)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    console.log("user_data" ,user_data);
    // console.log("Accesss token",getState().auth.user.accessToken);
    let url = weburl + 'api-updateProfile';
    let token = getState().auth.user.accessToken;

    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("email", user_data.email);
    data.append("address", user_data.address);
    data.append("mobile", user_data.mobile);
    data.append("first_name", user_data.first_name);
    data.append("last_name", user_data.last_name);
    
    let imgData = user_data.selectedImage;
    
    if(imgData !=""){
        data.append('post_image', {
            uri: Platform.OS === 'ios' ? `file:///${imgData.path}` : imgData.path,
            type: imgData.mime,
            name: 'userProfile-'+getState().auth.user.id+'.jpg',
            size: imgData.size
        });
    }

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'token': token,
        }
    }
    console.log(url,post_req);

    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){

                var user = {
                    "accessToken": getState().auth.user.accessToken,
                    "device_token": null,
                    "device_type": null,
                    "email": response.user['email'],
                    "first_name": response.user['first_name'],
                    "id": response.user['id'],
                    "image": response.user['image'],
                    "last_name": response.user['last_name'],
                    "mobile": response.user['mobile'],
                    "isAppIntro":false,
                }

                setUserToStorage(JSON.stringify(user));
                dispatch({ type : 'UPDATED_PROFILE', update_user:response.user});

            }else{
                dispatch({type:'DISABLE_LOADER'});
                //showAlertDialog("Your comment is not save.Please try again");
            }
        })
        .catch( err => {
                console.log("product_exception",err);
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
        })
    })
    .catch( err => {
            console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
    })

}
