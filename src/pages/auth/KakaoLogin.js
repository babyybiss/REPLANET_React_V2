import React, { useState, useRef, useContext } from "react";
import '../../assets/css/user.css';

const KakaoLogin = () => {

    const CLIENT_ID = '5a90ac83e3e59ba52ef0c472bc65e3e0';
    const REDIRECT_URI = 'http://localhost:8001/login/oauth2/code/kakao';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const KakaoLoginHandler = () => {
        window.open(KAKAO_AUTH_URL, "_blank", "noopener, noreferrer");
    };

    const code = new URL(window.location.href).searchParams.get("code");

    return (

        <></>
    )
}


export default KakaoLogin;
