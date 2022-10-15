import * as types from "./types";

function ProductReducer(state, action) {
  switch (action.type) {
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        loading_error: action.payload,
      };

    default:
      return state;
  }
}

export default ProductReducer;
