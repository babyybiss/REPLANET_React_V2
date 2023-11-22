import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { AddBookmarkAPI, DeleteBookmarkAPI } from "../../../apis/BookmarkAPI";
import { useEffect } from "react";
import Swal from 'sweetalert2';

function CampaignItem({ campaign }) {
  // 토큰 정보 
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const dispatch = useDispatch();
  let campaignCode = campaign.campaignCode;
  
  // 파일 정보
  let fileSaveName = campaign.campaignDescfileList[0];
  const currentBudget = campaign.currentBudget;
  const goalBudget = campaign.goalBudget;
  const percentage = Math.ceil((currentBudget / goalBudget) * 100).toFixed(0);

  if (fileSaveName == null || undefined) {
    fileSaveName = false;
  } else {
    fileSaveName = true;
  }
  // 북마크 
  const result = useSelector(state => state.bookmarkReducer)
  const bookmark = useSelector(state => state.bookmarkReducer.bookmark)
  const [like, setLike] = useState(false)

  console.log(result,'리절북맠');
  console.log(bookmark,'리절북맠22');
  // 북마크 추가 
  const addBookmark = (memberCode, campaignCode) => {
    dispatch(AddBookmarkAPI({ memberCode, campaignCode }))
  };

  // 북마크 삭제
  const deleteBookmark = (memberCode, campaignCode) => {
    dispatch(DeleteBookmarkAPI(memberCode, campaignCode))
  };
  useEffect(() => {
    // 사용자가 로그인한 경우에만 찜목록을 불러오도록
    if (token) {
      axios.get(`http://localhost:8001/bookmarks?memberCode=${decodedToken.memberCode}`)
        .then(res => {
          if( res.data.num != undefined){
            setLike(false);
          }
          else{
            setLike(true);
          }
        })
        .catch(error => {
          console.error('Error fetching wishlist:', error);
        });
    } else{
      setLike(true)
    }
  }, [token]);

  //하트 누르기
  const clickedToggle = () => {
		if (token) {
			setLike((prev) => !prev);

			if (like) {
				addBookmark(decodedToken.memberCode, campaignCode);
			} else {
				deleteBookmark(decodedToken.memberCode,campaignCode);
			}
		} else {
			Swal.fire('로그인해주세요');
		}
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
          like.bookmarkCode
            ? "/campaigns/default/checked.png"
            : "/campaigns/default/unChecked.png"
        }
        onClick={clickedToggle}
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