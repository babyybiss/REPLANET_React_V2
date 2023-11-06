import { useState } from "react";
import axios from "axios";
import imgfile from "../../assets/images/exchange/exchange.jpg"
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";


function ExchangePoint(){

    const [fileName, setFileName] = useState("");

    const [file, setFile] = useState(null);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        
        reader.onload = (e) => {
            console.log(e.target);
            console.log(e.target.result);
            setFileName(file.name);
            setFile(file);
        }
    }

    // const noTitle = () => {
    //     if(!file){
    //         alert("제목을 입력해주세요! \n 제목을 입력하셔야 포인트 전환 신청을 하실 수 있습니다.")
    //     }
    // }

    // const noFile = () => {
    //     if(!title){
    //         alert("파일을 등록해주세요! \n 봉사활동 확인서 파일을 등록해야 합니다.")
    //     }
    // }

    const requestExchange = async (e) => {

        const file = e.target.file;
        const title = e.target.title;
        
        const formdata = new FormData();
        
        formdata.append("file", file);
        formdata.append("title", title);

        await axios.post('http://localhost:8001/exchanges', formdata, {
            headers: {
                "Content-Type" : `false`
            },
        })
        .then(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.headers);
        })
        .catch((error) => {
            console.log("exchange request error :",error);
        });
    }

    return(
        <div className="mypage-main" style={{alignItems:"center"}}>
            <div className="mypage-title">
                <h1>포인트 전환 신청</h1>
            </div>
            <div className="exchange">
                <img src={imgfile} className="exchange-img"/>
                <h2>봉사활동 확인서 업로드</h2>
                <input placeholder="등록할 제목을 입력하세요" className="title-input" name="title" id="title"/>
                <label htmlFor="file">
                    <div className="exchange-file">
                        <h5 style={{color:"#1D7151"}}>파일 선택</h5>
                        5MB 이하의 pdf 혹은 이미지 파일로 업로드 바랍니다.
                    </div>
                </label>
                <input type="file" id="file"
                        accept=".png, .jpeg, .jpg, .bmp, .pdf"
                        onChange={handleChangeFile}
                        style={{display:"none"}}/>
                <p>{fileName}</p>
                <button onClick={requestExchange} className="button button-lg button-primary-outline">포인트 전환 신청</button>
            </div>
        </div>
    );
}

export default ExchangePoint;