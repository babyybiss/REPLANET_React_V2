import { useRef, useState } from "react";
import axios from "axios";
import imgfile from "../../assets/images/exchange/exchange.jpg"
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";
import MypageSidebar from "../../component/common/MypageSidebar";
import MypageHeader from "../../component/common/MypageHeader";

function ExchangePoint(){

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [fileName, setFileName] = useState("");
    const titleRef = useRef();
    const fileRef = useRef();
    const fileNameRef = useRef();

    const token = window.localStorage.getItem('token');
    const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    const memberCode = decodedPayload.sub;

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

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

    const requestExchange = async () => {
        if(title == null || title == ""){
            alert("제목을 입력해주세요!\n제목을 입력하셔야 포인트 전환 신청을 하실 수 있습니다.")
        }

        if(file == null){
            alert("파일을 등록해주세요!\n봉사활동 확인서를 등록하셔야 포인트 전환 신청을 하실 수 있습니다.")
        }

        if (file.size > 2 * 1024 * 1024){
            alert("파일 크기를 확인 바랍니다!\n2MB 이하의 파일만 등록하실 수 있습니다.")
        }

        if(file != null && title != null && title != ""){
            console.log("제목은 : ", title);
            console.log("파일은 : ", file);
            console.log("멤버코드는 : ", memberCode);

            const formdata = new FormData();
            
            formdata.append("file", file);
            formdata.append("title", title);
            formdata.append("memberCode", memberCode);

            for (let key of formdata.keys()) {
                console.log(key, ":", formdata.get(key));
            }

            await axios.post('http://localhost:8001/exchanges', formdata, {
                headers: {
                    "Content-Type" : `multipart/form-data`
                }
            })
            .then(function (response) {
                console.log(response);
                console.log(response.headers);
                if(response.status === 200){
                    alert("신청이 완료되었습니다!\n관리자 확인 후 처리 완료까지 영업일 기준 최대 2일까지 소요됩니다.");
                    // titleRef.current.value="";
                    // setFile(null); //동일 파일 선택 시 선택 안됨
                    // //fileRef.current.value=""; // 파일 초기화 안됨(이름만 지워졌지 계속 선택돼있는 상태 - value file files 동일 / files[0]은 에러 발생)
                    // // setFileName(""); //ref 쓰는 것과 똑같이 작동
                    // fileNameRef.current.innerText=""; //set 쓰는 것과 똑같이 작동
                    window.location.reload();
                }else{
                    console.log("exchange request-back-error : ", response.data);
                    alert("신청 중 오류가 발생했습니다!\n문제가 지속될 경우 고객센터로 문의 바랍니다.");
                }
            })
            .catch((error) => {
                console.log("exchange request-front-error : ", error);
                alert("신청 중 오류가 발생했습니다!\n문제가 지속될 경우 고객센터로 문의 바랍니다.");
            });
        }
    }

    return(
        <>
            <MypageHeader />
            <div className="container-mypage">
                <MypageSidebar/>
                <div className="mypage-main">
                    <div className="mypage-title">
                        <h1>포인트 전환 신청</h1>
                    </div>
                    <div className="exchange">
                        <img src={imgfile} className="exchange-img"/><br/>
                        <h2>봉사활동 확인서 업로드</h2><br/>
                        <input placeholder="등록할 제목을 입력하세요"
                                className="title-input" name="title" id="title"
                                ref={titleRef}
                                onChange={handleChangeTitle}/><br/><br/><br/>
                        <label htmlFor="file">
                            <div className="exchange-file">
                                <h5 style={{color:"#1D7151"}}>파일 선택</h5><br/>
                                2MB 이하의 pdf 혹은 이미지 파일로 업로드 바랍니다.
                            </div>
                        </label>
                        <input type="file" id="file" name="file"
                                accept=".png, .jpeg, .jpg, .bmp, .pdf"
                                onChange={handleChangeFile}
                                ref={fileRef}
                                style={{display:"none"}}/><br/>
                        <p ref={fileNameRef}>{fileName}</p><br/>
                        <button onClick={requestExchange} className="button button-lg button-primary-outline">포인트 전환 신청</button><br/><br/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExchangePoint;