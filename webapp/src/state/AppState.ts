import {connectedRouterRedirect} from "redux-auth-wrapper/history4/redirect";
import {Utility} from "./Utility";
import {Model} from "./Helpers";
import {Possession} from "./Possession";
import {Notification} from "./Notification";
import {User} from "./User";

export interface IAppState {
    utility?: Utility;
    authentication?: User;
    possessions?: Possession[];
    notifications?: Notification[];
}

export const AppStateModel = Model<IAppState>({
    utility: new Utility(),
    authentication: null,
    possessions: [],
    notifications: []
});

export class AppState extends AppStateModel {
    public utility: Utility;
    public authentication: User;
    public possessions: Possession[];
    public notifications: Notification[];
}

export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => state.authentication !== null,
    wrapperDisplayName: 'Authenticated'
}) as any;