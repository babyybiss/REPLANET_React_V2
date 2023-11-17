import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callGetTodayDonationAPI } from "../../../apis/DonationAPI"; 
import moment from 'moment';

function CountBox() {
  const participation = useSelector(state => state.donationReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(
    () => {
      dispatch(callGetTodayDonationAPI({
      }));
    }
    , []
  );

  const goToRegist = () => {
    navigate('/regist')
  };
  return (
    participation && (
    <>
      <div style={{ marginTop: 100 }}>
        <div className="campaign-banner bg-primary">
        <span>{participation[0]?  moment(participation[0].donationDate).format('MM월DD일') : "" }</span>
        
          <h3>  오늘 하루!! {participation[0]?  participation[0].donationCount : "0" }명의 사람들이<br /> {participation[0]?  participation[0].totalDonation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0" } 만큼 모았어요! </h3>
        </div>
      </div>
      <div className="campaign-button-container">
        <div className="campaign-button-area">

          <button className="button button-primary-outline">전체</button>
          <button className="button button-primary-outline">아동-청소년</button>
          <button className="button button-primary-outline">어르신</button>
          <button className="button button-primary-outline">환경보호</button>
          <button className="button button-primary-outline">동물</button>
          <button className="button button-primary-outline">기타</button>
          <button className="button button-primary" onClick={goToRegist}>캠페인 등록</button>
        </div>
      </div>
    </>
    )
  );
}

export default CountBox;