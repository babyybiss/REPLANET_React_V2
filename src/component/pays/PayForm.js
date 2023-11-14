import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetPointByMemberAPI, callPostKakaoPayAPI, callPostPointDonationAPI } from "../../apis/DonationAPI";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetCampaignAPI } from "../../apis/CampaignListAPI";

function PayForm() {

    const dispatch = useDispatch();

    const [isAllPointUsed, setIsAllPointUsed] = useState(false);

    const [donationAmount, setDonationAmount] = useState(
        {
            finalAmount: 0,
            pointAmount: 0,
            cashAmount: 0
        }
    );

    const campaign = useSelector(state => state.campaignReducer);
    const result = useSelector((state) => state.donationReducer);
    const { campaignCode } = useParams();

    const campaignInfo = campaign.campaigninfo;

    console.log('PayForm() 현재 가용 포인트 : ', result.currentPoint);

    useEffect(() => {
        if (isAllPointUsed) {
            const maxPoint = Math.min(result.currentPoint, donationAmount.finalAmount);
            const newDonationAmount = {
                ...donationAmount,
                pointAmount: maxPoint,
                cashAmount: donationAmount.finalAmount - maxPoint
            }
            setDonationAmount(newDonationAmount);
        } else {
            const newDonationAmount = {
                ...donationAmount,
                pointAmount: 0,
                cashAmount: donationAmount.finalAmount
            }
            setDonationAmount(newDonationAmount);
        }
    }, [isAllPointUsed, result.currentPoint, donationAmount.finalAmount]);

    const onAllPointUsedChange = () => {
        if (result.currentPoint <= donationAmount.finalAmount) {
            setIsAllPointUsed(!isAllPointUsed);
        } else {
            const maxPoint = Math.min(result.currentPoint, donationAmount.finalAmount);
            const newDonationAmount = {
                ...donationAmount,
                pointAmount: maxPoint,
                cashAmount: donationAmount.finalAmount - maxPoint
            };
            setDonationAmount(newDonationAmount);
        }
    };

    useEffect(() => {

        dispatch(GetCampaignAPI(campaignCode));
        console.log('PayForm() result updated : ', result);

        const payCode = result.payCode;
        console.log('PayForm() payCode : ', payCode);

        if(payCode) {
            window.location.href = `http://localhost:3000/campaign/${campaignInfo.campaignCode}/donations/success?number=${payCode}`;
            }
        },
        [result]
    );

    useEffect(() => {
        dispatch(callGetPointByMemberAPI());
    },[result.currentPoint]);

    const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);

    const payHandler = () => {
        console.log('(PayForm) payHandler 동작...');

        if (!isAgreedToTerms) {
            console.log('약관동의 이슈');
            alert("약관 동의 후 기부를 하실 수 있습니다.");
        } else if (donationAmount.finalAmount < 1000) {
            console.log('최소금액 이슈');
            alert("최소 기부금액은 1,000원입니다.");
        } else {
            const data = {
                finalAmount: donationAmount.finalAmount,
                pointAmount: donationAmount.pointAmount,
                cashAmount: donationAmount.cashAmount,
            };
            
            if (donationAmount.cashAmount >= 100) {
                dispatch(callPostKakaoPayAPI(data, campaignInfo));
            } else if (donationAmount.cashAmount == 0 && donationAmount.pointAmount > 0){
                console.log('포인트로만 기부');
                const isPointDonation = window.confirm("포인트로만 기부하시겠습니까?");

                if(isPointDonation) {
                    console.log("포인트로만 기부 승인");
                    console.log("data : ", data);
                    console.log("campaignInfo : ", campaignInfo);
                    dispatch(callPostPointDonationAPI(data, campaignInfo))
                } else {
                    console.log("포인트로만 기부 취소");
                    return;
                }

            } else if (donationAmount.cashAmount < 100) {
                alert('최소로 결제 할 수 있는 금액은 100원입니다.')
                return;
            }
        }
    }

    const onChangeHandler = (e) => {
        const inputValue = e.target.value;

        if (/^[1-9]\d*$|^0$/.test(inputValue)) {
            const intValue = parseInt(inputValue, 10);
            let finalAmount = donationAmount.finalAmount;
            let pointAmount = donationAmount.pointAmount;
        
            if (e.target.name === "finalAmount") {
                finalAmount = intValue;
            } else if (e.target.name === "pointAmount") {
                if (intValue > finalAmount) {
                    alert("기부금액을 초과할 수 없습니다");
                    pointAmount = finalAmount;
                    /* 추후 멤버의 소유포인트에 따라 최대값을 소유포인트의 최대값으로 해야함 기부금액 */
                } else {
                    pointAmount = intValue;
                }
            }

            const cashAmount = finalAmount - pointAmount;
        
            const newDonationAmount = {
                ...donationAmount,
                finalAmount,
                pointAmount,
                cashAmount
            };
            
            setDonationAmount(newDonationAmount);
        } else {
            const newDonationAmount = { ...donationAmount };
            setDonationAmount(newDonationAmount);
        }
    }

    return(
        <>
            <div className="items-container">
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h4>기부금액</h4>
                    <input id="finalAmount" type="number" name="finalAmount" value={ donationAmount.finalAmount } onChange={onChangeHandler} className="input" inputMode="numeric" min="0" onClick={(e) => e.target.select()}/>
                    <h4>원</h4>
                </div>
                <span className="pay-color-gray">기부 금액을 입력해주세요. 최소 기부 가능 금액 : 1,000원</span>
            </div>
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h4>포인트사용</h4>
                    <input id="pointAmount" type="number" name="pointAmount" value={ isAllPointUsed ? result.currentPoint : donationAmount.pointAmount } onChange={onChangeHandler} className="input" inputMode="numeric" min="0" onClick={(e) => e.target.select()} disabled={isAllPointUsed}/>
                    <h4>포인트</h4>
                </div>
                
                <div className="pay-box">
                    <div className="pay-anno2">
                        <div>
                            <span className="pay-color-gray">가용포인트 : </span>
                            <span className="pay-color-green">{result.currentPoint}</span>
                        </div>
                        <div>
                            <label htmlFor="c1"><span className="pay-color-gray">전체사용</span></label>&nbsp;&nbsp;
                            <input id="c1" type="checkbox" checked={isAllPointUsed} onChange={onAllPointUsedChange}/>
                        </div>
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
                    <h3 name="cashAmount" value={ donationAmount.cashAmount } className="pay-color-green">{ donationAmount.cashAmount }</h3>
                    <h3>원</h3>
                </div>
                    <span className="pay-color-gray">금액을 입력해주세요. 최소 기부 가능 금액 : 1,000원</span>
            </div>
            <div className="campaign-banner container-centered">
                <div className="pay-box">
                    <button onClick={payHandler} className="button button-lg button-primary">기부하기</button>
                    <Link to="/">
                        <button className="button button-lg button-primary-outline">돌아가기</button>
                    </Link>
                </div>
            </div>
        </div>

        </>
    );
}

export default PayForm;