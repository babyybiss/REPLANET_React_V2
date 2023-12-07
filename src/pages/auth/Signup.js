import React, { useRef, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import PrivacyPolicy from "../../component/users/PrivacyPolicy";
import Terms from "../../component/users/Terms";



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

  const [isDuplicated, setIsDuplicated] = useState(false);

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
  }, [password]);

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
          title: "인증 성공!"
        }
      );
      setIsOnCheckSmsCode(true);
      setPhoneMsg("휴대전화 인증이 완료되었습니다.");
    } else {
      Swal.fire(
        {
          icon: 'warning',
          title: "인증 실패!",
          text: "인증번호가 일치하지 않습니다."
        }
      );
    }
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

        if (!response.data.isDuplicated) {
          await handleSendSMS();
          setIsDuplicated(true);
        }

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire(
          {
            icon: 'warning',
            title: "전송 실패!",
            text: "이미 사용 중인 휴대전화 번호입니다."
          }
        );
        console.log('이미 사용 중인 휴대전화 번호입니다.');
        setPhone("");
        setPhoneMsg("이미 사용 중인 휴대전화 번호입니다.");
        setIsOnCheckPhone(false);
      }
      else {
        Swal.fire(
          {
            icon: 'warning',
            title: "전송 실패!",
            text: "서버 오류가 발생했습니다."
          }
        );
        console.log('예상치 못한 오류가 발생했습니다.');
        setPhoneMsg("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  const resetOnCheckSmsCode = () => {
    setIsOnCheckSmsCode(false);
    setPhone("");
    setPhoneMsg("");
  }

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

  const isAllValid = isEmailValid && isPasswordValid && isPasswordConfirmValid && isMemberNameValid && isPhoneValid && privacyCheck && useCheck && isOnCheckEmail && isOnCheckPhone && isOnCheckSmsCode;

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

  const KakaoLoginHandler = () => {

    console.log("반갑다 나 카카오다.");
    console.log("kakao login form")

    const REST_API_KEY = "8a5a93627a69a5b1728721bc6ff53635";
    const REDIRECT_URI = "http://localhost:3000/";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&scope=account_email&prompt=login`;

    //window.location.href = KAKAO_AUTH_URL;
    window.open(KAKAO_AUTH_URL, "_blank", "noopener, noreferrer");

  }

  return (
    <>
      <div className="container-first container-centered">
        <style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        </style>
        <h1>회원가입</h1>
        <div id="container-user" className="text-left">
          <div className="items-container ic1">

            <div className="tabs pb-2">
              <div className="tab_item ti2 active">일반 회원가입</div>
              <div className="tab_item ti2" onClick={KakaoLoginHandler}><i className="fa-solid fa-comment"></i> kakao 회원가입</div>
            </div>
          </div>


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
                  {isOnCheckSmsCode ?
                    (
                      <button
                        type="button"
                        className="button button-primary-outline"
                        name="dupCheckButton"
                        onClick={resetOnCheckSmsCode}

                      >다른 번호 사용하기</button>

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
                {isOnCheckPhone && (
                  <div className="input-group">
                    {isOnCheckSmsCode ? (<></>) : (<input
                      className="input"
                      type="text"
                      ref={smsCodeInputRef}
                      required
                      placeholder="인증번호 입력"
                      disabled={isOnCheckSmsCode}
                      style={{ borderRight: '1px solid #cccccc' }}
                    />)}
                    {isOnCheckSmsCode ? (<></>) :
                      (<button
                        type="button"
                        className="button button-primary"
                        onClick={onCheckSmsCode}
                        disabled={!isPhoneValid || !isOnCheckPhone}
                      >
                        인증하기
                      </button>)}
                  </div>
                )}
              </div>
              <div className="item">
                <div className="container-policy mb-1">
                  <pre>
                  <PrivacyPolicy/>
                  </pre>
                </div>
                <input id="policy1" type="checkbox" className="mb-1" checked={privacyCheck} onChange={ageBtnEvent} />
                <label htmlFor="policy1">개인정보처리방침에 동의합니다.(필수)</label>
                <div className="container-policy mb-1">
                    <Terms/>
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