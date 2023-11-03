import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import Campaign from "../items/Campaign";
import { CampaignAPI } from "../../../apis/CampaignAPI";

function CampaignList() {
    const data = useSelector(state => state.campaignReducer)
    const dispatch = useDispatch();

    const campaigns = data.data;
    console.log(campaigns,'result 리스트1');
    console.log(data,'result 리스트2');
    useEffect(
        () => {
            dispatch(CampaignAPI);
        },
        []
    );
    return (
        campaigns && (
        <div>
            {campaigns.map(campaign => <Campaign key={campaign.id} campaign={campaign} />)}
        </div>
        )
    );
}

export default CampaignList;