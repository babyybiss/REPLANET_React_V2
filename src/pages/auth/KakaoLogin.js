import React, { useState, useRef, useContext } from "react";
import '../../assets/css/user.css';

function KakaoLogin() {
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  
    const url = `https://kauth.kakao.com/oauth/authorize?scope=account_email&client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;
  
    const loginKaKao = () => {
      window.open(url, "_blank", "noopener, noreferrer");
    }
    return (<div className="tab_item ti2" onClick={loginKaKao}>소셜 로그인</div>)  }
  


export default KakaoLogin;
