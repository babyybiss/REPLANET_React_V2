import axios from "axios";
import { json } from "react-router-dom";
import { useEffect } from "react";
import { GET_REVIEWS } from "../modules/ReviewModule";
import { getReviews } from "../modules/ReviewModule";
import { getReview } from "../modules/ReviewModule";
import { postReview } from "../modules/ReviewModule";
import { getSearchResult } from "../modules/ReviewModule";
import { getCompletedCampaigns } from "../modules/ReviewModule";
import { getThumbnailPath } from "../modules/ReviewModule";
import { putReview } from "../modules/ReviewModule";
import { deleteReview } from "../modules/ReviewModule";
import { getMemberCode } from "../modules/ReviewModule";
import { postReviewComment } from "../modules/ReviewModule";
import { getReviewComments } from "../modules/ReviewModule";
import { deleteReviewComment } from "../modules/ReviewModule";


const DOMAIN = 'http://localhost:8001'
const requestURL = 'http://localhost:8001/reviews/';

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

export function callGetCompletedCampaign() {

    return async(dispatch, getState) => {

        const result = await request('GET', '/done');
        console.log('getCompletedReviewList result: ', result);

        dispatch(getCompletedCampaigns(result))
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

export function callGetSpecificReviewAPI(reviewCode) {
    console.log('getSpecificReview call...');

    return async (dispatch, getState) => {

        const result = await request('GET', `/reviews/${reviewCode}`);
        console.log('getSpecificReview result: ', result);

        dispatch(getReview(result));
    }
}

export function callPostReview({form}, header) {

    console.log('callPostReview ... : ' ,form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
            });
            console.log('header:', header)
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


export function callPutReview({form}) {
    console.log('callPutReview : ', form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
            });
            
            dispatch(putReview(result));
    }
}

export function callDeleteReviewAPI(reviewCode, revFileCode) {
    console.log('callDeleteReviewAPI :', reviewCode, "and", revFileCode);

    return async(dispatch, getState) => {

        const result = await request('DELETE', `/reviews/${reviewCode}?revFileCode=${revFileCode}`);

        dispatch(deleteReview(result));
    }
} 

  export function callGetReviewComments(reviewCode) {

    console.log("callGetReviewComments : ", reviewCode);

    return async (dispatch, getState) => {

        const result = await request('GET', `/reviews/${reviewCode}/comments`)

        dispatch(getReviewComments(result));
    }
  }

  export function callgetMemberCode() {

    return async (dispatch, getState) => {

        const result = await request('GET', '/reviews/memberCode');

        dispatch(getMemberCode(result));
    }
  }

  export function callPostReviewComment({form, reviewCode}) {

    return async (dispatch, getState) => {

        const requestPostComment = `http://localhost:8001/reviews/${reviewCode}/comments`;

        const result = await fetch(requestPostComment, {
            method: "POST",
            headers: {
                //"Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
            });
            dispatch(postReviewComment(result));
    }

  }

  export function callDeleteReviewComment(revCommentCode, reviewCode) {

    return async (dispatch, getState) => {
        const result = await request("DELETE", `/reviews/${reviewCode}/comments/${revCommentCode}`);

        dispatch(deleteReviewComment(result));
    }
  }