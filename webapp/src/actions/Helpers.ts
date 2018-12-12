import {Action} from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    FETCH_POSSESSIONS,
    FETCH_TRANSACTIONS
}

export interface AppAction extends Action<ActionType> {
    payload?: any;
}
