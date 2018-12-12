import {Possession} from "../state/Possession";
import {ActionType, AppAction} from "../actions/Helpers";

export const PossessionReducer = (state: Possession[] = [], action: AppAction): Possession[] => {
    switch (action.type) {
        case ActionType.FETCH_POSSESSIONS:
            return action.payload.map((good: any) => { return new Possession(
                {
                    id: good.goodId,
                    name: good.goodId,
                    imageUrl: good.photos.length > 0 ? good.photos[0] : "https://www.freeiconspng.com/uploads/no-image-icon-4.png",
                    description: good.description
                })
            });
        default:
            return state;
    }
};