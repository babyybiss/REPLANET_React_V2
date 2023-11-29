import { ReviewListSearchbar } from "../items/ReviewListSearchbar";
import { Review } from "../items/Review";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetReviewsAPI } from "../../../apis/ReviewAPI";
import { Link } from "react-router-dom";
import { callGetCampaignsWithoutAReview } from "../../../apis/ReviewAPI";

export function ReviewList({ result, reviewExists, searchFilter, completedCampaigns }) {

    console.log(result)

    return (
        result && (
        <>
            {result.map((review) => (
                // Pass the filtered data to the Review component
                <Review key={review.campaignCode} review={review} reviewExists={reviewExists} completedCampaigns={completedCampaigns} />
            ))}
        </>
        )
    );
}
