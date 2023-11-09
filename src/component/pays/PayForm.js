import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { callGetPointByMemberAPI } from "../../apis/DonationAPI";

function PayForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const memberCode = searchParams.get('memberCode');
    console.log('PayForm() memberCode : ' + memberCode);

    const member = useSelector((state) => state.donationReducer);
    console.log('PayForm() member : ', member);

    const [donationAmount, setDonationAmount] = useState(
        {
            cashAmount: 0,
            pointAmount: 0,
            finalAmount: 0
        }
    );

    const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);

    const payHandler = () => {
        console.log('(PayForm) payHandler 동작...');

        if (!isAgreedToTerms) {
            console.log('이용약관 이슈');
            alert("약관 동의 후 기부를 하실 수 있습니다.");
        } else if (donationAmount.finalAmount < 1000) {
            console.log('최소금액 이슈');
            alert("최소 기부금액은 1,000원입니다.");
        } else {
            const data = {
                cashAmount: donationAmount.cashAmount,
                pointAmount: donationAmount.pointAmount,
                finalAmount: donationAmount.finalAmount
            };
    
            axios.post('http://localhost:8001/kakaoPay', data)
                .then((response) => {
                    console.log('서버 응답 : ', response.data);
                    const redirectURL = response.data.replace('redirect:', '');
                    window.location.href = redirectURL;
                })
                .catch((error) => {
                    console.error('요청 실패 : ', error);
                });
                // 이거 나중에 API로 분리 할 수 있을듯.
        }
    }

    const onChangeHandler = (e) => {
        const inputValue = e.target.value;

        if (/^[1-9]\d*$|^0$/.test(inputValue)) {
            const intValue = parseInt(inputValue, 10);
            const cashAmount = e.target.name === "cashAmount" ? intValue : donationAmount.cashAmount;
            const pointAmount = e.target.name === "pointAmount" ? intValue : donationAmount.pointAmount;
            const finalAmount = cashAmount - pointAmount;
        
            if (finalAmount < 0) {
            alert("기부금액을 초과하는 포인트 사용은 불가합니다.");
            return;
            }
        
            const newDonationAmount = {
            ...donationAmount,
            [e.target.name]: intValue,
            finalAmount: e.target.name === "cashAmount" ? intValue - donationAmount.pointAmount : donationAmount.cashAmount - intValue,
            };
            setDonationAmount(newDonationAmount);
        } else {
            const newDonationAmount = { ...donationAmount };
            setDonationAmount(newDonationAmount);
        }
    }

    // useEffect(
    //     () => {
    //         dispatch(callGetPointByMemberAPI(memberCode));
    //     },[donationAmount.cashAmount, donationAmount.pointAmount]);

    return(
        <>
            <div className="items-container">
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h4>기부금액</h4>
                    <input id="cashAmount" type="number" name="cashAmount" value={ donationAmount.cashAmount } onChange={onChangeHandler} className="input" inputMode="numeric" min="0" onClick={(e) => e.target.select()}/>
                    <h4>원</h4>
                </div>
                <span className="pay-color-gray">기부 금액을 입력해주세요. 최소 기부 가능 금액 : 1,000원</span>
            </div>
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h4>포인트사용</h4>
                    <input id="pointAmount" type="number" name="pointAmount" value={ donationAmount.pointAmount } onChange={onChangeHandler} className="input" inputMode="numeric" min="0" onClick={(e) => e.target.select()}/>
                    <h4>포인트</h4>
                </div>
                
                <div className="pay-box">
                    <div className="pay-anno2">
                        <div>
                            <span className="pay-color-gray">가용포인트 : </span>
                            <span className="pay-color-green">5,000</span>
                        </div>
                        <div>
                            <label htmlFor="c1"><span className="pay-color-gray">전체사용</span></label>&nbsp;&nbsp;
                            <input id="c1" type="checkbox" />
                        </div>
                        {/* 전체 사용 누르면 user의 포인트 다 입력되게하기! (단, 기부금액을 초과하지 않아야함.) */}
                        {/* user의 포인트 끌어오기! */}
                        <br/>
                        <span className="pay-color-gray">(가능한 최소 기부포인트는 1,000 포인트입니다.)</span>
                    </div>
                </div>
            </div>
            <div className="pay-container pay-anno pay-backgroundColor">
                <h4>결제수수료 없이 100% 기부</h4>
                <div>
                    <div className="pay-color-gray">결제하신 금액은 기부시 별도 수수료 없이&nbsp;</div>
                    <div className="pay-color-green"> 단체로 100% 기부</div>
                    <div className="pay-color-gray">됩니다.</div>
                </div>
            </div>
            <div className="container-centered pay-anno">
                <h2>“기부자님의 소중한 마음으로 놀라운 변화가 일어납니다!”</h2>
                <h4>따뜻한 기부 후기로 그 변화를 소개하고 보답하겠습니다!</h4>
            </div>

            <div className="item">
                <div className="container-policy mb-1">
                    <pre>
                        <h5>RE-PLANET 이용약관</h5>                        
                        제 1 조 (목적)이 약관은 META-INT 주식회사 및 재단법인 RE-PLANET(이하 “회사”)과 회원 사이의 권리, 의무 및 책임, 기타 필요한 사항을 규정함을 목적으로 합니다.제 2 조 (용어의 정의)① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.1. “RE-PLANET 서비스”라 함은 기부 서비스를 웹사이트(re-planet 이하 동일)에서 제공하는 모든 서비스를 말합니다.2. “회원”이라 함은 RE-PLANET 회원 중 본 약관에 동의하고 RE-PLANET 서비스를 이용하는 자를 말합니다.3. “기부 서비스”라 함은 회사가 회원의 기부금을 모금단체에 전달하는 서비스를 말합니다.4. “기부금”이라 함은 회원이 무상으로 제공한 금전이나 물품으로 반대급부 없이 모금단체에 전달되는 것을 말합니다.5. “모금단체”라 함은 회사의 심사를 받고 가입하여 해피빈 웹사이트에서 노출되는 비영리 단체로 기부금을 전달받아 공익사업 등에 사용하는 단체를 말합니다.6. “기부금”이라 함은 기부 서비스 내에서 사용할 수 있는 기부 통화수단으로 회원이 사용한 콩은 회사가 그 가치에 상응하는 현금으로 전환하여 모금단체 등에 전달합니다.7. “일시결제”라 함은 회원이 정한 금액이 지정된 날짜에 일시적으로 결제되는 것을 말합니다.8. “일시기부”라 함은 회원이 일시결제한 금액이 회원이 선택한 모금함으로 기부되는 것을 말합니다.
                    </pre>
                </div>
                <input id="c2" type="checkbox" className="mb-1" onChange={() => setIsAgreedToTerms(!isAgreedToTerms)}/>
                <label htmlFor="c2">(필수) RE-PLANET 이용약관에 동의합니다.</label>
            </div>
            
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h3>결제금액 : </h3>
                    <h3 name="finalAmount" value={ donationAmount.finalAmount } className="pay-color-green">{ donationAmount.finalAmount.toLocaleString() }</h3>
                    <h3>원</h3>
                </div>
                    <span className="pay-color-gray">금액을 입력해주세요. 최소 기부 가능 금액 : 1,000원</span>
            </div>
            <div className="campaign-banner container-centered">
                <div className="pay-box">
                    <button onClick={payHandler} className="button button-lg button-primary">기부하기</button>
                    <button onClick={() => {navigate(-1)}} className="button button-lg button-primary-outline">돌아가기</button>
                </div>
            </div>
        </div>

        </>
    );
}

export default PayForm;