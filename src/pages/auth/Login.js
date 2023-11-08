import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';

const Login = () => {
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const submitHandler = async event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        authCtx.login(enteredEmail, enteredPassword);
        setIsLoading(false);

        if (authCtx.isSuccess === true) {
            alert('로그인됨');
            navigate("/", { replace: true });
        }
    }

    const REST_API_KEY = '5a90ac83e3e59ba52ef0c472bc65e3e0';
    const REDIRECT_URI = 'http://localhost:8001/login/oauth2/code/kakao';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const socialSubmitHandler = () => {
        window.open(link, "_blank", "noopener, noreferrer");
    };

    return (

        <div className="container-first container-centered">
            <h2>로그인이 필요한 서비스입니다.</h2>
            <div id="container-user">
                <div className="items-container ic1">
                    <div className="tabs">
                    <div className="tab_item ti2 active" >일반 로그인</div>
                    <div className="tab_item ti2" onClick={socialSubmitHandler}>소셜 로그인</div>
                    </div>


                    <div className="">
                            
                            <div className="items-container ic1">

                                <input className="input" type="text" id="email" required ref={emailInputRef} placeholder="id" />
                                <input className="input"
                                    type="password"
                                    id="password"
                                    required
                                    ref={passwordInputRef}
                                    placeholder="pw"
                                />
                                <button className="button button-primary" onClick={submitHandler}>로그인</button>
                                {isLoading && <p>Loading</p>}
                                <button className="button button-primary-outline">회원가입</button>
                            </div>
                            
                        <div className="items-container ic3 pt-2">
                            <a href="signup.html" className="login-option">
                                <div className="join-social"><i className="fa fa-comment"></i></div> 회원가입
                            </a>
                            <a href="#!" className="login-option">아이디 찾기</a>
                            <a href="#!" className="login-option">비밀번호 찾기</a>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login
