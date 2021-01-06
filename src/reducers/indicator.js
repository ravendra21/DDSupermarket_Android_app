const indicator = (state = false, action) => {
    switch(action.type) {
        case 'LOADING' :
            return true;
        case 'ERROR_SUBMIT':
        case 'REMOVED_CART_ITEM':
        case 'FETCH_ORDER_LIST':
        case 'OTP_SEND':
        case "FETCH_ORDER_DETAILS":
        case "LOGIN_SUCCESS":
        case "LOGOUT_SUCCESS":
        case "LOGIN_SUCCESS_RIDIRECT_LANG":
        case "WEATHER_INFO":
        case "PRODUCT_CAT":
        case "DISABLE_LOADER":
        case "GET_POSTS":
        case "LOCATION_FETCHED":
        case "UPDATED_PROFILE":
        case 'CREATED_NEW_GROUP':
        case 'FTECH_PRODUCT_LIST':
        case 'GET_HOME_DATA':
        case 'FTECH_SINGAL_PRODUCT':
        case 'SEARCHING_PRODUCT':
        case 'SEARCHING_PRODUCT_LIST':
        case 'USER_NOTIFICATION':
        case 'REMOVE_WISH_PRODUCT':
        case 'ADD_TO_CART':
        case 'FETCH_CART_ITEM':
        case 'SAVED_ADDRESS':
        case 'ORDER_SUCCESSFULL':
        case 'EXCEPTION_ERROR_SUBMIT':
        case 'NETWORK_ERROR':
        case 'ORDER_SUCCESSFULL':
        case "COUPON_CODE_VALIDATE":
        case "ERROR_COUPON_CODE":
            return false;
        default :
            return state;
    }
}

export default indicator;