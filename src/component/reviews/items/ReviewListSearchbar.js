import style from "../../../assets/css/common.css"
import "../../../assets/css/select.css"
import { jwtDecode } from 'jwt-decode';
import { callGetCampaignsWithoutAReview } from "../../../apis/ReviewAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetReviewsAPI } from "../../../apis/ReviewAPI";
import { callGetOrgReviewAPI } from "../../../apis/ReviewAPI";


export function ReviewListSearchbar({ searchFilter, setSearchFilter, reviewExists, setReviewExists, handleSearchKeyPress, setSearching}) {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
      const currentUrl = window.location.href;
    const memberUI = currentUrl.includes('http://localhost:3000/reviews');
    const orgUI = currentUrl.includes('http://localhost:3000/myPageOrg/review');
    
    console.log('Decoded Token:', decodedToken);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value === "true";
        setReviewExists(selectedValue);
        setSearchFilter('');
    
       /* if (memberUI && selectedValue) {
            dispatch(callGetReviewsAPI());
        } else if (orgUI && selectedValue) {
            const memberCode = decodedToken.memberCode;
            console.log("재단 api!");
            dispatch(callGetOrgReviewAPI(memberCode));
        }else {
            dispatch(callGetCampaignsWithoutAReview());
        }*/
    };

        const handleSearchButtonClick = () => {
        // Set searching to true when the search button is clicked
        setSearching(true);
        // Handle other search-related logic if needed
    };

    useEffect(() => {
        // Set searching to false when the searchFilter is an empty string
        if (searchFilter === '') {
            setSearching(false);
        }
    }, [searchFilter]);

    return (
        <div className="text-center">
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div class="input-group">
                    <input
                        type="text"
                        className="input"
                        value={searchFilter}
                        onChange={(e) => {
                            setSearchFilter(e.target.value);
                        }}
                        placeholder="Search"
                    />
                    <button
                        type="button"
                        class="button button-primary"
                        onClick={handleSearchButtonClick}
                    ><i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>&emsp;

                {decodedToken?.memberRole === "ROLE_ADMIN" || decodedToken?.memberRole === "ROLE_ORG" ?    
                <div>
                    <select
                    name={reviewExists}
                    value={reviewExists}
                    style={{ width: 200 + "px" }}
                    onChange={handleSelectChange}
                    >
                    <option value="false">후기 미등록 캠페인</option>
                    <option value="true">후기 등록 캠페인</option>
                    </select>
                </div> :
                null
                }
            </div>
        </div>
    );
}
