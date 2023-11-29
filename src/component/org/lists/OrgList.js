import { useEffect, useState, useContext } from "react";
import OrgItem from "../items/OrgItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { callGetOrgsAPI } from "../../../apis/MemberAPI";
import { useDispatch } from "react-redux";
import AuthContext from "../../auth/AuthContext";

function OrgList() {

    const dispatch = useDispatch();
    const users = useSelector(state => state.memberReducer);
    console.log('OrgList() users : ', users);
    const authCtx = useContext(AuthContext);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users && users.length > 0 ? users.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log('DonationList() useEffect 실행');
            await dispatch(callGetOrgsAPI());
        };

        fetchData();
    }, [dispatch, users.length]);

    useEffect(() => {
        console.log("authCtx.isSuccess : ", authCtx.isSuccess);
        authCtx.isSuccess = false;
    },[])

    return(
        <>
            <table>
                    <thead>
                        <tr>
                            <th>기부처코드</th>
                            <th>기부처아이디</th>
                            <th>기부처명</th>
                            <th>등록일자</th>
                            <th>대표번호</th>
                            <th>탈퇴처리</th>
                            <th>탈퇴여부</th>
                            <th>탈퇴일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            currentItems.map((user) => (
                                <OrgItem
                                    key={user.memberCode}
                                    user={user}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>등록된 기부처가 없습니다!</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <ul className="pagination">
                    <li className="icon" onClick={() => handlePageChange(currentPage - 1)}><a><span className="fas fa-angle-left"></span></a></li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            <a className={currentPage === index + 1 ? "active" : ""}>
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li onClick={() => handlePageChange(currentPage + 1)}><a><span className="fas fa-angle-right"></span></a></li>
                </ul>
        </>
    );
}

export default OrgList;