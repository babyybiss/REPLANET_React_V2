import style from "../../../assets/css/common.css"
import "../../../assets/css/select.css"
import { jwtDecode } from 'jwt-decode';

export function ReviewListSearchbar({ reviewCampaignCode, searchFilter, setSearchFilter, reviewExists, setReviewExists, onSearchKeyPress, handleSearchKeyPress, handleCompletedCampaign }) {

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
  
    console.log('Decoded Token:', decodedToken);
  
    const handleSelectChange = (e) => {
        // Reset the searchFilter when the select option is changed
        setSearchFilter('');
        setReviewExists(e.target.value === "true");
        handleCompletedCampaign();
    };

    return (
        <div className="text-center">
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <input
                    type="text"
                    className="searchbar"
                    value={searchFilter}
                    onChange={(e) => {
                        setSearchFilter(e.target.value);
                        handleSearchKeyPress();
                    }}
                    placeholder="🔎 Search"
                />
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
