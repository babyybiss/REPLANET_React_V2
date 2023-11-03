import ExchangeFile from "../../component/points/items/ExchangeFile";
import ExchangeInfo from "../../component/points/items/ExchangeInfo";

function ExchangeDetail(){
    return (
        <>
            <a>← Back</a>
            <div>
                <h1>포인트 전환 신청 내용</h1>
                <ExchangeInfo/>
            </div>
            <div>
                <ExchangeFile/>
            </div>
        </>
    );
}

export default ExchangeDetail;