import {Model} from "./Helpers";

export interface INotification {
    id?: number;
    subject?: string;
    seen?: boolean;
}

const NotificationModel = Model<INotification>({
    id: null,
    subject: null,
    seen: null
});

export class Notification extends NotificationModel {
    public id: number;
    public subject: string;
    public seen: boolean;
}
