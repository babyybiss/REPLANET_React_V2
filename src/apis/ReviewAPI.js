import axios from "axios";
import { json } from "react-router-dom";
import { useEffect } from "react";
import { GET_REVIEWS } from "../modules/ReviewModule";
import { getReviews } from "../modules/ReviewModule";
import { getReview } from "../modules/ReviewModule";
import { postReview } from "../modules/ReviewModule";
import { getSearchResult } from "../modules/ReviewModule";

const DOMAIN = 'http://localhost:8001'

const request = async (method, url, data) => {
    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data
    })
    .then(res => res.data)
    .catch(error => console.log(error));
};


export function callGetReviewsAPI() {

    return async(dispatch, getState) => {

        const result = await request('GET', '/reviews/');
        console.log('getReviewList result: ', result);

        dispatch(getReviews(result));
    }
}

    /*
    return async function getReview(dispatch, getState) {
        try { 
            const result = await axios.get(requestUrl);
        
            console.log('(ReviewAPI) callGetReviewsAPI result : ', result.data);

            dispatch(getReviews(result.data));

        } catch (error) {
            // Handle errors, e.g., dispatch an error action
            console.error('Error in callGetReviewsAPI:', error);
        }
    };
}
*/

export function callGetSpecificReviewAPI(campaignCode) {
    console.log('getSpecificReview call...');

    return async (dispatch, getState) => {

        const result = await request('GET', `/reviews/${campaignCode}`);
        console.log('getSpecificReview result: ', result);

        dispatch(getReview(result));
    }
}

export function callPostReview(reviewTitle, convertedContent, campaignCode) {
    const description = convertedContent;

    console.log('callPostReview ... : ' , reviewTitle, '    and?!?!?!   ', description, '    and?!?!?!   ', campaignCode);
    
    return async (dispatch, getState) => {

        const data = {
            reviewTitle,
            description,
            campaignCode
        };

        const result = await request('POST', `/reviews/`, data);
        console.log(data);

        dispatch(postReview(result));
    }
}

export function callGetReviewsBySearchFilter(searchFilter) {

    console.log('callGetReviewsBySearchResultFilter : ', searchFilter);

    return async (dispatch, getState) => {
        
        const result = await request('GET', `/reviews?sort=${searchFilter}`);

        dispatch(getSearchResult(result));
    }
}