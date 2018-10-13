import {AppAction, ActionType} from "../actions/Helpers";
import {User} from "../state/User";

export const AuthenticationReducer = (state: User = null, action: AppAction): User => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return new User({email: action.payload.email, name: 'Some user', roles: ['Admin']});
        case ActionType.LOGOUT_REQUEST:
            return null;
        default:
            return state;
    }
};
