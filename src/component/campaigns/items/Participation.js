import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import moment from 'moment';

function Participation({ participation }) {
    const donationInfo = participation.donation;
    const payInfo = participation;

    const memberInfo = participation.donation.refMember;

    const [totalDonation, setTotalDonation] = useState(0);
    const [point, setPoint] = useState(donationInfo.donationPoint);
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
        }
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
        <table>
            <thead>
                <tr>
                    <th>{moment(donationInfo.donationDateTime).format('YYYY-MM-DD')}</th>
                    <th>{maskingName(memberInfo.memberName)}</th>
                    <th>{totalDonation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 참여</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        )
    );
}

export default Participation;