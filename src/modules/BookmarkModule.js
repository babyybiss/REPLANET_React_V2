import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_BOOKMARK = 'campaign/GET_BOOKMARK';
export const POST_BOOKMARK = 'campaign/POST_BOOKMARK';


export const { campaign: { postBookmark, getBookmark }} = createActions({
    [GET_BOOKMARK]: (res ) => ({bookmark : res}),
    [POST_BOOKMARK]: (res ) => ({book : res}),
})

const bookmarkReducer = handleActions(
    {
        [GET_BOOKMARK]: (state, {payload}) => {return payload},
        [POST_BOOKMARK]: (state, {payload}) => {return payload},
    }, initialState
);

export default bookmarkReducer;
