import axios from "axios";

import { getContinue, getComplete, getCampaign, getCategoryByCampaign, postBookmark, GET_CATEGORY_BY_CAMPAIGN} from '../modules/CampaignModule';
import Swal from "sweetalert2";



export const requestURL = 'http://localhost:8001/';

// 진행중 캠페인 조회
export function CampaignListAPI(status) {

    return async (dispatch, getState) => {
        try {
            const result = await axios.get(requestURL, {
                params: { status: status }
              })
            dispatch(getContinue(result.data))
            console.log(result.data,'데이타 화긴')
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

// 카테고리별 & 기간별 캠페인 조회 
export function getCampaignSearchByCategory(selectedValue){
    return async (dispatch, getState) => {
        const result = await axios.get(requestURL+'category',{
            params: { selectedValue: selectedValue }
          });
          console.log(result.data, '이고 되나 화긴해보자');
        dispatch(getContinue(result.data))
        
    
    }
}

// 캠페인 등록 
export function PostCampaignAPI({ inputs }, header) {

    console.log('[Review Registration] formData2 : ', inputs.get("imageFile"));


    return async (dispatch, getState) => {
        try {
            await axios.post(requestURL + 'campaigns', inputs).then((res) => {

                console.log(res.data);
                window.location = "/";
            }).catch((error) => { alert(error.response.data) })
        } catch (error) { Swal.fire('', '관리자 문의 바람') }
    }

}

// 캠페인 삭제
export function DeleteCampaignAPI( campaignCode) {

    return async () => {
        try {
            await axios.delete(requestURL + `campaigns/${campaignCode}`, campaignCode)
                .then((res) => {
                    //Swal.fire('', '삭제되었습니다.')
                    console.log(res);
                    window.location = "/";
                }).catch((error) => {
                    Swal.fire('',error.response.data)
                })
        } catch (error) { Swal.fire('', '관리자 문의 바랍니다.') }
    }
}



// 캠페인 수정
export function ModifyCampaignAPI({ inputs }, campaignCode) {

    console.log('타이트,ㄹ : ', inputs.get("campaignContent"));
    return async (dispatch, getState) => {
        try {

            await axios.put(requestURL + `campaigns/${campaignCode}`, inputs)
                .then((res) => {
                    Swal.fire('', '수정되었습니다.')
                    console.log(res);
                    window.location = "/";
                }).catch((error) => {
                    console.log(error);
                    Swal.fire('',error.response.data)
                   // Swal.fire('', '관리자 문의 바랍니다.')
                })

            //dispatch(deleteReview(result));
        } catch (error) { Swal.fire('', '관리자 문의 바랍니다.') }
    }

} 


// // 완료된 캠페인 조회
// export function CampaignListDoneAPI() {

//     return async (dispatch, getState) => {
//         try {
//             const result = await axios.get(requestURL + 'done');
//             dispatch(getComplete(result.data))

//         } catch (error) {
//             console.error('에러 발생:', error);
//         }
//     }
// }


// // 카테고리별 캠페인 조회 
// export function getCampaignSearchByCategory(category){
//     return async (dispatch, getState) => {
//         const result = await axios.get(requestURL+`category?${category}`).then(
//             console.log(result),
//         dispatch(getCategoryByCampaign(result))
//         ).catch( (error) => {
//             console.log(error);
//         }
//         )
//     }
// }