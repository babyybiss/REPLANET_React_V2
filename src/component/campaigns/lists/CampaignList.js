import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import CampaignItem from "../items/CampaignItem";
import { CampaignListAPI } from "../../../apis/CampaignListAPI";

function CampaignList() {
    const result = useSelector(state => state.campaignReducer)

    const campaignList = result.campaignlist || result.campaignDoneList;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(CampaignListAPI());
        },
        []
    );

    return (
        campaignList && (
        <div className="items-container ic3 g-gap3 campaign-list-container">
            {campaignList.map(campaign => <CampaignItem key={campaign.campaignCode} campaign={campaign} />)}
        </div>
        )
    );
}

export default CampaignList;