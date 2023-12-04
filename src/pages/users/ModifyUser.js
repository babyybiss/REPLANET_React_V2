import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMemberByTokenAPI } from '../../apis/MemberAPI';
import { modifyUserAPI } from '../../apis/UserAPI';

function ModifyUser() {

  const dispatch = useDispatch();
  const result = useSelector(state => state.memberReducer);
    useEffect(
        () => {
            dispatch(callGetMemberByTokenAPI())
        }, [dispatch]
  );

  const navigate = useNavigate();
  const passwordInputRef = useRef(null);
  const memberNameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const smsCodeInputRef = useRef(null);
  
  const email = result.member?.memberEmail || null;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [memberName, setMemberName] = useState(result.member.memberName);
  const [phone, setPhone] = useState(result.member.phone);
  const [smsCode, setSmsCode] = useState('');
  
  const [isOnCheckPhone, setIsOnCheckPhone] = useState(true);
  const [isOnCheckSmsCode, setIsOnCheckSmsCode] = useState(true);
  
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
  
  const emailMsg = "이메일은 변경할 수 없습니다. 필요 시 고객센터로 문의 바랍니다.";
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState("");
  const [memberNameMsg, setMemberNameMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("번호 변경 시 재인증이 필요합니다.");
  
  const isPasswordValid = validatePassword(password);
  const isPasswordConfirmValid = password === passwordConfirm;
  const isMemberNameValid = validateMemberName(memberName);
  const isPhoneValid = validatePhone(phone);
  
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
      setPhoneMsg("번호가 변경되었습니다. 중복확인 후 문자인증을 진행해 주세요.");
      setIsOnCheckPhone(false);
      setIsOnCheckSmsCode(false);
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
      } else {
        console.log('예상치 못한 오류가 발생했습니다.');
        setPhoneMsg("예상치 못한 오류가 발생했습니다.");
      }
    }
  };
  
  const isAllValid = isPasswordValid && isPasswordConfirmValid && isMemberNameValid && isPhoneValid && isOnCheckPhone && isOnCheckSmsCode ;

  const submitHandler = () => {
      dispatch(modifyUserAPI({
        memberCode: result.member?.memberCode,
        password, memberName, phone
      }, navigate))
  }

  return(
    <div className="mypage-main">
      <h1 className="text-primary">회원 정보 수정</h1>
      <br/>
      <div id="container-user" className="text-left">
        <div className="items-container ic1">
          <div className="item">
            <label htmlFor="email">이메일</label><input className="input" type="text" name="email" id="email" value={email} disabled />
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