import { Link } from "react-router-dom";

function DonationItem({ pay }) {

    const donationCode = pay.refDonation.donationCode
    const campaignTitle = pay.refDonation.refCampaign.campaignTitle
    const orgName = pay.refDonation.refCampaign.orgName
    const totalAmount = pay.payAmount + pay.refDonation.donationPoint
    const donationDateTime = (pay.refDonation.donationDateTime).split('T')[0];

    const formattedTotalAmount = totalAmount.toLocaleString('ko-KR');

    return(
        <>
            {/* 해당 캠페인으로 가는 링크 걸기 */}
            <tr>
                <td>{ donationCode }</td>
                <td>{ campaignTitle }</td>
                <td>{ orgName }</td>
                <td>{ formattedTotalAmount }원</td>
                <td>{ donationDateTime }</td>
            </tr>
        </>
    );
}

export default DonationItem;