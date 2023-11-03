import ExchangeFile from "../../component/points/items/ExchangeFile";
import ExchangeInfo from "../../component/points/items/ExchangeInfo";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/adminexchange.css";


function ExchangeDetail(){
    return (
        <div className="items-container ic2" style={{marginTop:"5rem;"}}>
            <div className="infoDiv">
                <div style={{alignItems:"left"}}>
                    <a onClick={goBack} style={{color:"gray", cursor:"pointer"}}>← Back</a>
                    <h1>포인트 전환 신청 내용</h1>
                    <ExchangeInfo/>
                </div>
            </div>
            <div className="fileDiv">
                <ExchangeFile/>
            </div>
        </div>
    );
}

export default ExchangeDetail;