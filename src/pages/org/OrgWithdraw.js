import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/TokenUtils';
import { useState } from 'react';
import { orgWithdrawAPI } from '../../apis/OrgAPI';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function OrgWithdraw() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const submitWithdraw = () => {
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
            Swal.fire({
            icon: 'warning',
            title: '정말 탈퇴 신청하시겠습니까?',
            confirmButtonColor: '#1D7151',
            iconColor: '#1D7151',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            }).then(result => {
                if (result.isConfirmed) {
                    dispatch(orgWithdrawAPI({memberCode, enterReason}, navigate))
                }else if (!result.isDenied) {
                    console.log('탈퇴 신청을 취소했어요.');
                    return;
                }
            });
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
                        <h5>탈퇴 신청 양식을 작성하여 제출하시면 영업일 기준 2일 이후에 탈퇴 처리가 완료됩니다.</h5>
                        <h5>2일 이내에 마이페이지에서 탈퇴 신청을 철회하실 수 있습니다.</h5>
                        <h5>탈퇴 처리 이후에는 해당 계정으로 로그인 하실 수 없습니다.</h5>
                        <h5>모금을 받은 내역이 존재할 경우 모금활동에 대한 정보는 5년간 보관됩니다.</h5>
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