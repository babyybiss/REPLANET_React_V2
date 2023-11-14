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
        .then(function(response){
            console.log(response);

            console.log('[PointAPI] exchangesAPI RESULT : ', response);
            if(response.status === 200){
                dispatch({type: GET_EXCHANGES, payload: response.data});
            }
        });

        
    };
}