import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import { GetCampaignAPI, GetCampaignByOrgAPI } from "../../apis/CampaignListAPI";
import CampaignContent from "../../component/campaigns/items/CampaignContent";
import CampaignPlan from "../../component/campaigns/items/CampaignPlan";
import CampaignSidebar from "../../component/campaigns/items/CampaignSidebar";
import ParticipationDetails from '../../component/campaigns/lists/ParticipationDetails';

import '../../assets/css/reset.css';
import '../../assets/css/campaignDetail.css'
import queryString from 'query-string';

function CampaignDetail() {
    const dispatch = useDispatch();
    const { campaignCode } = useParams();
    const result = useSelector((state) => state.campaignReducer.campaigninfo);
    const orgResult = useSelector((state) => state.campaignReducer.orgList);

    const orgList = orgResult && orgResult.results.campaignList;
    const campaign = result && result.results.campaign;

    let orgCode = queryString.parse(window.location.search)
    useEffect(() => {

        const fetchData = async () => {
            dispatch(GetCampaignAPI(campaignCode));
            // 첫 번째 API 호출
            if (Object.keys(orgCode).length === 0) return;
            await dispatch(GetCampaignByOrgAPI(orgCode, "no"));
        };

        fetchData();
    }, [campaignCode, dispatch]);
    return (
        campaign && (
            <div>
                <div className="container-first">
                    <h1>{campaign.campaignTitle} </h1>
                    <div className="container-content">
                        <div className='w-100'>
                            <CampaignContent campaign={campaign} />
                            {/* <CampaignPicture campaign={campaign} /> */}
                            <CampaignPlan campaign={campaign} />
                            <ParticipationDetails />
                        </div>
                        <CampaignSidebar campaign={campaign} orgList={orgList} />
                    </div>
                </div>
            </div>

        )
    );
}

export default CampaignDetail;


