import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/admin.css";
import { useDispatch } from "react-redux";
import { callPutWithdrawOrgAPI } from "../../../apis/MemberAPI";
import Swal from "sweetalert2";


function OrgModal({user, closeModal}){

    console.log("들어온 것들 확인 : ", {user})
    const { memberCode, memberName, joinDate, memberEmail, phone, wReqDate, wReqReason, withdrawDate } = user;

    const WReqDate = new Date(wReqDate);
    const formattedWReqDate = WReqDate.getFullYear() + "년 " + (WReqDate.getMonth()+1) + "월 " + WReqDate.getDate() + "일";

    const dispatch = useDispatch();

    const handleWithdraw = () => {
        Swal.fire({
            icon: 'warning',
            title: `${memberName}님의 계정을 탈퇴 처리 시키시겠습니까?`,
            confirmButtonColor: '#1D7151',
            iconColor: '#1D7151',

            showCancelButton: true,
            confirmButtonText: '승인',
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(callPutWithdrawOrgAPI({memberCode}))
                .then(() => {
                    console.log(`${memberName}번 계정 삭제`);
                    Swal.fire({
                        icon: 'success',
                        title: '탈퇴 처리가 정상적으로 성공하였습니다.',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#1D7151',
                        confirmButtonText: '확인',
                        }).then(() => {
                            console.log(`${memberCode} 삭제 성공`);
                        });
                })
                .catch((error) => {
                    console.log(`${memberName}번 계정 삭제 실패`);
                    Swal.fire({
                        icon: 'error',
                        title: '탈퇴 처리에 실패하였습니다.',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#DB524E',
                        confirmButtonText: '확인',
                        }).then(() => {
                            console.log(`${memberCode} 삭제 실패`)
                        });
                })
            } else if (!result.isDenied) {
                console.log(`계정 삭제 취소`);
                return;
            }
        });
    }

    return(
        <div className="modal">
            <div className="org-modal">
                {withdrawDate? <h5 style={{color : "#C7302B"}}>이미 탈퇴한 회원입니다.</h5> : <h5 style={{color: "#1D7151"}}>탈퇴 신청이 들어왔습니다.</h5>}<br/>
                <h3>&lt;탈퇴 신청 일자&gt;</h3><br/>
                <h5>{formattedWReqDate}</h5><br/><br/>
                <h3>&lt;탈퇴 신청 사유&gt;</h3><br/>
                <h5 style={{whiteSpace: "pre-wrap"}}dangerouslySetInnerHTML={{ __html: wReqReason }}></h5><br/><br/>
                {withdrawDate? <button className="org-modal-btn1" onClick={closeModal}>닫기</button> : 
                            <div className="modalBtn-container">
                            <button className="org-modal-btn2" onClick={() => handleWithdraw()}>탈퇴</button>
                            <button className="org-modal-btn2" onClick={closeModal}>닫기</button>
                            </div>
                }
            </div>
        </div>
    )
}

export default OrgModal;