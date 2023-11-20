import { createActions, handleActions } from "redux-actions";


const initialState = [];



export const GET_CONTINUE = 'campaign/GET_CONTINUE';
export const GET_COMPLETE = 'campaign/GET_COMPLETE';
export const GET_CAMPAIGN = 'campaign/GET_CAMPAIGN';
export const POST_CAMPAIGN = 'campaign/POST_CAMPAIGN';
export const GET_CATEGORY_BY_CAMPAIGN = 'campaign/GET_CATEGORY_BY_CAMPAIGN';



export const { campaign: {getContinue, getComplete, getCampaign, postCampaign, getCategoryByCampaign }} = createActions({
    [GET_CONTINUE]: (res ) => ({campaignlist : res}),
    [GET_COMPLETE]: (res ) => ({campaignDoneList : res}),
    [GET_CAMPAIGN]: (res ) => ({campaigninfo : res}),
    [POST_CAMPAIGN]: (res ) => ({regist : res}),
    [GET_CATEGORY_BY_CAMPAIGN]: (res) => ({category : res})
})

const campaignReducer = handleActions(
    {
        [GET_CONTINUE]: (state, {payload}) => {return payload},
        [GET_COMPLETE]: (state, {payload}) => {return payload},
        [GET_CAMPAIGN]: (state, {payload}) => {return payload},
        [POST_CAMPAIGN]: (state, {payload}) => {return payload},
        [GET_CATEGORY_BY_CAMPAIGN]: (state, {payload}) => {return payload}
    }, initialState
);

export default campaignReducer;