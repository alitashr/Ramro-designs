import { cartType } from "../../interfaces/design";
import { cartActions } from "./cartActions";

const initialState: cartType = {
  designs: null,
};

interface Action {
  type: keyof cartActions;
  payload: any;
}

const cartReducer = (state: cartType= initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case cartActions.ADD_TO_CART:
      return setDesignsInCart(state, payload) ;
    default:
      return state;
  }
};

export default cartReducer;

const setDesignsInCart = (state: cartType, payload:any)=>{
  return { ...state, designs: payload}
}