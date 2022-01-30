import { cartType } from "../../interfaces/design";
import { cartActions } from "./cartActions";

const initialState: cartType = {
  designs: [],
};

interface Action {
  type: keyof cartActions;
  payload: any;
}

const cartReducer = (state: cartType = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case cartActions.ADD_TO_CART:
      return addItemToCart(state, payload);
    case cartActions.REMOVE_FROM_CART:
      return removeItemFromCart(state, payload);
    default:
      return state;
  }
};

export default cartReducer;

const addItemToCart = (state: cartType, payload: any) => {
  return { ...state, designs: [...state.designs, payload] };
};

const removeItemFromCart = (state: cartType, payload: any) => {
  const designs = state.designs;
  if (!designs.length || !payload) {
    return { ...state };
  } else {
    const toRemove = designs.find((item) => item.fullPath === payload.fullPath);
    const newList = designs.filter((item) => item !== toRemove);
    console.log("removeItemFromCart -> newList", newList);
    return { ...state, designs: newList };
  }
};
