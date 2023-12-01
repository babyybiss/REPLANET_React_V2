import React, { useRef, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';
import Swal from 'sweetalert2';
import axios from 'axios';




const Signup = () => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const memberNameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const smsCodeInputRef = useRef(null);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [memberName, setMemberName] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const [isOnCheckEmail, setIsOnCheckEmail] = useState(false);
  const [isOnCheckPhone, setIsOnCheckPhone] = useState(false);
  const [isOnCheckSmsCode, setIsOnCheckSmsCode] = useState(false);


  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  };

  const validatePassword = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,24}$/);
  }

  const validateMemberName = (memberName) => {
    return memberName
      .toLowerCase()
      .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|].{2,100}$/)
  }

  const validatePhone = (phone) => {
    return phone
      .match(/^[0-9].{8,10}$/)
  }


  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState("");
  const [memberNameMsg, setMemberNameMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordConfirmValid = password === passwordConfirm;
  const isMemberNameValid = validateMemberName(memberName);
  const isPhoneValid = validatePhone(phone);

  const handleEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);
    setEmailMsg("");

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.")
    } else {
      setEmailMsg("올바른 형식의 이메일입니다.")
    }
  });


  const handlePassword = useCallback((e) => {
    const currPassword = e.target.value;
    setPassword(currPassword);

    if (!validatePassword(currPassword)) {
      setPasswordMsg("영문, 숫자, 특수기호를 조합한 8~24자리로 입력해주세요.")
    } else {
      setPasswordMsg("안전한 비밀번호입니다.")
    }
  }, []);



  const handlePasswordConfirm = useCallback((e) => {
    const currPasswordConfirm = e.target.value;
    setPasswordConfirm(currPasswordConfirm);
    if (!validatePassword(password)) {
      setPasswordConfirmMsg("먼저 비밀번호를 영문, 숫자, 특수기호를 조합한 8~24자리로 입력해주세요.")
    } else if (currPasswordConfirm !== password) {
      setPasswordConfirmMsg("비밀번호 입력값이 일치하지 않습니다.")
    } else {
      setPasswordConfirmMsg("입력값이 일치합니다.")
    }
  }, [password])

  const handleMemberName = useCallback((e) => {
    const currMemberName = e.target.value;
    setMemberName(currMemberName);
    if (!validateMemberName(currMemberName)) {
      setMemberNameMsg("한글 또는 로마자 알파벳으로 실명을 입력해 주세요.");
    } else {
      setMemberNameMsg("");
    }

  }, []);

  const handlePhone = useCallback((e) => {
    const currPhone = e.target.value;
    setPhone(currPhone);
    if (!validatePhone(currPhone)) {
      setPhoneMsg("-을 제외한 9~11자리의 숫자만 입력 가능합니다.");
    } else {
      setPhoneMsg("중복확인 후 문자인증을 진행해 주세요.");
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
        Swal.fire(
          {
            icon: 'success',
            text: "입력하신 번호로 인증번호가 전송되었습니다."
          }
        );

      } else {
        console.error('인증번호 전송 실패');
        Swal.fire(
          {
            icon: 'warning',
            text: "전송 실패! 휴대전화 번호를 다시 확인해 주세요."
          });
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생', error);
      Swal.fire(
        {
          icon: 'warning',
          text: "API 호출 중 오류 발생"
        }
      );
    }
  };

  const onCheckSmsCode = () => {
    console.log(smsCode);
    if (smsCode == smsCodeInputRef.current.value) {
      Swal.fire(
        {
          icon: 'success',
          title: "인증 성공"
        }
      );
      setIsOnCheckSmsCode(true);
    } else {Swal.fire("인증 실패");}
  };

  const onCheckEmail = async () => {
    console.log(email);
    const url = "http://localhost:8001/auth/emailcheck/" + email;
    const body = { email: email };

    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        console.log('사용 가능한 이메일입니다');
        setEmailMsg("사용 가능한 이메일입니다.");
        setIsOnCheckEmail(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('이미 사용 중인 이메일입니다.');
        setEmail("");
        setEmailMsg("이미 사용 중인 이메일입니다.");
      } 
      else if (email == null) {
        console.log('이메일이 입력되지 않았습니다.');
        setEmailMsg('이메일이 입력되지 않았습니다.');
      }
      else if (email != null && !isEmailValid) {
        console.log('이메일 형식이 올바르지 않습니다.');
        setEmailMsg('이메일 형식이 올바르지 않습니다.');
      }
      else {
        console.log('예상치 못한 오류가 발생했습니다.');
        setEmailMsg("예상치 못한 오류가 발생했습니다.");
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
        console.log('사용 가능한 휴대전화 번호입니다.');
        setPhoneMsg("사용 가능한 휴대전화 번호입니다.");
        setIsOnCheckPhone(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('이미 사용 중인 휴대전화 번호입니다.');
        setPhone("");
        setPhoneMsg("이미 사용 중인 휴대전화 번호입니다.");
        setIsOnCheckPhone(false);
      } 
      else {
        console.log('예상치 못한 오류가 발생했습니다.');
        setPhoneMsg("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  const [allCheck, setAllCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setPrivacyCheck(true);
      setUseCheck(true);

    } else {
      setAllCheck(false);
      setPrivacyCheck(false);
      setUseCheck(false);

    }
  };

  const ageBtnEvent = () => {
    if (privacyCheck === false) {
      setPrivacyCheck(true)
    } else {
      setPrivacyCheck(false)
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true)
    } else {
      setUseCheck(false)
    }
  };

  useEffect(() => {
    if (privacyCheck === true && useCheck === true) {
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [privacyCheck, useCheck]);

  const isAllValid = isEmailValid && isPasswordValid && isPasswordConfirmValid && isMemberNameValid && isPhoneValid && privacyCheck && useCheck && isOnCheckEmail && isOnCheckPhone && isOnCheckSmsCode ;

  const submitHandler = (e) => {

    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredMemberName = memberNameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    authCtx.signup(enteredEmail, enteredPassword, enteredMemberName, enteredPhone);

    if (password === passwordConfirm && authCtx.isSuccess) {
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
                <label htmlFor="email">이메일</label>
                <div className="input-group">
                  <input className="input" type="text" name="email" id="email" onChange={handleEmail} value={email} required ref={emailInputRef} placeholder="이메일 주소를 입력해주세요." />
                  <button type="button" className="button button-primary " disabled={!isEmailValid} onClick={onCheckEmail}>중복확인</button>
                </div>
                <div className="regexMsg">{emailMsg}</div>
                <div id="emailCheckResult"></div>
                <label htmlFor="password">비밀번호</label><input className="input" type="password" id="password" value={password} onChange={handlePassword} required ref={passwordInputRef} placeholder="영문, 숫자, 특수기호를 조합한 8~24자로 입력해주세요." />
                <div className="regexMsg">{passwordMsg}</div>
                <label htmlFor="passwordConfirm">비밀번호 확인</label><input className="input" type="password" value={passwordConfirm} id="passwordConfirm" placeholder="비밀번호를 한 번 더 입력해주세요." onChange={handlePasswordConfirm} />
                <div className="regexMsg">{passwordConfirmMsg}</div>
                <label htmlFor="memberName">이름(실명)</label><input className="input" type="text" id="memberName" value={memberName} onChange={handleMemberName} required ref={memberNameInputRef} placeholder="이름을 입력해주세요." />
                <div className="regexMsg">{memberNameMsg}</div>
                <label htmlFor="phone">휴대전화</label>
                <div className="input-group">
                  <input className="input" type="text" id="phone" required ref={phoneInputRef} value={phone} placeholder="- 없이 휴대폰 번호를 입력해주세요." onChange={handlePhone} />
                  <div id="dupcheck" onClick={onCheckPhone} disabled={!isPhoneValid}>중복확인</div>
                  <button type="button" className="button button-primary"  name="smsButton" onClick={handleSendSMS} disabled={!isPhoneValid || !isOnCheckPhone}>인증번호 요청</button>
                </div>
                <div className="regexMsg">{phoneMsg}</div>
                <div className="input-group">
                  <input className="input" type="text" ref={smsCodeInputRef} required placeholder="인증번호 입력" />
                  <button type="button" className="button button-primary" onClick={onCheckSmsCode}  disabled={!isPhoneValid || !isOnCheckPhone}>인증번호 입력</button>

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
                <input id="policy1" type="checkbox" className="mb-1" checked={privacyCheck} onChange={ageBtnEvent} />
                <label htmlFor="policy1">개인정보처리방침에 동의합니다.(필수)</label>
                <div className="container-policy mb-1">
                  <pre>
                    <h4>이용약관</h4>
                    본 이용약관은 개인정보보호위원회(이하‘운영기관’이라 한다)에서 운영하는 “가명정보 활용 종합지원플랫폼”에 대한 이용조건 및 절차, 운영기관과 회원의 권리ㆍ의무, 기타 필요한 사항을 규정함을 목적으로 합니다.

                    제1조 약관의 효력과 변경
                    1. 회원이 본 이용약관 내용에 동의하는 경우 가명정보 활용 종합지원플랫폼의 서비스 제공 행위 및 회원의 서비스 사용 행위에 대하여는 본 약관이 우선적으로 적용됩니다.
                    2. 운영기관은 본 이용약관을 사전 고지 없이 변경할 수 있고, 변경된 약관은 가명정보 활용 종합지원플랫폼 내에 공지와 동시에 그 효력이 발생됩니다. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관 변경에 대한 동의로 간주됩니다.
                  </pre>
                </div>
                <input id="policy2" type="checkbox" className="mb-1" checked={useCheck} onChange={useBtnEvent} />
                <label htmlFor="policy2">이용약관에 동의합니다.(필수)</label>
                <hr />
                <input id="policy3" type="checkbox" className="mb-1" checked={allCheck} onChange={allBtnEvent} />
                <label htmlFor="policy3">약관 전체동의</label>
              </div>
              <button className="button button-primary w-100" type="submit" disabled={!isAllValid}>회원가입</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup;