import "../../assets/css/chart.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import HistoryCampaignChart from "./items/HistoryCampaignChart";
import { callGetDonationTimeAPI } from "../../apis/ChartAPI";


function HistoryCampaign() {
    const dispatch = useDispatch();
    const callApiResult = useSelector(state => state.chartReducer)
    const donationTimeData = callApiResult.donationTimeData;

    useEffect(
        () => {
            dispatch(callGetDonationTimeAPI());
        }, [dispatch]
    );

    return(
        donationTimeData && (
            <HistoryCampaignChart donationTimeData={donationTimeData}/>
        )
    );
}
export default HistoryCampaign;