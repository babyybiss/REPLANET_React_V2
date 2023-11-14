import PointExchangeList from "../../component/points/lists/PointExchangeList";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/adminexchange.css";

function AllExchanges(){
    return(
        <div className="admine-main">
            <div className="admine-title">
                <h1>포인트 전환 관리</h1>
            </div>
            <PointExchangeList/>
        </div>
    );
}

export default AllExchanges;