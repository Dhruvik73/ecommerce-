import getproducts from "./getproducts";
import { combineReducers } from "redux";
import getotp from "./getotp";
const rootReducer=combineReducers({
    getproducts,
    getotp
})
export default rootReducer