import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_EXCHANGES = 'exchange/GET_EXCHANGES';
export const GET_EXCHANGE = 'exchange/GET_EXCHANGE'

const actions = createAction({
    [GET_EXCHANGES]: () => {},
    [GET_EXCHANGE]: () => {}
});

const exchangeReducer = handleActions(
    {
        [GET_EXCHANGES]: (state, {payload}) => {
            return payload;
        },
        [GET_EXCHANGE]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default exchangeReducer;