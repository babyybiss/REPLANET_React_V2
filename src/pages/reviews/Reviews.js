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
import { callGetOrgReviewAPI } from "../../apis/ReviewAPI";
import { callGetOrgCampaignsWithoutReview } from "../../apis/ReviewAPI";


export function Reviews() {

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;

  const currentUrl = window.location.href;
  const memberUI = currentUrl.includes('http://localhost:3000/reviews');
  const orgUI = currentUrl.includes('http://localhost:3000/myPageOrg/review');

  const [loading, setLoading] = useState(true); // New loading state
  const [reviews, setReviews] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [reviewCampaignCode, setReviewCampaignCode] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [reviewExists, setReviewExists] = useState(true);
  const [searching, setSearching] = useState(false);

  const dispatch = useDispatch();

  console.log('Decoded Token:', decodedToken);

  useEffect(() => {
    const isPageReloaded = performance.navigation.type === 1;
    
console.log("reviewexists?? ", reviewExists);
    if (memberUI && reviewExists == false) {
      dispatch(callGetCampaignsWithoutAReview())
      .finally(() => setLoading(false)); // Set loading to false when data is received
    } else if (memberUI && reviewExists == true) {
      dispatch(callGetReviewsAPI())
      .finally(() => setLoading(false)); // Set loading to false when data is received
    } else if (orgUI && reviewExists == false) {
        const memberCode = decodedToken.memberCode
      dispatch(callGetOrgCampaignsWithoutReview(memberCode))
      .finally(() => setLoading(false)); // Set loading to false when data is received
    } else if (orgUI && reviewExists == true) {
        const memberCode = decodedToken.memberCode
        dispatch(callGetOrgReviewAPI(memberCode))
        .finally(() => setLoading(false)); // Set loading to false when data is received
      console.log("재단 api!");
    };
  }, [reviewExists]);

  useEffect(() => {
    if (searching) {
      // Filter reviews based on searchFilter
      const newFilteredResult = result.filter((item) =>
        item.reviewTitle.toLowerCase().includes(searchFilter.toLowerCase())
      );
      setFilteredResult(newFilteredResult);
      console.log("Filtered Result: ", newFilteredResult);
    }
  }, [searching, searchFilter]);

  const result = useSelector((state) => {
    if (memberUI && reviewExists === false) {
      return state.reviewReducer.getReviewNeededCampaign;
    } else if (memberUI && reviewExists === true) {
      return state.reviewReducer.reviewList;
    } else if (orgUI && reviewExists === false) {
        console.log("리뷰 없는 재단꺼!");
      return state.reviewReducer.orgReviewNeededCampaign;
    } else if (orgUI && reviewExists === true) {
      console.log("재단꺼!");
      return state.reviewReducer.orgReviewList;
    }
  });

  console.log(result);

  return (
    <>
      <div className="container-first bg-white">
      {loading && <div className="loader"></div>}
      <>
        {orgUI && 
          <div className="admin-title m-4">
            <h1 class="text-primary">캠페인 리뷰 목록</h1>
          </div>
        }
        
        <div className="item mb-1">
          {memberUI &&
            <h1 className="py-3 container-centered">캠페인 후기</h1>
          }
          <ReviewListSearchbar
            reviewCampaignCode={reviewCampaignCode}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            reviewExists={reviewExists}
            setReviewExists={setReviewExists}
            setSearching={setSearching}
          />
        </div>
        <div class="items-container ic3 g-gap3 campaign-list-container" style={{}}>
          <ReviewList result={searching ? filteredResult : result} reviewExists={reviewExists} searchFilter={searchFilter} />
        </div>
        </> 
      </div>
    </>
  );
}
