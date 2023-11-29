import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_MEMBER_BY_TOKEN = 'members/GET_MEMBER_BY_TOKEN'
export const GET_ORGS = 'members/GET_ORGS'
export const PUT_WITHDRAW_ORG = 'members/PUT_WITHDRAW_ORG'

const actions = createActions({
    [GET_MEMBER_BY_TOKEN]: () => {},
    [GET_ORGS]: () => {},
    [PUT_WITHDRAW_ORG]: () => {},
});

const memberReducer = handleActions(
    {
        [GET_MEMBER_BY_TOKEN]: (state, { payload }) => {
            console.log('(memberReducer) [GET_MEMBER_BY_TOKEN] payload : ', payload);
            return payload;
        },
        [GET_ORGS]: (state, { payload }) => {
            console.log('(memberReducer) [GET_ORGS] payload : ', payload);
            return payload;
        },
        [PUT_WITHDRAW_ORG]: (state, { payload }) => {
            console.log('(memberReducer) [PUT_WITHDRAW_ORG] payload : ', payload);
            return payload;
        },
    },
    initialState
);

export default memberReducer;