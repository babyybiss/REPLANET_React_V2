import React, { useState, useRef, useContext, useCallback } from "react";
import '../../assets/css/user.css';
import { ChangePassword } from "../../component/auth/ChangePassword";
import Swal from "sweetalert2";
import axios from 'axios';
function Find() {
  const phoneInputRef = useRef(null);
  const smsCodeInputRef = useRef(null);

  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const [phoneMsg, setPhoneMsg] = useState("");

  const [isOnCheckSmsCode, setIsOnCheckSmsCode] = useState(false);

  const validatePhone = (phone) => {
    return phone
      .match(/^[0-9].{8,10}$/)
  }

  const isPhoneValid = validatePhone(phone);

  const handlePhone = useCallback((e) => {
    const currPhone = e.target.value;
    setPhone(currPhone);
    if (!validatePhone(currPhone)) {
      setPhoneMsg("-을 제외한 9~11자리의 숫자만 입력 가능합니다.");
    } else {
      setPhoneMsg("문자인증을 진행해 주세요.");
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



  const onCheckSmsCode = () => {
    console.log(smsCode);
    if (smsCode == smsCodeInputRef.current.value) {
      Swal.fire("인증 성공");
      setIsOnCheckSmsCode(true);
    } else {Swal.fire("인증 실패");}
  };


  return (
    <div className="container-first container-centered text-left">
      <div id="container-user">

        <div className="tabs">
          <input id="tab1" type="radio" name="tab_item" defaultChecked />
          <label className="tab_item ti2" for="tab1">계정 찾기</label>
          <input id="tab2" type="radio" name="tab_item" />
          <label className="tab_item ti2" for="tab2">비밀번호 찾기</label>

          <div className="tab_content" id="tab1_content">
            <div className="items-container ic1">
            <label htmlFor="phone">가입 당시 입력하셨던 휴대전화 번호를 입력해 주세요.</label>
                <div className="input-group">
                  <input className="input" type="text" id="phone" required ref={phoneInputRef} value={phone} placeholder="- 없이 휴대폰 번호를 입력해주세요." onChange={handlePhone} />
                  <button type="button" className="button button-primary" name="smsButton" onClick={handleSendSMS} disabled={!isPhoneValid}>인증번호 요청</button>
                </div>
                <div className="regexMsg">{phoneMsg}</div>
                <div className="input-group" >
                  <input className="input" type="text" ref={smsCodeInputRef} required placeholder="인증번호 입력" />
                  <button type="button" className="button button-primary" onClick={onCheckSmsCode}  disabled={!isPhoneValid}>인증번호 입력</button>

                </div>

            </div>

          </div>
          <div className="tab_content" id="tab2_content">
            <div className="items-container ic1">

              <ChangePassword />

              {/* 
                      <input type="text" className="input" placeholder="id"/>

                    <div className="input-group">
                      <input type="number" className="input" placeholder="전화번호"/>
                      <button className="button button-primary">인증</button>
                    </div>
                    
                    <button type="submit" className="button button-primary">비밀번호 찾기</button> */}
            </div>


          </div>

        </div>


      </div>












    </div>
  )

}
export default Find;