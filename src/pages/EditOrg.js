import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../component/auth/AuthContext";
import { decodeJwt } from "../utils/TokenUtils";
import '../assets/css/user.css';
import '../assets/css/common.css';
import { useDispatch } from "react-redux";

function EditOrg(){

    const token = window.localStorage.getItem('token');
    const orgCode = decodeJwt(token)?.memberCode || 0;

    const orgInfo = JSON.parse(localStorage.getItem("orgData"));
    console.log("orgInfo 받아온거 확인 : ", orgInfo);

    const dispatch = useDispatch();

    const orgEmailInputRef = useRef(null);
    const orgPwdInputRef = useRef(null);
    const orgNewPwdInputRef = useRef(null);
    const orgNameInputRef = useRef(null);
    const orgPhoneInputRef = useRef(null);
    const orgIntroInputRef = useRef(null);

    const [orgEmail, setOrgEmail] = useState(orgInfo?.orgEmail || "");
    const [orgPwd, setOrgPwd] = useState("");
    const [orgNewPwd, setOrgNewPwd] = useState("");
    const [orgName, setOrgName] = useState(orgInfo?.orgName || "");
    const [orgPhone, setOrgPhone] = useState(orgInfo?.phone || "");
    const [orgIntro, setOrgIntro] = useState(orgInfo?.description || "");

    const validateOrgEmail = (orgEmail) => {
        return orgEmail.toLowerCase()
            .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    };
    const validateOrgNewPwd = (orgNewPwd) => {
        return orgNewPwd.toLowerCase()
            .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,24}$/);
    };
    const validateOrgName = (orgName) => {
        return orgName.toLowerCase()
            .match(/^[ㄱ-ㅎ|가-힣].{2,100}$/);
    };
    const validateOrgPhone = (orgPhone) => {
        return orgPhone.match(/^[0-9].{8,10}$/);
    };
    const validateOrgIntro = (orgIntro) => {
        return orgIntro.match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z].{2,300}$/);
    };

    const [orgEmailMsg, setOrgEmailMsg] = useState("");
    const [orgIdMsg, setOrgIdMsg] = useState("");
    const [orgNewPwdMsg, setOrgNewPwdMsg] = useState("");
    const [orgNameMsg, setOrgNameMsg] = useState("");
    const [orgPhoneMsg, setOrgPhoneMsg] = useState("");
    const [orgIntroMsg, setOrgIntroMsg] = useState("");

    const handleOrgEmail = useCallback((e) => {
        const newOrgEmail = e.target.value;
        setOrgEmail(newOrgEmail);
        setOrgEmailMsg("");

        if(!validateOrgEmail(newOrgEmail)){
            setOrgEmailMsg("이메일 형식이 올바르지 않습니다.")
        } else {
            setOrgEmailMsg("올바른 형식의 이메일입니다.")
        }
    });
    const handleOrgPwd = useCallback((e) => {
        setOrgPwd(e.target.value);
    });
    const handleOrgNewPwd = useCallback((e) => {
        const newOrgPwd = e.target.value;
        setOrgNewPwd(newOrgPwd);
        setOrgNewPwdMsg("");

        if(!validateOrgNewPwd(newOrgPwd)){
            setOrgNewPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해 주세요.")
        } else {
            setOrgNewPwdMsg("안전한 비밀번호입니다.")
        }
    });
    const handleOrgName = useCallback((e) => {
        const newOrgName = e.target.value;
        setOrgName(newOrgName);
        setOrgNameMsg("");

        if(!validateOrgName(newOrgName)){
            setOrgNameMsg("재단명을 한글로 입력해 주세요.")
        } else {
            setOrgNameMsg("올바른 형식의 재단명입니다.")
        }
    });
    const handleOrgPhone = useCallback((e) => {
        const newOrgPhone = e.target.value;
        setOrgPhone(newOrgPhone);
        setOrgPhoneMsg("");

        if(!validateOrgPhone(newOrgPhone)){
            setOrgPhoneMsg("-을 제외한 9~11자리의 숫자만 입력 가능합니다.")
        } else {
            setOrgPhoneMsg("올바른 형식의 연락처입니다.")
        }
    });
    const handleOrgIntro = useCallback((e) => {
        const newOrgIntro = e.target.value;
        setOrgIntro(newOrgIntro);
        if(newOrgIntro.length > 200){
            setOrgIntroMsg("작성 가능한 글자 수를 초과하였습니다.")
        } else{
            setOrgIntroMsg("재단의 소개글을 300자 이내로 입력해 주세요.")
        }
    });

    const handlePwdConfirm = async () => {

    }

    const submitHandler = (e) => {
        const enteredOrgEmail = orgEmailInputRef.current.value;
        const enteredOrgNewPwd = orgNewPwdInputRef.current.value;
        const enteredOrgName = orgNameInputRef.current.value;
        const enteredOrgPhone = orgPhoneInputRef.current.value;
        const enteredOrgIntro = orgIntroInputRef.current.value;
        
    }

    return(
        <>
        <div className="container-first contatiner-centered">
            <h1>재단 정보 수정</h1>
            <div id="container-user" className="text-left">
                <form onSubmit={submitHandler}>
                    <div className="items-container ic1">
                        <div className="item">
                            <label htmlFor="orgEmail">재단 이메일</label><input className="input" type="text" id="orgId" value={orgEmail} onChange={handleOrgEmail} />
                            <div className="regexMsg">{orgEmailMsg}</div>
                            <label htmlFor="orgNewPwd">변경할 비밀번호</label><input className="input" type="password" id="orgNewPwd" value={orgNewPwd} onChange={handleOrgNewPwd} required ref={orgNewPwdInputRef} />
                            <div className="regexMsg">{orgNewPwdMsg}</div>
                            <label htmlFor="orgName">재단명</label><input className="input" type="text" id="orgName" value={orgName} onChange={handleOrgName} required ref={orgNameInputRef} />
                            <div className="regexMsg">{orgNameMsg}</div>
                            <label htmlFor="orgPhone">재단 연락처</label><input className="input" type="text" id="orgPhone" value={orgPhone} onChange={handleOrgPhone} required ref={orgPhoneInputRef} />
                            <div className="regexMsg">{orgPhoneMsg}</div>
                            <label htmlFor="orgIntro">재단 소개</label><textarea className="input" type="text" id="orgIntro" value={orgIntro} onChange={handleOrgIntro} required ref={orgIntroInputRef} />
                            <div className="regexMsg">{orgIntroMsg}</div>
                        </div>
                        <button className="button button-primary w-100" type="submit">수정하기</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default EditOrg;