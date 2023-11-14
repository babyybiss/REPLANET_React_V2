import { createActions,handleActions } from "redux-actions";

// initial state value
const initialState = {};

// declare action type
export const GET_REVIEWS = 'review/GET_REVIEWS';
export const GET_REVIEW = 'review/GET_REVIEW';
export const POST_REVIEW = 'review/POST_REVIEW';
export const GET_SEARCH_RESULT = 'review/GET_SEARCH_RESULT';
export const GET_COMPLETED_CAMPAIGNS = 'review/GET_COMPLETED_CAMPAIGNS';
export const GET_THUMBNAIL_PATH = 'review/GET_THUMBNAIL_PATH';
export const PUT_REVIEW = 'review/PUT_REVIEW';
export const DELETE_REVIEW = 'review/DELETE_REVIEW';


 //declare action function
export const { review: {getReviews,getReview, postReview, getSearchResult, getCompletedCampaigns, getThumbnailPath, putReview, deleteReview } } = createActions({
    [GET_REVIEWS] : (res) => ({ reviewList: res }),
    [GET_REVIEW] : (res) => ({ review : res }),
    [POST_REVIEW] : (res) => ({ regist: res }),
    [GET_SEARCH_RESULT] : (res) => ({ reviewList: res}),
    [GET_COMPLETED_CAMPAIGNS] : (res) => ({ completedCampaignList: res}),
    [GET_THUMBNAIL_PATH] : (res) => ({ thumbnail : res}),
    [PUT_REVIEW] : (res) => ({ update: res }),
    [DELETE_REVIEW] : (res) => ({ delete: res }),
});

// declare reducer function
const reviewReducer = handleActions(

    {
        [GET_REVIEWS] : (state, {payload}) => {
        console.log('(Review reducer: GET_REVIEWS) 들어옴');

        return payload;
        },
        [GET_REVIEW] : (state, { payload }) => {
            console.log('(Review reducer: GET_REVIEW) 들어옴');
            return payload;
        },
        [POST_REVIEW] : (state, {payload}) => {
            console.log('(Review reducer: POST_REVIEW) 들어옴');
            return payload;
        },
        [GET_SEARCH_RESULT] : (state, {payload}) => {
            console.log('Review reducer: GET_SEARCH_RESULT 들어옴');
            return payload;
        },
        [GET_COMPLETED_CAMPAIGNS] : (state, {payload}) => {
            console.log('Review reducer: GET_COMPLETED_CAMPAIGNS 들어옴');
            return payload;
        },
        [GET_THUMBNAIL_PATH] : (state, {payload}) => {
            console.log('Review reducer: GET_THUMBNAIL_PATH 들어옴');
            console.log(payload)
            return payload;
        },
        [PUT_REVIEW] : (state, {payload}) => {
            console.log('Review reducer: PUT_REVIEW 들어옴');
            return payload;
        },
        [DELETE_REVIEW] : (state, {payload}) => {
            console.log('Review reducer: DELETE_REVIEW 들어옴');
            return payload;
        }

    },
    initialState
);

export default reviewReducer;