import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_BOOKMARK = 'campaign/GET_BOOKMARK';
export const POST_BOOKMARK = 'campaign/POST_BOOKMARK';
export const GET_BOOKMARK_STATUS = 'campaign/GET_BOOKMARK_STATUS';


export const { campaign: { postBookmark, getBookmark, getBookmarkStatus }} = createActions({
    [GET_BOOKMARK]: (res ) => ({bookmark : res}),
    [POST_BOOKMARK]: (res ) => ({book : res}),
    [GET_BOOKMARK_STATUS]: ( ) => {}
})

const bookmarkReducer = handleActions(
    {
        [GET_BOOKMARK]: (state, {payload}) => {return payload},
        [POST_BOOKMARK]: (state, {payload}) => {return payload},
        [GET_BOOKMARK_STATUS]: (state, {payload}) => ({
            ...state,
        getBookmarkStatus: payload}),
    }, initialState
);

export default bookmarkReducer;
