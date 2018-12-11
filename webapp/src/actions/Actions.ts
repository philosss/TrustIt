import {match} from "react-router";
import {Utility} from "../state/Utility";
import {User} from "../state/User";
import {Notification} from "../state/Notification";
import {Possession} from "../state/Possession";
import {AppAction, ActionType} from "./Helpers";
import axios from "axios";

export interface ApplicationProps {
    openDrawer: () => AppAction;
    closeDrawer: () => AppAction;
    login: (data: any) => any;
    logout: () => AppAction;
    fetchPossessions: (traderId: string) => any;
    match: match<any>,
    location: any,
    history: any,
    utility: Utility;
    authentication: User;
    notifications: Notification[];
    possessions: Possession[];
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

export const login = (data: any): any => {
    return (dispatch: any) => {
        return axios.get("http://localhost:3000/api/Person")
            .then((response) => {
                for (const person of response.data) {
                    if (person.email === data.email) {
                        dispatch({type: ActionType.LOGIN_SUCCESS, payload: person});
                        return;
                    }
                }
                dispatch({type: ActionType.LOGIN_FAIL});
            })
    };
};

export const logout = (): AppAction => {
    return {type: ActionType.LOGOUT_REQUEST};
};

export const fetchPossessions = (traderId: string): any => {
    return (dispatch: any) => {
        console.log(traderId);
        return axios.get("http://localhost:3000/api/Good?" + "{\"where\": {\"owner\": \"resource:org.upm.trustit.network.Person#" + traderId + "}}")
            .then((response) => {
                console.log(response.data);
                dispatch({type: ActionType.FETCHED_POSSESSIONS});
            });
    };
};
