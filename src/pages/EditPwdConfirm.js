import { useDispatch } from "react-redux";
import { decodeJwt } from "../utils/TokenUtils";
import { useRef, useState } from "react";
import { VerifyPwdAPI, verifyPwdAPI } from "../apis/PointAPI";

function PwdConfirm(){
    const dispatch = useDispatch();

    const token = window.localStorage.getItem('token');
    const orgCode = decodeJwt(token)?.memberCode || 0;

    const [orgPwd, setOrgPwd] = useState("");
    const orgPwdInputRef = useRef(null);

    const handleOrgPwd = (e) => {
        setOrgPwd(e.target.value);
    };

    const handleConfirm = () => {
        console.log("디스패치 전 확인~");
        dispatch(VerifyPwdAPI({orgCode, orgPwd}))
    }

    return(
        <div className="container-first contatiner-centered">
            <h5>재단 정보 수정을 위해 비밀번호를 입력해 주세요.</h5>
            <div id="container-user">
                <input className="input" type="password" id="orgPwd" value={orgPwd} onChange={handleOrgPwd} required ref={orgPwdInputRef} />
                <br/><br/>
                <button className="button button-primary w-100" onClick={handleConfirm}>비밀번호 확인</button>
            </div>
        </div>
    )
}

export default PwdConfirm;