import {combineReducers} from "redux";
import {AuthenticationReducer} from "./AuthenticationReducer";
import {UtilityReducer} from "./UtilityReducer";

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
});
