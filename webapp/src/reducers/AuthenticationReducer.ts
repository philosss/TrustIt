import {AppAction, ActionType} from "../actions/Helpers";
import {User} from "../state/User";

export const AuthenticationReducer = (state: User = null, action: AppAction): User => {
    switch (action.type) {
        case ActionType.LOGIN_SUCCESS:
            console.log("User " + action.payload.email + " logged in.");
            return new User({
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                imageUrl: action.payload.imageUrl,
                traderId: action.payload.traderId,
                roles: ['Admin']});
        case ActionType.LOGIN_FAIL:
            console.log("Failed to log in.");
            return null;
        case ActionType.LOGOUT_REQUEST:
            return null;
        default:
            return state;
    }
};
