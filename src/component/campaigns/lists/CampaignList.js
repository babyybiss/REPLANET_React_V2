
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignItem from "../items/CampaignItem";
import { CampaignListAPI } from "../../../apis/CampaignListAPI";
import { getCategoryByCampaign } from "../../../modules/CampaignModule";
import { jwtDecode } from 'jwt-decode';
import GoToTopButton from "../items/GotoTopButton";

const categoryList = [
    { key: "0", name: "전체" },
    { key: "1", name: "아동-청소년" },
    { key: "2", name: "어르신" },
    { key: "3", name: "환경보호" },
    { key: "4", name: "동물" },
    { key: "5", name: "기타" },
];

function CampaignList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    // 카테고리 필터링
    const result = useSelector(state => state.campaignReducer.campaignlist)
    const [categories, setCategories] = useState();
    //const [campignListFilter, setCampignListFilter] = useState()
    const campaignList = result? result.results.campaignList : "";
    const campaignFilter = categories ? categories.payload : undefined;
    const categoryClickHandler = (category) => {
        if (category === "전체") {
            return setCategories(undefined)
        }
        const cf = campaignList.filter((curData) => {

            return curData.campaignCategory === category;
        })
        setCategories(getCategoryByCampaign(cf))
        setCurrentPage(1)
    }

    useEffect(() => {
        setCategories(undefined)
        setCurrentPage(1)
    },
        [campaignList]
    );

    // 기간별 소팅
    // const onChangeHandler = (e) => {
    //     const selectedValue = e.target.value;
    //     if (campaignFilter === undefined) {
    //         const sortedCampaigns = sortCampaigns(selectedValue, campaignList);
    //         setCampignListFilter(sortedCampaigns)
    //     } else {
    //         const sortedCampaigns = sortCampaigns(selectedValue, campaignFilter);
    //         setCategories(sortedCampaigns);
    //     }
    // }
    const sortCampaigns = (selectedValue, campaign) => {
        switch (selectedValue) {
            case 'latest':
                return campaign.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            case 'earliest':
                return campaign.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
            default:
                return campaign;
        }
    };

    // 처음 로딩시 화면 
    useEffect(() => {
        dispatch(CampaignListAPI("ing"))
    }, []
    );

    const goToRegist = () => {
        navigate('/regist')
    };

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const currentItems = campaignList && campaignList.length > 0 ? campaignList.slice(0, currentPage * itemsPerPage) : [];
    const totalItems = campaignList ? campaignList.length : 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleMoreButtonClick = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage);
        }
    };

    return (
        <>
            <div className="campaign-button-container">
                <div className="campaign-button-area">
                    {categoryList.map(category => (
                        <button key={category.key} className="button button-primary-outline"
                            onClick={() => categoryClickHandler(category.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                        <button className="button button-primary" onClick={goToRegist}>캠페인 등록</button> : ""
                </div>
            </div>

            {/* <select onChange={onChangeHandler} style={{ width: "100px" }}>
                    <option value="">이거안됨</option>
                    <option value="latest">최신 순</option>
                    <option value="earliest">종료 임박순</option>
                </select> */}

            {campaignList && (
                <div className="items-container ic3 g-gap3 campaign-list-container">
                    {campaignFilter !== undefined ?
                        campaignFilter.category.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)
                        //: campignListFilter ? campignListFilter.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)
                        :
                        currentItems.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)}
                </div>
            )}
            {categories !== undefined ?
                currentPage < totalPages && categories.length < totalItems ?
                    <div className="campaignMoreButton" onClick={handleMoreButtonClick}>Read More</div> :
                    "" :
                currentPage < totalPages && currentItems.length < totalItems ?
                    <div className="campaignMoreButton" onClick={handleMoreButtonClick}>Read More</div> :
                    ""
            }
            <GoToTopButton />
        </>
    )
}

export default CampaignList;