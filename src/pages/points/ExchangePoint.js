import { useRef, useState } from "react";
import imgfile from "../../assets/images/exchange/exchange.jpg"
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";
import { useDispatch } from "react-redux";
import { pointExchangeAPI } from "../../apis/PointAPI";
import Swal from "sweetalert2";
import { decodeJwt } from "../../utils/TokenUtils";


function ExchangePoint() {

    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [fileName, setFileName] = useState("");
    const titleRef = useRef();
    const fileRef = useRef();
    const fileNameRef = useRef();

    const token = window.localStorage.getItem('token');
    const memberCode = decodeJwt(token)?.memberCode || 0;

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeFile = (e) => {
        const file = e.target?.files[0];

        if(!file){
            console.error("파일을 선택하세요!");
            return;
        }

        if(!(file instanceof Blob)){
            console.error("올바른 형식의 파일이 아닙니다!");
            return;
        }

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            console.log(e.target);
            console.log(e.target.result);
            setFileName(file.name);
            setFile(file);
        }
    }

    const requestExchange = () => {
        if (title == null || title == "") {
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "제목을 입력해주세요!",
                text: "제목을 입력하셔야 포인트 전환 신청을 하실 수 있습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else if (file == null) {
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "파일을 등록해주세요!",
                text: "봉사활동 확인서를 등록하셔야 포인트 전환 신청을 하실 수 있습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else if (file?.size > 5 * 1024 * 1024) {
            Swal.fire({
                icon: "warning",
                iconColor: '#1D7151',
                title: "파일 크기를 확인 바랍니다!",
                text: "5MB 이하의 파일만 등록하실 수 있습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else {
            const formdata = new FormData();

            formdata.append("file", file);
            formdata.append("title", new Blob([JSON.stringify(title)], { type: "application/json", }));
            formdata.append("memberCode", memberCode);

            for (let key of formdata.keys()) {
                console.log(key, ":", formdata.get(key));
            }
            dispatch(pointExchangeAPI({
                formdata: formdata
            }));
        }
    }

    return (
        <>
            <div className="mypage-main">
                <div className="mypage-title">
                    <h1>포인트 전환 신청</h1>
                </div>
                <div className="exchange shadow">
                    <div className="exchange-img-area">
                        <img src={imgfile} className="exchange-img" />
                    </div>
                    <div className="exchange-body-area">                   
                        <h2>봉사활동 확인서 업로드</h2><br />
                        <input placeholder="등록할 제목을 입력하세요"
                            className="input input-lg mb-1" name="title" id="title"
                            ref={titleRef}
                            onChange={handleChangeTitle} />
                        <label htmlFor="file">
                            <div className="exchange-file">
                                <h5>파일 선택</h5>
                                5MB 이하의 pdf 혹은 이미지 파일로 업로드 바랍니다.
                            </div>
                        </label>
                        <input type="file" id="file" name="file"
                            accept=".png, .jpeg, .jpg, .bmp, .pdf"
                            onChange={handleChangeFile}
                            ref={fileRef}
                            style={{ display: "none" }} /><br />
                        <p ref={fileNameRef}>{fileName}</p><br />
                        <button onClick={requestExchange} className="button button-lg button-primary-outline">포인트 전환 신청</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExchangePoint;