import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/userexchange.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userExchangeDetailAPI } from "../../../apis/PointAPI";


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

    console.log("detail 확인 : ", detail);

    return(
        detail && (
            <div className="modal">
                <div className="modal-content">
                    <h3>신청 일자 _ {formatExchangeDate(detail.exchangeDate)}</h3>
                    <h3>신청 제목 _ {detail.title}</h3>
                    {detail.status == "대기"? <h4 style={{color: "#1D7151"}}>현재 처리 대기 중입니다.</h4> : 
                        <>
                            {detail.status == "승인"?
                            (<h4 style={{color : "#428BF9"}}>승인 완료<br/>승인 일자 _ {detail.processingDate} / 승인 포인트 _ {detail.points}포인트</h4>) :
                            (<h4 style={{color : "#C7302B"}}>신청 반려<br/>반려 일자 _ {detail.processingDate} / 반려 사유 _ {detail.returnDetail}</h4>)}
                        </>
                    }
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