import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORG_INFORMATION = 'organization/GET_ORG_INFORMATION'
export const POST_ORG_INFORMATION = 'organixation/POST_ORG_INFORMATION'

const actions = createAction({
    [GET_ORG_INFORMATION]: () => {},
    [POST_ORG_INFORMATION]: () => {}
});

const orgReducer = handleActions(
    {
        [GET_ORG_INFORMATION]: (state, {payload}) => {
            return payload;
        },
        [POST_ORG_INFORMATION]: (state, {payload}) => {
            return payload;
        }
    },
    initialState
);
export default orgReducer;