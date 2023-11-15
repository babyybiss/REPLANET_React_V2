import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_EXCHANGES = 'exchange/GET_EXCHANGES';
export const GET_EXCHANGE = 'exchange/GET_EXCHANGE';
export const GET_USER_EXCHANGES = 'exchange/GET_USER_EXCHANGES';
export const GET_EXCHANGE_DETAIL_U = 'exchange/GET_EXCHANGE_DETAIL_U';

const actions = createAction({
    [GET_EXCHANGES]: () => {},
    [GET_EXCHANGE]: () => {},
    [GET_USER_EXCHANGES]: () => {},
    [GET_EXCHANGE_DETAIL_U]: () => {}
});

const exchangeReducer = handleActions(
    {
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
        }
    },
    initialState
);

export default exchangeReducer;