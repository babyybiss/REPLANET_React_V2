import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { AddBookmarkAPI, DeleteBookmarkAPI, getBookmarkList } from "../../../apis/BookmarkAPI";
import { useEffect } from "react";
import { GET_BOOKMARK_STATUS } from "../../../modules/BookmarkModule";
import Swal from 'sweetalert2';

function CampaignItem({ campaign }) {
  // 토큰 정보 
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;

  // 캠페인 정보
  const dispatch = useDispatch();
  let campaignCode = campaign.campaignCode;
  let currentBudget = campaign.currentBudget;
  let goalBudget = campaign.goalBudget;
  let percentage = Math.ceil((currentBudget / goalBudget) * 100).toFixed(0);

  // 파일 정보
  let fileSaveName = campaign.campaignDescfileList[0];
  if (fileSaveName == null || undefined) {
    fileSaveName = false;
  } else {
    fileSaveName = true;
  }

  // 북마크 
  const bookmark = useSelector(state => state.bookmarkReducer.bookmark)
  const [like, setLike] = useState(0);

  useEffect(() => {
    // 사용자가 로그인한 경우에만 찜목록을 불러오도록
    if (token) {
      dispatch(getBookmarkList(decodedToken.memberCode))
      console.log('1번');
    }
  }, [token]);

  // 북마크 추가
  const addBookmark = (memberCode, campaignCode) => {
    dispatch(AddBookmarkAPI({ memberCode, campaignCode }))
  };
  // 북마크 삭제
  const deleteBookmark = (memberCode, campaignCode) => {
    dispatch(DeleteBookmarkAPI(memberCode, campaignCode))
  };

  //하트 누르기
  const clickedToggle = () => {
    if (token) {

      if (like === 0) {
        addBookmark(decodedToken.memberCode, campaignCode);
        setLike(1);
      } else if (like === 1) {
        deleteBookmark(decodedToken.memberCode, campaignCode);
        setLike(0);
      }
      dispatch({ type: GET_BOOKMARK_STATUS, payload: 1 });
    } else {
      Swal.fire('로그인해주세요');
    }
  };

  function matchCampaign(campaignCode) {
    for (let i = 0; i < bookmark.length; i++) {
      if (bookmark[i].campaignCode.campaignCode == campaignCode) {
        return setLike(1)
      }
    }
    return setLike(0)
  }

  // 렌더링시 하트 표시하기
  useEffect(() => {
    bookmark && (
      matchCampaign(campaignCode)
    );

  }, [bookmark])

  return (
    <div className="item">
      <NavLink className="item-thumb rounded-3 mb-1" to={`/campaign/${campaign.campaignCode}`}>
        <img src={fileSaveName ? `campaigns/${campaign.campaignDescfileList[0].fileSaveName}` : 'campaigns/default/noImage.png'} alt="캠페인 이미지" />
      </NavLink>
      <h4> {campaign.campaignTitle}</h4>
      <h6>{campaign.orgName}</h6>
      <img
        className=""
        style={{ width: 16 }}
        alt="#"
        src={
          like === 1
            ? "/campaigns/default/checked.png"
            : "/campaigns/default/unChecked.png"
        }
        onClick={clickedToggle}
      />
      <progress className="progress" value={percentage} max="100"></progress>
      <div className="campaign-progress-info">
        <span className="amount">{campaign.currentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        <span className="percent float-right">{percentage > 100 ? '목표금액 초과! 감사합니다' : percentage + '%'}</span>
      </div>
    </div>
  );
}

export default CampaignItem;

/*
북마크 버튼
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
 */