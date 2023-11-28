import { createActions, handleActions } from "redux-actions";

const initialState= {};

const GET_SUPPORTBOT_LIST = 'supportbot/GET_SUPPORTBOT_LIST';
const GET_SUPPORTBOT_ANSWER = 'supportbot/GET_SUPPORTBOT_ANSWER';

export const { supportbot: { getSupportbotList, getSupportbotAnswer }} = createActions({
    [GET_SUPPORTBOT_LIST]: (res) => ({ supportbotDataList: res }),
    [GET_SUPPORTBOT_ANSWER]: (res) => ({ supportbotAnswer: res })
});

const supportbotReducer = handleActions(
    {
        [GET_SUPPORTBOT_LIST]: (state, { payload }) => {
            return payload;
        },
        [GET_SUPPORTBOT_ANSWER]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default supportbotReducer;