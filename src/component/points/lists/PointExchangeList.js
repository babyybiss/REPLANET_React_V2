import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/adminexchange.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { exchangesAPI } from '../../../apis/PointAPI'
import { useEffect } from "react";


function PointExchangeList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const exchanges = useSelector(state => state.exchangeReducer);

    useEffect(
        () => {
            dispatch(exchangesAPI({
                exchangeCode: params.exchangeCode,
                currentPage: 1
            }));
        }, [dispatch, params.exchangeCode]
    );

    const onClickHandler = (exchangeCode) => {
        // navigate(`/ExchangeDetail/${exchangeCode}`, {replace: false});
        
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
            <div>
                <p style={{color:"black", textAlign:"right"}}>총 신청 수 : {exchanges.length}</p>
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
                        {Array.isArray(exchanges) && exchanges.map(
                            (exchange) => (
                                <tr key={exchange.exchangeCode} onClick={onClickHandler(exchange.exchangeCode)}>
                                    <td>{exchange.exchangeCode}</td>
                                    <td>{formatExchangeDate(exchange.exchangeDate)}</td>
                                    <td>{exchange.title}</td>
                                    <td style={{color: statusColor(exchange.status)}}>{exchange.status}</td>
                                </tr>
                            )
                        )}                 
                    </tbody>
                </table>
            </div>
        )
    );
}

export default PointExchangeList;