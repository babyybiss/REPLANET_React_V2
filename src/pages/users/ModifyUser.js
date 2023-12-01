import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../component/auth/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMemberByTokenAPI } from '../../apis/MemberAPI';

function ModifyUser() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.memberReducer);
    useEffect(
        () => {
            dispatch(callGetMemberByTokenAPI())
        }, [dispatch]
    );

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const memberNameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const smsCodeInputRef = useRef(null);
  
    const [email, setEmail] = useState(result.member.memberEmail);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [memberName, setMemberName] = useState(result.member.memberName);
    const [phone, setPhone] = useState(result.member.phone);
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
        else if (email != null || !isEmailValid) {
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
  
    const isAllValid = isEmailValid && isPasswordValid && isPasswordConfirmValid && isMemberNameValid && isPhoneValid && isOnCheckEmail && isOnCheckPhone && isOnCheckSmsCode ;

    const submitHandler = () => {
        dispatch()
    }

    return(
        <div className="mypage-main">
            <h1 className="text-primary">회원 정보 수정</h1>
            <h6>무엇 무엇이 바뀌게 할까... 고민입니다</h6>
            <br/>
            <div id="container-user" className="text-left">
                <div className="items-container ic1">
                <div className="item">
                    <label htmlFor="email">이메일</label>
                    <div className="input-group">
                    <input className="input" type="text" name="email" id="email" onChange={handleEmail} value={email} required ref={emailInputRef} />
                    <button type="button" className="button button-primary " disabled={!isEmailValid} onClick={onCheckEmail}>중복확인</button>
                    </div>
                    <div className="regexMsg">{emailMsg}</div>
                    <div id="emailCheckResult"></div>
                    <label htmlFor="password">비밀번호</label><input className="input" type="password" id="password" value={password} onChange={handlePassword} required ref={passwordInputRef} placeholder="영문, 숫자, 특수기호를 조합한 8~24자로 입력해주세요." />
                    <div className="regexMsg">{passwordMsg}</div>
                    <label htmlFor="passwordConfirm">비밀번호 확인</label><input className="input" type="password" value={passwordConfirm} id="passwordConfirm" placeholder="비밀번호를 한 번 더 입력해주세요." onChange={handlePasswordConfirm} />
                    <div className="regexMsg">{passwordConfirmMsg}</div>
                    <label htmlFor="memberName">이름(실명)</label><input className="input" type="text" id="memberName" value={memberName} onChange={handleMemberName} required ref={memberNameInputRef} />
                    <div className="regexMsg">{memberNameMsg}</div>
                    <label htmlFor="phone">휴대전화</label>
                    <div className="input-group">
                    <input className="input" type="text" id="phone" required ref={phoneInputRef} value={phone} onChange={handlePhone} />
                    <div id="dupcheck" onClick={onCheckPhone} disabled={!isPhoneValid}>중복확인</div>
                    <button type="button" className="button button-primary"  name="smsButton" onClick={handleSendSMS} disabled={!isPhoneValid || !isOnCheckPhone}>인증번호 요청</button>
                    </div>
                    <div className="regexMsg">{phoneMsg}</div>
                    <div className="input-group">
                    <input className="input" type="text" ref={smsCodeInputRef} required placeholder="인증번호 입력" />
                    <button type="button" className="button button-primary" onClick={onCheckSmsCode}  disabled={!isPhoneValid || !isOnCheckPhone}>인증번호 입력</button>
                    </div>
                </div>
                <button className="button button-primary w-100" onClick={() => submitHandler()} disabled={!isAllValid}>수정하기</button>
                </div>
            </div>
        </div>
    )
}

export default ModifyUser;