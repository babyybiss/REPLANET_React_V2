import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/TokenUtils';
import { useContext, useState } from 'react';
import { orgWithdrawAPI } from '../../apis/OrgAPI';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../../component/auth/AuthContext';


function OrgWithdraw() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const token = window.localStorage.getItem('token');
    const memberCode = decodeJwt(token)?.memberCode || 0;

    const [reason, setReason] = useState("");
    const [lengthMsg, setLengthMsg] = useState("");

    const handleTextarea = (e) => {
        setReason(e.target.value);
        if(e.target.value.length > 300){
            setLengthMsg("300자를 초과했습니다.");
        }else if(e.target.value.length <= 300){
            setLengthMsg(e.target.value.length + " / 300");
        }
    }

    const submitWithdraw = async () => {
        const enterReason = reason.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        if(reason == ""){
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "사유를 입력해 주세요.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        }else if(reason.length > 300){
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "사유의 길이가 300자를 초과했습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else {
            const {value: password} = await Swal.fire({
                title: '탈퇴를 위해 비밀번호를 입력해 주세요.',
                input: 'password',
                inputPlaceholder: '비밀번호 입력',
                inputAttributes: {
                    maxlength: '24',
                    autocapitalize: "off",
                    autocorrect: "off"
                }
            })
            if(password){
                dispatch(orgWithdrawAPI({memberCode, enterReason, password}, navigate, authCtx))
            }else{
                Swal.fire({
                    icon: "warning",
                    iconColor: '#1D7151',
                    title: "비밀번호를 입력해 주세요.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                });
                console.log('탈퇴 신청을 취소했어요.');
            }
        }
    }

    return(
        <>
            <div className="admin-main">
                <div className="admin-title">
                    <h1 class="text-primary">탈퇴 신청</h1>
                </div>
                <div>
                    <div className="withdrawInfo">
                        <h5>진행중인 캠페인이 있는 경우에는 탈퇴할 수 없습니다.</h5>
                        <h5>탈퇴 신청 양식을 작성하여 제출하시면 영업일 기준 2일 이내에 탈퇴 처리가 완료됩니다.</h5>
                        <h5>탈퇴 신청 이후에는 해당 계정으로 로그인 하실 수 없습니다.</h5>
                        <h5>모금을 받은 내역이 존재할 경우 모금활동에 대한 정보는 관련 법령에 따라 5년간 보관됩니다.</h5><br/>
                        <h6 style={{color: "#DB524E"}}>[근거법령 : 소득세법 제 160조의3, 소득세법 시행령 제 113조 제1항, 제208조의3, 소득세법 시행규칙 제58조]</h6>
                    </div><br/>
                    <h3>탈퇴 사유 <span className="regexMsg">{lengthMsg}</span></h3>
                    <textarea
                        className='withdrawTA'
                        onChange={handleTextarea}
                        placeholder="탈퇴 사유를 입력해 주세요. 최대 300자까지 입력 가능합니다."
                    />
                </div><br/>
                <button className="button button-lg button-primary" onClick={() => submitWithdraw()}>탈퇴 신청</button>
            </div>
        </>
    );
}

export default OrgWithdraw;