import { NavLink } from "react-router-dom";

export function Review({ review, reviewExists }) {
  const currentDate = new Date();
  const reviewCode = review.reviewCode;
  // Check if review has endDate and if it's greater than or equal to the current date
  const isEndDateValid = review.campaignEndDate && new Date(review.campaignEndDate) <= currentDate;

  if(reviewExists) {
    return (
      <NavLink to={`/reviews/${reviewCode}`}>
            <div className="item-thumb rounded-3 mb-1 v-2 v-1 ">
              <img className="v-2 v-3" src={`/reviewImgs/${review.reviewFileList[0].fileSaveName}`} />
            </div>
            <h4>{review.reviewTitle}</h4>
            <h6>{review.campaignOrgName}</h6>
        </NavLink>
    )
  } else if (!reviewExists && isEndDateValid) {
    return (
          <div>
            <h4>{review.campaignTitle}</h4>
            <h6>{review.campaignOrgName}</h6>
            <NavLink to={`/reviews/reviewRegist/${review.campaignCode}`}>리뷰 등록하기</NavLink>
          </div>
    );
  }


}
