import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callPostKakaoPayAPI, callPostPointDonationAPI } from "../../apis/DonationAPI";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetCampaignAPI } from "../../apis/CampaignListAPI";
import { callGetMemberByTokenAPI } from "../../apis/MemberAPI";
import Swal from 'sweetalert2';
import "../../assets/css/sweetalert2.css";

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
    
    const currentPoint = useSelector(state => state.memberReducer.member?.currentPoint);

    const campaignInfo = campaign && campaign.campaigninfo?.results.campaign;

    console.log('PayForm() 현재 가용 포인트 : ', currentPoint);
    console.log('PayForm() donationAmount : ', donationAmount);

    useEffect(() => {
        if (isAllPointUsed) {
            const maxPoint = Math.min(currentPoint, donationAmount.finalAmount);
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
    }, [isAllPointUsed, currentPoint, donationAmount.finalAmount]);

    const onAllPointUsedChange = () => {
        setIsAllPointUsed((prevIsAllPointUsed) => {
            if (currentPoint <= donationAmount.finalAmount) {
                return !prevIsAllPointUsed;
            } else {
                const maxPoint = Math.min(currentPoint, donationAmount.finalAmount);
                setDonationAmount((prevDonationAmount) => ({
                    ...prevDonationAmount,
                    pointAmount: prevIsAllPointUsed ? 0 : maxPoint,
                    cashAmount: prevIsAllPointUsed ? prevDonationAmount.finalAmount : prevDonationAmount.finalAmount - maxPoint
                }));
                return !prevIsAllPointUsed;
            }
        });
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
        dispatch(callGetMemberByTokenAPI())
        .catch(error => {
            console.error('PayForm() API 호출 에러: ', error);
        });
    },[dispatch]);

    const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);

    const payHandler = () => {
        console.log('(PayForm) payHandler 동작...');

        if (!isAgreedToTerms) {
            console.log('약관동의 이슈');
            Swal.fire({
                icon: 'warning',
                title: '약관 동의 후 <b style="color:#1D7151; font-weight:bold;">기부</b>를 하실 수 있습니다.',
                text: '이용약관에 동의하시면 체크해주세요.',
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
        } else if (donationAmount.finalAmount < 1000) {
            console.log('최소금액 이슈');
            Swal.fire({
                icon: 'warning',
                title: '최소 기부금액은 <b style="color:#1D7151; font-weight:bold;">1,000원</b>입니다.',
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
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
                const isPointDonation =
                Swal.fire({
                    icon: 'warning',
                    title: '포인트로만 기부 하시겠습니까?',
                    text: '포인트로만 기부 시 결제페이지를 거치지 않습니다.',
                    confirmButtonColor: '#1D7151',
                    iconColor: '#1D7151',
                    
                    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                    // cancelButtonColor: '#DBDBDB', // cancel 버튼 색깔 지정
                    confirmButtonText: '승인', // confirm 버튼 텍스트 지정
                    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
                    
                    }).then(result => {
                        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
                            console.log("포인트로만 기부 승인");
                            console.log("data : ", data);
                            console.log("campaignInfo : ", campaignInfo);
                            Swal.fire({
                                icon: 'success',
                                title: '기부되었습니다.',
                                confirmButtonColor: '#1D7151',
                                iconColor: '#1D7151',
                                confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                                }).then(() => {
                                    dispatch(callPostPointDonationAPI(data, campaignInfo))
                                });
                        } else if (!result.isDenied) {
                            console.log("포인트로만 기부 취소");
                            Swal.fire({
                                icon: 'success',
                                title: '기부가 취소되었습니다!',
                                confirmButtonColor: '#1D7151',
                                iconColor: '#1D7151',
                                confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                                });
                            return;
                        }
                    });

                // if(isPointDonation) {
                //     console.log("포인트로만 기부 승인");
                //     console.log("data : ", data);
                //     console.log("campaignInfo : ", campaignInfo);
                //     Swal.fire('승인이 완료되었습니다.', '화끈하시네요~!', 'success');
                //     dispatch(callPostPointDonationAPI(data, campaignInfo))
                // } else {
                //     console.log("포인트로만 기부 취소");
                //     return;
                // }

            } else if (donationAmount.cashAmount < 100) {
                Swal.fire({
                    icon: 'warning',
                    title: '최소 결제 금액은 <b style="color:#1D7151; font-weight:bold;">100원</b>입니다.',
                    confirmButtonColor: '#1D7151',
                    iconColor: '#1D7151'
                });
                return;
            }
        }
    }

    const onChangeHandler = (e) => {
        let inputValue = e.target.value.replace(/,/g, '');
        console.log('inputValue : ',inputValue);
        if (/^0\d+/.test(inputValue)) {
            inputValue = inputValue.replace(/^0+/, '');
        }

        if (/^[1-9]\d*$|^0$/.test(inputValue) || inputValue === '') {
            const intValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
            const clampedValue = Math.min(intValue, 2000000000);
        
            if (e.target.name === "finalAmount") {
                setDonationAmount((prevDonationAmount) => ({
                    ...prevDonationAmount,
                    finalAmount: clampedValue,
                    cashAmount: clampedValue - prevDonationAmount.pointAmount,
                }));
            } else if (e.target.name === "pointAmount") {
                if (clampedValue > donationAmount.finalAmount) {
                    Swal.fire({
                        icon: 'warning',
                        title: '기부금액을 <b style="color:#1D7151; font-weight:bold;">초과</b>할 수 없습니다.',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#1D7151'
                    });
                    setDonationAmount((prevDonationAmount) => ({
                        ...prevDonationAmount,
                        pointAmount: prevDonationAmount.finalAmount,
                        cashAmount: 0,
                    }));
                } else if (clampedValue > currentPoint) {
                    Swal.fire({
                        icon: 'warning',
                        title: '가용 포인트를 <b style="color:#1D7151; font-weight:bold;">초과</b>할 수 없습니다.',
                        confirmButtonColor: '#1D7151',
                        iconColor: '#1D7151'
                    });
                    setDonationAmount((prevDonationAmount) => ({
                        ...prevDonationAmount,
                        pointAmount: currentPoint,
                        cashAmount: donationAmount.finalAmount - currentPoint,
                    }));
                } else {
                    setDonationAmount((prevDonationAmount) => ({
                        ...prevDonationAmount,
                        pointAmount: clampedValue,
                        cashAmount: prevDonationAmount.finalAmount - clampedValue,
                    }));
                }
            }
        }
    };

    return(
        <>
            <div className="items-container">
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h4>기부금액</h4>
                    <input 
                            id="finalAmount" 
                            type="text" 
                            name="finalAmount" 
                            value={ donationAmount.finalAmount.toLocaleString() } 
                            onChange={onChangeHandler} 
                            className="input" 
                            inputMode="numeric" 
                            min="0" 
                            onClick={(e) => e.target.select()}
                    />
                    <h4>원</h4>
                </div>
                <span className="pay-color-gray">기부 금액을 입력해주세요.  최소 기부 가능 금액 : 1,000원,  최대 기부 가능 금액 : 2,000,000,000원 </span>
            </div>
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h4>포인트사용</h4>
                    <input 
                            id="pointAmount" 
                            type="text" 
                            name="pointAmount" 
                            value={ donationAmount.pointAmount.toLocaleString() }
                            onChange={onChangeHandler} 
                            className="input" 
                            inputMode="numeric"
                            min="0" 
                            onClick={(e) => e.target.select()} 
                            disabled={isAllPointUsed}
                    />
                    <h4>P</h4>
                </div>
                
                <div className="pay-box">
                    <div className="pay-anno2">
                        <div>
                            <span className="pay-color-gray">가용포인트 : </span>
                            <span className="pay-color-green">
                                {isNaN(currentPoint) ? '로딩중...' : currentPoint.toLocaleString()}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="c1"><span className="pay-color-gray">전체사용</span></label>&nbsp;&nbsp;
                            <input id="c1" type="checkbox" checked={isAllPointUsed} onChange={onAllPointUsedChange}/>
                        </div>
                        <br/>
                        <span className="pay-color-gray">(포인트로만 기부시 결제페이지를 거치지 않고 즉시 기부됩니다.)</span>
                    </div>
                </div>
            </div>
            <div className="pay-container pay-anno pay-backgroundColor">
                <h4>결제수수료 없이 100% 기부</h4>
                <div>
                    <div className="pay-color-gray">결제하신 금액은 기부시 별도 수수료 없이&nbsp;</div>

                    <div className="pay-color-green"> 재단으로 100% 기부</div>

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

                        제 1 조 (목적)이 약관은 META-INT 주식회사 및 재단법인 RE-PLANET(이하 “회사”)과 회원 사이의 권리, 의무 및 책임, 기타 필요한 사항을 규정함을 목적으로 합니다.제 2 조 (용어의 정의)① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.1. “RE-PLANET 서비스”라 함은 기부 서비스를 웹사이트(re-planet 이하 동일)에서 제공하는 모든 서비스를 말합니다.2. “회원”이라 함은 RE-PLANET 회원 중 본 약관에 동의하고 RE-PLANET 서비스를 이용하는 자를 말합니다.3. “기부 서비스”라 함은 회사가 회원의 기부금을 모금재단에 전달하는 서비스를 말합니다.4. “기부금”이라 함은 회원이 무상으로 제공한 금전이나 물품으로 반대급부 없이 모금단체에 전달되는 것을 말합니다.5. “모금단체”라 함은 회사의 심사를 받고 가입하여 해피빈 웹사이트에서 노출되는 비영리 단체로 기부금을 전달받아 공익사업 등에 사용하는 단체를 말합니다.6. “기부금”이라 함은 기부 서비스 내에서 사용할 수 있는 기부 통화수단으로 회원이 사용한 콩은 회사가 그 가치에 상응하는 현금으로 전환하여 모금단체 등에 전달합니다.7. “일시결제”라 함은 회원이 정한 금액이 지정된 날짜에 일시적으로 결제되는 것을 말합니다.8. “일시기부”라 함은 회원이 일시결제한 금액이 회원이 선택한 모금함으로 기부되는 것을 말합니다.

                    </pre>
                </div>
                <input id="c2" type="checkbox" className="mb-1" onChange={() => setIsAgreedToTerms(!isAgreedToTerms)}/>
                <label htmlFor="c2">(필수) RE-PLANET 이용약관에 동의합니다.</label>
            </div>
            
            <div className="container-centered pay-container">
                <div className="pay-box">
                    <h3>결제금액 : </h3>
                    <h3 name="cashAmount" value={ donationAmount.cashAmount } className="pay-color-green">{ donationAmount.cashAmount.toLocaleString() }</h3>
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