import axios from "axios";
import { getContinue, getComplete, getCampaign, postCampaign } from '../modules/CampaignModule';

export const requestURL = 'http://localhost:8001/';

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
            const result = await axios.get(requestURL + 'done');
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
            const result = await axios.get(requestURL + `campaigns/${campaignCode}`);
            dispatch(getCampaign(result.data))

        } catch (error) {
            console.error('에러 발생:', error);
        }
    }
}

// 캠페인 등록 
export function PostCampaignAPI({ inputs }, header) {

    console.log('[Review Registration] formData2 : ', inputs.get("imageFile"));


    return async (dispatch, getState) => {
        console.log(inputs, '이거 안돼?');
        try {
            const result = await axios.post(requestURL + 'campaigns', inputs).then((res) => {

                console.log(res.data);
                //dispatch(postCampaign(result));
                window.location = "/";
            }).catch((error) => { alert(error.response.data) })
        } catch (error) { alert('관리자 문의 바람') }
    }

}

// 캠페인 삭제
export function DeleteCampaignAPI(campaignCode) {

    return async (dispatch, getState) => {
        try {

            const result = await axios.delete(requestURL + `campaigns/${campaignCode}`, campaignCode)
                .then((res) => { 
                    console.log(res);
                }).catch((error) => {
                    console.log(error);
                    alert(error.response)
                })

            //dispatch(deleteReview(result));
        }catch(error){alert('실패캐치')}
    }
} 