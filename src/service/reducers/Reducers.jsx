import { ADD_TO_CART } from "../Constants";

const initialState = {
  cartData: [],
};

export const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, { cartData: action.data }];
    default:
      return state;
  }
};
