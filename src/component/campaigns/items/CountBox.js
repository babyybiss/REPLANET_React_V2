import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callGetTodayDonationAPI } from "../../../apis/DonationAPI";
import { getCampaignSearchByCategory } from "../../../apis/CampaignListAPI";
import moment from 'moment';


function CountBox() {
  const participation = useSelector(state => state.donationReducer);
  const dispatch = useDispatch();


  useEffect(
    () => {
      dispatch(callGetTodayDonationAPI());
    }
    , []
  );

  return (
    participation && (
      <>
        <div style={{ marginTop: 100 }}>
          <div className="campaign-banner bg-primary">
            <span>{participation[0] ? moment(participation[0].donationDate).format('MM월DD일') : ""}</span>
            <h3>  오늘 하루!! {participation[0] ? participation[0].donationCount : "0"}명의 사람들이<br /> {participation[0] ? participation[0].totalDonation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"} 만큼 모았어요! </h3>
          </div>
        </div>
        
      </>
    )
  );
}

export default CountBox;