import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callGetSpecificReviewAPI } from "../../apis/ReviewAPI";
import { ReviewDetailsIntroductionBox } from "../../component/reviews/items/ReviewDetailsIntroductionBox";
import { ReviewContent } from "../../component/reviews/items/ReviewContent";
import { ReviewComment } from "../../component/campaigns/items/ReviewComment.js";
import comment from "../../assets/css/comment.css"
import script from "../../assets/scripts/externalScript.js";

export function ReviewDetails() {
  const { campaignCode } = useParams();
  const dispatch = useDispatch();
  const review = useSelector((state) => state.reviewReducer.review);
  //const review = result.review;

  console.log('what campaignCode? : ',campaignCode);
  useEffect(() => {
    dispatch(callGetSpecificReviewAPI(campaignCode));
  }, [campaignCode]);

  console.log('(ReviewDetailsPage) : ', review);

     return (
      review && (
        <div className="container-first">

          <h1 className="py-3 container-centered">{review.reviewTitle}</h1>
            <ReviewDetailsIntroductionBox review={review} />
          <div>
            <ReviewContent review={review}/>
          </div>

          <div id="comment">
            <ReviewComment review={review}/>
          </div>
        </div>
      )
    );
}
