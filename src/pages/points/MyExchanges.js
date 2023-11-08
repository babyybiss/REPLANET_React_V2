import PointExchangeList from "../../component/points/lists/PointExchangeList";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";
import MypageHeader from "../../component/common/MypageHeader";
import MypageSidebar from "../../component/common/MypageSidebar";

function MyExchanges(){
    return(
        <>
            <MypageHeader />
            <div className="container-mypage">
                <MypageSidebar/>
                <div class="mypage-main">
                    <div class="mypage-title">
                        <h1>포인트 전환 신청 내역</h1>
                    </div>
                    <PointExchangeList/>
                </div>
            </div>
        </>
    );
}

export default MyExchanges;