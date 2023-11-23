import style from "../../../assets/css/common.css"
import "../../../assets/css/select.css"
import { jwtDecode } from 'jwt-decode';
import { callGetCampaignsWithoutAReview } from "../../../apis/ReviewAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetReviewsAPI } from "../../../apis/ReviewAPI";
export function ReviewListSearchbar({ reviewCampaignCode, searchFilter, setSearchFilter, reviewExists, setReviewExists, onSearchKeyPress, handleSearchKeyPress}) {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
  
    console.log('Decoded Token:', decodedToken);
  
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value === "true";
        setReviewExists(selectedValue);
        setSearchFilter('');
    
        if (selectedValue) {
            dispatch(callGetReviewsAPI());
        } else {
            dispatch(callGetCampaignsWithoutAReview());
        }
    };

    

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
                        handleSearchKeyPress();
                    }}
                    placeholder="Search"
                />
                <button type="button" class="button button-primary"                     
                        onChange={(e) => {
                        setSearchFilter(e.target.value);
                        handleSearchKeyPress();
                    }}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>

                {decodedToken !== null && decodedToken.memberRole == "ROLE_ADMIN" ?    
                <div>
                <select
                    name={reviewExists}
                    value={reviewExists}
                    style={{ width: 200 + "px" }}
                    onChange={handleSelectChange}
                >
                    <option value="false">미등록 후기</option>
                    <option value="true">등록 후기</option>
                </select>
                </div> :
                null
                }
            </div>
        </div>
    );
}
