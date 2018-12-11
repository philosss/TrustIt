import {AppState} from "../state/AppState";
import {Notification} from "../state/Notification";
import {createSelector} from "reselect";

const notificationSelector = (state: AppState) => state.notifications;

export const getNotifications = createSelector(notificationSelector, () => {
    return [new Notification({id: 1, subject: "Welcome to TrustIt!", seen: false})];
});
