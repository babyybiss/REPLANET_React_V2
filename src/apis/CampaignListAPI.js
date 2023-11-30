import axios from "axios";

import { getContinue, getOrgList, getCampaign, getComplete, getCategoryByCampaign, postBookmark, GET_CATEGORY_BY_CAMPAIGN } from '../modules/CampaignModule';
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
        } catch (error) {
            console.log('로딩중');
            //Swal.fire('', '관리자 문의 바람')
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
            console.log('로딩중');
            //Swal.fire('', '관리자 문의 바람') 
        }
    }
}

// 기부처별 리스트 조회
export function GetCampaignByOrgAPI({ orgCode }, status) {
    return async (dispatch, getState) => {
        try {
            const result = await axios.get(requestURL + `campaigns/orgsList/${orgCode}`,{
                params: { status: status }
            });
            if (status === "ing" || status === "done") {
                await dispatch(getContinue(result.data));
            }
            else if (status === "no") {
                dispatch(getOrgList(result.data))
            }
        } catch (error) {
            console.log(error, '로딩중');
            //Swal.fire('', '관리자 문의 바람') 
        }
    }
}

// // 상세페이지에서 기부처 목록 리스트 조회
// export function GetCampaignsByOrgAPI({ orgCode }) {
//     return async (dispatch, getState) => {
//         try {
//             const result = await axios.get(requestURL + `campaigns/orgsList/${orgCode}`);
//             dispatch(getOrgList(result.data))

//         } catch (error) {
//             console.log(error, '로딩중');
//             //Swal.fire('', '관리자 문의 바람') 
//         }
//     }
// }

// 캠페인 등록 
export function PostCampaignAPI({ inputs }, header) {

    console.log('[Review Registration] formData2 : ', inputs.get("imageFile"));


    return async (dispatch, getState) => {
        try {
            await axios.post(requestURL + 'campaigns', inputs).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: '등록되었습니다.',
                    confirmButtonColor: '#1D7151',
                    iconColor: '#1D7151',
                    confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                }).then(() => {
                    window.location = "/";
                });
            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "오류",
                    text: error.response.data.message,
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인',
                })
            })
        } catch (error) { Swal.fire('', '관리자 문의 바람') }
    }

}

// 캠페인 삭제
export function DeleteCampaignAPI(campaignCode) {

    console.log(campaignCode, '이게안되나');
    return async () => {
        try {
            await axios.delete(requestURL + `campaigns/${campaignCode}`, campaignCode)
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: '삭제되었습니다.',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#1D7151',
                        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                    }).then(() => {
                        window.location = "/";
                    });
                }).catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "오류",
                        text: error.response.data.message,
                        showCancelButton: false,
                        confirmButtonColor: '#1D7151',
                        confirmButtonText: '확인',
                    })
                })
        } catch (error) { Swal.fire('', '관리자 문의 바랍니다.') }
    }
}

// 캠페인 수정
export function ModifyCampaignAPI({ inputs }, campaignCode) {

    return async (dispatch, getState) => {
        try {

            await axios.put(requestURL + `campaigns/${campaignCode}`, inputs)
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: '수정되었습니다.',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#1D7151',
                        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                    }).then(() => {
                        window.location = "/";
                    });
                }).catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "오류",
                        text: error.response.data.message,
                        showCancelButton: false,
                        confirmButtonColor: '#1D7151',
                        confirmButtonText: '확인',
                    })
                })
            //dispatch(deleteReview(result));
        } catch (error) { Swal.fire('', '관리자 문의 바랍니다.') }
    }

}

// // 카테고리별 & 기간별 캠페인 조회
// export function getCampaignSearchByCategory(selectedValue) {
//     return async (dispatch, getState) => {
//         const result = await axios.get(requestURL + 'category', {
//             params: { selectedValue: selectedValue }
//         });
//         console.log(result.data, '이고 되나 화긴해보자');
//         dispatch(getContinue(result.data))
//     }
// }