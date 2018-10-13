import {AppState} from "../state/AppState";
import {Notification} from "../state/Notification"
import {createSelector} from "reselect";

const notificationSelector = (state: AppState) => state.notifications;

export const getNotifications = createSelector(notificationSelector, () => {
    return [new Notification({id: 1, subject: "Subject1", seen: false}), new Notification({id: 2, subject: "Subject2", seen: false})];
});
