import React, { useState, useRef, useCallback } from "react";
import '../../assets/css/user.css';

import Swal from "sweetalert2";
import axios from 'axios';
function FindId() {
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const smsCodeInputRef = useRef(null);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [onFindEmailMsg, setOnFindEmailMsg] = useState("");
  const [onFindPasswordMsg, setOnFindPasswordMsg] = useState("");
  const [onFindPhoneMsg, setOnFindPhoneMsg] = useState("");

  const [isOnCheckEmail, setIsOnCheckEmail] = useState(false);
  const [isOnCheckPhone, setIsOnCheckPhone] = useState(false);
  const [isOnCheckSmsCode, setIsOnCheckSmsCode] = useState(false);

  const [isOnFindEmail, setIsOnFindEmail] = useState(false);
  const [isOnFindPassword, setIsOnFindPassword] = useState(false);
  const [OnFindPhone, setIsOnFindPhone] = useState(false);


  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  };
  const validatePhone = (phone) => {
    return phone
      .match(/^[0-9].{8,10}$/)
  };

  const isEmailValid = validateEmail(email);
  const isPhoneValid = validatePhone(phone);

  const handleEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);
    setEmailMsg("");

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.")
    } else {
      setEmailMsg("")
    }
  });
  const handlePhone = useCallback((e) => {
    const currPhone = e.target.value;
    setPhone(currPhone);
    if (!validatePhone(currPhone)) {
      setPhoneMsg("-을 제외한 9~11자리의 숫자만 입력 가능합니다.");
    } else {
      setPhoneMsg("");
    }

  }, []);


  const handleSendSMS = async () => {
    const enteredPhone = phoneInputRef.current.value;
    const url = `/users/sms`;
    const body = { u_phone: enteredPhone };

    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        console.log('인증번호 전송 성공');
        console.log(response.data);
        setSmsCode(response.data);
        Swal.fire("", "입력하신 번호로 인증번호가 전송되었습니다.");

      } else {
        console.error('인증번호 전송 실패');
        Swal.fire("", "전송 실패! 휴대전화 번호를 다시 확인해 주세요.");
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생', error);
      Swal.fire("", "API 호출 중 오류 발생");
    }
  };

  const onCheckEmail = async () => {
    console.log(email);
    const url = "http://localhost:8001/auth/emailcheck/" + email;
    const body = { email: email };

    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        console.log('해당 이메일로 가입된 계정이 없습니다.');
        setEmailMsg("해당 이메일로 가입된 계정이 없습니다.");
        setEmail("");
        setIsOnCheckEmail(false);
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
        console.log('');
        setEmailMsg("");
        setIsOnCheckEmail(true);
      }
      
      else {
        console.log('오류가 발생했습니다. 입력값을 확인해 주세요.');
        setEmailMsg("오류가 발생했습니다. 입력값을 확인해 주세요.");
        setIsOnCheckEmail(false);
      }
    }
  };

  const onCheckPhone = async () => {
    console.log(phone);
    const url = "http://localhost:8001/auth/phonecheck/" + phone;
    const body = { phone: phone };

    try {
      const response = await axios.post(url, body);
      if (response.status === 200 && phone != null && isPhoneValid) {
        console.log('해당 번호로 가입된 계정이 없습니다.');
        setPhoneMsg('해당 번호로 가입된 계정이 없습니다.');
        setIsOnCheckPhone(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('해당 번호로 문자인증을 진행해 주세요.');
        setPhoneMsg("해당 번호로 문자인증을 진행해 주세요.");
        setIsOnCheckPhone(true);
      }
      else {
        console.log('오류가 발생했습니다. 입력값을 확인해 주세요.');
        setPhoneMsg("오류가 발생했습니다. 입력값을 확인해 주세요.");
        setIsOnCheckEmail(false);
      }
    }
  };

  const onCheckSmsCode = () => {
    console.log(smsCode);
    if (smsCode == smsCodeInputRef.current.value) {
      Swal.fire("인증 성공");
      setIsOnCheckSmsCode(true);
    } else { Swal.fire("인증 실패"); }
  };


  const onFindEmail = async () => {
    console.log(phone);
    const url = "http://localhost:8001/auth/emailfind/" + phone;
    const body = { phone: phone };

    try {
      const response = await axios.get(url, body);
      console.log(phone);
      console.log(response.data);
      if (response.status === 200 && phone != null && isPhoneValid) {
        setIsOnFindEmail(true);
        setOnFindEmailMsg(response.data);

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('fail');
        setOnFindEmailMsg("fail");
        setIsOnFindEmail(false);
      }
      else {
        console.log('예상치 못한 오류가 발생했습니다.');
        setOnFindEmailMsg("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  const onFindPhone = async () => {
    console.log(phone);
    const url = "http://localhost:8001/auth/phonefind/" + email;
    const body = { email: email };

    try {
      const response = await axios.get(url, body);
      console.log(email);
      console.log(response.data);
      if (response.status === 200 && phone != null && isEmailValid) {
        setOnFindPhoneMsg(response.data);
        setPhone(response.data);
        setIsOnFindPhone(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('fail');
        setOnFindPhoneMsg("fail");
        setIsOnFindPhone(false);
      }
      else {
        console.log('예상치 못한 오류가 발생했습니다.');
        setOnFindPhoneMsg("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="container-first container-centered text-left">
      <div id="container-user">
        <div className="items-container ic1">
        <div className="tabs pb-2">

          <div className="tab_item ti2 active" >계정 찾기</div>

          <a href="/findpw"><div className="tab_item ti2" >비밀번호 찾기</div></a>
        </div>
        <div className="">
          <div className="items-container ic1" style={isOnFindEmail ? {display: 'none'} : {}}>
            <label htmlFor="phone">가입 당시 입력하셨던 휴대전화 번호를 입력해 주세요.</label>
            <div className="input-group">
                  <input className="input" type="text" id="phone" required ref={phoneInputRef} value={phone} placeholder="- 없이 휴대폰 번호를 입력해주세요." onChange={handlePhone} disabled={isOnCheckPhone}/>
                  {isOnCheckSmsCode ?
                  (
                  <></>

                  ) : (isOnCheckPhone ? (<button
                    type="button"
                    className="button button-primary"
                    name="dupCheckButton"
                    onClick={handleSendSMS}
                    disabled={isOnCheckSmsCode}
                  >
                    인증번호 재전송
                  </button>) :
                  (<button
                    type="button"
                    className="button button-primary"
                    name="dupCheckButton"
                    onClick={onCheckPhone}
                    disabled={!isPhoneValid}
                  >
                    인증번호 전송
                  </button>))}
                </div>
            <div className="regexMsg">{phoneMsg}</div>
            <div className="input-group" style={!isOnCheckPhone ? {display: 'none'} : {}}>
              <input className="input" type="text" ref={smsCodeInputRef} required placeholder="전송받으신 인증번호 4자리를 입력해 주세요." />
              <button type="button" className="button button-primary" onClick={onCheckSmsCode} disabled={!isPhoneValid || !isOnCheckPhone}>인증번호 입력</button>

            </div>
            <button onClick={onFindEmail} className="button button-primary w-100" disabled={!isOnCheckSmsCode} style={!isOnCheckSmsCode ? {display: 'none'} : {}}>찾기</button>
            
          </div>
          <div className="regexMsg text-center mb-2"style={isOnFindEmail ? {} : {display: 'none'}}><h5>회원님의 이메일 계정은<br/><span className="text-primary text-bold">{onFindEmailMsg}</span>입니다.</h5></div>
          <a className="button button-primary" style={isOnFindEmail ? {} : {display: 'none'}} href="./login">로그인</a>
        </div>
        </div>



      </div>
    </div>
  )

}
export default FindId;