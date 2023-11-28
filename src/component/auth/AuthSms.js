import React, { useRef, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';
import Swal from 'sweetalert2';
import axios from 'axios';



function AuthSms() {

    const phoneInputRef = useRef(null);
    const verificationCodeInputRef = useRef(null);
    
    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [phoneMsg, setPhoneMsg] = useState("");
    const [verificationCodeMsg, setVerificationCodeMsg] = useState("");
    const isPhoneValid = validatePhone(phone);
    const isVerificationCodeValid = validateVerificationCode(verificationCode);
    
    const validatePhone = (phone) => {
        return phone
          .match(/^[0-9].{8,10}$/)
      }
    
      const validateVerificationCode = (verificationCode) => {
        return verificationCode
          .match(/^[0-9].{0,3}}$/)
      }
    
      const handlePhone = useCallback((e) => {
        const currPhone = e.target.value;
        setPhone(currPhone);
        if (!validatePhone(currPhone)) {
          setPhoneMsg("-을 제외한 9~11자리의 숫자만 입력 가능합니다.");
        } else {
          setPhoneMsg("입력하신 번호로 문자인증을 진행해 주세요.");
        }
        
      }, []);
    
    const handleVerificationCode = useCallback((e) => {
        const currVerificationCode = e.target.value;
        setVerificationCode(currVerificationCode);
        if (!validateVerificationCode(currVerificationCode)) {
          setVerificationCodeMsg("4자리의 숫자만 입력 가능합니다.");
        } else {
          setVerificationCodeMsg("확인 버튼을 눌러 인증을 완료해 주세요.");
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
    
      const handleSendVerificationCode = async () => {
        const enteredVerificationCode = verificationCodeInputRef.current.value;
        const url = `/users/smscheck`;
        const body = { cerNum: enteredVerificationCode };
      
        try {
          const response = await axios.post(url, body);
          if (response.status === 200) {
            console.log('인증번호 확인 성공');
            Swal.fire("", "ㅊㅋ");
          } else {
            console.error('인증번호 확인 실패');
            Swal.fire("", "ㄴㄴ");
          }
        } catch (error) {
          console.error('API 호출 중 오류 발생', error);
          Swal.fire("", "API 호출 중 오류 발생");
        }
      };

    return (
        <>
            <label htmlFor="phone">휴대전화</label>
            <div className="input-group">
                <input className="input" type="text" id="phone" required ref={phoneInputRef} value={phone} placeholder="- 없이 휴대폰 번호를 입력해주세요." onChange={handlePhone} />
                <button type="button" className="button button-primary" disabled={!isPhoneValid} name="smsButton" onClick={handleSendSMS}>인증번호 요청</button>
            </div>
            <div className="regexMsg">{phoneMsg}</div>
            <div className="input-group">
                <input className="input" type="text" ref={verificationCodeInputRef} value={verificationCode} id="verificationCode" required placeholder="전송받으신 인증번호 4자리를 입력해 주세요." onChange={handleVerificationCode} disabled={!isPhoneValid} />
                <button type="button" className="button button-primary" onClick={handleSendVerificationCode} disabled={!isVerificationCodeValid}>인증번호 입력</button>

            </div>
            <div className="regexMsg">{verificationCodeMsg}</div>
        </>
    )
}

export default AuthSms;