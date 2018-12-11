import {Model} from "./Helpers";

export interface IUser {
    email?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    traderId?: string;
    roles?: string[];
}

const UserModel = Model<IUser>({
    email: null,
    firstName: null,
    lastName: null,
    imageUrl: null,
    traderId: null,
    roles: null
});

export class User extends UserModel {
    public email: string;
    public firstName: string;
    public lastName: string;
    public imageUrl: string;
    public traderId: string;
    public roles: string[];
}
