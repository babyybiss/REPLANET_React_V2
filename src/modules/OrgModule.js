import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORG_INFORMATION = 'organization/GET_ORG_INFORMATION'
export const POST_ORG_INFORMATION = 'organization/POST_ORG_INFORMATION'
export const PUT_ORG_WITHDRAW = 'organization/PUT_ORG_WITHDRAW'

const actions = createAction({
    [GET_ORG_INFORMATION]: () => {},
    [POST_ORG_INFORMATION]: () => {},
    [PUT_ORG_WITHDRAW]: () => {}
});

const orgReducer = handleActions(
    {
        [GET_ORG_INFORMATION]: (state, {payload}) => {
            return payload;
        },
        [POST_ORG_INFORMATION]: (state, {payload}) => {
            return payload;
        },
        [PUT_ORG_WITHDRAW]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);
export default orgReducer;