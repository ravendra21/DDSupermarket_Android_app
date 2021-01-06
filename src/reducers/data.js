const initialDataState = {appIntro:'',popup:'',

    prod_cat:[],
    community:[{id:0, community:"All Posts"},{id:1, community:"Questions"},{id:2, community:"Organic Farming"},],
    activeCommunity:0,

    //post container
    posts:[],
    questionPost:[],
    organicFarming:[],

    postComment:[],
    commentMsg:'initial',

    //post pagination params
    AllPostPageNo:0,
    QuesPostPageNo:0,
    OFPostPageNo:0,

    //groups
    groups:[],

    productCat:[],
    featureProd:[],
    homeSlider:[],
    searchProduct:[],
    banner:[],
    productList:[],
    singleProdDetails:[],
    searchProductLIst:[],

    wishProdList:[],
    cartItem:[],
    subtotal:0,

    addressList:[],
    defaultAddress:"",

    coupon_msg:'',
    coupon_value:'',
    coupon_id:'',
    orderList:[],

    currentAddress:'',
    currentPincode:'',
    user_notification:[],
};

const data = (prevState = initialDataState, action) => {
    switch (action.type) {

        case 'LOCATION_FETCHED':
        return{
            ...prevState,
            currentAddress:action.address,
            currentPincode:action.pincode
        }

        case 'USER_NOTIFICATION':
        return{
            ...prevState,
            user_notification:action.userNotification,
        }

        case 'GET_HOME_DATA':
        let featureProducts = action.payload.fproduct;
        return{
            ...prevState,
            productCat:action.payload.product_cat,
            featureProd:featureProducts,
            homeSlider:action.payload.mob_slider,
            banner:action.payload.mob_slider,
        }

        case 'FETCH_ORDER_LIST':
        return{
            ...prevState,
            orderList:action.orderList,
        }

        case 'ORDER_SUCCESSFULL':
        return{
            ...prevState,
            cartItem:[],
        }

        case 'COUPON_CODE_VALIDATE':
        return{
            ...prevState,
            coupon_msg:action.payload,
            coupon_value:action.coopunValue,
            coupon_id:action.coupon_id,
        }

        case "ERROR_COUPON_CODE":
        return{
            ...prevState,
            coupon_msg:action.payload,
            coupon_value:'',
            coupon_id:'',
        }

        case 'SET_DELIVERY_DATE':
        return{
            ...prevState,
            defaultAddress:action.address,
        }

        case 'FTECH_PRODUCT_LIST':
        return{
            ...prevState,
            productList:action.payload
        }

        case 'SAVED_ADDRESS':
        return{
            ...prevState,
            addressList:action.newAddressList,
            currentAddress:'',
            currentPincode:'',
        }

        case 'SEARCHING_PRODUCT':
        return{
            ...prevState,
            searchProduct:action.payload
        }

        case 'SEARCHING_PRODUCT_LIST':
        return{
            ...prevState,
            searchProductLIst:action.payload
        }

        case 'FTECH_SINGAL_PRODUCT':
        return{
            ...prevState,
            singleProdDetails:action.payload
        }

        case 'INCERASE_CART_ITEM_QTY':
        let forQtyCartProdId = action.prodVariId;
    
        let forQtyupdatedProductList = prevState.productList;
        let forQtyCartItem = prevState.cartItem;
        if(prevState.productList.length >0){
            forQtyupdatedProductList = prevState.productList.map(item => {
                    if(item.id == forQtyCartProdId){
                         item.selectedQty +=1; 
                    }

                    return item;
            });
        }  

        if(prevState.cartItem.length >0){
            forQtyCartItem = prevState.cartItem.map(item => {
                if(item.id == forQtyCartProdId){
                    item.selectedQty +=1; 
                }

            return item;
            });
        }


        return{
            ...prevState,
            cartItem:[...prevState.cartItem,addItem],
            productList:updatedProductList,
        }
        
        case 'FETCH_CART_ITEM':
        let fetchCartItem = action.payload;
        let subtotalOfGettingItems=0;
        fetchCartItem.map(item => {
            if(item.price !='' && item.selectedQty>0){
                subtotalOfGettingItems += parseFloat(item.minsp)* parseInt(item.selectedQty);
            }
        })

        return{
            ...prevState,
            cartItem:fetchCartItem,
            subtotal:subtotalOfGettingItems,
        }

        case 'ADD_TO_CART':
        let addCartProdId = action.prodVariId;
        let addItem = action.addItem[0];
        let subtotalCart = prevState.subtotal+parseFloat(addItem.minsp);
        let updatedProductList = prevState.productList;
        let updatedFeattureProd = prevState.featureProd;
        let existed_item= prevState.cartItem.find(item=> item.id === addCartProdId && item.selectedVariationID == addItem.deafultVariationId);
        if(existed_item){
            return{
                ...prevState,
            }
        }else{

            if(prevState.productList.length >0){
                updatedProductList = prevState.productList.map(item => {
                if(item.id == addCartProdId){
                    item.selectedVariationID=item.deafultVariationId;
                    item.selectedQty = parseInt(item.selectedQty)+1;
                }

                return item;
                });
            }

            if(prevState.featureProd.length >0){
                updatedFeattureProd = prevState.featureProd.map(item => {
                if(item.product == addCartProdId){
                    item.selectedVariationID=item.deafultVariationId;
                    item.selectedQty = parseInt(item.selectedQty)+1;
                }

                    return item;
                });
            }        

        return{
            ...prevState,
            subtotal:subtotalCart,
            cartItem:[...prevState.cartItem,addItem],
            productList:updatedProductList,
            featureProd:updatedFeattureProd,
        }
    }

    case 'REMOVED_CART_ITEM':
        let cartItemId = action.cartItemId;
        let cartItemDetails = (prevState.cartItem).find(item=>item.cart_item_id == cartItemId);

        let removeCartItems = prevState.cartItem;
        let subtotalOnRemoveQtyItems = prevState.subtotal;
        if(prevState.cartItem.length >0){
            subtotalOnRemoveQtyItems = parseFloat(subtotalOnRemoveQtyItems)-(parseFloat(cartItemDetails.minsp)*parseInt(cartItemDetails.selectedQty));
            removeCartItems = prevState.cartItem.filter(item=>item.cart_item_id != cartItemId);
        }


        let qtyRemoveOfProductList = prevState.productList;
        if(prevState.productList.length >0){
            qtyRemoveOfProductList = prevState.productList.map(item => {
                if(item.id == cartItemDetails.prod_id && item.deafultVariationId == cartItemDetails.selectedVariationID){
                    item.selectedQty=0;
                    item.selectedVariationID="";
                }
                return item;
            });
        }

        let qtyRemoveOfFeattureProd = prevState.featureProd;
        if(prevState.featureProd.length >0){
            qtyRemoveOfFeattureProd = prevState.featureProd.map(item => {
                if(item.product == cartItemDetails.prod_id && item.deafultVariationId == cartItemDetails.selectedVariationID){
                    item.selectedQty =0;
                    item.selectedVariationID="";
                }
                return item;
            });
        }    

        return{
            ...prevState,
            subtotal:subtotalOnRemoveQtyItems,
            cartItem:removeCartItems,
            productList:qtyRemoveOfProductList,
            featureProd:qtyRemoveOfFeattureProd,
        }


    case 'ADD_QTY_IN_CART':
        let qtyProdId = action.prodVariId;
        let qtyAction = action.action_type;
        let qtySelectedVariation = action.selectedVariationId;

        //let qtySubtotalCart = prevState+addItem.price;

        let qtyUpdatedOfProductList = prevState.productList;
        if(prevState.productList.length >0){
            qtyUpdatedOfProductList = prevState.productList.map(item => {
                //console.log(item.id+" == "+qtyProdId+" && "+item.deafultVariationId+" == "+qtySelectedVariation)
                if(item.id == qtyProdId && item.deafultVariationId == qtySelectedVariation){
                    if(qtyAction == 'add'){
                        item.selectedQty +=1;
                        //console.log("prod- IN");
                    }else{
                        item.selectedQty -=1; 
                        //console.log("prod- OUT");
                    }
                }

                return item;
            });
        }

        let qtyUpdatedOfFeattureProd = prevState.featureProd;
        if(prevState.featureProd.length >0){
            qtyUpdatedOfFeattureProd = prevState.featureProd.map(item => {
                //console.log(item.product+" == "+qtyProdId+" && "+item.deafultVariationId+" == "+qtySelectedVariation);
                if(item.product == qtyProdId && item.deafultVariationId == qtySelectedVariation){
                    if(qtyAction == 'add'){
                        item.selectedQty +=1; 
                        //console.log("Fea prod- IN",item.selectedQty);
                    }else{
                        item.selectedQty -=1; 
                        //console.log("Fea prod- out");
                    }
                }

                return item;
            });
        }

        let qtyCartItems = prevState.cartItem;
        let subtotalOnManageQtyItems = prevState.subtotal;
        if(prevState.cartItem.length >0){
            qtyCartItems = prevState.cartItem.map(item => {
                //console.log(item.prod_id+" == "+qtyProdId+" && "+item.selectedVariationID+" == "+qtySelectedVariation);
                if(item.prod_id == qtyProdId && item.selectedVariationID == qtySelectedVariation){
                    if(qtyAction == 'add'){
                        item.selectedQty =parseInt(item.selectedQty)+1;
                        subtotalOnManageQtyItems += parseFloat(item.minsp);
                        //console.log("cart in");
                    }else{
                        item.selectedQty =parseInt(item.selectedQty)-1; 
                        subtotalOnManageQtyItems -= parseFloat(item.minsp);
                        //console.log("cart fsdf");
                    }
                }

                return item;
            });
        }    

        return{
            ...prevState,
            subtotal:subtotalOnManageQtyItems,
            cartItem:qtyCartItems,
            productList:qtyUpdatedOfProductList,
            featureProd:qtyUpdatedOfFeattureProd,
        }
        

        case 'SAVED_IN_WISH':
        //let wishScreenData = action.prodId.screenName;
        let wishProdId = action.prodId.prodId;
        let updatedwishList = action.prodId.userWishList != "undefind"?action.prodId.userWishList:[];
        let wishFeatureProd = prevState.featureProd;
        if(prevState.featureProd.length >0){
            wishFeatureProd = prevState.featureProd.map(item => {
                console.log(item.product +"=="+ wishProdId)
                    if(item.product == wishProdId){
                         if(item.wish_list_id == '' || item.wish_list_id == null){
                                item.wish_list_id = "heart";
                                //console.log("not=>",item.id);
                        
                         }else{
                           item.wish_list_id = "";
                           //console.log("addd =>",item.id);
                         } 
                    }

                    return item;
            });
        }

        //console.log(prevState.featureProd.length,"Feature=>>>>>",wishFeatureProd);

        let wishProductList = prevState.productList;
        if(prevState.productList.length >0){
            wishProductList = prevState.productList.map(item => {
                    if(item.id == wishProdId){
                         if(item.isMyWish == '' || item.isMyWish == null){
                                item.isMyWish = "heart";
                        
                         }else{
                           item.isMyWish = "";
                         } 
                    }

                    return item;
            });
        }

        let wishingleProdDetails  = prevState.singleProdDetails;
        if(prevState.singleProdDetails.length >0){
            wishingleProdDetails = prevState.singleProdDetails.map(item => {
                    if(item.prodetail.id == wishProdId){
                         if(item.prodetail.is_MyWish == '' || item.prodetail.is_MyWish == null){
                            item.prodetail.is_MyWish = true;
                                console.log(item.prodetail.is_MyWish,"in")
                        
                         }else{
                                console.log(item.prodetail.is_MyWish,"out")
                                item.prodetail.is_MyWish = "";
                         } 
                    }

                    return item;
            });

        }

        return{
            ...prevState,
            featureProd:wishFeatureProd,
            productList:wishProductList,
            singleProdDetails:wishingleProdDetails,
            wishProdList:updatedwishList,
        }

        case 'REMOVE_WISH_PRODUCT':
        let removingProd = action.payload;
        let removedItem = prevState.wishProdList.filter(item=>item.id != removingProd);

        let removeWishFeatureProd = prevState.featureProd;
        if(prevState.featureProd.length >0){
            removeWishFeatureProd = prevState.featureProd.map(item => {
            if(item.product == removingProd){
                if(item.wish_list_id == '' || item.wish_list_id == null){
                    //item.wish_list_id = "heart";
                }else{
                    item.wish_list_id = "";
                }
            }

            return item;
            });
        }

        //console.log(prevState.featureProd.length,"Feature=>>>>>",wishFeatureProd);

        let removeWishProductList = prevState.productList;
        if(prevState.productList.length >0){
            removeWishProductList = prevState.productList.map(item => {
            if(item.id == removingProd){
                if(item.isMyWish == '' || item.isMyWish == null){
                    //item.isMyWish = "heart";    
                }else{
                    item.isMyWish = "";
                } 
            }
            return item;
        });

        }

        let removeWishingleProdDetails  = prevState.singleProdDetails;
        if(prevState.singleProdDetails.length >0){
            removeWishingleProdDetails = prevState.singleProdDetails.map(item => {
            if(item.prodetail.id == removingProd){
                if(item.prodetail.is_MyWish == '' || item.prodetail.is_MyWish == null){
                    //item.prodetail.is_MyWish = true;
                }else{
                    item.prodetail.is_MyWish = "";
                } 
            }

            return item;
            });
        }

        return{
            ...prevState,
            featureProd:removeWishFeatureProd,
            productList:removeWishProductList,
            singleProdDetails:removeWishingleProdDetails,
            wishProdList:removedItem,

        }

        case 'FTECH_WISH_PRODUCT':
        return{
            ...prevState,
            wishProdList:action.payload
        }
        

        default:
        return prevState;
    }
}
  
export default data;