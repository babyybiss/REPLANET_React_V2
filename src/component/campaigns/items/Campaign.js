import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetCampaignAPI } from "../../../apis/CampaignListAPI";
import { useParams, NavLink, useHistory } from "react-router-dom";

import CampaignSidebar from './CampaignSidebar';
import CampaignContent from "./CampaignContent";
import CampaignPlan from "./CampaignPlan";
import CampaignPicture from "./CampaignPicture";

import '../../../assets/css/reset.css';
import '../../../assets/css/campaignDetail.css'

function Campaign() {
    const result = useSelector(state => state.campaignReducer);
    const { campaignCode } = useParams();

    const campaignInfo = result.campaigninfo;
    const dispatch = useDispatch();

    console.log('campaingn: ', result);

    useEffect(
        () => {
            dispatch(GetCampaignAPI(campaignCode));

        },
        []
    );

    return (
        campaignInfo && (
            <div className="container-first">
                <h1>{campaignInfo.campaignTitle} </h1>
                <div className="container-content">
                    <div>
                        <CampaignContent campaignInfo={campaignInfo} />
                        <CampaignPicture campaignInfo={campaignInfo} />
                        <CampaignPlan campaignInfo={campaignInfo} />
                        <h2 style={{ textAlign: "center" }}>참여 내역 </h2>
                        <div className="items-container ic3">
                            참여내역
                        </div>
                    </div>
                    <CampaignSidebar campaignInfo={campaignInfo} />
                </div>
            </div>
        )
    );
}
export default Campaign;

/*
return (
        <div className="container1">

            <CampaignContent />

            <CampaignSidebar />

            <hr />
            <div className="items-container ic1">
                <h2>사진 자리 </h2>
                <p>
                    사진 리스트
                </p>
            </div>
            <CampaignPlan />
            <h2 style={{ textAlign: "center" }}>참여 내역 </h2>

            <div className="items-container ic3">
                참여내역1
            </div>



        </div>
    );
    
    */