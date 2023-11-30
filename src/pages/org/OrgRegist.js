import React, { useRef, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function OrgRegist() {
    
    let navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef(null);
    const memberNameInputRef = useRef(null);
    const phoneInputRef = useRef(null);

    const decodedToken = authCtx.token ? jwtDecode(authCtx.token) : null;
    console.log('Decoded Token:', decodedToken);
    const memberRole = decodedToken.memberRole;
    console.log('memberRole:', memberRole);


    const [email, setEmail] = useState('');
    const [memberName, setMemberName] = useState('');
    const [phone, setPhone] = useState('');

    const validateMemberName = (memberName) => {
        return memberName
        .toLowerCase()
        .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|].{2,100}$/)
    }

    const validatePhone = (phone) => {
        return phone
        .match(/^[0-9].{8,10}$/)
    }

    const validateVerificationCode = (verificationCode) => {
        return verificationCode
        .match(/^[0-9].{0,3}}$/)
    }



    const onCheckEmail = async () => {
    console.log(email);
    const url = "http://localhost:8001/auth/emailcheck/" + email;
    const body = { email: email };

    try {
        const response = await axios.post(url, body);
        if (response.status === 200) {
        console.log('사용 가능한 이메일입니다');
        setEmailMsg("사용 가능한 이메일입니다.");
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
        console.log('이미 사용 중인 이메일입니다.');
        setEmailMsg("이미 사용 중인 이메일입니다.");
        } else {
        console.log('예상치 못한 오류가 발생했습니다.');
        setEmailMsg("예상치 못한 오류가 발생했습니다.");
        }
    }
};

    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    };
    
    const [emailMsg, setEmailMsg] = useState("");
    const [memberNameMsg, setMemberNameMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");

    const isEmailValid = validateEmail(email);
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
        }
    }, []);

    const isAllValid = isMemberNameValid && isPhoneValid;

    function getTempPassword() {
        const charSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
        let str = "";
        let idx = 0;
    
        for (let i = 0; i < 10; i++) {
            idx = Math.floor(Math.random() * charSet.length);
            str += charSet[idx];
        }
    
        return str;
    }
    
    const submitHandler = (e) => {
    
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredMemberName = memberNameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
    
        const temporaryPassword = getTempPassword();
    
        authCtx.signup(enteredEmail, temporaryPassword, enteredMemberName, enteredPhone, memberRole);
    
        console.log('enteredEmail : ', enteredEmail);
        console.log('enteredMemberName : ', enteredMemberName);
        console.log('enteredPhone : ', enteredPhone);
        console.log('temporaryPassword : ', temporaryPassword);
    }

    useEffect(() => {
        console.log('authCtx.isSuccess : ', authCtx.isSuccess);
        if (authCtx.isSuccess) {
            navigate("/org/list", { replace: true });
        }
    }, [authCtx.isSuccess]);

    return (
        <>
            <div className="container-first container-centered" style={{padding: "calc(1rem) 5vw", minHeight: "0"}}>
            <h1>기부처 등록</h1>
            <div id="container-user" className="text-left">
                <form onSubmit={submitHandler}>
                    <div className="items-container ic1">
                        <div className="item">
                            <label htmlFor="email">이메일</label>
                            <div className="input-group">
                                <input className="input" type="text" name="email" id="email" onChange={handleEmail} value={email} required ref={emailInputRef} placeholder="(필수) 이메일 주소를 입력해주세요." />
                                <button type="button" className="button button-primary" disabled={!isEmailValid} onClick={onCheckEmail}>중복확인</button>
                            </div>
                            <div className="regexMsg">{emailMsg}</div>
                            <div id="emailCheckResult"></div>
                            <label htmlFor="memberName">기부처명</label><input className="input" type="text" id="memberName" value={memberName} onChange={handleMemberName} required ref={memberNameInputRef} placeholder="(필수) 기부처명을 입력해주세요." />
                            <div className="regexMsg">{memberNameMsg}</div>
                            <label htmlFor="phone">대표전화</label>
                            <div className="input-group">
                                <input className="input" type="text" id="phone" required ref={phoneInputRef} value={phone} placeholder="(필수) - 없이 번호만 입력해주세요." onChange={handlePhone} />
                            </div>
                            <div className="regexMsg">{phoneMsg}</div>
                        </div>
                        <button className="button button-primary w-100" type="submit" disabled={!isAllValid}>기부처등록</button>
                        <div className="regexMsg">모두 입력 후 기부처등록 버튼을 눌러주세요.</div>
                    </div>
                </form>
            </div>
            </div>
        </>
        )
    }

export default OrgRegist;