import Swal from 'sweetalert2';
import { GET_EXCHANGE, GET_USER_EXCHANGES, GET_EXCHANGE_DETAIL_U, PUT_EXCHANGES, POST_EXCHANGES, GET_POINTS_HISTORY, GET_ADMIN_EXCHANGES, PUT_PROVIDE_INFO, GET_PRIVACY_STATUS, GET_ORG_INFORMATION } from '../modules/PointModule';
import axios from "axios";

export const pointExchangeAPI = ({formdata}) => {
    const requestURL = 'http://localhost:8001/exchanges';

    return async (dispatch, getState) => {
        await axios.post(requestURL, formdata, {
            headers: {
                "Content-Type" : `multipart/form-data`,
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem('token')
            }
        })
        .then(function (response) {
            console.log(response);
            console.log(response.headers);
            if(response.status === 200){
                dispatch({type: POST_EXCHANGES, payload: response.data});
                Swal.fire({
                    icon: "success",
                    iconColor: '#1D7151',
                    title: "신청이 완료되었습니다!",
                    text: "관리자 확인 후 처리 완료까지 영업일 기준 최대 2일까지 소요됩니다.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                }).then(result => {
                    if(result.isConfirmed){
                    window.location.reload();
                }})
            }else{
                console.log("exchange request-back-error : ", response.data);
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "신청 중 오류가 발생했습니다!",
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            }
        })
        .catch((error) => {
            console.log("exchange request-front-error : ", error);
            Swal.fire({
                icon: "error",
                iconColor: "#DB524E",
                title: "신청 중 오류가 발생했습니다!",
                text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        });
    }
}

export function adminExchangesAPI(){
    const requestURL = 'http://localhost:8001/exchanges';

    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL);
            console.log('[PointAPI] exchangesAPI RESULT : ', result.data);
            dispatch({type: GET_ADMIN_EXCHANGES, payload: result.data});
        } catch (error) {
            console.error('PointAPI exchangesAPI 에러 발생 : ', error);
        }
    };
}

export function userExchangesAPI(memberCode){
    const requestURL = `http://localhost:8001/users/${memberCode}/exchanges`;

    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL);
            console.log('PointAPI userExchangesAPI RESULT : ', result.data);
            dispatch({type: GET_USER_EXCHANGES, payload: result.data});
        } catch (error) {
            console.error('PointAPI userExchangesAPI 에러 발생 : ', error);
        }
    };
}

export function exchangeDetailAPI({exchangeCode}){
    console.log('요청 직전 코드 확인 : ', exchangeCode);
    const requestURL = `http://localhost:8001/exchanges/${exchangeCode}/detail`;

    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL);
            console.log('PointAPI exchangeDetailAPI RESULT : ', result.data);
            dispatch({type: GET_EXCHANGE, payload: result.data});
        } catch (error) {
            console.error('PointAPI exchangeDetailAPI 에러 발생 : ', error);
        }
    };
}

export function userExchangeDetailAPI(exchangeCode){
    console.log('요청 직전 코드 확인 : ', exchangeCode);
    const requestURL = `http://localhost:8001/users/exchangeDetail/${exchangeCode}`;

    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL);
            console.log('PointAPI userExchangeDetailAPI RESULT : ', result.data);
            dispatch({type: GET_EXCHANGE_DETAIL_U, payload: result.data});
        } catch (error) {
            console.error('PointAPI userExchangeDetailAPI 에러 발생 : ', error);
        }
    };
}

export const exchangeUpdateAPI = ({form, exchangeCode}) => {
    const requestURL = `http://localhost:8001/exchanges/${exchangeCode}`;
    console.log('요청 직전 form 확인 : ', form);
    console.log('요청 직전 exchangeCode 확인 : ', form.exchangeCode);
    console.log('요청 직전 status 확인 : ', form.status);
    console.log('요청 직전 points 확인 : ', form.points);
    console.log('요청 직전 returnDetail 확인 : ', form.returnDetail);
    return async (dispatch, getState) => {
        const result = await axios.put(requestURL, {
            exchangeCode: form.exchangeCode,
            status: form.status,
            points: form.points,
            returnDetail: form.returnDetail
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem('token')
            }
        })
        .then(function(response){
            console.log('[PointAPI] exchangeUpdateAPI RESULT : ', response);
            if(response.status === 200){
                console.log('[PointAPI] exchangeUpdateAPI SUCCESS');
                dispatch({type: PUT_EXCHANGES, payload: response.data});
                Swal.fire({
                    icon: "success",
                    iconColor: '#1D7151',
                    title: "정상적으로 처리되었습니다.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                }).then(result => {
                    if(result.isConfirmed){
                    window.location.reload();
                }})
            }
        })
        .catch((error) => {
            console.log("[PointAPI] exchangeUpdateAPI FAIL : ", error);
            Swal.fire({
                icon: "error",
                iconColor: "#DB524E",
                title: "오류가 발생했습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        });
    }
}

export function myPointsHistoryAPI(memberCode) {
    const requestURL = `http://localhost:8001/users/${memberCode}/points`;

    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL);
            console.log('PointAPI myPointsHistoryAPI RESULT : ', result.data);
            dispatch({type: GET_POINTS_HISTORY, payload: result.data});
        } catch (error){
            console.error('PointAPI myPointsHistoryAPI 에러 발생 : ', error);
        }
    }
}

export function exchangeStatusAPI({status, exchangeCode, currentPage}){
    console.log("API status 확인 : ", status);
    const requestURL = `http://localhost:8001/exchanges/${status}`;

    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL);
            console.log('PointAPI exchangeStatusAPI RESULT : ', result.data);
            dispatch({type: GET_ADMIN_EXCHANGES, payload: result.data});
        } catch (error) {
            console.error('PointAPI exchangeStatusAPI 에러 발생 : ', error);
        }
    }
}

export function provideInfoAPI({body}){
    console.log("API 단계 memberCode 확인 : ", body.memberCode);
    console.log("API 단계 check 확인 : ", body.check);
    console.log("API 단계 idNumber 확인 : ", body.idNumber);
    
    const requestURL = 'http://localhost:8001/provideInfo';

    return async (dispatch, getState) => {
            await axios.put(requestURL, {
                memberCode: body.memberCode,
                privacyStatus: body.check,
                residentNum: body.idNumber
            }, {headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }}
            )
            .then(function(response){
                console.log('[ReceiptAPI] provideInfoAPI RESULT : ', response);
                if(response.status === 200){
                    console.log('[ReceiptAPI] provideInfoAPI SUCCESS');
                    dispatch({type: PUT_PROVIDE_INFO, payload: response.data});
                    Swal.fire({
                        icon: "success",
                        iconColor: '#1D7151',
                        title: "정상적으로 처리되었습니다.",
                        showCancelButton: false,
                        confirmButtonColor: '#1D7151',
                        confirmButtonText: '확인'
                    }).then(result => {
                        if(result.isConfirmed){
                        window.location.reload();
                    }})
                } else {
                    Swal.fire({
                        icon: "error",
                        iconColor: "#DB524E",
                        title: "서버 오류가 발생했습니다.",
                        text: "문제가 계속될 경우 고객센터로 문의 바랍니다.",
                        showCancelButton: false,
                        confirmButtonColor: '#1D7151',
                        confirmButtonText: '확인'
                    })
                }
            })
            .catch((error) => {
                console.log("[ReceiptAPI] provideInfoAPI FAIL : ", error);
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "오류가 발생했습니다.",
                    text: "문제가 계속될 경우 고객센터로 문의 바랍니다.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            });       
    }
}

export function getPrivacyStatusAPI(memberCode) {
    const requestURL = `http://localhost:8001/privacyStatus/${memberCode}`;
    return async (dispatch, getState) => {
        try{
            const result = await axios.get(requestURL);
            console.log('[ReceiptAPI] getPrivacyStatusAPI RESULT : ', result.data);
            dispatch({type: GET_PRIVACY_STATUS, payload: result.data});
        } catch (error){
            console.error('[ReceiptAPI] getPrivacyStatusAPI 에러 발생 : ', error);
        }
    }
}

export function VerifyPwdAPI({orgCode, orgPwd}){
    console.log('[OrgAPI] verifyPwdAPI 시작');
    const requestURL = `http://localhost:8001/orgInfo/${orgCode}`;
    return async (dispatch, getState) => {
        try {
            console.log("비밀번호? ", orgPwd);
            const result = await axios.get(requestURL, {params : {orgPwd}});
            console.log('[OrgAPI] verifyPwdAPI RESULT : ', result.data);
            dispatch({type: GET_ORG_INFORMATION, payload: result.data});
            localStorage.setItem("orgData", JSON.stringify(result.data[0]));
            window.location.href='/editOrg/modifyOrg';
        } catch (error){
            console.error('[OrgAPI] verifyPwdAPI 에러 발생 : ', error);
            if(error.response?.status == 400){
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "비밀번호를 다시 확인해 주세요.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            }else{
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "처리 중 오류가 발생했습니다 (" + error.response?.status + ")",
                    text: "문제가 지속될 경우 고객센터로 문의 바랍니다.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            }
        }
    }
}