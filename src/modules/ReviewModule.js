import { createActions,handleActions } from "redux-actions";

// initial state value
const initialState = {};

// declare action type
export const GET_REVIEWS = 'review/GET_REVIEWS';
export const GET_REVIEW = 'review/GET_REVIEW';

 //declare action function
export const { review: {getReviews,getReview} } = createActions({
    [GET_REVIEWS] : (res) => ({ reviewList: res }),
    [GET_REVIEW] : (res) => ({ review : res })
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
        }
    },
    initialState
);

export default reviewReducer;