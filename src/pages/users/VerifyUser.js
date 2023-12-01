import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/TokenUtils';
import { useRef, useState } from 'react';
import { VerifyUserAPI } from '../../apis/UserAPI';

function VerifyUser () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = window.localStorage.getItem('token');
    const memberCode = decodeJwt(token)?.memberCode || 0;

    const [userPwd, setUserPwd] = useState("");
    const userPwdInputRef = useRef(null);

    const handleUserPwd = (e) => {
        setUserPwd(e.target.value);
    };

    const handleConfirm = () => {
        console.log("디스패치 전 확인~");
        dispatch(VerifyUserAPI({memberCode, userPwd}, navigate))
    }

    return(
        <div className="mypage-main">
            <h1 className="text-primary">회원 정보 수정</h1>
            <h6>소셜 로그인 회원은 가입한 곳에서 수정 구다사이</h6>
            <h6>소셜 로그인 완성되면 소셜 회원은 못하게 할래요</h6>
            <br/>
            <div className="verifying">
                <div className="verifying-container">
                    <input className="input-pwd input" type="password" id="userPwd" value={userPwd} onChange={handleUserPwd} required ref={userPwdInputRef} />
                    <br/><br/>
                    <button className="button button-primary" onClick={handleConfirm}>비밀번호 확인</button>
                </div>
            </div>
        </div>
    )
}

export default VerifyUser;