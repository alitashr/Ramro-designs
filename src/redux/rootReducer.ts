import {combineReducers} from "redux";
import designReducer from "./Design/designReducer";

const rootReducer = combineReducers({
  design: designReducer
})

export default rootReducer