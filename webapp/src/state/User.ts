import {Model} from "./Helpers";

export interface IUser {
    email?: string;
    name?: string;
    roles?: string[];
}

const UserModel = Model<IUser>({
    email: null,
    name: null,
    roles: null
});

export class User extends UserModel {
    public email: string;
    public name: string;
    public roles: string[];
}
