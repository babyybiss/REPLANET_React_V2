import PointExchangeList from "../../component/points/lists/PointExchangeList";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";

function MyExchanges(){
    return(
        <div class="mypage-main">
            <div class="mypage-title">
                <h1>포인트 전환 신청 내역</h1>
            </div>
            <PointExchangeList/>
        </div>
    );
}

export default MyExchanges;