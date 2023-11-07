import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';

//   {/* <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <Signup />} />
//   <Route path="/login/*"
//     element={authCtx.isLoggedIn ? <Navigate to='/' /> : <Login />}
//   /> */}
//오류해결하면 app.js 수정

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

        if (authCtx.isSuccess) {
            navigate("/", { replace: true })
        }
    }

    return (

        <div className="container-first container-centered">
            <h2>로그인이 필요한 서비스입니다.</h2>
            <div id="container-user">
                <div className="tabs">
                    <input id="tab1" type="radio" name="tab_item" defaultChecked />
                    <label className="tab_item ti2" htmlFor="tab1">일반 로그인</label>
                    <input id="tab2" type="radio" name="tab_item" />
                    <label className="tab_item ti2" htmlFor="tab2">소셜 로그인</label>

                    <div className="tab_content" id="tab1_content">
                        <form onSubmit={submitHandler}>
                            <div className="items-container ic1">

                                <input className="input" type="text" id="email" required ref={emailInputRef} placeholder="id" />
                                <input className="input"
                                    type="password"
                                    id="password"
                                    required
                                    ref={passwordInputRef}
                                    placeholder="pw"
                                />
                                <button type="submit" className="button button-primary">로그인</button>
                                <button className="button button-primary-outline">회원가입</button>
                            </div>
                        </form>
                        <div className="items-container ic3 pt-2">
                            <a href="signup.html" className="login-option">
                                <div className="join-social"><i className="fa fa-comment"></i></div> 회원가입
                            </a>
                            <a href="#!" className="login-option">아이디 찾기</a>
                            <a href="#!" className="login-option">비밀번호 찾기</a>
                        </div>

                    </div>

                    <div className="tab_content" id="tab2_content">
                        <div className="items-container ic1">
                            api 새창
                        </div>


                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login
