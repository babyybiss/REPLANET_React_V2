import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_MEMBER_BY_TOKEN = 'members/GET_MEMBER_BY_TOKEN'

const actions = createActions({
    [GET_MEMBER_BY_TOKEN]: () => {},
});

const memberReducer = handleActions(
    {
        [GET_MEMBER_BY_TOKEN]: (state, { payload }) => {
            console.log('(memberReducer) [GET_MEMBER_BY_TOKEN] payload : ', payload);
            return payload;
        }
    },
    initialState
);

export default memberReducer;