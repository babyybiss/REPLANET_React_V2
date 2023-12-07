import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetReviewThumbnail } from "../../../apis/ReviewAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { callDeleteReviewAPI } from "../../../apis/ReviewAPI";
import { jwtDecode } from 'jwt-decode';


export function ReviewDetailsIntroductionBox({ review, donors }) {

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;

  console.log('Decoded Token:', decodedToken);

  const reviewFileSaveName = review.reviewFileList[0].fileSaveName;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviewCode = review.reviewCode;
  const revFileCode = review.reviewFileList[0].revFileCode;

  console.log(reviewFileSaveName);
  

  const deleteReviewHandler = () => {
    if(window.confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.")){
      dispatch(callDeleteReviewAPI(reviewCode, revFileCode))
      alert('삭제 성공!\n후기 목록으로 이동합니다.');
      navigate('/reviews');
      window.location.reload();
    } else {
      window.location.reload();
    }
  }


    return (
      <div className="items-container ic2 g-gap3 campaign-list-container">
        <div className="item">
            <div className="item-thumb w-100">
                <img src={`/reviewImgs/${reviewFileSaveName}`} className="rounded-3 w-100" style={{width: 100 + "%"}}/>
            </div>      
        </div>

        <div className="item" style={{display: "block"}}>
          <div className="text-left">

            <div className="text-left">
            <h2>모금액 총 <span className="text-primary text-bold">{review.campaign.currentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>원,</h2>
            <h3><span  className="text-primary text-bold">{donors}</span>명의 참여로<br/>
            따뜻한 손길을 내어줄 수 있었습니다.</h3>
            </div>
            {decodedToken?.memberCode == review.campaign.organization.member.memberCode ?
            <>
            <NavLink to={`/reviews/reviewUpdate/${review.reviewCode}`}><button className="button button-primary w-20 mr-1">수정하기</button></NavLink>
            <button className="button button-danger w-20" onClick={deleteReviewHandler}>삭제하기</button>
            </>
            : null
            } 
          </div>
        
          <hr/>
        
        <div className="item p-2 border">
          <h5>{review.campaign.organization.member.memberName}</h5>
          <p style={{width:400+"px"}}>{review.campaign.organization.orgDescription}</p>
        </div>
        <br />
        
          <ul style={{color: "#898989"}}>
            <li>봉사활동 참여로 지급받으신 포인트를 리플래닛에서 기부하세요.</li>
            <li>기부금은 100% 재단에 전달됩니다.</li>
          </ul>
          <div>

      </div>
      </div>
      </div>
      )
}