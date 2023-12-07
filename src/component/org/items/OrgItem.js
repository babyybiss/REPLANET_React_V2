import { useDispatch } from "react-redux";
import { useState } from "react";
import OrgModal from "./OrgModal";
import "../../../assets/css/admin.css";

function OrgItem({user, index}) {

    const dispatch = useDispatch();

    const { memberCode, memberName, joinDate, memberEmail, phone, wReqDate, wReqReason, withdrawDate } = user;

    const date = new Date(joinDate);
    const WDdate = new Date(withdrawDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const WDyear = WDdate.getFullYear();
    const WDmonth = String(WDdate.getMonth() + 1).padStart(2, '0');
    const WDday = String(WDdate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const formattedWithdrawDate = `${WDyear}-${WDmonth}-${WDday}`;

    // 재단의 탈퇴요청이 들어온다면 여기서 탈퇴처리 버튼으로 삭제시킬지 생각해보기
    // 사실 delete시키는건 아니고 탈퇴여부를 true로 주는거라서 엄밀히 따지면 update이긴함

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const withdrawHandler = () => {
        setIsModalOpen(true);
    }

    return(
        <>
            <tr className="orgListTr">
                <td>{ index }</td>
                <td>{ memberCode }</td>
                <td>{ memberEmail }</td>
                <td>{ memberName }</td>
                <td>{ formattedDate }</td>
                <td>{ phone }</td>
                <td>{ wReqDate ? <button className="button-primary-outline orgListBtn" onClick={() => withdrawHandler()}>{withdrawDate? '탈퇴완료' : '신청보기'}</button> : '-'}</td>
                <td>{ withdrawDate? formattedWithdrawDate : '-' }</td>
            </tr>
            {isModalOpen &&
                <OrgModal user={user} closeModal={closeModal} />}
        </>
    );
}

export default OrgItem;