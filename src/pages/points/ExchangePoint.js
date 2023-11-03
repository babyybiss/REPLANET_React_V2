import { useState } from "react";
import imgfile from "../../assets/images/exchange/exchange.jpg"
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";


function ExchangePoint(){

    const [fileName, setFileName] = useState("");

    const showFileName = async() => {
        const data = await readFile()
        setFileName(data.name);
    }

    const requestExchange = () => {

    }

    return(
        <div style={{alignItems:center}}>
            <div>
                <h1>포인트 전환 신청</h1>
            </div>
            <div className="exchange">
                <img src={imgfile} className="exchange-img"/>
                <h2>봉사활동 확인서 업로드</h2>
                <input placeholder="등록할 제목을 입력하세요" className="title-input"/>
                <label for="file">
                    <div className="exchange-file">
                        <h5 style={{color:"#1D7151"}}>파일 선택</h5>
                        5MB 이하의 pdf 혹은 이미지 파일로 업로드 바랍니다.
                    </div>
                </label>
                <input type="file" id="file"
                        accept="image/png, image/jpeg, image/jpg, pdf"
                        onChange={showFileName}
                        style={{display:"none"}}/>
                <p>{fileName}</p>
                <button onClick={requestExchange} className="button button-lg button-primary-outline">포인트 전환 신청</button>
            </div>
        </div>
    );
}

export default ExchangePoint;