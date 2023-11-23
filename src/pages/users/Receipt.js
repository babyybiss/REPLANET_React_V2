import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";
import { useState } from "react";
import Swal from "sweetalert2";


function DonationReceipt(){

    const [front, setFront] = useState('');
    const [last, setLast] = useState('');
    const [check, setCheck] = useState(false);
    const handleFrontChange = (e) => {
        const inputValue = e.target.value;
        const isValidInput = /^\d+$/.test(inputValue);
        if (isValidInput && inputValue.length <= 6) {
            setFront(inputValue);
        }
    };
    const handleLastChange = (e) => {
        const inputValue = e.target.value;
        const isValidInput = /^\d+$/.test(inputValue);
        if (isValidInput && inputValue.length <= 7) {
            setLast(inputValue);
        }
    };
    const checkBox = () => {
        setCheck(!check);
    }
    const infoAgreement = () => {
        if(!check){
            Swal.fire({
                title: "정보 제공에 동의하셔야 등록하실 수 있습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        } else {
            Swal.fire({
                title: "기부 영수증을 위한 개인정보 제공에 동의하셨습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            }).then(result => {
                if(result.isConfirmed){
                window.location.reload();
            }})
        }
    }

    return(
        <div className="receipt-main">
            <div className="receipt-title">
                <h3 style={{color: "#1D7151"}}>✅ 기부금 영수증은 홈택스에서 확인해 주세요.</h3><br/>
                <h5 style={{color: "#717171"}}>기부내역을 국세청 홈택스 연말정산 간소화 자료조회에서 확인하실 수 있습니다.</h5>
            </div>
            <div style={{marginBottom: "2rem"}}>
                <h4 style={{color: "#1D7151", textAlign: "center"}}>연말정산 기부금 영수증 안내</h4><br/>
                <h6>안녕하세요, Replanet 운영진입니다.</h6>
                <h6>Replanet은 지정기부금 단체로 연말정산 시 소득공제 혜택을 받을 수 있습니다.</h6>
                <h6>기부자님의 연말정산, 5월 종합소득세 신고를 위한 기부금 영수증 발급 방법을 안내드립니다.</h6>
                <h6>■ 기부금 영수증 신청</h6>
                <h6>- 발급대상 : 2023년 1월 1일부터 2023년 12월 31까지 Replanet 홈페이지 내 모금함에 기부 내역이 있는 회원</h6>
                <h6>- 신청기간 : 2023년 12월 26일(화) 13시까지</h6>
                <h6>- 신청확인 :</h6>
                <h6>1. 회원정보수정 내 기부금영수증 신청 “예” 클릭</h6>
                <h6>2. 기부자 이름, 주민등록번호(13자리)를 정확하게 기입</h6>
                <h6>* 한 아이디당 주민등록번호 1개만 등록 가능합니다.</h6>
                <h6>2023년 12월 26일(화) 오후 13시 이전까지 주민등록번호가 등록된 기부자님의 기부내역에 한해 국세청 홈택스를 통해 전자기부금영수증이 발급될 예정입니다.</h6>
                <h6 onClick={()=>window.location=''} className="externalLink">회원정보수정 바로가기</h6>
                <h6>■ 전자기부금영수증 발급 확인</h6>
                <h6>22년도 기부금영수증은 23년 1월 발급 완료되었으며, 국세청 연말정산 간소화 서비스(홈택스)에서 확인하실 수 있습니다.</h6>
                <h6>1. 국세청 연말정산 간소화 서비스</h6>
                <h6>2. 홈택스 메인 화면 상단 [조회/발급]</h6>
                <h6>3. 왼쪽 하단(아래서 2번째 카테고리 "전자기부금영수증")</h6>
                <h6>4. 전자기부금영수증 → "메인화면"</h6>
                <h6>5. 로그인(공인인증)</h6>
                <h6>6. 기부자 → "전자기부금영수증 발급목록 관리"</h6>
                <h6>7. 기부했던 날짜 설정 (ex. 2022.01.01. ~2022.12.31.)</h6>
                <h6 onClick={()=>window.open('http://www.hometax.go.kr')} className="externalLink">국세청 홈택스 바로가기</h6>
                <h6>* 홈택스 관련 문의는 홈택스 홈페이지 또는 "126" 국세 상담센터를 통해 문의 바랍니다.</h6>
                <h6>■ 자주 묻는 질문</h6>
                <h6>1. 기부내역을 확인하고 싶어요.</h6>
                <h6>RE-PLANET 홈페이지 로그인 후 오른쪽 상단 마이페이지에서 기부내역을 클릭하시면 해당 아이디로 기부하신 기부내역을 확인하실 수 있습니다.</h6>
                <h6>기타 관련 문의는 고객센터로 문의 바랍니다.</h6>
            </div>
            {/* <h3>기부금 영수증 발급 안내</h3>
            <br/>
            <div className="receiptinfo">
                <h4>REPLANET과 함께 해주심에 항상 감사드립니다!</h4>
                <br/>
                <h6>후원자님의 연말정산, 종합소득세 신고를 위한 기부금 영수증은 국세청 홈택스 연말정산 간소화 서비스를 통해 발급 받으실 수 있습니다.</h6>
                <h6>리플래닛을 통한 기부의 경우, 개인정보 제공에 동의하셔야 홈택스에서 조회가 가능합니다.</h6>
                <br/>
                <h6 onClick={()=>window.open('http://www.hometax.go.kr')} className="externalLink">국세청 홈택스 바로가기</h6>
            </div>
            <br/>
            <div className="receiptinfo">
                <h5>소득세법에 따른 개인정보 수집 안내</h5>
                <br/>
                <h6>&lt;수집 정보 : 이름, 주민등록번호&gt;</h6>
                <h6>개인정보를 입력하지 않을 경우 기부금 영수증 발급이 제한될 수 있습니다.</h6>
                <h6>수집한 개인정보는 기부금 영수증 발행과 기부내역의 신고에 사용되며 관련 법령에 따라 5년간 보관됩니다.</h6>
                <br/>
                <h6 style={{color: "#DB524E"}}>[근거법령 : 소득세법 제 160조의3, 소득세법 시행령 제 113조 제1항, 제208조의3, 소득세법 시행규칙 제58조]</h6>
            </div>
            <br/>
            <div className="receiptinfo">
                <input type="text" style={{width: "120px", height: "30px"}} placeholder="이름"/><br/><br/>
                <input type="text" value={front} onChange={handleFrontChange} style={{width: "120px", height: "30px"}} placeholder="주민등록번호 앞자리"/> -&nbsp;
                <input type="text" value={last} onChange={handleLastChange} style={{width: "120px", height: "30px"}} placeholder="주민등록번호 뒷자리"/><br/><br/>
                개인정보 제공에 동의합니다 <input type="checkbox" onChange={checkBox}/><br/><br/>
                <button className="receipt-btn" onClick={infoAgreement}>정보 제공 등록</button>
            </div> */}
        </div>
    );
}

export default DonationReceipt;