import { Dispatch } from "redux";
import { fileItem} from "../../interfaces/design";

export enum cartActions{
  ADD_TO_CART="ADD_TO_CART",
  REMOVE_FROM_CART= "REMOVE_FROM_CART"
}

const addToCart = (payload:fileItem[])=>{
   return {
     type: cartActions.ADD_TO_CART,
     payload: payload
   }
}

export const AddToCart = (cartItems: fileItem[])=>{
console.log("AddToCart -> cartItems", cartItems)
  return (dispatch: Dispatch)=>{
    dispatch(addToCart(cartItems))
  }
}