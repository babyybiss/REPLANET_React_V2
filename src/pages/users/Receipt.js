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
        <div className="mypage-main">
            <h3>기부금 영수증 발급 안내</h3>
            <br/>
            <div className="receiptinfo bg-primary">
                <h4>REPLANET과 함께 해주심에 항상 감사드립니다!</h4>
                <br/>
                <h6>후원자님의 연말정산, 종합소득세 신고를 위한 기부금 영수증은 국세청 홈택스 연말정산 간소화 서비스를 통해 발급 받으실 수 있습니다.</h6>
                <h6>리플래닛을 통한 기부의 경우, 개인정보 제공에 동의하셔야 홈택스에서 조회가 가능합니다.</h6>
                <br/>
                <h6 onClick={()=>window.open('http://www.hometax.go.kr')} className="externalLink text-white">국세청 홈택스 바로가기</h6>
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
                <div class="items-container ic2">
                <input className="input" type="text" placeholder="이름"/>
                <div></div>
                </div>
                <div className="items-container ic2">
                <input className="input" type="text" value={front} onChange={handleFrontChange} placeholder="주민등록번호 앞자리"/>
                <input className="input" type="text" value={last} onChange={handleLastChange} placeholder="주민등록번호 뒷자리"/>
                </div>

                개인정보 제공에 동의합니다 <input type="checkbox" onChange={checkBox}/><br/><br/>
                <button className="receipt-btn" onClick={infoAgreement}>정보 제공 등록</button>
            </div>
            <br/>
            <h6>궁금하신 점은 고객센터로 문의 바랍니다.</h6>
        </div>
    );
}

export default DonationReceipt;