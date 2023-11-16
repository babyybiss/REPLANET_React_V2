import { useNavigate } from "react-router-dom";

function DonationItem({ pay, showDetails, onToggleDetails }) {

    const { refDonation, payAmount } = pay;
    const { refCampaign } = refDonation;

    const { donationCode, donationPoint } = refDonation;
    const { campaignTitle } = refCampaign;
    const { orgName } = refCampaign;
    const totalAmount = payAmount + donationPoint
    const { donationDateTime }= refDonation;

    const formattedTotalAmount = totalAmount.toLocaleString('ko-KR');

    const date = new Date(donationDateTime[0], donationDateTime[1] - 1, donationDateTime[2], donationDateTime[3], donationDateTime[4], donationDateTime[5]);

    const formattedDateTime = date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const navigate = useNavigate();

    const handleRowClick = () => {
        console.log('선택한 해당 캠페인 코드 : ', refCampaign.campaignCode);
        navigate(`/campaign/${refCampaign.campaignCode}/donations/success?number=${donationCode}`);
    }

    return(
        <>
            {/* 해당 캠페인으로 가는 링크 걸기 */}
            <tr onClick={handleRowClick}>
                <td>{ donationCode }</td>
                <td>{ campaignTitle }</td>
                <td>{ orgName }</td>
                
                {showDetails ? (
                    <td>
                        {formattedTotalAmount}원 ( {payAmount.toLocaleString()}원 +{' '}
                        {donationPoint.toLocaleString()}P )
                    </td>
                ) : (
                    <td>{formattedTotalAmount}원</td>
                )}
                <td>{ formattedDateTime }</td>
            </tr>
        </>
    );
}

export default DonationItem;