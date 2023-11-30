import { useEffect, useState } from "react";

function Participation({ participation }) {
    const donationInfo = participation ? participation : "";

    const [totalDonation, setTotalDonation] = useState(0);
    const [point, setPoint] = useState(donationInfo ? donationInfo.donation.donationPoint : '0');
    const [cash, setCash] = useState(donationInfo.payAmount);

    useEffect(
        () => {
            if (typeof point == "undefined" || point == null || point == "") {
                setPoint(0);
            }
            if (typeof cash == "undefined" || cash == null || cash == "") {
                setCash(0)
            }
            setTotalDonation(point + cash)
        }, []
    )

    const maskingName = function (name) {
        let originName = name;
        let maskingName;
        let nameLength;
        nameLength = originName.length;

        if (typeof originName == "undefined" || originName == null || originName == "") {
            return originName;
        } else {
            if (nameLength) {
                maskingName = originName.replace(/(?<=.{1})./gi, "*");
            }
            // else {
            //     maskingName = originName.replace(/(?<=.{1})./gi, "*");
            // }
            return maskingName;
        }
    }

    // 시작 날짜
    let getDonationtDate = new Date(donationInfo.donation.donationDateTime[0], donationInfo.donation.donationDateTime[1] - 1, donationInfo.donation.donationDateTime[2]);
    let donationtDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(getDonationtDate);
    return (
        donationInfo && (
            <div>
                <thead className="text-left">
                    <tr className="text-left">
                        <th className="text-left">{donationtDate}</th>
                        <th className="text-left">{donationInfo ? maskingName(donationInfo.donation.member.memberName) : ""}</th>
                        <th className="text-left">{totalDonation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 참여</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </div>
        )
    );
}

export default Participation;