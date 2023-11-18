import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/userexchange.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { myPointsHistoryAPI } from "../../../apis/PointAPI";
import PointModal from "../items/PointModal";


function MyPointList(){

    const dispatch = useDispatch();

    const token = window.localStorage.getItem('token');
    const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    const memberCode = decodedPayload.sub;
    console.log("멤버코드 확인 : ", memberCode);

    const myPoints = useSelector(state => state.exchangeReducer);

    useEffect(
        () => {
            dispatch(myPointsHistoryAPI(memberCode));
        }, []
    )

    console.log("포인트리스트 확인 : ", myPoints);

    const formatExchangeDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return date.toLocaleString(undefined, options);
    }

    const pointsColor = (status) => {
        return status =='승인'? '#428BF9':'#C7302B'
    }

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
            window.open(`/campaign/${code}`);
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
                            {Array.isArray(myPoints) && myPoints.map(
                                (points) => (
                                    <tr key={points.code} onClick={() => {onClickHandler(points.status, points.code)}}>
                                        <td>{formatExchangeDate(points.changeDate)}</td>
                                        <td>{points.content}</td>
                                        <td style={{color: pointsColor(points.status)}}>
                                            {points.status == "승인"? `${points.changePoint}p 적립` : `${points.changePoint}p 사용`}
                                        </td>
                                        <td style={{color:"#1D7151"}}>{points.remainingPoint}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && 
                    <PointModal exchangeCode={selectedCode} closeModal={closeModal} />
                }
            </>
        )
    );
}

export default MyPointList;