import {Model} from "./Helpers";

export interface ITransaction {
    goodId?: string;
    transactionId?: string;
    ownerId?: string;
    price?: number;
    date?: Date;
    timestamp?: Date;
}

const TransactionModel = Model<ITransaction>({
    goodId: null,
    transactionId: null,
    ownerId: null,
    price: null,
    date: null,
    timestamp: null
});

export class Transaction extends TransactionModel {
    public goodId: string;
    public transactionId: string;
    public ownerId: string;
    public price: number;
    public date: Date;
    public timestamp: Date;
}
