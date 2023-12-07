import "../../assets/css/chart.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import GoalCampaignChart from './items/GoalCampaignChart';
import { callGetCategoryDataAPI } from "../../apis/ChartAPI";


function GoalCampaign() {
  const dispatch = useDispatch();
  const callApiResult = useSelector(state => state.chartReducer)
  const byCategory = callApiResult.byCategory;
  useEffect(
    () => {
      dispatch(callGetCategoryDataAPI());
    },[dispatch]
  );
 
  return(
    byCategory && (
      <GoalCampaignChart byCategory={byCategory}/>
    )
  );
}

export default GoalCampaign;