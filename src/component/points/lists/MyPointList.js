import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/userexchange.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { myPointsHistoryAPI } from "../../../apis/PointAPI";
import PointModal from "../items/PointModal";
import { decodeJwt } from "../../../utils/TokenUtils";




function MyPointList(){

    const dispatch = useDispatch();

    const token = window.localStorage.getItem('token');
    // const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    // const memberCode = decodedPayload.memberCode;
    // console.log("토큰 확인 : ", decodedPayload);
    // console.log("멤버코드 확인 : ", memberCode);
    console.log("토큰 확인 : ", decodeJwt(token));
    const memberCode = decodeJwt(token)?.memberCode || 0;
    console.log("포인트리스트 멤버코드 확인 : ", memberCode);

    const myPoints = useSelector(state => state.exchangeReducer);

    useEffect(
        () => {
            dispatch(myPointsHistoryAPI(memberCode));
        }, []
    )

    console.log("포인트내역 확인 : ", myPoints);

    const formatExchangeDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return date.toLocaleString(undefined, options);
    }

    const pointsColor = (status) => {
        return status =='승인'? '#428BF9':'#C7302B'
    }

    //상세조회
    const [selectedCode, setSelectedCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const onClickHandler = (status, code) => {
        if(status == "승인"){
            setSelectedCode(code);
            setIsModalOpen(true);
        } else {
            window.location=`/campaign/${code}`;
        }
    };

    //누적포인트계산
    console.log("포인트테스트! : ", myPoints[0]?.remainingPoint);
    const currentPoint = myPoints[0]?.remainingPoint;
    console.log('currentPoint 확인 : ', currentPoint);
    function calculatePoint(n){
        if(n == 0){
            myPoints[n].remainingPoint = currentPoint;
        } else {
            if(myPoints[n-1].status == '승인'){
                myPoints[n].remainingPoint = myPoints[n-1].remainingPoint - myPoints[n-1].changePoint;
            } else {
                myPoints[n].remainingPoint = myPoints[n-1].remainingPoint + myPoints[n-1].changePoint;
            }
        }
        return myPoints[n].remainingPoint;
    }        
    
    //페이징
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = myPoints?.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return(
        myPoints && (
            <>
                <div>
                    <table>
                        <colgroup>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                            <col width="25%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>내용</th>
                                <th>적립 / 사용</th>
                                <th>잔여 포인트</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPoints && myPoints.length > 0?(
                             myPoints.slice(startIndex, endIndex).map(
                                (points, index) => (
                                    <tr key={points.changeDate} onClick={() => {onClickHandler(points.status, points.code)}}>
                                        <td>{formatExchangeDate(points.changeDate)}</td>
                                        <td>{points.content}</td>
                                        <td style={{color: pointsColor(points.status)}}>
                                            {points.status == "승인"? `${points.changePoint}p 적립` : `${points.changePoint}p 사용`}
                                        </td>
                                        <td style={{color:"#1D7151"}}>{calculatePoint(startIndex + index)}p</td>
                                    </tr>
                                ))
                            ):(
                              <tr>
                                <td colSpan="4">
                                    <h6>내역이 존재하지 않습니다.</h6>
                                </td>
                            </tr>
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
                    <PointModal exchangeCode={selectedCode} closeModal={closeModal} />
                }
            </>
        )
    );
}

export default MyPointList;