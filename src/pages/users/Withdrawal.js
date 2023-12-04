import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
import { decodeJwt } from '../../utils/TokenUtils';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../component/auth/AuthContext';
import { userWithdrawAPI } from '../../apis/UserAPI';
import { result } from 'lodash';
import { callPostUnlinkMemberAPI } from '../../apis/KaKaoLoginAPI';
import { socialUserWithdrawAPI } from '../../apis/KaKaoLoginAPI';


function Withdrawal () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const token = window.localStorage.getItem('token');
    const memberCode = decodeJwt(token)?.memberCode || 0;
    const provider = decodeJwt(token)?.provider || 'REPLANET';
    const accessToken = authCtx.accessToken;

    const handleWithdraw = async () => {
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
            dispatch(userWithdrawAPI({memberCode, password}, navigate, authCtx))
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

    const handleUnlink = async () => {
        console.log('accessToken : ', accessToken);
        Swal.fire({
            icon: 'warning',
            title: '연동해제(탈퇴) 하시겠습니까?',
            confirmButtonColor: '#1D7151',
            iconColor: '#1D7151',
            
            showCancelButton: true,
            confirmButtonText: '승인',
            cancelButtonText: '취소',
            
            }).then(result => {
                if (result.isConfirmed) {
                    callPostUnlinkMemberAPI(accessToken)
                    .then(
                        dispatch(socialUserWithdrawAPI({memberCode}, authCtx)),
                    )
                    .catch((error) => {
                        console.error(error);
                    })
                } else if (!result.isDenied) {
                    console.log("연동해제 취소");
                    Swal.fire({
                        icon: 'success',
                        title: '연동해제가 취소되었습니다!',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#1D7151',
                        confirmButtonText: '확인',
                        });
                    return;
                }
            });
    }

    return(
        <div className="mypage-main">
            <h1 className="text-primary">회원 탈퇴</h1>
            <h6>소셜 로그인 회원은 가입한 곳에서 연동해제 구다사이</h6>
            <h6>소셜 로그인 완성되면 소셜 회원은 못하게 할래요</h6>
            <br/>
            <div className="receiptinfo">
                <div class="items-container">
                    <h4>탈퇴 버튼을 누르시면 적립된 포인트는 모두 소멸되며 본 계정으로 더이상 로그인이 불가능합니다.</h4>
                </div>
                <div>
                    <h4>기부 내역이 없는 경우 탈퇴 후 개인 정보는 즉시 삭제되나, 기부 내역이 존재하는 경우에는 관련 법령에 따라 5년간 보관됩니다.</h4>
                </div>
                <br/>
                <div>
                    <h6 style={{color: "#DB524E"}}>[근거법령 : 소득세법 제 160조의3, 소득세법 시행령 제 113조 제1항, 제208조의3, 소득세법 시행규칙 제58조]</h6>
                </div>
                <hr></hr>
                {provider === 'REPLANET' && (
                    <button onClick={() => handleWithdraw()} className="button button-primary">탈퇴하기</button>
                )}
                    {provider === 'KAKAO' && (
                    <button onClick={() => handleUnlink()} className="button button-primary">연동해제(탈퇴)</button>
                )}
            </div>
        </div>
    )
}

export default Withdrawal;