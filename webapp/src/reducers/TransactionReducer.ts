import {Possession} from "../state/Possession";
import {ActionType, AppAction} from "../actions/Helpers";
import {Transaction} from "../state/Transaction";

export const TransactionReducer = (state: Possession[] = [], action: AppAction): Possession[] => {
    switch (action.type) {
        case ActionType.FETCH_TRANSACTIONS:
            return action.payload.map((trade: any) => { return new Transaction(
                {
                    goodId: trade.good.split('#').pop(),
                    transactionId: trade.transactionId.substring(0, 20),
                    ownerId: trade.newOwner.split('.').pop(),
                    price: trade.price,
                    date: trade.date,
                    timestamp: trade.timestamp
                })
            });
        default:
            return state;
    }
};
