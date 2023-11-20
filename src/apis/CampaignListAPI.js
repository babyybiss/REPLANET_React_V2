import axios from "axios";
import { getContinue, getComplete, getCampaign, postCampaign, getCategoryByCampaign} from '../modules/CampaignModule';


export const requestURL = 'http://localhost:8001/';

// 진행중 캠페인 조회
export function CampaignListAPI() {

    return async (dispatch, getState) => {
        try {
            const result = await axios.get(requestURL);
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
            dispatch(getCampaign(result.data));

        } catch (error) {
            console.error('에러 발생:', error);
        }
    }
}

// 카테고리별 캠페인 조회 
export function getCampaignSearchByCategory(category){
    return async (dispatch, getState) => {
        const result = await axios.get(requestURL+`category?${category}`).then(
            console.log(result),
        dispatch(getCategoryByCampaign(result))
        ).catch( (error) => {
            console.log(error);
        }
        )
    }
}

// 캠페인 등록 
export function PostCampaignAPI({ inputs }, header) {

    console.log('[Review Registration] formData2 : ', inputs.get("imageFile"));


    return async (dispatch, getState) => {
        try {
            await axios.post(requestURL + 'campaigns', inputs).then((res) => {

                console.log(res.data);
                //dispatch(postCampaign(result));
                window.location = "/";
            }).catch((error) => { alert(error.response.data) })
        } catch (error) { alert('관리자 문의 바람') }
    }

}

// 캠페인 삭제
export function DeleteCampaignAPI( campaignCode) {

    return async () => {
        try {
            await axios.delete(requestURL + `campaigns/${campaignCode}`, campaignCode)
                .then((res) => {
                    alert('삭제되었읍니다.')
                    console.log(res);
                    window.location = "/";
                }).catch((error) => {
                    console.log(error);
                    alert(error.response.data)
                })
        } catch (error) { alert(error.response.data) }

        //dispatch(deleteReview(result));
    }
}



// 캠페인 수정
export function ModifyCampaignAPI({ inputs }, campaignCode) {
    console.log(inputs, '이거슨? ' ,campaignCode, '캠코');
    console.log('[Review Registration] campaignTitle : ', inputs.get("campaignTitle"));


    return async (dispatch, getState) => {
        try {

            await axios.put(requestURL + `campaigns/${campaignCode}`, inputs)
                .then((res) => {
                    alert('수정 되었습니다.')
                    console.log(res);
                    window.location = "/";
                }).catch((error) => {
                    console.log(error);
                    alert(error.response.data)
                })

            //dispatch(deleteReview(result));
        } catch (error) { alert(error,'실패캐치') }
    }

} 

//북마크 등록
export function AddBookmarkAPI(header,campaignCode){
    console.log(header,campaignCode);
    return async (dispatch, getState) => {
        await axios.post(requestURL+'bookmarks',campaignCode)
        .catch((error) => {
            alert( error,'에러발생')
        })
    }
}

//북마크 삭제