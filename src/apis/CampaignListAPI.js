import axios from "axios";
import { getContinue, getComplete, getCampaign } from '../modules/CampaignModule';

export const requestURL = 'http://localhost:8001';
export const requestURL1 = 'https://jsonplaceholder.typicode.com/comments';

// 진행중 캠페인 조회
export function CampaignListAPI() {

    return async (dispatch, getState) => {
        try {
            const result = await axios.get(requestURL);
            console.log(result.data, '여기가 api 리절트');
            dispatch(getContinue(result.data))

        } catch (error) {
            console.error('에러 발생:', error);
        }
    }
}
// 완료된 캠페인 조회
export function CampaignListDoneAPI() {

    return async (dispatch, getState) => {
        try {
            const result = await axios.get(requestURL + '/done');
            console.log(result.data, '여기가 api 리절트');
            dispatch(getComplete(result.data))

        } catch (error) {
            console.error('에러 발생:', error);
        }
    }
}


// 캠페인 상세조회
export function GetCampaignAPI(campaignCode) {

    return async (dispatch, getState) => {
        try {
            const result = await axios.get(requestURL + `/campaign/${campaignCode}`);
            dispatch(getCampaign(result.data))

        } catch (error) {
            console.error('에러 발생:', error);
        }
    }
}

// 캠페인 등록 
export async function PostCampaignAPI({notice, header}) {
    return await axios.post('requestURL', notice, header).then((res) => {
        window.location = "/notice";
    }).catch((err) => { alert("엥?") })
}




