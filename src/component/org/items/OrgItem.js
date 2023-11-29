import Swal from "sweetalert2";
import { callPutWithdrawOrgAPI } from "../../../apis/MemberAPI";
import { useDispatch } from "react-redux";

function OrgItem({user}) {

    const dispatch = useDispatch();

    const { memberCode, memberName, joinDate, memberEmail, phone, withdraw, withdrawDate } = user;

    const date = new Date(joinDate);
    const WDdate = new Date(withdrawDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const WDyear = WDdate.getFullYear();
    const WDmonth = String(WDdate.getMonth() + 1).padStart(2, '0');
    const WDday = String(WDdate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const formattedwithdrawDate = `${WDyear}-${WDmonth}-${WDday}`;

    // 기부처의 탈퇴요청이 들어온다면 여기서 탈퇴처리 버튼으로 삭제시킬지 생각해보기
    // 사실 delete시키는건 아니고 탈퇴여부를 true로 주는거라서 엄밀히 따지면 update이긴함

    const withdrawHandler = () => {
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
                            console.log(`${memberCode} 삭제 성공`)
                        });
                })
                .catch((error) => {
                    console.log(`${memberName}번 계정 삭제`);
                    Swal.fire({
                        icon: 'success',
                        title: '탈퇴 처리에 실패하였습니다.',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#1D7151',
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
        <>
            <tr>
                <td>{ memberCode }</td>
                <td>{ memberEmail }</td>
                <td>{ memberName }</td>
                <td>{ formattedDate }</td>
                <td>{ phone }</td>
                <td><button className="button button-lg button-primary-outline" onClick={withdrawHandler} disabled={withdraw}>{withdraw? '탈퇴완료' : '탈퇴'}</button></td>
                <td>{ withdraw? 'Y' : 'N' }</td>
                <td>{ withdraw? formattedwithdrawDate : '-' }</td>
            </tr>
        </>
    );
}

export default OrgItem;