import { createActions, handleActions } from "redux-actions";

const initialState= {};

const GET_SUPPORTBOTLIST = 'supportbot/GET_SUPPORTBOTLIST';

export const { supportbot: { getSupportbotlist }} = createActions({
    [GET_SUPPORTBOTLIST]: (res) => ({ supportbotDataList: res })
});

const supportbotReducer = handleActions(
    {
        [GET_SUPPORTBOTLIST]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default supportbotReducer;