let initalstate = {
  accessToken:null,
  user: {
    accessToken: null,
    device_token: null,
    device_type: null,
    email: null,
    first_name: null,
    id: null,
    image: null,
    last_name: null,
    mobile: null,
  },
  switchApp:{
    isLoading: true,
    isAppIntro:true,
  },
  otp:'',
  registerMobile:'',
}

const auth = (prevState = initalstate, action) => {
    switch (action.type) {
      case 'SET-DEVICE_TOKEN':
      return{
        ...prevState,
        user: {
            ...prevState.user,
            device_token: action.token,
            device_type: action.os,
          },
      }
      case 'AUTH_SWITCH_ROOT':
      return{
        ...prevState,
        accessToken:action.accessToken,
        switchApp:{
            isLoading: false,
            isAppIntro:action.switchApp.isAppIntro,
          }
      }

      case 'AUTH_USER_ROOT':
        return {
          ...prevState,
          user: {
            ...prevState.user,
            accessToken: action.user.accessToken,
            device_token: action.user.device_token,
            device_type: action.user.device_type,
            email:action.user.email,
            first_name: action.user.first_name,
            id: action.user.id,
            image: action.user.image,
            last_name: action.user.last_name,
            mobile:action.user.mobile,
          },
          // switchApp:{
          //   isLoading: false,
          //   isAppIntro:action.switchApp.isAppIntro,
          // }
        }

        case 'APP_INTRO_DONE':
        return {
          ...prevState,
          switchApp:{
            isLoading: false,
            isAppIntro:false,
          }
        }

        case 'OTP_SEND':
        return {
          ...prevState,
          otp:action.otp,
          registerMobile:action.mobile,
        }

        case 'LOGIN_SUCCESS':
        return{
          ...prevState,
          // otp:'',
          accessToken:action.token,
          user: {
            ...prevState.user,
            accessToken:action.token,
            device_token: null,
            device_type: null,
            email:action.payload.email,
            first_name: action.payload.first_name,
            id: action.payload.id,
            image: action.payload.image,
            last_name: action.payload.last_name,
            mobile:action.payload.mobile,
          },
        }

        case 'UPDATED_PROFILE':
        //console.log("reducer",action.update_user);
        return{
          ...prevState,
          user: {
            ...prevState.user,
            accessToken:action.update_user.token,
            email:action.update_user.email,
            first_name:action.update_user.first_name,
            image:action.update_user.image,
            last_name:action.update_user.last_name,
          },
        }

        case 'LOGOUT_SUCCESS':
        return{
          ...prevState,
          accessToken:null,
          user: {
            ...prevState.user,
            accessToken: null,
            device_token: null,
            device_type: null,
            email: null,
            first_name: null,
            id: null,
            image: null,
            last_name: null,
            mobile: null,
          }
        }

      default:
      return prevState;
    }
}
  
export default auth;