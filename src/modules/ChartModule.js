import { createActions, handleActions } from "redux-actions";

const initialState = {};

/* action type */
const GET_CATEGORY_DATA = 'chart/GET_CATEGORY_DATA';
const GET_DONATION_TIME = 'chart/GET_DONATION_TIME';
const GET_CURRENT_YEAR = 'chart/GET_CURRENT_YEAR';

/* action function */ 
export const { chart : { getCategoryData, getDonationTime, getCurrentYear }} = createActions({
    [GET_CATEGORY_DATA]: (res) => ({ byCategory: res.results.categoryData }),
    [GET_DONATION_TIME]: (res) => ({ donationTimeData: res.results.donationByTimeData
    }),
    [GET_CURRENT_YEAR]: (res) => ({ currentYearData: res.results.currentYearData
    })
});

/* reducer */ 
const chartReducer = handleActions(
    {
        [GET_CATEGORY_DATA]: (_, { payload }) => {
            return payload;
        },
        [GET_DONATION_TIME]: (_, { payload }) => {
            return payload;
        },
        [GET_CURRENT_YEAR]: (_, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default chartReducer;