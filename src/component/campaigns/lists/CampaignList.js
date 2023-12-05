import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignItem from "../items/CampaignItem";
import { CampaignListAPI, GetCampaignByOrgAPI } from "../../../apis/CampaignListAPI";
import { getCategoryByCampaign } from "../../../modules/CampaignModule";
import { jwtDecode } from 'jwt-decode';
import GoToTopButton from "../items/GotoTopButton";

import { callGetSupportbotListAPI } from "../../../apis/SupportbotAPI";
import '../../../assets/css/supportbot.css'
import ModalSupportbot from "../../modals/ModalSupportbot";

export const categoryList = [
    { name: "전체"},
    { name: "아동-청소년"},
    { name: "어르신"},
    { name: "환경보호"},
    { name: "동물"},
    { name: "기타"}
];

function CampaignList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let orgURL = "http://localhost:3000/myPageOrg/list";

    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    let orgCode = decodedToken && decodedToken.memberRole === "ROLE_ORG" ? decodedToken.memberCode : "";

    // 카테고리 필터링
    const result = useSelector(state => state.campaignReducer.campaignlist)
    const [categories, setCategories] = useState();
    const campaignList = result && result.results.campaignList;
    const campaignFilter = categories ? categories.payload : undefined;

    // 카테고리 버튼
    const [selectCategory, setSelectCategory] = useState("전체");
    const categoryClickHandler = (category) => {

        setSelectCategory(category);
        if (campaignList) {
            if (category === "전체") {
                return setCategories(undefined)
            }
            const cf = campaignList.filter((curData) => {
                return curData.campaignCategory === category;
            })
            setCategories(getCategoryByCampaign(cf))
            setCurrentPage(1)
            //categoryList.active = !false
        }
    }

    // Store 등록 서포트봇 API 사용
    const callSupportList = useSelector(state => state.supportbotReducer)
    const supportbotDataList = callSupportList.supportbotDataList;
    // 모달 show, 모달버튼 바탕색 상태
    const [isShow, setIsShow] = useState(false);
    const [iconBackgroundStyle, /*setIconBackgroundStyle*/] = useState({
        backgroundColor: 'darksalmon'
    })
    //모달 아이콘 이벤트
    const iconClickHandler = () => {
        setIsShow(isShow === false ? true : false)
    }


    useEffect(() => {
        setCategories(undefined)
        setCurrentPage(1)
        setSelectCategory('전체')
    },
        [campaignList]
    );



    // 처음 로딩시 화면 
    useEffect(() => {
        if (orgURL === window.location.href) {
            dispatch(GetCampaignByOrgAPI(orgCode))
        } else {
            dispatch(CampaignListAPI("ing"))
        }
        dispatch(callGetSupportbotListAPI());
    }, [dispatch]
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
                    {categoryList.map((category, index) => (
                        <button key={index} 
                            name={category.name}
                            className={category.name === selectCategory? 'button button-primary' : 'button button-primary-outline'}
                            onClick={(e) => categoryClickHandler(e.target.name)}
                        >
                            {category.name}
                        </button>
                    ))}
                    {decodedToken !== null && decodedToken.memberRole === "ROLE_ORG" ?
                        <button className="button button-primary" onClick={goToRegist}>캠페인 등록</button> : ""
                    }
                </div>
            </div>

            {campaignList && (
                <div className="items-container ic3 g-gap3 campaign-list-container">
                    {campaignFilter !== undefined ?
                        campaignFilter.category.map(campaign => <CampaignItem decodedToken={decodedToken} key={campaign.campaignCode} campaign={campaign} />)
                        //: campignListFilter ? campignListFilter.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)
                        :
                        currentItems.map(campaign => <CampaignItem decodedToken={decodedToken} key={campaign.campaignCode} campaign={campaign} />)}
                </div>
            )}
            {categories !== undefined ?
                currentPage < totalPages && categories.length < totalItems ?
                <div className="items-container ic3">
                    <div></div>
                    <div className="campaignMoreButton" onClick={handleMoreButtonClick}>Read More</div>
                    <div></div>
                </div>
                     :
                    "" :
                currentPage < totalPages && currentItems.length < totalItems ?
                <div className="items-container ic3">
                <div></div>
                <div className="campaignMoreButton" onClick={handleMoreButtonClick}>Read More</div>
                <div></div>
            </div>    
                :
                    ""
            }
            {!(orgURL === window.location.href) ?
                <GoToTopButton /> : ""
            }
            {supportbotDataList &&
                !(orgURL === window.location.href) ?
                <button
                    onClick={iconClickHandler}
                    className="supportbot-button-style"

                >
                    <i className="fa-solid fa-comment"></i>
                </button> : ""}
            {isShow &&
                <div
                    className={'modal-container'}
                >
                    <ModalSupportbot
                        setIsShow={(setIsShow)}
                    />
                </div>
            }
        </>
    )
}

export default CampaignList;



/*
const iconOverHandler = () => {
   setIconBackgroundStyle({
       backgroundColor: 'indianred'
   })
  
}
const iconOutHandler = () => {
   setIconBackgroundStyle({
       backgroundColor: 'darksalmon'
   })
}
*/


/*기간별 소팅
const onChangeHandler = (e) => {
    const selectedValue = e.target.value;
    if (campaignFilter === undefined) {
        const sortedCampaigns = sortCampaigns(selectedValue, campaignList);
        setCampignListFilter(sortedCampaigns)
    } else {
        const sortedCampaigns = sortCampaigns(selectedValue, campaignFilter);
        setCategories(sortedCampaigns);
    }
}
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
*/

{/* <select onChange={onChangeHandler} style={{ width: "100px" }}>
                    <option value="">선택하셈</option>
                    <option value="latest">최신 순</option>
                    <option value="earliest">종료 임박순</option>
                </select> */}