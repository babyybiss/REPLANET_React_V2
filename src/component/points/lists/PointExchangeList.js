import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/adminexchange.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-dom";


function PointExchangeList(){

    const [state, setState] = useState();

    const result = useSelector(state => state.exchangeReducer);
    const exchanges = result.exchanges;
    const navigate = useNavigate();

    const showDetail = () => {
        navigate("/ExchangeDetail.js");
    };

    const statusColor = item.status === 'waiting' ? '#1D7151' :
                        item.status === 'approval' ? '#428BF9' : '#C7302B';
    

    const statusStyle = {
        color: statusColor
    };

    return(
        exchanges && (
            <div>
                <p style={{color:"black", textAlign:"right"}}>총 신청 수 : {result.count}</p>
                <table>
                    <thead>
                        <th>순번</th>
                        <th>신청일</th>
                        <th>아이디</th>
                        <th>제목</th>
                        <th>상태</th>
                    </thead>
                    <tbody>
                        <tr onClick={showDetail}>
                            <td>{item.no}</td>
                            <td>{item.exchangeDate}</td>
                            <td>{item.memberId}</td>
                            <td>{item.title}</td>
                            <td style={statusStyle}>{item.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    );
}

export default PointExchangeList;