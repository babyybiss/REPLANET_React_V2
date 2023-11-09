import { ReviewList } from "../../component/reviews/lists/ReviewList";
import { ReviewListSearchbar } from "../../component/reviews/items/ReviewListSearchbar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { callGetReviewsBySearchFilter } from "../../apis/ReviewAPI";

export function Reviews() {
    const dispatch = useDispatch();

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

    return (
        <>
            <div className="container-first">
                <div className="item">
                    <h1 className="py-3 container-centered">캠페인 완료 후기</h1>
                    <ReviewListSearchbar
                        reviewCampaignCode={reviewCampaignCode}
                        searchFilter={searchFilter}
                        setSearchFilter={setSearchFilter}
                        reviewExists={reviewExists}
                        setReviewExists={setReviewExists}
                        handleSearchKeyPress={handleSearchKeyPress} // Pass the handler
                    />
                </div>
                <div class="items-container ic3 g-gap3 campaign-list-container">
                    <ReviewList reviewExists={reviewExists} searchFilter={searchFilter} />
                </div>
            </div>
        </>
    );
}