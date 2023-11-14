import { GET_EXCHANGES, GET_EXCHANGE } from '../modules/PointModule';
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