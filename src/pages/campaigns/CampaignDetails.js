import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import { GetCampaignAPI } from "../../apis/CampaignListAPI";
import CampaignContent from "../../component/campaigns/items/CampaignContent";
import CampaignPlan from "../../component/campaigns/items/CampaignPlan";
import CampaignPicture from "../../component/campaigns/items/CampaignPicture";
import CampaignSidebar from "../../component/campaigns/items/CampaignSidebar";
import ParticipationDetails from '../../component/campaigns/lists/ParticipationDetails';

import '../../assets/css/reset.css';
import '../../assets/css/campaignDetail.css'

function CampaignDetail() {
    const result = useSelector(state => state.campaignReducer);
    const { campaignCode } = useParams();

    const campaign = result.campaigninfo;
    const dispatch = useDispatch();
console.log(campaign,'이거 디텔');
    useEffect(
        () => {
            dispatch(GetCampaignAPI(campaignCode));
        },[]
    );
    return (
        campaign && (
            <div>
                <div className="container-first">
                    <h1>{campaign.campaignTitle} </h1>
                    <div className="container-content">
                        <div>
                            <CampaignContent campaign={campaign} />
                            {/* <CampaignPicture campaign={campaign} />
                            <CampaignPlan campaign={campaign} /> */}
                            <ParticipationDetails />
                        </div>
                        {/* <CampaignSidebar campaign={campaign} /> */}
                    </div>
                </div>
            </div>

        )
    );
}

export default CampaignDetail;


