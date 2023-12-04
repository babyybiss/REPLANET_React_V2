import { useCallback, useEffect, useRef, useState } from "react";
import { decodeJwt } from "../../utils/TokenUtils";
import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { modifyOrgAPI } from "../../apis/OrgAPI";
import { useNavigate } from "react-router-dom";

function OrgEdit() {

    const token = window.localStorage.getItem('token');
    const orgCode = decodeJwt(token)?.memberCode || 0;

    const orgInfo = JSON.parse(localStorage.getItem("orgData"));
    useEffect(() => {
        console.log("orgInfo 받아온거 확인 : ", orgInfo);
    }, [])
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileRef = useRef();
    const orgNewPwdInputRef = useRef(null);
    const orgNameInputRef = useRef(null);
    const orgPhoneInputRef = useRef(null);
    const orgIntroInputRef = useRef(null);

    const [orgImg, setOrgImg] = useState(orgInfo.fileName? '/orgImgs/' + orgInfo.fileName : '/campaigns/default/noImage.png');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const orgEmail = orgInfo?.orgEmail || "";
    const [orgNewPwd, setOrgNewPwd] = useState("");
    const [orgName, setOrgName] = useState(orgInfo?.orgName || "");
    const [orgPhone, setOrgPhone] = useState(orgInfo?.phone || "");
    const [orgIntro, setOrgIntro] = useState(orgInfo?.description || "");

    const validateOrgNewPwd = (orgNewPwd) => {
        return orgNewPwd.toLowerCase()
            .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,24}$/);
    };
    const validateOrgName = (orgName) => {
        return orgName.toLowerCase()
        .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|].{2,100}$/)
    };
    const validateOrgPhone = (orgPhone) => {
        return orgPhone.match(/^[0-9].{8,10}$/);
    };

    const orgEmailMsg = "이메일은 변경할 수 없습니다. 필요 시 고객센터로 문의 바랍니다.";
    const [orgNewPwdMsg, setOrgNewPwdMsg] = useState("");
    const [orgNameMsg, setOrgNameMsg] = useState("");
    const [orgPhoneMsg, setOrgPhoneMsg] = useState("");
    const [orgIntroMsg, setOrgIntroMsg] = useState("");

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        //reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
            console.log(e.target);
            console.log(e.target.result);
            setFile(file);
            setOrgImg(e.target.result);
            setFileName(file.name);
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
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
            setOrgNameMsg("재단명을 한글 또는 알파벳으로 입력해 주세요.")
        } else {
            setOrgNameMsg("올바른 형식으로 입력되었습니다.")
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
        if(newOrgIntro.length > 300){
            setOrgIntroMsg("작성 가능한 글자 수를 초과하였습니다.")
        } else{
            setOrgIntroMsg("재단의 소개글을 300자 이내로 입력해 주세요.")
        }
    });

    const submitHandler = (e) => {
        if (orgNewPwd == null || orgNewPwd == "") {
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "비밀번호를 입력해 주세요.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else if (orgName == null || orgName == "") {
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "기부처명을 입력해 주세요.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else if (orgPhone == null || orgPhone == "") {
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "연락처를 입력해 주세요.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else {
            const formdata = new FormData();
            if(file){
                formdata.append("file", file);
            }
            formdata.append("password", orgNewPwd);
            formdata.append("memberName", new Blob([JSON.stringify(orgName)], { type: "application/json", }));
            formdata.append("phone", orgPhone);
            formdata.append("orgDescription", new Blob([JSON.stringify(orgIntro)], { type: "application/json", }));
            for (let key of formdata.keys()) {
                console.log(key, ":", formdata.get(key));
            }
            dispatch(modifyOrgAPI({
                orgCode,
                formdata: formdata
            }, navigate))
        }
    }

    return(
        <>
            <div className="admin-main">
                <div className="admin-title">
                    <div>
                        <h1 class="text-primary">기부처 정보 수정</h1><br/>
                        <div id="profileImgArea">
                            <img src={orgImg} className="orgImg" />
                        </div>
                        <label htmlFor="file" style={{alignItems: "center"}}>
                        <div className="confirm-btn">
                            사진 선택
                        </div>
                        </label>
                        <input type="file" id="file" name="file"
                            accept=".png, .jpeg, .jpg, .bmp, .svg"
                            onChange={handleChangeFile}
                            ref={fileRef}
                            style={{ display: "none" }} />
                        <a>{fileName}</a>
                        <p>5MB 이하의 이미지 파일로 업로드 해주세요.</p>
                    </div>
                    <div id="orgInfo" className="text-left">
                            <div className="items-container ic1">
                                <div className="item">
                                    <label htmlFor="orgEmail">재단 이메일</label><input className="input" type="text" id="orgId" value={orgEmail} disabled />
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
                                 <button className="button button-primary w-100" onClick={submitHandler}>수정하기</button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrgEdit;