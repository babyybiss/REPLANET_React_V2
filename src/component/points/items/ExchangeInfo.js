import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/adminexchange.css";
import { useRef, useState } from "react";
import { exchangeUpdateAPI } from "../../../apis/PointAPI";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


function ExchangeInfo({info, exchangeCode}){

    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(null);
    const [points, setPoints] = useState('');
    const [returnDetail, setReturnDetail] = useState(null);

    const form = useRef({});

    const handleConfirm = (value) => {
        setConfirm(value);
    };

    const apChangeHandler = (e) => {
        setPoints(e.target.value);
    };

    const reChangeHangler = (e) => {
        setReturnDetail(e.target.value);
    }

    const submitConfirm = (value) => {
        if(value == '승인'){
            if(points == '' || points == '선택'){
                Swal.fire({
                    icon: "error",
                    title: "포인트를 선택해 주세요!",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인',
                    })
            } else {
                form.current = {
                exchangeCode: exchangeCode,
                status: value,
                points: points.slice(0,-4)
            };
            Swal.fire({
                icon: "question",
                title: "포인트 전환 신청을 승인하시겠습니까?",
                text: "전환 포인트가 올바르게 입력되었는지 확인 바랍니다.",
                showCancelButton: true,
                confirmButtonColor: '#1D7151',
                cancelButtonColor: '#1D7151',
                confirmButtonText: '승인',
                cancelButtonText: '취소'
                }).then(result => {
                    if(result.isConfirmed){
                        dispatch(exchangeUpdateAPI({
                            form: form.current,
                            exchangeCode: exchangeCode
                        }))
                    }
                }
                );}
        } else if(value == '반려'){
            if(returnDetail == null || returnDetail == '선택'){
                Swal.fire({
                    icon: "error",
                    title: "반려 사유를 선택해 주세요!",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인',
                    })
            } else {
                form.current = {
                    exchangeCode: exchangeCode,
                    status: value,
                    returnDetail: returnDetail
                };
                Swal.fire({
                    icon: "question",
                    title: "포인트 전환 신청을 반려하시겠습니까?",
                    text: "반려 사유가 올바르게 선택됐는지 확인 바랍니다.",
                    showCancelButton: true,
                    confirmButtonColor: '#1D7151',
                    cancelButtonColor: '#1D7151',
                    confirmButtonText: '반려',
                    cancelButtonText: '취소'
                }).then(result => {
                    if(result.isConfirmed){
                        dispatch(exchangeUpdateAPI({
                            form: form.current,
                            exchangeCode: exchangeCode
                        }))
                    }
                });
            }
        }
    }

    const formatExchangeDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return date.toLocaleString(undefined, options);
    }
    

    return(
        <div>
            <div>
                <br/>
                <div className="infoBox">
                    <h5>신청 제목</h5>
                    <br/>
                    <a style={{color:"gray"}}>{info.title}</a>
                </div>
                <br/>
                <div className="infoBox">
                    <h5>회원 ID (회원명)</h5>
                    <br/>
                    <a style={{color:"gray"}}>{info.memberEmail} ({info.memberName})</a>
                </div>
                <br/>
                <div className="infoBox">
                    <h5>신청 일자</h5>
                    <br/>
                    <a style={{color:"gray"}}>{formatExchangeDate(info.exchangeDate)}</a>
                </div>
                <br/>
                {info.status === '대기' ? 
                    (<>
                        <div>
                            <label className="confirm-btn" htmlFor="approval">
                                승인
                            </label>
                            <input type="radio" name="confirm" id="approval" style={{display:"none"}} onClick={() => handleConfirm('승인')}/>
                            <label className="confirm-btn" htmlFor="rejection">
                                반려
                            </label>
                            <input type="radio" name="confirm" id="rejection" style={{display:"none"}} onClick={() => handleConfirm('반려')}/>
                        </div>
                        <br/><br/>
                        {confirm === '승인' && (
                            <div id="approvalContent" className="content">
                                <p style={{color:"gray"}}>&nbsp;전환 포인트</p>
                                    <div className="item">
                                        <select className="select" onChange={apChangeHandler} style={{width: "500px"}}>
                                            <option className="option">선택</option>
                                            <option className="option">10000 포인트</option>
                                            <option className="option">20000 포인트</option>
                                            <option className="option">30000 포인트</option>
                                            <option className="option">40000 포인트</option>
                                            <option className="option">50000 포인트</option>
                                            <option className="option">60000 포인트</option>
                                            <option className="option">70000 포인트</option>
                                            <option className="option">80000 포인트</option>
                                            <option className="option">90000 포인트</option>
                                            <option className="option">100000 포인트</option>
                                        </select>
                                    </div>
                                <br/><br/>
                                <button onClick={() => submitConfirm('승인')} className="confirm-submit">등록</button>
                            </div>
                            )
                        }
                        {confirm === '반려' && (
                            <div id="rejectionContent" className="content">
                                <div>
                                    <p style={{color:"gray"}}>&nbsp;반려 사유</p>
                                    <div className="item">
                                        <select className="select" onChange={reChangeHangler} style={{width: "500px"}}>
                                            <option className="option">선택</option>
                                            <option className="option">1년 경과</option>
                                            <option className="option">다중 신청</option>
                                            <option className="option">잘못된 파일</option>
                                        </select>
                                    </div>
                                    <br/><br/>
                                    <button onClick={() => submitConfirm('반려')} className="confirm-submit">등록</button>
                                </div>
                            </div>
                            )
                        }
                    </>
                    ) : info.status === '승인' ?
                        (<>
                            <br/><br/>
                            <div className="confirmDetail">
                                <p style={{color:"gray"}}>&nbsp;전환 포인트</p>
                                <br/>
                                <h5>&nbsp;{info.points.toLocaleString()} 포인트</h5>
                            </div>
                        </>) : 
                        (<>
                            <br/><br/>
                            <div className="confirmDetail">
                                <p style={{color:"gray"}}>&nbsp;반려 사유</p>
                                <br/>
                                <h5>&nbsp;{info.returnDetail}</h5>
                            </div>    
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ExchangeInfo;