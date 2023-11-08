import { createAction, handleAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_EXCHANGES = 'exchange/GET_EXCHANGES';

const action = createAction({
    [GET_EXCHANGES]: () => {}
});

const exchangeReducer = handleActions(
    {
        [GET_EXCHANGES]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default exchangeReducer;