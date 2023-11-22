import { NavLink } from "react-router-dom";
import css from "../../../assets/css/common.css"
export function Review({ review, reviewExists }) {
  const currentDate = new Date();
  const reviewCode = review.reviewCode;
  // Check if review has endDate and if it's greater than or equal to the current date
  const isEndDateValid = review.campaignEndDate && new Date(review.campaignEndDate) <= currentDate;


    return (
      review && (
      reviewExists === true ? (
      <NavLink to={`/reviews/${reviewCode}`}>
            <div className="item-thumb rounded-3 mb-1 v-2 v-1 ">
              <img className="v-2 v-3" src={`/reviewImgs/${review.reviewFileList[0] ? review.reviewFileList[0].fileSaveName : null}`} />
            </div>
            <h4>{review.reviewTitle}</h4>
            <h6 style={{color: "#706f6f"}}>캠페인: <strong style={{ fontWeight: 'bold' }}>{review.campaignTitle}</strong></h6>
            <h6 style={{color: "#706f6f"}}>재단 : <strong style={{ fontWeight: 'bold' }}>{review.campaignOrgName}</strong></h6>
      </NavLink>
      ):(
          <div>
            <h4>{review.campaignTitle}<br/><h6 style={{color: "#706f6f"}}>캠페인 </h6></h4>
            <h4>{review.orgName}<br /><h6 style={{color: "#706f6f"}}>재단</h6></h4>
            <NavLink to={`/reviews/reviewRegist/${review.campaignCode}`}><button className="button button-primary mr-1">리뷰 등록하기</button></NavLink>
          </div>
      )
    )
    );
  
}

