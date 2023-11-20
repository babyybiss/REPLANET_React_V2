import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export const TextMessage = () => {
            Swal.fire("테스트중", "test")
}





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

    const UseRefEx = () => {
      // 포커스를 주기 위한 useRef
      const inputRef = useRef([]); // ref 배열형태로 저장해서 여러 값을 인덱스로 컨트롤 가능
  
      // input value state 관리
      const [inputs, setInputs] = useState({
        enteredEmail: "",
        enteredPassword: "",
        enteredMemberName: "",
        enteredPhone: ""
      });
      const { enteredEmail, enteredPassword, enteredMemberName, enteredPhone } = inputs; // 구조분해할당
  
      //유효한 id, password, email 조건 변수에 담아 사용
      const regEmail = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/; // email 형식 정규표현식
      const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
      const regMemberName = /^[ㄱ-ㅎ|가-힣]+$/;
      const regPhone = /^[0-9]{0,13}$/;
      const vaildEmail = enteredEmail.match(regEmail);
      const vaildPassword = enteredPassword.match(regPassword);
      const validMemberName = enteredMemberName.match(regMemberName);
      const validPhone = enteredPhone.match(regPhone);
  
      // onChange 함수로 state 값 바꿔주기
      const handleChange = (e) => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value,
        });
      };
  
      // 클릭이벤트 : 유효성에 맞는 이벤트 이루어지도록
      const handleClick = () => {
        if (!vaildEmail) {
          alert("유효하지 않은 email 입니다.");
          inputRef.current[1].focus();
          setInputs({
            ...inputs,
            email: "",
          });
        }
        else if (!vaildPassword) {
          alert("유효하지 않은 password입니다.");
          inputRef.current[2].focus();
          setInputs({
            ...inputs,
            password: "",
          });
        }
        else if (!validMemberName) {
          alert("유효하지 않은 이름입니다.");
          inputRef.current[3].focus();
          setInputs({
            ...inputs,
            memberName: "",
          });
        }
  
        else if (!validPhone) {
          alert("유효하지 않은 전화번호입니다.");
          inputRef.current[4].focus();
          setInputs({
            ...inputs,
            phone: "",
          });
        }
  
        else {
          return alert("회원가입 성공!");
        }
      }
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
                <label htmlFor="email"></label><input className="input" type="text" id="email" required ref={emailInputRef} placeholder="id"  />
                <label htmlFor="password"></label><input className="input" type="password" id="password" required ref={passwordInputRef} placeholder="pw" />
                <label htmlFor="memberName"></label><input className="input" type="text" id="memberName" required ref={memberNameInputRef} placeholder="name" />

                <label htmlFor="phone"></label>
                <div className="input-group">
                  <input className="input" type="text" id="phone" required ref={phoneInputRef} placeholder="phone" />
                  <button type="button" className="button button-primary" onClick={TextMessage}>인증</button>
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
