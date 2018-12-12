import {combineReducers} from "redux";
import {AuthenticationReducer} from "./AuthenticationReducer";
import {UtilityReducer} from "./UtilityReducer";
import {PossessionReducer} from "./PossessionReducer";

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
    possessions: PossessionReducer,
});
