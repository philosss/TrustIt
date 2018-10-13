import {AppState} from "../state/AppState";
import {Possession} from "../state/Possession";
import {createSelector} from "reselect";

const possessionSelector = (state: AppState) => state.possessions;

export const getPossessions = createSelector(possessionSelector, () => {
    return [
        new Possession(
            {
                id: 1,
                name: "Bike",
                imageUrl: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                description: "Lorem ipsum",
                since: new Date()
            }),
        new Possession(
            {
                id: 2,
                name: "Laptop",
                imageUrl: "https://img.purch.com/o/aHR0cHM6Ly93d3cubGFwdG9wbWFnLmNvbS9pbWFnZXMvdXBsb2Fkcy80NjE0L2cvaHAtZW52eS0xMy0wMDEuanBn",
                description: "Lorem ipsum",
                since: new Date()
            }),
        new Possession(
            {
                id: 3,
                name: "iPhone",
                imageUrl: "https://boygeniusreport.files.wordpress.com/2017/01/iphone-71.jpg?quality=98&strip=all&w=782",
                description: "Lorem ipsum",
                since: new Date()
            }),
    ];
});
