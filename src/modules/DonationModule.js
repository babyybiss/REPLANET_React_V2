import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_GET_PAYS = 'donations/GET_PAYS'
export const GET_PAYS_BY_DATE_RANGE = 'donations/GET_PAYS_BY_DATE_RANGE'
export const GET_DONATIONS_BY_MEMBER = 'donations/GET_DONATIONS_BY_MEMBER'
export const GET_DONATION_BY_PAY_CODE = 'donations/GET_DONATION_BY_PAY_CODE'
export const GET_POINT_OF_MEMBER = 'donations/GET_POINT_OF_MEMBER'

const actions = createActions({
    [GET_GET_PAYS]: () => {},
    [GET_PAYS_BY_DATE_RANGE]: () => {},
    [GET_DONATIONS_BY_MEMBER]: (memberCode) => ({ memberCode }),
    [GET_DONATION_BY_PAY_CODE]: (payTid) => ({ payTid }),
    [GET_POINT_OF_MEMBER]: (memberCode) => ({ memberCode }),
});

const donationReducer = handleActions(
    {
        [GET_GET_PAYS]: (state, { payload }) => {
            console.log('(donationReducer) [GET_GET_PAYS] payload : ', payload);
            return payload;
        },
        [GET_PAYS_BY_DATE_RANGE]: (state, { payload }) => {
            console.log('(donationReducer) [GET_PAYS_BY_DATE_RANGE] payload : ', payload);
            return payload;
        },
        [GET_DONATIONS_BY_MEMBER]: (state, { payload }) => {
            console.log('(donationReducer) [GET_DONATIONS_BY_MEMBER] payload : ', payload);
            return payload;
        },
        [GET_DONATION_BY_PAY_CODE]: (state, { payload }) => {
            console.log('(donationReducer) [GET_DONATION_BY_PAY_CODE] payload : ', payload);
            return payload;
        },
        [GET_POINT_OF_MEMBER]: (state, { payload }) => {
            console.log('(donationReducer) [GET_POINT_OF_MEMBER] payload : ', payload);
            return payload;
        }
    },
    initialState
);

export default donationReducer;