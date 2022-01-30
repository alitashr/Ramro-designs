import { Dispatch } from "redux";
import { fileItem} from "../../interfaces/design";

export enum cartActions{
  ADD_TO_CART="ADD_TO_CART",
  REMOVE_FROM_CART= "REMOVE_FROM_CART"
}

const _addToCart = (payload:fileItem)=>{
   return {
     type: cartActions.ADD_TO_CART,
     payload: payload
   }
}
const _removeFromCart = (payload:fileItem)=>{
  return {
    type: cartActions.REMOVE_FROM_CART,
    payload: payload
  }
}
export const AddToCart = (payload:any) => {
  return (dispatch: Dispatch) => {
    dispatch(_addToCart(payload));
  };
};

export const RemoveFromCart = (fileItem: fileItem)=>{
  return (dispatch: Dispatch) => {
    dispatch(_removeFromCart(fileItem));
  };
}
