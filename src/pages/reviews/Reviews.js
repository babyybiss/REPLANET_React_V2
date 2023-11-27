import { ReviewList } from "../../component/reviews/lists/ReviewList";
import { ReviewListSearchbar } from "../../component/reviews/items/ReviewListSearchbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetReviewsBySearchFilter } from "../../apis/ReviewAPI";
import { callGetCompletedCampaign } from "../../apis/ReviewAPI";
import { CampaignListDoneAPI } from "../../apis/CampaignListAPI";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { callGetReviewsAPI } from "../../apis/ReviewAPI";
import { callGetCampaignsWithoutAReview } from "../../apis/ReviewAPI";


export function Reviews() {
    
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
  
    console.log('Decoded Token:', decodedToken);
  
    const dispatch = useDispatch();

    //const result = useSelector(state => state.reviewReducer.ReviewList || state.reviewReducer.getReviewNeededCampaign)
    //const completedCampaigns = result.campaignlist || result.campaignDoneList;

    const [reviewCampaignCode, setReviewCampaignCode] = useState(0);
    const [searchFilter, setSearchFilter] = useState('');
    const [reviewExists, setReviewExists] = useState(true);

    useEffect(
        () => {
            console.log(reviewExists);
            if(searchFilter == '') {
                dispatch(callGetReviewsBySearchFilter(searchFilter));
            }
        },[searchFilter]
    );

    const handleSearchKeyPress = () => {
        // Dispatch your action here with the searchFilter value
        dispatch(callGetReviewsBySearchFilter(searchFilter));
    }


    const result = useSelector((state) => {
        if (reviewExists === false) {
            return state.reviewReducer.getReviewNeededCampaign;
        } else if (reviewExists === true) {
            return state.reviewReducer.reviewList;
        }
    });

    useEffect(() => {
        const isPageReloaded = performance.navigation.type === 1;

        if (reviewExists === false) {
            dispatch(callGetCampaignsWithoutAReview());
        } else if (reviewExists === true || isPageReloaded ) {
            dispatch(callGetReviewsAPI());
        }
    }, [reviewExists]);



    return (
        <>
            <div className="container-first">
                <div className="item mb-1">
                    <h1 className="py-3 container-centered">캠페인 완료 후기</h1>
                    <ReviewListSearchbar
                        reviewCampaignCode={reviewCampaignCode}
                        searchFilter={searchFilter}
                        setSearchFilter={setSearchFilter}
                        reviewExists={reviewExists}
                        setReviewExists={setReviewExists}
                        handleSearchKeyPress={handleSearchKeyPress} // Pass the handler
                        //handleCompletedCampaign={handleCompletedCampaign}
                    />
                </div>
                <div class="items-container ic3 g-gap3 campaign-list-container">
                    <ReviewList result={result} reviewExists={reviewExists} searchFilter={searchFilter} />
                </div>
            </div>
        </>
    );
}