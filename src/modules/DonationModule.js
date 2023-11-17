import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_PAYS_BY_MEMBER_WITH_DATE = 'donations/GET_PAYS_BY_MEMBER_WITH_DATE'
export const GET_DONATION_BY_PAY_CODE = 'donations/GET_DONATION_BY_PAY_CODE'
export const GET_DONATION_BY_CAMPAIGN_CODE = 'donations/GET_DONATION_BY_CAMPAIGN_CODE'
export const POST_POINT_DONATION = 'donations/POST_POINT_DONATION'
export const RESET_PAY_CODE = 'donations/RESET_PAY_CODE'

const actions = createActions({
    [GET_PAYS_BY_MEMBER_WITH_DATE]: () => {},
    [GET_DONATION_BY_PAY_CODE]: (payTid) => ({ payTid }),
    [GET_DONATION_BY_CAMPAIGN_CODE]: (participation) => ({ participation }),
    [POST_POINT_DONATION]: (data) => ({ data }),
    [RESET_PAY_CODE]: () => {},
});

const donationReducer = handleActions(
    {
        [GET_PAYS_BY_MEMBER_WITH_DATE]: (state, { payload }) => {
            console.log('(donationReducer) [GET_PAYS_BY_MEMBER_WITH_DATE] payload : ', payload);
            return payload;
        },
        [GET_DONATION_BY_PAY_CODE]: (state, { payload }) => {
            console.log('(donationReducer) [GET_DONATION_BY_PAY_CODE] payload : ', payload);
            return payload;
        },
        [GET_DONATION_BY_CAMPAIGN_CODE]: (state, { payload }) => {
            console.log('(donationReducer) [GET_DONATION_BY_CAMPAIGN_CODE] payload : ', payload);
            return payload;
        },
        [POST_POINT_DONATION]: (state, { payload }) => {
            console.log('(donationReducer) [POST_POINT_DONATION] payload : ', payload);
            return payload;
        },
        [RESET_PAY_CODE]: (state, action) => {
            console.log('[RESET_PAY_CODE] 동작');
            return initialState;
        }
    },
    initialState
);

export default donationReducer;