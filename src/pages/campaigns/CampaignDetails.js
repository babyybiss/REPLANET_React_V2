import Campaign from "../../component/campaigns/items/Campaign";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

function CampaignDetail() {
    const result = useSelector(state => state.campaignReducer);
    let { campaignCode } = useParams;

    useEffect(
        () => {

        },[]
    )
    return (
        <Campaign campaignCode={campaignCode}/>
        );
}

export default CampaignDetail;
