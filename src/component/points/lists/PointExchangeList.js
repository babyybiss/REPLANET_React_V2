import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/adminexchange.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { adminExchangesAPI, exchangeStatusAPI, userExchangesAPI } from '../../../apis/PointAPI'
import { useEffect, useState } from "react";
import PointModal from "../items/PointModal";


function PointExchangeList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const exchanges = useSelector(state => state.exchangeReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const token = window.localStorage.getItem('token');
    const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    const memberAuth = decodedPayload.auth;
    const memberCode = decodedPayload.sub;
    console.log("권한 확인 : ", memberAuth);
    console.log("멤버코드 확인 : ", memberCode);

    const [selectedCode, setSelectedCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const onClickHandler = (exchangeCode) => {
        if(memberAuth == "ROLE_USER"){
            setSelectedCode(exchangeCode);
            setIsModalOpen(true);
        } else if(memberAuth == "ROLE_ADMIN"){
            navigate(`/exchangeDetail/${exchangeCode}`);
        }
    };

    const adminControl = () => {
        if(memberAuth == "ROLE_ADMIN"){
            return(
                <select onChange={onChangeHandler} style={{width: "100px"}}>
                    <option>전체</option>
                    <option>대기</option>
                    <option>승인</option>
                    <option>반려</option>
                </select>
            );
        } else { return <div></div>; }
    };
    const [statusValue, setStatusValue] = useState(null);
    const onChangeHandler = (e) => {
        const selectedValue = e.target.value;
        setStatusValue(selectedValue);
    }
    useEffect(
        () => {
            console.log("setStatus 확인 : ", statusValue);

            if(statusValue != '전체'){
                dispatch(exchangeStatusAPI({
                    status: statusValue,
                    exchangeCode: params.exchangeCode,
                    currentPage: 1
                }));
            } else {
                dispatch(adminExchangesAPI({
                    exchangeCode: params.exchangeCode,
                    currentPage: 1
                }))
            }
        },[statusValue]
    )

    useEffect(
        () => {
            if(memberAuth == "ROLE_USER"){
                dispatch(userExchangesAPI(memberCode,{
                    exchangeCode: params.exchangeCode
                }));
            } else if(memberAuth == "ROLE_ADMIN"){
                dispatch(adminExchangesAPI({
                    exchangeCode: params.exchangeCode
                }));
            }
        }, []
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = exchanges && exchanges.length > 0 ? exchanges.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalItems = exchanges.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const statusColor = (status) => {
        return status === '대기' ? '#1D7151' :
            status === '승인' ? '#428BF9' : '#C7302B';
    };

    const formatExchangeDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return date.toLocaleString(undefined, options);
    }

    console.log("exchanges 확인 : ", exchanges)

    return(
        exchanges && (
            <>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        {adminControl()}
                        <a style={{color:"black", textAlign:"right"}}>총 신청 수 : {exchanges.length} </a>
                    </div>
                    <table>
                        <colgroup>
                            <col width="20%"/>
                            <col width="30%"/>
                            <col width="30%"/>
                            <col width="20%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>신청코드</th>
                                <th>신청일</th>
                                <th>제목</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(currentItems) && currentItems.map(
                                (exchange) => (
                                    <tr key={exchange.exchangeCode} onClick={() => {onClickHandler(exchange.exchangeCode)}}>
                                        <td>{exchange.exchangeCode}</td>
                                        <td>{formatExchangeDate(exchange.exchangeDate)}</td>
                                        <td>{exchange.title}</td>
                                        <td style={{color: statusColor(exchange.status)}}>{exchange.status}</td>
                                    </tr>
                                )
                            )}                 
                        </tbody>
                    </table>
                    <ul className="pagination">
                    <li className="icon" onClick={() => handlePageChange(currentPage -1)}><a><span className="fas fa-angle-left">&lt;</span></a></li>
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
                    <li onClick={() => handlePageChange(currentPage + 1)}><a><span className="fas fa-angle-left">&gt;</span></a></li>
                    </ul>
                </div>
                {isModalOpen && 
                    <PointModal exchangeCode={selectedCode} closeModal={closeModal}/>
                }
            </>
        )
    );
}

export default PointExchangeList;