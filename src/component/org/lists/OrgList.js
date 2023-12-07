import { useEffect, useState, useContext } from "react";
import OrgItem from "../items/OrgItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { callGetOrgsAPI } from "../../../apis/MemberAPI";
import { useDispatch } from "react-redux";
import AuthContext from "../../auth/AuthContext";
import "../../../assets/css/admin.css";

function OrgList() {

    const dispatch = useDispatch();
    const users = useSelector(state => state.memberReducer);
    const authCtx = useContext(AuthContext);
    console.log('OrgList() users : ', users);

    const [showWithdraw, setShowWithdraw] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = users && users.length > 0 ? users.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalItems = users && users.length > 0 ? users.length : 0;
    const countWithdrawalRequests = users && users.length > 0? users.filter(user => user.wReqDate !== null && user.withdrawDate === null).length : 0;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log("DonationList() useEffect 실행");
            await dispatch(callGetOrgsAPI());
        };
    
        fetchData();
    }, [dispatch]);
    
    useEffect(() => {
        console.log("totalItems : ", totalItems);
        console.log("countWithdrawalRequests : ", countWithdrawalRequests);
    
        const updatedTotalPages = Math.ceil(
            (showWithdraw ? countWithdrawalRequests : totalItems) / itemsPerPage
        );
        setCurrentPage((currentPage) => Math.min(currentPage, updatedTotalPages));
        setTotalPages(updatedTotalPages);
    }, [totalItems, showWithdraw, countWithdrawalRequests]);

    useEffect(() => {
        console.log("authCtx.isSuccess : ", authCtx.isSuccess);
        authCtx.isSuccess = false;
    },[])

    // 탈퇴 신청 보기와 전체 목록 보기
    const setWithDraw = () => {
        setShowWithdraw(!showWithdraw);
    }
    // const wUsers = users.filter(user => user.wReqDate != null && user.withdrawDate == null);
    // console.log("wUsers 확인 : ", wUsers);

    return(
        <>
                <div className='admin-title total-amount border-0'>
                    <div>
                        <span className="pay-color-gray">*총 기부처 수 : </span>
                        <span className="pay-color-green">{totalItems}</span>
                    </div>
                    <div>
                        <span>활성 기부처 : </span>
                        <span className="pay-color-green">{totalItems - countWithdrawalRequests}</span>
                        &nbsp;
                        &nbsp;
                        <span>탈퇴 기부처 : </span>
                        <span className="pay-color-red">{countWithdrawalRequests}</span>
                    </div>
                </div>
            {/* <button onClick={() => setWithDraw()} className="settingBtn">{showWithdraw? '전체 목록 보기' : '탈퇴 신청 보기'}</button> */}
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>기부처코드</th>
                            <th>기부처아이디</th>
                            <th>기부처명</th>
                            <th>등록일자</th>
                            <th>대표번호</th>
                            <th onClick={() => setWithDraw()} className="settingW">{showWithdraw? '전체 목록 보기' : '탈퇴 신청 보기'}</th>
                            <th>탈퇴일자</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users && users.length > 0 ? (
                        showWithdraw?
                            (users
                                .filter(user => user.wReqDate != null && user.withdrawDate == null)
                                .length > 0 ?(
                                    users
                                        .filter(user => user.wReqDate != null && user.withdrawDate == null)
                                        .map((user, index) => (
                                            <OrgItem
                                                key={user.memberCode}
                                                user={user}
                                                index={!showWithdraw ? totalItems - (index + indexOfFirstItem) : (countWithdrawalRequests - index + indexOfFirstItem)}
                                            />
                                        )
                                )) : (
                                    <tr>
                                        <td colSpan={7}>탈퇴를 신청한 기부처가 없습니다!</td>
                                    </tr>
                                )
                            ) : (
                                currentItems.map((user, index) => (
                                    <OrgItem
                                        key={user.memberCode}
                                        user={user}
                                        index={!showWithdraw ? totalItems - (index + indexOfFirstItem) : index + indexOfFirstItem + 1}
                                    />
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan={7}>등록된 기부처가 없습니다!</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <ul className="pagination">
                    <li className="icon" onClick={() => handlePageChange(currentPage - 1)}><a><span className="fas fa-angle-left"></span></a></li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        showWithdraw ?
                            (index + 1 <= Math.ceil(countWithdrawalRequests / itemsPerPage) ? (
                                <li
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    <a className={currentPage === index + 1 ? "active" : ""}>
                                        {index + 1}
                                    </a>
                                </li>
                            ) : null) :
                            (currentItems.length > 0 ? (
                                <li
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    <a className={currentPage === index + 1 ? "active" : ""}>
                                        {index + 1}
                                    </a>
                                </li>
                            ) : null)
                    ))}
                    <li onClick={() => handlePageChange(currentPage + 1)}><a><span className="fas fa-angle-right"></span></a></li>
                </ul>
        </>
    );
}

export default OrgList;