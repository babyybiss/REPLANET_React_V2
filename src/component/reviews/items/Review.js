import { NavLink } from "react-router-dom";
//import { stylesheet } from "../../../assets/css/common.css"

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
        <div>
          <div className="item-thumb rounded-3 mb-1" style={{height: 150 + "px", overflow: 'hidden'}}>
          <img className="w-100 " src={`/reviewImgs/${review.reviewFileList[0] ? review.reviewFileList[0].fileSaveName : null}`} />
          </div>

            <h5>{review.reviewTitle}</h5>
            <hr/>
            <h6 style={{color: "#706f6f"}}><strong style={{ fontWeight: 'bold' }}>{review.campaign.campaignTitle}</strong></h6>
            <h6 style={{color: "#706f6f"}}>{review.campaign.organization.member.memberName}</h6>
        </div>
      </NavLink>
      ):(
          <div>
            {memberUI ? 
            <NavLink to={`/campaign/${review.campaignCode}`}>
              <h4><span style={{color: "#706f6f", fontSize: 15+"px"}}>캠페인명 </span><br/>{review.campaignTitle}</h4>
            <h4><span style={{color: "#706f6f", fontSize: 15+"px"}}>재단명</span><br />{review.organization.member.memberName}</h4>
            </NavLink>
            :
            <>
            <h4>{review.campaign.campaignTitle}<br/><h6 style={{color: "#706f6f"}}>캠페인명 </h6></h4>
            <h4>{review.campaign.organization.member.memberName}<br /><h6 style={{color: "#706f6f"}}>재단명</h6></h4>
            <NavLink to={`/reviews/reviewRegist/${review.campaign.campaignCode}`}><button className="button button-primary mr-1">후기 등록하기</button></NavLink>
            </>}
            
          </div>
      )
    )
    );
  
}

