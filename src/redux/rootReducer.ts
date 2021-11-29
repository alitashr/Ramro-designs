import {combineReducers} from "redux";
import designReducer from "./Design/designReducer";
import cartReducer from "./Cart/cartReducer";


const rootReducer = combineReducers({
  design: designReducer,
  cart: cartReducer
})

export default rootReducer;

export type RootReducerState = ReturnType<typeof rootReducer>