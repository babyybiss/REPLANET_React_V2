import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const DELETE_USER_WITHDRAW = 'user/DELETE_USER_WITHDRAW'
export const GET_VERIFY_USER = 'user/GET_VERIFY_USER'
export const PUT_MODIFY_USER = 'user/PUT_MODIFY_USER'

const actions = createAction({
    [DELETE_USER_WITHDRAW]: () => {},
    [GET_VERIFY_USER]: () => {},
    [PUT_MODIFY_USER]: () => {}
});

const userReducer = handleActions(
    {
        [DELETE_USER_WITHDRAW]: (state, {payload}) => {
            return payload;
        },
        [GET_VERIFY_USER]: (state, {payload}) => {
            return payload;
        },
        [PUT_MODIFY_USER]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);
export default userReducer;