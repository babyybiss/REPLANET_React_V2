import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/userexchange.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userExchangeDetailAPI } from "../../../apis/PointAPI";
import { useParams } from "react-router-dom";


function PointModal({exchangeCode, closeModal}){

    console.log("모달에 들어온 코드 확인 : ", exchangeCode);
    const dispatch = useDispatch();
    const detail = useSelector(state => state.exchangeReducer);

    const formatExchangeDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return date.toLocaleString(undefined, options);
    }

    useEffect(
        () => {
            dispatch(userExchangeDetailAPI(exchangeCode));
        },[]
    );

    const [isOpen, setIsOpen] = useState(true);  

    console.log("detail 확인 : ", detail);

    return(
        detail && (
            <div className="modal">
                <div className="modal-content" style={{display:isOpen ? "block" : "none"}}>
                    <h2>신청일자  {formatExchangeDate(detail.exchangeDate)}</h2>
                    <h2>신청제목  {detail.title}</h2>
                    <h3>{detail.status}</h3>
                    {detail.status != "대기" && (
                        <h4>처리일자  {detail.processingDate}</h4>
                    )}
                    {detail.status == "승인"? (<h4>승인 포인트  {detail.points}</h4>) : (<h4>반려 사유  {detail.returnDetail}</h4>)}
                    {detail.fileExtension === '.pdf'? 
                        (<iframe src={process.env.PUBLIC_URL + '/exchangeFiles/' + detail.fileSaveName} width="400px" height="600px"/>) : 
                        (<img src={process.env.PUBLIC_URL + '/exchangeFiles/' + detail.fileSaveName} style={{width:"400px", height:"600px"}}/>)}
                        <br/>
                    <button className="modal-btn" onClick={closeModal}>닫기</button>
                </div>
            </div>
        )
    )
}

export default PointModal;