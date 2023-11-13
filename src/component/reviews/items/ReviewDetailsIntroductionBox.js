import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetReviewThumbnail } from "../../../apis/ReviewAPI";
import { NavLink } from "react-router-dom";

export function ReviewDetailsIntroductionBox({ review }) {

  const reviewFileSaveName = review.reviewFileList[0].fileSaveName;
  console.log(reviewFileSaveName);

    return (
      <div className="items-container ic2 g-gap2 campaign-list-container">
           
        <div className="item" style={{gridColumn: 1 +"/"+ 2}}>
            <div className="item-thumb rounded-3 mb-1">
                <img src={`/reviewImgs/${reviewFileSaveName}`} />
            </div>      
        </div>

        <div className="item" style={{display: "block"}}>
          <div className="text-right">
            <h2>모금액 총 {review.currentBudget} 원으로</h2>
            <h3>따뜻한 손길을 내어줄 수 있었습니다 </h3>
          </div>
        
          <hr/>
        
        <div className="item p-2 border">
          <h5>{review.orgName}</h5>
          <p>{review.orgDescription}</p>
        </div>
        
          <ul>
            <li> - 봉사활동에 참여하면 리플래닛이 기부합니다</li>
            <li> - 기부금은 100% 단체에 전달됩니다</li>
          </ul>
          <div>
        <button><NavLink to={`/reviews/reviewUpdate/${review.campaignCode}`}>수정하기</NavLink></button>
        <button>삭제하기</button>
      </div>
      </div>
      </div>

      )
}