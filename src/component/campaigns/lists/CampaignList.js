
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignItem from "../items/CampaignItem";
import { CampaignListAPI, CampaignListDoneAPI } from "../../../apis/CampaignListAPI";
import { getCategoryByCampaign } from "../../../modules/CampaignModule";
import { jwtDecode } from 'jwt-decode';

const categoryList = [
    { key: "0", name: "전체" },
    { key: "1", name: "아동-청소년" },
    { key: "2", name: "어르신" },
    { key: "3", name: "환경보호" },
    { key: "4", name: "동물" },
    { key: "5", name: "기타" },
];

function CampaignList() {
    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    const result = useSelector(state => state.campaignReducer)
    const campaignList = result.campaignlist || result.campaignDoneList;

    const [categories, setCategories] = useState(result.category);
    //const [campaignList, setCampaignList] = useState(campaignLists);

    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categoryClickHandler = (category) => {
        if (category === "전체") {
            return setCategories(undefined)
        }
        const cf = campaignList.filter((curData) => {
            return curData.campaignCategory === category;
        })
        setCategories(getCategoryByCampaign(cf))
    }
    const goToRegist = () => {
        navigate('/regist')
    };
    useEffect(() => {
        dispatch(CampaignListAPI("ing"))
    },
        []
    );

    //페이징
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = campaignList && campaignList.length > 0 ? campaignList.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalItems = campaignList ? campaignList.length : '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
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
                    {decodedToken !== null && decodedToken.memberRole == "ROLE_ADMIN" ?
                        <button className="button button-primary" onClick={goToRegist}>캠페인 등록</button> : ""
                    }
                </div>
            </div>
            {campaignList && (
                <div className="items-container ic3 g-gap3 campaign-list-container">
                    {categories != undefined ?
                        categories.payload.category.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)
                        : currentItems.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)}
                </div>
            )}
            <ul className="pagination">
                <li className="icon" onClick={() => handlePageChange(currentPage - 1)}><a><span className="fas fa-angle-left"></span></a></li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        <a className={currentPage === index + 1 ? "active" : ""}>
                            {index + 1}
                        </a>
                    </li>
                ))}
                <li onClick={() => handlePageChange(currentPage + 1)}><a><span className="fas fa-angle-right"></span></a></li>
            </ul>
            <button >더보기</button>

        </>
    )
}

export default CampaignList;