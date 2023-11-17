import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const POST_EXCHANGES = 'exchange/POST_EXCHANGES';
export const GET_EXCHANGES = 'exchange/GET_EXCHANGES';
export const GET_EXCHANGE = 'exchange/GET_EXCHANGE';
export const GET_USER_EXCHANGES = 'exchange/GET_USER_EXCHANGES';
export const GET_EXCHANGE_DETAIL_U = 'exchange/GET_EXCHANGE_DETAIL_U';
export const PUT_EXCHANGES = 'exchange/PUT_EXCHANGES';
export const GET_POINTS_HISTORY = 'exchange/GET_POINTS_HISTORY';

const actions = createAction({
    [POST_EXCHANGES]: () => {},
    [GET_EXCHANGES]: () => {},
    [GET_EXCHANGE]: () => {},
    [GET_USER_EXCHANGES]: () => {},
    [GET_EXCHANGE_DETAIL_U]: () => {},
    [PUT_EXCHANGES]: () => {},
    [GET_POINTS_HISTORY]: () => {}
});

const exchangeReducer = handleActions(
    {
        [POST_EXCHANGES]: (state, {payload}) => {
            return payload;
        },
        [GET_EXCHANGES]: (state, {payload}) => {
            return payload;
        },
        [GET_EXCHANGE]: (state, {payload}) => {
            return payload;
        },
        [GET_USER_EXCHANGES]: (state, {payload}) => {
            return payload;
        },
        [GET_EXCHANGE_DETAIL_U]: (state, {payload}) => {
            return payload;
        },
        [PUT_EXCHANGES]: (state, {payload}) => {
            return payload;
        },
        [GET_POINTS_HISTORY]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default exchangeReducer;