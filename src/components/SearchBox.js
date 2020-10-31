import React,{Component} from 'react'
import {View ,StyleSheet,Image,Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import constants from "../constants"
import {AddToCart} from './button'
import Icon from 'react-native-vector-icons/FontAwesome'
import {navigate} from '../navigation/NavigationServices'
import Autocomplete from 'react-native-autocomplete-input'
import {searchProducts,getSingleProduct,searchProductsList} from "../lib/data"
import { showAlertDialog} from "../constants/Utils"


const SearchBox = props => {
    
    const [data, setData] = React.useState({
        query: '',
        selectedVariation:'Select'
    });

    const findProduct=(query)=>{
        if (query === '' || query.length <= 1) {
            //if the query is null then return blank
            return [];
        }


        let serachProdName = props.data.searchProduct;
        if (serachProdName.length > 0) {
            const { productList } = serachProdName;
            //making a case insensitive regular expression to get similar value from the film json
            const regex = new RegExp(`${query.trim()}`, 'i');
            //return the filtered film array according the query from the input

            return serachProdName.filter(prod => (prod.attribute_name.search(regex) >= 0));

        } else {
            return [];
        }
    }

    const getSearchingData=(keyword)=>{
        //console.log("Component",keyword);
        if(keyword !=""){
            if(props.screenName === "SearchProductListScreen"){
                props.dispatch(searchProductsList({term:keyword}));
            }else{
                navigate(constants.Screens.SearchProductList.name,{"type":"actionType","keyword":keyword });
            }
            setData({ query: '' });
        }
    }

    const serachDropDown=(text)=>{
        setData({ query: text });
        if(text !=='' && text.length>=2){
            props.dispatch(searchProducts({term:text}));
        }
    }

    const selectValue=(prodSlug,prodId)=>{
        //showAlertDialog(prodSlug)<SearchBox screenName={"SingleProductScreenDisplay"}/>
        if(props.screenName === "SingleProductScreenDisplay"){
            props.dispatch(getSingleProduct({prod_id:prodId,attribute_slug:prodSlug}));
        }else{
            navigate(constants.Screens.SingleProduct.name,{"prodId":prodId,"type":"actionType","attribute_slug":prodSlug });
        }
        setData({ query: '' });
    }

    const { query } = data;
    const productList = findProduct(query);
    const comp = (a, b) => (a.toLowerCase().trim() === b.toLowerCase().trim());
	return (
        	<Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={styles.innerLayoutSeachBox}
                listContainerStyle={styles.dropDownListLayout}
                data={productList.length === 1 && comp(query, productList[0].attribute_name) ? [] : productList}
                defaultValue={query}
                onChangeText={text => serachDropDown(text)}
                onSubmitEditing={()=>getSearchingData(query)}
                placeholder="Search for product"
                renderItem={({ item }) => (
                    <TouchableOpacity style={{height:40,width:constants.width }}onPress={() => { selectValue(item.attribute_slug, item.id)}}>
                        <Text style={styles.itemText}>
                            {item.attribute_name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
	)
};

const styles =StyleSheet.create({
    autocompleteContainer: {
        flex:1,
        backgroundColor: constants.Colors.color_searchBox,
        borderColor:constants.Colors.color_searchBox,
        borderRightWidth: 10,
        borderLeftWidth: 10,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        zIndex: 2,
    },
    innerLayoutSeachBox:{
        // backgroundColor: constants.Colors.color_searchBox,
        borderColor:constants.Colors.color_searchBox,
        backgroundColor: constants.Colors.color_WHITE,
        // borderRightWidth: 10,
        // borderLeftWidth: 10,
        // borderTopWidth: 5,
        // borderBottomWidth: 5,
        // borderColor: constants.Colors.color_searchBox,
    },
    dropDownListLayout:{
        alignSelf:'center',
        width:constants.width
        
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
  },
});

function mapDispatchToProps(dispatch) {
    return({
        dispatch
    })
}

function mapStateToProps(state){
    let auth = state.auth;
    let indicator = state.indicator;
    let data = state.data;
    let error = state.error;
    return {
        auth,indicator,data,error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);