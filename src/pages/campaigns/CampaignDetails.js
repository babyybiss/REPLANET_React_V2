import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import { GetCampaignAPI, GetCampaignsByOrgAPI } from "../../apis/CampaignListAPI";
import CampaignContent from "../../component/campaigns/items/CampaignContent";
import CampaignPlan from "../../component/campaigns/items/CampaignPlan";
import CampaignSidebar from "../../component/campaigns/items/CampaignSidebar";
import ParticipationDetails from '../../component/campaigns/lists/ParticipationDetails';

import '../../assets/css/reset.css';
import '../../assets/css/campaignDetail.css'

function CampaignDetail() {

    const result = useSelector(state => state.campaignReducer.campaigninfo);
    const orgResult = useSelector(state => state.campaignReducer);

    const campaign = result ? result.results.campaign : "";
    const orgList = orgResult 
    const { campaignCode } = useParams();

    let orgCode = campaign && campaign.organization.member.memberCode;

    console.log(orgList, '리절');
    const result1 = useSelector(state => state.campaignReducer)
    //const orgnList = result1 ? result1.results.campaignList : "";



    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(GetCampaignAPI(campaignCode))
            dispatch(GetCampaignsByOrgAPI(orgCode))
        }, []
    );
    return (
        campaign && (
            <div>
                <div className="container-first">
                    <h1>{campaign.campaignTitle} </h1>
                    <div className="container-content">
                        <div>
                            <CampaignContent campaign={campaign} />
                            {/* <CampaignPicture campaign={campaign} /> */}
                            <CampaignPlan campaign={campaign} />
                            <ParticipationDetails />
                        </div>
                        <CampaignSidebar campaign={campaign} />
                    </div>
                </div>
            </div>

        )
    );
}

export default CampaignDetail;


