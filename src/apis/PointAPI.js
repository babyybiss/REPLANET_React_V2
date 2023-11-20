import { GET_EXCHANGE, GET_USER_EXCHANGES, GET_EXCHANGE_DETAIL_U, PUT_EXCHANGES, POST_EXCHANGES, GET_POINTS_HISTORY, GET_ADMIN_EXCHANGES } from '../modules/PointModule';
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
                alert("신청이 완료되었습니다!\n관리자 확인 후 처리 완료까지 영업일 기준 최대 2일까지 소요됩니다.");
                window.location.reload();
            }else{
                console.log("exchange request-back-error : ", response.data);
                alert("신청 중 오류가 발생했습니다!\n문제가 지속될 경우 고객센터로 문의 바랍니다.");
            }
        })
        .catch((error) => {
            console.log("exchange request-front-error : ", error);
            alert("신청 중 오류가 발생했습니다!\n문제가 지속될 경우 고객센터로 문의 바랍니다.");
        });
    }
}

export const adminExchangesAPI = () => {
    const requestURL = 'http://localhost:8001/exchanges';

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(function(response){
            console.log(response);

            console.log('[PointAPI] exchangesAPI RESULT : ', response);
            if(response.status === 200){
                dispatch({type: GET_ADMIN_EXCHANGES, payload: response.data});
            }
        });

        
    };
}

export const userExchangesAPI = (memberCode) => {
    const requestURL = `http://localhost:8001/users/${memberCode}/exchanges`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(function(response){
            console.log(response);

            console.log('PointAPI userExchangesAPI RESULT : ', response);
            if(response.status === 200){
                dispatch({type: GET_USER_EXCHANGES, payload: response.data});
            }
        });
    };
}

export const exchangeDetailAPI = ({exchangeCode}) => {
    console.log('요청 직전 코드 확인 : ', exchangeCode);
    const requestURL = `http://localhost:8001/exchanges/${exchangeCode}/detail`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(function(response){
            console.log(response);

            console.log('[PointAPI] exchangeDetailAPI RESULT : ', response);
            if(response.status === 200){
                console.log('[PointAPI] exchangeDetailAPI SUCCESS');
                dispatch({type: GET_EXCHANGE, payload: response.data});
        }
        })
    };
}

export const userExchangeDetailAPI = (exchangeCode) => {
    console.log('요청 직전 코드 확인 : ', exchangeCode);
    const requestURL = `http://localhost:8001/users/exchangeDetail/${exchangeCode}`;

    return async (dispatch, getState) => {
        const result = await axios.get(requestURL, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(function(response){
            console.log(response);

            console.log('[PointAPI] userExchangeDetailAPI RESULT : ', response);
            if(response.status === 200){
                console.log('[PointAPI] userExchangeDetailAPI SUCCESS');
                dispatch({type: GET_EXCHANGE_DETAIL_U, payload: response.data});
            }
        })
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
                alert("정상적으로 처리되었습니다.");
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log("[PointAPI] exchangeUpdateAPI FAIL : ", error);
            alert("오류가 발생했습니다.");
        });
    }
}

export const myPointsHistoryAPI = (memberCode) => {
    const requestURL = `http://localhost:8001/users/${memberCode}/points`;

    return async (dispatch, getState) => {
        await axios.get(requestURL, {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(function(response){
            console.log(response);

            console.log('PointAPI myPointsHistoryAPI RESULT : ', response);
            if(response.status === 200){
                dispatch({type: GET_POINTS_HISTORY, payload: response.data});
            }
        });
    }
}

export const exchangeStatusAPI = ({status, exchangeCode, currentPage}) => {
    console.log("API status 확인 : ", status);
    const requestURL = `http://localhost:8001/exchanges/${status}`;

    return async (dispatch, getState) => {
        await axios.get(requestURL, {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            }
        })
        .then(function(response){
            console.log('PointAPI exchangeStatusAPI RESULT : ', response);
            if(response.status === 200){
                dispatch({type: GET_ADMIN_EXCHANGES, payload: response.data});
            }
        });
    }
}