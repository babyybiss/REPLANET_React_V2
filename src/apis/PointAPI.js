import { GET_EXCHANGES, GET_EXCHANGE, GET_USER_EXCHANGES, GET_EXCHANGE_DETAIL_U } from '../modules/PointModule';
import axios from "axios";

export const exchangesAPI = () => {
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
                dispatch({type: GET_EXCHANGES, payload: response.data});
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
    const requestURL = `http://localhost:8001/exchanges/${exchangeCode}`;

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