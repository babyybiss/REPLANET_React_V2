import { useEffect, useState } from "react";

import moment from 'moment';

function Participation({ participation }) {
    const donationInfo = participation.donation;
    const payInfo = participation;

    const [totalDonation, setTotalDonation] = useState(0);
    const [point, setPoint] = useState(donationInfo? donationInfo.donationPoint: '0');
    const [cash, setCash] = useState(payInfo.payAmount);
    useEffect(
        () => {
            if (typeof point == "undefined" || point == null || point == "") {
                setPoint(0);
            }
            if (typeof cash == "undefined" || cash == null || cash == "") {
                setCash(0)
            }
            setTotalDonation(point + cash)
        },[]
    )

    const maskingName = function (name) {
        let originName = name;
        let maskingName;
        let nameLength;
        nameLength = originName.length;

        if (typeof originName == "undefined" || originName == null || originName == "") {
            return originName;
        } else {
            if (nameLength < 3) {
                maskingName = originName.replace(/(?<=.{1})./gi, "*");
            } else {
                maskingName = originName.replace(/(?<=.{2})./gi, "*");
            }
            return maskingName;
        }
    }

    return (
        donationInfo &&(
        <table className="text-left">
            <thead className="text-left">
                <tr className="text-left">
                    <th className="text-left">{moment(donationInfo.donationDateTime).subtract(1, 'months').format('YYYY-MM-DD')}</th>
                    <th className="text-left">{donationInfo? maskingName(donationInfo.refMember.memberName): ""}</th>
                    <th className="text-left">{totalDonation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 참여</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        )
    );
}

export default Participation;