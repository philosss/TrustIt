import {match} from "react-router";
import {Utility} from "../state/Utility";
import {User} from "../state/User";
import {Notification} from "../state/Notification";
import {AppAction, ActionType} from "./Helpers";

export interface ApplicationProps {
    openDrawer: () => AppAction;
    closeDrawer: () => AppAction;
    login: (data: any) => AppAction;
    logout: () => AppAction;
    match: match<any>,
    location: any,
    history: any,
    utility: Utility;
    authentication: User;
    notifications: Notification[];
}

export const openDrawer = (): AppAction => {
    return {
        type: ActionType.OPEN_DRAWER
    };
};

export const closeDrawer = (): AppAction => {
    return {
        type: ActionType.CLOSE_DRAWER
    };
};

export const login = (data: any): AppAction => {
    return {type: ActionType.LOGIN_REQUEST, payload: data};
};

export const logout = (): AppAction => {
    return {type: ActionType.LOGOUT_REQUEST};
};
