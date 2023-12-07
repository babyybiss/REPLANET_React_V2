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
    const provider = decodeJwt(token)?.provider || 'REPLANET';

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
            <br/>
            <div className="verifying">
                <div className="verifying-container">
                    {provider == 'REPLANET'? (
                        <>
                            <h5>비밀번호를 입력해 주세요.</h5><br/>
                            <input className="input-pwd input" type="password" id="userPwd" value={userPwd} onChange={handleUserPwd} required ref={userPwdInputRef} />
                            <br/><br/>
                            <button className="button button-primary" onClick={handleConfirm}>비밀번호 확인</button>
                        </>
                    ) : (
                        <h3>카카오 로그인 회원은 카카오에서 회원 정보를 수정해 주세요.</h3>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default VerifyUser;