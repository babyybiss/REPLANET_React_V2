import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/adminexchange.css";
import { useState } from "react";


function ExchangeInfo(){

    const [confirm, setConfirm] = useState(null);

    const handleConfirm = (value) => {
        setConfirm(value);
    };

    const submitConfirm = (value) => {

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
                    <a style={{color:"gray"}}>{info.memberId} ({info.name})</a>
                </div>
                <br/>
                <div className="infoBox">
                    <h5>날짜</h5>
                    <br/>
                    <a style={{color:"gray"}}>{info.date}</a>
                </div>
                <br/>
                {info.status === 'waiting' ? 
                    (<>
                        <div>
                            <label class="confirm-btn" for="approval">
                                승인
                            </label>
                            <input type="radio" name="confirm" id="approval" style={{display:"none"}} onClick={() => handleConfirm('승인')}/>
                            <label class="confirm-btn" for="rejection">
                                반려
                            </label>
                            <input type="radio" name="confirm" id="rejection" style={{display:"none"}} onClick={() => handleConfirm('반려')}/>
                        </div>
                        <br/><br/>
                        {confirm === '승인' && (
                            <div id="approvalContent" className="content">
                                <div style={{border: "black 1px solid", borderRadius:"4px", width:"500px"}}>
                                    <p style={{color:"gray"}}>전환 포인트</p>
                                    <input type="text" style={{textAlign:"right", width:"90px", border: "none"}} placeholder="0"/>포인트
                                </div>
                                <br/>
                                <button onClick={submitConfirm('승인')} className="button button-primary">등록</button>
                            </div>
                            )
                        }
                        {confirm === '반려' && (
                            <div id="rejectionContent" className="content">
                                <div>
                                    <p style={{color:"gray"}}>반려 사유</p>
                                    <div className="item">
                                        <select className="select">
                                            <option className="option">선택</option>
                                            <option className="option">1년 경과</option>
                                            <option className="option">다중 신청</option>
                                            <option className="option">잘못된 파일</option>
                                        </select>
                                    </div>
                                    <br/>
                                    <button onClick={submitConfirm('반려')} className="button button-primary">등록</button>
                                </div>
                            </div>
                            )
                        }
                    </>
                    ) : info.status === 'approval' ?
                        (<>
                            <br/><br/>
                            <div className="confirmDetail">
                                <p style={{color:"gray"}}>전환 포인트</p>
                                <br/>
                                <h5>{info.points}</h5>
                            </div>
                        </>) : 
                        (<>
                            <br/><br/>
                            <div className="confirmDetail">
                                <p style={{color:"gray"}}>반려 사유</p>
                                <br/>
                                <h5>{info.returnDetail}</h5>
                            </div>    
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ExchangeInfo;