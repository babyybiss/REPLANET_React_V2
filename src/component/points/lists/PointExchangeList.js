import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-dom";

function PointExchangeList(){

    const result = useSelector(state => state.exchangeReducer);
    const exchanges = result.exchanges;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [exchange, setExchange] = useState([]);

    
    useEffect(
        () => {
            dispatch(callGetPointAPI());
        },
        []
    );

    const showDetail = () => {
        navigate("/ExchangeDetail.js");
    };

    return(
        exchanges && (
            <div>
                <p>총 신청 수 : {result.count}</p>
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
                            <td>{item.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    );
}

export default PointExchangeList;