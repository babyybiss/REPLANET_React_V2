import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callGetDonationByPayCodeAPI } from '../../apis/DonationAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { RESET_PAY_CODE } from '../../modules/DonationModule';
import { GetCampaignAPI } from "../../apis/CampaignListAPI";

function Success() {

    // 뭔가 덕지덕지하긴함 리팩토링 생각해보기
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const payCode = searchParams.get('number');
    console.log('Success() payCode : ', payCode);

    const pay = useSelector((state) => state.donationReducer);
    console.log('pay : ', pay);

    const donationDateTime= pay.refDonation ? (pay.refDonation.donationDateTime) : '';
    const memberName= pay.refDonation ? (pay.refDonation.refMember.memberName) : '';
    const campaignTitle= pay.refDonation ? (pay.refDonation.refCampaign.campaignTitle) : '';
    const orgName= pay.refDonation ? (pay.refDonation.refCampaign.orgName) : '';
    const orgTel= pay.refDonation ? (pay.refDonation.refCampaign.orgTel) : '';
    const donationAmount= pay.refDonation ? formatAmount(pay.payAmount + pay.refDonation.donationPoint) : '';
    const payAmount= pay.refDonation ? formatAmount(pay.payAmount) : '';
    const donationPoint= pay.refDonation ? formatAmount(pay.refDonation.donationPoint) : '';

    const date = new Date(...donationDateTime);

    const formattedDateTime = date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    function formatAmount(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleBackToMain = () => {
        dispatch({ type: RESET_PAY_CODE });
        navigate('/');
    };

    const handleGoToCampaign = () => {
        dispatch({ type: RESET_PAY_CODE });
        navigate(`/campaign/${pay.refDonation.refCampaign.campaignCode}`);
    };

    useEffect(
        () => {
            if (Object.keys(pay).length === 0) {
                dispatch(callGetDonationByPayCodeAPI(payCode));
            }
        },
        [dispatch]
    );

    useEffect(
        () => {
                dispatch(callGetDonationByPayCodeAPI(payCode));
        },
        []
    );

    return(
        <>
            { Object.keys(pay).length === 0 ? (
                <>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container-first">
                        <h3>로딩중...</h3>
                    </div>
                </>
            ) : (
                <>
                    <br/>
                    <div className="container-first">
                        <div className="container-centered pay-anno pay-success-header">
                            <h1>기부 상세 내용</h1>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={2}><h4>기부자</h4></td>
                                </tr>
                                <tr>
                                    <td><h5>성함</h5></td>
                                    <td><h5>{memberName}</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>기부금</h5></td>
                                    <td><h5>{donationAmount}원</h5> <span>( {payAmount}원 (결제) + {donationPoint}P (포인트) )</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h5>기부일시</h5></td>
                                    <td><h5>{formattedDateTime}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><h4>캠페인</h4></td>
                                </tr>
                                <tr>
                                    <td><h5>캠페인 이름</h5></td>
                                    <td><h5>{campaignTitle}</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>단체명</h5></td>
                                    <td><h5>{orgName}</h5></td>
                                </tr>
                                <tr>
                                    <td><h5>연락처</h5></td>
                                    <td><h5>{orgTel}</h5></td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <div className='container-centered pay-anno pay-success-header'>
                            <button className="button button-lg button-primary" onClick={handleBackToMain}>메인으로</button>
                            <button className="button button-lg button-primary-outline" onClick={handleGoToCampaign}>해당 캠페인으로</button>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}

export default Success;