
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampaignItem from "../items/CampaignItem";
import { CampaignListAPI } from "../../../apis/CampaignListAPI";
import { getCategoryByCampaign } from "../../../modules/CampaignModule";

const categoryList = [
    { key: "0", name: "전체" },
    { key: "1", name: "아동-청소년" },
    { key: "2", name: "어르신" },
    { key: "3", name: "환경보호" },
    { key: "4", name: "동물" },
    { key: "5", name: "기타" },
];

function CampaignList() {
    const result = useSelector(state => state.campaignReducer)
    const campaignList = result.campaignlist || result.campaignDoneList;
    const categories = result.category;

    //const [campaignList, setCampaignList] = useState(campaignLists);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categoryClickHandler = async (category) => {

        const cf =  campaignList.filter((curData) => {

            return curData.campaignCategory == category;
        })
        console.log(cf, '카테결과');

        await dispatch(getCategoryByCampaign(cf));
        

    }
    console.log(categories, '맞는데');
    const goToRegist = () => {
        navigate('/regist')
    };
    useEffect(() => {
        dispatch(CampaignListAPI());
    },
        []
    );
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
                        <button className="button button-primary" onClick={goToRegist}>캠페인 등록</button>
                    </div>
                </div>
                {campaignList && (
                <div className="items-container ic3 g-gap3 campaign-list-container">
                    {categories != undefined ?
                          categories.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)
                        : campaignList.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)}
                </div>
                )}
            </>
        )
}

export default CampaignList;