import { ReviewListSearchbar } from "../items/ReviewListSearchbar";
import { Review } from "../items/Review";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetReviewsAPI } from "../../../apis/ReviewAPI";
import { Link } from "react-router-dom";

export function ReviewList({ reviewExists, searchFilter }) {

    const result = useSelector((state) => state.reviewReducer);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callGetReviewsAPI());
    }, [reviewExists]);

    console.log(result.reviewList);
    console.log('searchFilter?? :' , searchFilter)


    // Check if result is an array, if not, initialize it as an empty array
    const filteredCampaigns = Array.isArray(result.reviewList)
    ? result.reviewList.filter((item) => {
          if (reviewExists === true) {
            console.log("what is rendered? : ", item);
              // If reviewExists is true, return campaigns with non-null reviewCampaignCode
              return item.reviewCampaignCode !== null;
          } if (reviewExists === false) {
            console.log("else???? : ", item.reviewCampaignCode !== null);
              // If reviewExists is false, return campaigns with null reviewCampaignCode
              return item.reviewCampaignCode === null;
          }
      })
    : [];


    return (
        <div>
            {filteredCampaigns.map((filteredCampaign) => (
                // Pass the filtered data to the Review component
                <Review key={filteredCampaign.campaignCode} review={filteredCampaign} reviewExists={reviewExists} />
            ))}
        </div>
    );
}
