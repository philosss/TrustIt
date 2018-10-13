import {Model} from "./Helpers";

export interface IPossession {
    id?: number;
    name?: string;
    imageUrl?: string;
    description?: string;
    since?: Date;
}

const PossessionModel = Model<IPossession>({
    id: null,
    name: null,
    imageUrl: null,
    description: null,
    since: null
});

export class Possession extends PossessionModel {
    public id: number;
    public name: string;
    public imageUrl: string;
    public description: string;
    public since: Date;
}
