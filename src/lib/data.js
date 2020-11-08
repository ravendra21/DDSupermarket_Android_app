import {Platform} from 'react-native'
import {setUserToStorage,getUserFromStorage,unsetUserFromStorage} from '../services/async-storage'
import {navigateWithOutParams} from '../navigation/NavigationServices'
import constants from '../constants';
import {weburl,ddenterpriseApi} from '../constants/url'
import {showAlertDialog} from '../constants/Utils'

export const getProdcutCat=(data)=>async(dispatch,getState)=>{
    //dispatch({type : 'LOADING'});
    let url = weburl + 'api-prodcat';
    console.log(url);
    var data = new FormData();
    data.append("id", "sdfdsfds");
    let token = getState().auth.user.accessToken;
    let post_req = {
        method: 'POST',
        body: data,
        headers: {
         Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'PRODUCT_CAT', payload : response.productCat});
                // navigateWithOutParams(constants.Screens.OTPScreen.name);
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
                //showAlertDialog(response.message)
                console.log("product_exception_status");
            }
        })
        .catch( err => {
                console.log("product_exception",err);
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
                //showAlertDialog(constants.AppConstant.something_went_wrong_message)
        })
    })
    .catch( err => {
    		console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
            // showAlertDialog(response.message)
            // navigateWithOutParams("internetError");
    }) 
}

export const getHomeDetails=(userData)=>async(dispatch,getState)=>{
    //dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-home_api';
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    let token = getState().auth.user.accessToken;
    let post_req = {
        method: 'POST',
        body: data,
        headers: {
         Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }
    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        console.log("ddd enter",res);
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'GET_HOME_DATA', payload : response.homeDetails});
                // navigateWithOutParams(constants.Screens.OTPScreen.name);
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : "Error on Home"});
                //showAlertDialog(response.message)
                console.log("product_exception_status");
            }
        })
        .catch( err => {
                console.log("product_exception",err);
                dispatch({ type : 'ERROR_SUBMIT', payload : "Error on Home"});
                //showAlertDialog(constants.AppConstant.something_went_wrong_message)
        })
    })
    .catch( err => {
            console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : "Error on Home"});
            // showAlertDialog(response.message)
            // navigateWithOutParams("internetError");
    }) 
}


export const getProdcutList = (userData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-get_product';
    
    var data = new FormData();
    data.append("prod_id", userData.prod_id);
    data.append("userId", getState().auth.user.id);

    let token = getState().auth.user.accessToken;
    let post_req = {
        method: 'POST',
        body: data,
        headers: {
         Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }
    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            console.log(response);
            if(response.status == "1"){
                dispatch({ type : 'FTECH_PRODUCT_LIST', payload : response.product});
                // navigateWithOutParams(constants.Screens.OTPScreen.name);
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
                //showAlertDialog(response.message)
                console.log("product_exception_status");
            }
        })
        .catch( err => {
                console.log("product_exception",err);
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
                //showAlertDialog(constants.AppConstant.something_went_wrong_message)
        })
    })
    .catch( err => {
            console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
            // showAlertDialog(response.message)
            // navigateWithOutParams("internetError");
    }) 
}

export const getSingleProduct = (userData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-singleProdDetails';
    
    var data = new FormData();
    data.append("prod_id", userData.prod_id);
    data.append("attribute_slug",userData.attribute_slug);
    data.append("user_id",getState().auth.user.id);

    let token = getState().auth.user.accessToken;
    let post_req = {
        method: 'POST',
        body: data,
        headers: {
         Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }
    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == "1"){
                dispatch({ type : 'FTECH_SINGAL_PRODUCT', payload:response.product_details});
                // navigateWithOutParams(constants.Screens.OTPScreen.name);
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
                //showAlertDialog(response.message)
                console.log("product_exception_status");
            }
        })
        .catch( err => {
                console.log("product_exception",err);
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
                //showAlertDialog(constants.AppConstant.something_went_wrong_message)
        })
    })
    .catch( err => {
            console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
            // showAlertDialog(response.message)
            // navigateWithOutParams("internetError");
    }) 
}

export const searchProducts = (userData)=>async(dispatch,getState)=>{
    let url = ddenterpriseApi + 'api-searchProduct';
    let token = getState().auth.user.accessToken;

    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("term", userData.term);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'SEARCHING_PRODUCT', payload : response.searchProduct});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
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

export const searchProductsList = (userData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-searchProductList';
    let token = getState().auth.user.accessToken;

    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("term", userData.term);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'SEARCHING_PRODUCT_LIST', payload : response.searchProduct});
            }else{
                dispatch({ type : 'ERROR_SUBMIT', payload : "Not get product"});
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

{/****************   start cart   ***************/}
export const addToCart=(pordData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-add_to_cart';
    let token = getState().auth.user.accessToken;
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("email", getState().auth.user.email);
    data.append("prodId", pordData.prodVariId);
    data.append("total_item", pordData.prodSelectedQty == 0 ?1:pordData.prodSelectedQty);
    data.append("variation_id", pordData.variation);
    data.append("itemPrice", pordData.itemPrice);
    data.append("itemType",pordData.itemType);


    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }
  console.log("addToCart",url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({type:'ADD_TO_CART',addItem:response.addItem,cartItem_id:response.cart_item_id ,prodVariId:response.prodId , prodSelectedQty:response.selectedQty , variation:response.selectedVariationID});
            }else{
                console.log("error",response);
                //showAlertDialog("POST is not created.Please try again");
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

export const manageProdQty = (prodData)=>async(dispatch,getState)=>{
    //dispatch({type : 'LOADING'});
    console.log(prodData);
   let cartItem = getState().data.cartItem.find(item=>item.prod_id == prodData.prodVariId  && item.selectedVariationID == prodData.variation);
   if(cartItem != undefined){
        let url = ddenterpriseApi + 'api-manage_prod_qty';
        let token = getState().auth.user.accessToken;
        var data = new FormData();
        data.append("userId", getState().auth.user.id);
        data.append("prodId", prodData.prodVariId);
        data.append("variation_id", prodData.variation);
        data.append("actionType",prodData.actionType);
        data.append("cartItemId",cartItem.cart_item_id);
        let prodQty = parseInt(cartItem.selectedQty);
        
        if(prodData.actionType == "add"){
            data.append("newQty",prodQty+1,);
        }else{
            data.append("newQty",prodQty-1);
        }

        let post_req = {
            method: 'POST',
            body: data,
            headers: {
            'Content-Type': 'multipart/form-data',
             'token': token,
            }
        }

        console.log("manageCartQty",url, post_req);
        fetch(url, post_req)
        .then(res =>{
            res.json()
            .then(response => {
                console.log("error",response);
                if(response.status == 1){
                    dispatch({type:'ADD_QTY_IN_CART',prodVariId:response.prod_id ,action_type:response.action_type ,selectedVariationId:response.variationId});
                }else{
                    //showAlertDialog("POST is not created.Please try again");
                    dispatch({ type : 'ERROR_SUBMIT', payload : "Not update prodty"});
                }
            })
            .catch( err => {
                    console.log("product_exception",err);
                    dispatch({ type : 'ERROR_SUBMIT', payload : "Not update prodty"});
            })
        })
        .catch( err => {
                console.log("error" ,err);
                dispatch({ type : 'ERROR_SUBMIT', payload : 'Something went wrong.'})
        })    
   }
}

export const getCartItems=(pordData)=>async(dispatch,getState)=>{
    //dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-fetchCart';
    let token = getState().auth.user.accessToken;
    
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'FETCH_CART_ITEM', payload:response.cart});
            }else{
                console.log("error",response);
                //showAlertDialog("POST is not created.Please try again");
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

{/****************   end cart   ***************/}

export const addInWishList=(pordData)=>async(dispatch,getState)=>{
    //dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-add_Wish_List';
    let token = getState().auth.user.accessToken;
    
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("prodId", pordData.prodId);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }
  console.log("wish", post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'SAVED_IN_WISH', prodId:response});
            }else{
                console.log("error",response);
                //showAlertDialog("POST is not created.Please try again");
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


export const getWishList=(pordData)=>async(dispatch,getState)=>{
    //dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-get_Wish_List';
    let token = getState().auth.user.accessToken;
    
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }
    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'FTECH_WISH_PRODUCT', payload:response.wishList});
            }else{
                console.log("error",response);
                //showAlertDialog("POST is not created.Please try again");
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


export const removeWishProduct=(pordData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-remove_wishprod';
    let token = getState().auth.user.accessToken;
    
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("prodId", pordData.prodID);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    console.log(url, post_req);

    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'REMOVE_WISH_PRODUCT', payload:response.prodId});
            }else{
                console.log("error",response);
                showAlertDialog("Please try again later.");
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


export const addNewAddress=(pordData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-add_address';
    let token = getState().auth.user.accessToken;
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("contactName", pordData.name);
    data.append("contactMobile", pordData.mobile);
    data.append("address", pordData.address);

    data.append("district", pordData.district);
    data.append("state", pordData.State);
    data.append("pincode", pordData.pincode);
    data.append("address_id",pordData.address_id);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'SAVED_ADDRESS', newAddressList:response.addressList});
                dispatch({ type : 'ERROR_SUBMIT', payload : "address saved"});
            }else{
                console.log("error",response);
                dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
            }
        })
        .catch( err => {
            console.log("product_exception",err);
            dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
        })
    })
    .catch( err => {
            console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
    })
}

export const getAddress=(pordData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-get_address';
    let token = getState().auth.user.accessToken;
    var data = new FormData();
    data.append("userId", getState().auth.user.id);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'SAVED_ADDRESS', newAddressList:response.addressList});
            }else{
                console.log("error",response);
                dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
            }
        })
        .catch( err => {
            console.log("product_exception",err);
            dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
        })
    })
    .catch( err => {
            console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
    })
}

export const removeAddress=(pordData)=>async(dispatch,getState)=>{
    dispatch({type : 'LOADING'});
    let url = ddenterpriseApi + 'api-remove_address';
    let token = getState().auth.user.accessToken;
    var data = new FormData();
    data.append("userId", getState().auth.user.id);
    data.append("address_id", pordData.address_id);

    let post_req = {
        method: 'POST',
        body: data,
        headers: {
        'Content-Type': 'multipart/form-data',
         'token': token,
        }
    }

    console.log(url, post_req);
    fetch(url, post_req)
    .then(res =>{
        res.json()
        .then(response => {
            if(response.status == 1){
                dispatch({ type : 'SAVED_ADDRESS', newAddressList:response.addressList});
            }else{
                console.log("error",response);
                dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
            }
        })
        .catch( err => {
            console.log("product_exception",err);
            dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
        })
    })
    .catch( err => {
            console.log("error" ,err);
            dispatch({ type : 'ERROR_SUBMIT', payload : "address not saved"});
    })
}