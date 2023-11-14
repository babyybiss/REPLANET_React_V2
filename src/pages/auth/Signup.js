import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';
// import FirebaseAuth from "./FirebaseAuth";

const Signup = () => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const memberNameInputRef = useRef(null);
  const phoneInputRef = useRef(null);




  const submitHandler = (e) => {

    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredMemberName = memberNameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    authCtx.signup(enteredEmail, enteredPassword, enteredMemberName, enteredPhone);
    if (authCtx.isSuccess) {
      navigate("/login", { replace: true });
    } 
  }

  return (
    <>
      <div className="container-first container-centered">
        <h1>회원가입</h1>
        <div id="container-user" className="text-left">
          <form onSubmit={submitHandler}>
            <div className="items-container ic1">
              <div className="item">
                <label htmlFor="email"></label><input className="input" type="text" id="email" required ref={emailInputRef} placeholder="id" />
                <label htmlFor="password"></label><input className="input" type="password" id="password" required ref={passwordInputRef} placeholder="pw" />
                <label htmlFor="memberName"></label><input className="input" type="text" id="memberName" required ref={memberNameInputRef} placeholder="name" />
                <label htmlFor="phone"></label>
                <div className="input-group">
                  <input className="input" type="text" id="phone" required ref={phoneInputRef} placeholder="phone" />
                  <button type="button" className="button button-primary">인증</button>
                </div>
              </div>
              <div className="item">
                <div className="container-policy mb-1">
                  <pre>
                    <h4>개인정보처리방침</h4>
                    본 이용약관은 개인정보보호위원회(이하‘운영기관’이라 한다)에서 운영하는 “가명정보 활용 종합지원플랫폼”에 대한 이용조건 및 절차, 운영기관과 회원의 권리ㆍ의무, 기타 필요한 사항을 규정함을 목적으로 합니다.

                    제1조 약관의 효력과 변경
                    1. 회원이 본 이용약관 내용에 동의하는 경우 가명정보 활용 종합지원플랫폼의 서비스 제공 행위 및 회원의 서비스 사용 행위에 대하여는 본 약관이 우선적으로 적용됩니다.
                    2. 운영기관은 본 이용약관을 사전 고지 없이 변경할 수 있고, 변경된 약관은 가명정보 활용 종합지원플랫폼 내에 공지와 동시에 그 효력이 발생됩니다. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관 변경에 대한 동의로 간주됩니다.
                  </pre>
                </div>
                <input id="c1" type="checkbox" className="mb-1" />
                <label htmlFor="c1">이용약관에 동의합니다.</label>
                <div className="container-policy mb-1">
                  <pre>
                    <h4>이용약관</h4>
                    본 이용약관은 개인정보보호위원회(이하‘운영기관’이라 한다)에서 운영하는 “가명정보 활용 종합지원플랫폼”에 대한 이용조건 및 절차, 운영기관과 회원의 권리ㆍ의무, 기타 필요한 사항을 규정함을 목적으로 합니다.

                    제1조 약관의 효력과 변경
                    1. 회원이 본 이용약관 내용에 동의하는 경우 가명정보 활용 종합지원플랫폼의 서비스 제공 행위 및 회원의 서비스 사용 행위에 대하여는 본 약관이 우선적으로 적용됩니다.
                    2. 운영기관은 본 이용약관을 사전 고지 없이 변경할 수 있고, 변경된 약관은 가명정보 활용 종합지원플랫폼 내에 공지와 동시에 그 효력이 발생됩니다. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관 변경에 대한 동의로 간주됩니다.
                  </pre>
                </div>
                <input id="c2" type="checkbox" className="mb-1" />
                <label htmlFor="c2">이용약관에 동의합니다.</label>
              </div>
              <button className="button button-primary w-100" type="submit">회원가입</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup;
