import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/userexchange.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userExchangeDetailAPI } from "../../../apis/PointAPI";


function PointModal({exchangeCode, closeModal}){

    console.log("모달에 들어온 코드 확인 : ", exchangeCode);
    const dispatch = useDispatch();
    const detail = useSelector(state => state.modalReducer);
    console.log("detail 확인 : ", detail);
    const date1 = new Date(detail.exchangeDate);
    const exchangeDate = date1.getFullYear() + "년 " + (date1.getMonth()+1) + "월 " + date1.getDate() + "일";
    const date2 = new Date(detail.processingDate);
    const processingDate = date2.getFullYear() + "년 " + (date2.getMonth()+1) + "월 " + date2.getDate() + "일";

    useEffect(
        () => {
            dispatch(userExchangeDetailAPI(exchangeCode));
        },[]
    );
    
    return(
        detail && (
            <div className="modal">
                <div className="modal-content">
                    <h3>신청 제목 _ {detail.title}</h3>
                    <h3>신청 일자 _ {exchangeDate}</h3>
                    {detail.status == "대기"? <h3 style={{color: "#1D7151"}}>현재 처리 대기 중입니다.</h3> : 
                        <>
                            {detail.status == "승인"?
                            (<h3 style={{color : "#428BF9"}}>{processingDate}에 {detail.points.toLocaleString()}포인트가 적립되었습니다.</h3>) :
                            (<h3 style={{color : "#C7302B"}}>{processingDate}에 [{detail.returnDetail}] 사유로 반려되었습니다.</h3>)}
                        </>
                    }
                    {detail.fileExtension === '.pdf'? 
                        (<iframe src={'/exchangeFiles/' + detail.fileSaveName} width="400px" height="600px"/>) : 
                        (<img src={'/exchangeFiles/' + detail.fileSaveName} style={{width:"400px", height:"600px"}}/>)}
                        <br/>
                    <button className="modal-btn" onClick={closeModal}>닫기</button>
                </div>
            </div>
        )
    )
}

export default PointModal;