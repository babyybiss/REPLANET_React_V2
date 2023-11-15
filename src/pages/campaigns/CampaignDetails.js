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

    const campaignInfo = result.campaigninfo;
    const dispatch = useDispatch();

    console.log('result: ', result);
    console.log('campaignInfo: ', campaignInfo);

    useEffect(
        () => {
            dispatch(GetCampaignAPI(campaignCode));
            console.log('Campaign Detail Redux State:', result);
        },[]
    );
    return (
        campaignInfo && (
            <div>
                <div className="container-first">
                    <h1>{campaignInfo.campaignTitle} </h1>
                    <div className="container-content">
                        <div>
                            <CampaignContent campaignInfo={campaignInfo} />
                            <CampaignPicture campaignInfo={campaignInfo} />
                            <CampaignPlan campaignInfo={campaignInfo} />
                            <ParticipationDetails campaignInfo={campaignInfo} />
                        </div>
                        <CampaignSidebar campaignInfo={campaignInfo} />
                    </div>
                </div>
            </div>

        )
    );
}

export default CampaignDetail;


