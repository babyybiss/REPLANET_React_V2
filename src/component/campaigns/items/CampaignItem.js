import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { AddBookmarkAPI, DeleteBookmarkAPI } from "../../../apis/BookmarkAPI";

function CampaignItem({ campaign }) {
  // 토큰 정보 
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const dispatch = useDispatch();
  const campaignCode = campaign.campaignCode;
  // 북마크 
  const result = useSelector(state => state.bookmarkReducer)
  
  const [like, setLike] = useState(!(result? !result.book : result.book.data) )

  let fileSaveName = campaign.campaignDescfileList[0];
  const currentBudget = campaign.currentBudget;
  const goalBudget = campaign.goalBudget;
  const percentage = Math.floor((currentBudget / goalBudget) * 100).toFixed(0);

  if (fileSaveName == null || undefined) {
    fileSaveName = false;
  } else {
    fileSaveName = true;
  }

  // 북마크 추가 
  const addBookmark = (memberCode, campaignCode) => {
    dispatch(AddBookmarkAPI({ memberCode, campaignCode }))
  };

  // 북마크 삭제
  const deleteBookmark = (memberCode, campaignCode) => {
    dispatch(DeleteBookmarkAPI(memberCode, campaignCode))
  };

  return (
    <div className="item">
      <NavLink className="item-thumb rounded-3 mb-1" to={`/campaign/${campaign.campaignCode}`}>
        <img src={fileSaveName ? `campaigns/${campaign.campaignDescfileList[0].fileSaveName}` : 'campaigns/default/noImage.png'} alt="캠페인 이미지" />
      </NavLink>
      <h4> {campaign.campaignTitle}</h4>
      <h6>{campaign.orgName}</h6>
      <img
        className=""
        style={{ width: 50 }}
        alt="#"
        src={
          like
            ? "/campaigns/default/checked.png"
            : "/campaigns/default/unChecked.png"
        }
        onClick={() => {
          if (like === true) {
            setLike(!like);
            deleteBookmark(decodedToken.memberCode,campaignCode);
          }

          if (like === false) {
            setLike(!like);
            addBookmark(decodedToken.memberCode, campaignCode);
          }
        }}
      />
      <progress className="progress" value={percentage} max="100"></progress>
      <div className="campaign-progress-info">
        <span className="amount">{campaign.currentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        <span className="percent float-right">{percentage > 100 ? '목표금액 초과!!(감사)' : percentage + '%'}</span>
      </div>
    </div>
  );
}

export default CampaignItem;

