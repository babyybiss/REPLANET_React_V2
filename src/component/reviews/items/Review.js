import { NavLink } from "react-router-dom";

export function Review({ review, reviewExists }) {


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
        {!reviewExists && (
            <>
              <h4>{review.campaignTitle}</h4>
              <h6>{review.orgName}</h6>
              <NavLink to={`/reviews/reviewRegist/${review.campaignCode}`}>리뷰 등록하기</NavLink>
            </>
      )}
      </div>
  );
}
