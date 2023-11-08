import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/adminexchange.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { exchangesAPI } from '../../../apis/PointAPI'


function PointExchangeList(){

    const navigate = useNavigate();
    const exchanges = useSelector(state => state.exchangeReducer);
    const exchangeList = exchanges.data;

    console.log('exchangeList는!! ', exchangeList);

    const showDetail = () => {
        navigate("/ExchangeDetail.js");
    };


    // const [state, setState] = useState();

    // const exchanges = result.exchanges;
    // const navigate = useNavigate();

    
    const statusColor = exchangeList.status === '대기' ? '#1D7151' :
                        exchangeList.status === '승인' ? '#428BF9' : '#C7302B';
    

    const statusStyle = {
        color: statusColor
    };



    return(
        exchanges && (
            <div>
                <p style={{color:"black", textAlign:"right"}}>총 신청 수 : {exchangeList.count}</p>
                <table>
                    <colgroup>
                        <col width="20%"/>
                        <col width="30%"/>
                        <col width="30%"/>
                        <col width="20%"/>
                    </colgroup>
                    <thead>
                        <th>순번</th>
                        <th>신청일</th>
                        <th>제목</th>
                        <th>상태</th>
                    </thead>
                    <tbody>
                        {Array.isArray(exchangeList) && exchangeList.map(
                            (exchange) => (
                                <tr key={exchange.exchangeCode} onClick={showDetail}>
                                    <td></td>
                                    <td>{exchange.exchangeDate}</td>
                                    <td>{exchange.title}</td>
                                    <td style={statusStyle}>{exchange.status}</td>
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