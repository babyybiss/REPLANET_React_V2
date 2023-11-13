import { NavLink } from "react-router-dom";

export function Review({ review, reviewExists }) {
  const currentDate = new Date();
  
  // Check if review has endDate and if it's greater than or equal to the current date
  const isEndDateValid = review.endDate && new Date(review.endDate) <= currentDate;


  return (
    <div className="item">
      {reviewExists && (
        <NavLink to={`/reviews/${review.campaignCode}`}>
          <>
            <h4>{review.reviewTitle}</h4>
            <h6>{review.orgName}</h6>
          </>
        </NavLink>
      )}
      {!reviewExists && isEndDateValid && (
        <>
          <div>
            <h4>{review.campaignTitle}</h4>
            <h6>{review.orgName}</h6>
            <NavLink to={`/reviews/reviewRegist/${review.campaignCode}`}>리뷰 등록하기</NavLink>
          </div>
        </>
      )}
    </div>
  );
}
