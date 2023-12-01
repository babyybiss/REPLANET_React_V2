import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callGetSpecificReviewAPI } from "../../apis/ReviewAPI";
import { ReviewDetailsIntroductionBox } from "../../component/reviews/items/ReviewDetailsIntroductionBox";
import { ReviewContent } from "../../component/reviews/items/ReviewContent";
import { ReviewComment } from "../../component/reviews/items/ReviewComment";
import { callgetMemberCode } from "../../apis/ReviewAPI";
import { callGetDonationByCampaignCodeAPI } from "../../apis/DonationAPI";

export function ReviewDetails() {

  const { reviewCode } = useParams();
  const dispatch = useDispatch();
  const review = useSelector((state) => state.reviewReducer.review);
  const participation = useSelector(state => state.donationReducer);
  const participationList = participation.results ? participation.results.campaign : "";

  useEffect(() => {
    dispatch(callGetSpecificReviewAPI(reviewCode));
  }, []);

  useEffect(() => {
  if(review) {
       // const campaignCode = review.campaign.campaignCode;
       dispatch(callGetDonationByCampaignCodeAPI({
        campaignCode : review.campaign.campaignCode
      }))
  }
},[review]);
  
const donors = participationList?.length;
console.log("how many donors? : ", donors);

  console.log('(ReviewDetailsPage) : ', review);

  console.log("participation? : ", participation);
  console.log("participation List : ", participationList);

  /*useEffect(() => {
        dispatch(callgetMemberCode());
  },[memberCode]);*/

  

     return (
      review && review ? (
        <div className="container-first w-90">
          <h1 className="container-centered mb-2">{review.reviewTitle}</h1>
            <ReviewDetailsIntroductionBox review={review} donors={donors}/>
          <div>
            <ReviewContent review={review}/>
          </div>
          <div id="comment">
            <ReviewComment review={review}/>
          </div>
        </div>
      ) :
      (
        <h5>로딩 중...</h5>
      )
    );
}