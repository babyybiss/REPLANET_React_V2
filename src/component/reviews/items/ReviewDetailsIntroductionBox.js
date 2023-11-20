import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetReviewThumbnail } from "../../../apis/ReviewAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { callDeleteReviewAPI } from "../../../apis/ReviewAPI";
import { jwtDecode } from 'jwt-decode';


export function ReviewDetailsIntroductionBox({ review }) {

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
      alert('삭제 성공!\n리뷰 목록으로 이동합니다.');
      navigate('/reviews');
      window.location.reload();
    } else {
      window.location.reload();
    }
  }

    return (
      <div className="items-container ic2 g-gap2 campaign-list-container">
           
        <div className="item" style={{gridColumn: 1 +"/"+ 2}}>
            <div className="item-thumb rounded-3 mb-1">
                <img src={`/reviewImgs/${reviewFileSaveName}`} />
            </div>      
        </div>

        <div className="item" style={{display: "block"}}>
          <div className="text-right">
            {decodedToken !== null && decodedToken.memberRole == "ROLE_ADMIN" ?
          <div className="m-1">
            <NavLink to={`/reviews/reviewUpdate/${review.reviewCode}`}><button className="button button-primary w-20 mr-1">수정하기</button></NavLink>
            <button className="button text-danger w-20" onClick={deleteReviewHandler}>삭제하기</button>
          </div>  
            : null
            } 
            <h2>모금액 총 {review.campaignCurrentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원으로</h2>
            <h3>따뜻한 손길을 내어줄 수 있었습니다 </h3>
          </div>
        
          <hr/>
        
        <div className="item p-2 border">
          <h5>{review.campaignOrgName}</h5>
          <p>{review.campaignOrgDescription}</p>
        </div><br />
        
          <ul>
            <li> - 봉사활동에 참여하면 리플래닛이 기부합니다</li>
            <li> - 기부금은 100% 단체에 전달됩니다</li>
          </ul>
          <div>

      </div>
      </div>
      </div>
      )
}