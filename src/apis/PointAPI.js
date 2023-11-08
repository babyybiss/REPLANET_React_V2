import { GET_EXCHANGES } from '../modules/PointModule';
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
        .then(response => response.json());

        console.log('[PointAPI] exchangesAPI RESULT : ', result);
        if(result.status === 200){
            dispatch({type: GET_EXCHANGES, payload: result.data});
        }
    };
}