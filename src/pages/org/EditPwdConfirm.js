import { useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/TokenUtils";
import { useRef, useState } from "react";
import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { VerifyPwdAPI } from "../../apis/OrgAPI";
import { useNavigate } from "react-router-dom";

function PwdConfirm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = window.localStorage.getItem('token');
    const orgCode = decodeJwt(token)?.memberCode || 0;

    const [orgPwd, setOrgPwd] = useState("");
    const orgPwdInputRef = useRef(null);

    const handleOrgPwd = (e) => {
        setOrgPwd(e.target.value);
    };

    const handleConfirm = () => {
        console.log("디스패치 전 확인~");
        dispatch(VerifyPwdAPI({orgCode, orgPwd}, navigate))
    }

    return(
        <div className="admin-main">
            <div className="admin-title">
                <h1 class="text-primary">기부처 정보 수정</h1>
            </div>
            <div className="verifying">
                <div className="verifying-container">
                    <h5>비밀번호를 입력해 주세요.</h5><br/>
                    <input className="input-pwd input" type="password" id="orgPwd" value={orgPwd} onChange={handleOrgPwd} required ref={orgPwdInputRef} />
                    <br/><br/>
                    <button className="button button-primary" onClick={handleConfirm}>비밀번호 확인</button>
                </div>
            </div>
        </div>
    )
}

export default PwdConfirm;