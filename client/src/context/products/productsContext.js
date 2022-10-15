import React, { createContext, useReducer } from "react";
import * as types from "./types";
import ProductReducer from "./productsReducer";
import {
  getProducts as getProductsService,
} from "../../services/products";

const INITIAL_STATE = {
  loading: false,
  products: [],
  loading_error: "",

};

export const productsContext = createContext(INITIAL_STATE);

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);

  async function getProducts() {
    dispatch({
      type: types.GET_PRODUCTS_REQUEST
    })
    const data = await getProductsService();
    console.log('DaTA: ', data)
    if(data.success) {
      dispatch({
        type: types.GET_PRODUCTS_SUCCESS,
        payload: data.data
      })
    }else{
      dispatch({
        type: types.GET_PRODUCTS_FAILURE,
        payload: 'Failed to get products'
      })
    }
  }


  return (
    <productsContext.Provider value={{
      getProducts,
      products: state.products,
      loading: state.loading,
    }}>
      {children}
    </productsContext.Provider>
  );
};
