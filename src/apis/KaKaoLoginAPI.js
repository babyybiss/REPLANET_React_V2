import axios from "axios";
import { response } from "express";

export function KakaoLoginAPI() {
    const REST_API_KEY = "8a5a93627a69a5b1728721bc6ff53635";
    const REDIRECT_URI = "http://localhost:3000/";
    const requestURL = "http://localhost:8001/kakaologin";

    const urlSearchParams = new URLSearchParams(window.location.search);
    const AUTHORIZE_CODE = urlSearchParams.get('code');

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', REST_API_KEY);
    data.append('redirect_uri', REDIRECT_URI);
    data.append('code', AUTHORIZE_CODE);

    axios.post(requestURL, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

}
