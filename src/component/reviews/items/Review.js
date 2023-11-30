import { NavLink } from "react-router-dom";
import { stylesheet } from "../../../assets/css/common.css"

export function Review({ review, reviewExists }) {
  const currentDate = new Date();
  const reviewCode = review.reviewCode;
  // Check if review has endDate and if it's greater than or equal to the current date
  const isEndDateValid = review.campaignEndDate && new Date(review.campaignEndDate) <= currentDate;

  const currentUrl = window.location.href;
  const memberUI = currentUrl.includes('http://localhost:3000/reviews');
  const orgUI = currentUrl.includes('http://localhost:3000/myPageOrg/review');


    return (
      review && (
      reviewExists === true ? (
      <NavLink to={`/reviews/${reviewCode}`}>
            <div className="stylesheet.item-thumb stylesheet.rounded-3 mb-1 ">
              <img className="v-2 v-3" src={`/reviewImgs/${review.reviewFileList[0] ? review.reviewFileList[0].fileSaveName : null}`} />
            </div>
            <h4>{review.reviewTitle}</h4>
            <h6 style={{color: "#706f6f"}}>캠페인: <strong style={{ fontWeight: 'bold' }}>{review.campaign.campaignTitle}</strong></h6>
            <h6 style={{color: "#706f6f"}}>재단 : <strong style={{ fontWeight: 'bold' }}>{review.campaign.organization.member.memberName}</strong></h6>
      </NavLink>
      ):(
          <div>
            {memberUI ? 
            <NavLink to={`/campaign/${review.campaignCode}`}>
              <h4>{review.campaignTitle}<br/><h6 style={{color: "#706f6f"}}>캠페인명 </h6></h4>
            <h4>{review.organization.member.memberName}<br /><h6 style={{color: "#706f6f"}}>재단명</h6></h4>
            </NavLink>
            :
            <>
            <h4>{review.campaign.campaignTitle}<br/><h6 style={{color: "#706f6f"}}>캠페인명 </h6></h4>
            <h4>{review.campaign.organization.member.memberName}<br /><h6 style={{color: "#706f6f"}}>재단명</h6></h4>
            <NavLink to={`/reviews/reviewRegist/${review.campaign.campaignCode}`}><button className="button button-primary mr-1">리뷰 등록하기</button></NavLink>
            </>}
            
          </div>
      )
    )
    );
  
}

