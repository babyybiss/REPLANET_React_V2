import "../../assets/css/chart.css";
import { numberFormatToKorean } from '../../utils/NumberFormatToKorean';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { callGetChartListAPI } from '../../apis/ChartAPI';
import GoalCampaignChart from './items/GoalCampaignChart';


function GoalCampaign() {
  const dispatch = useDispatch();
  /* chartData from API */
  const callApiResult = useSelector(state => state.chartReducer)
  const chartDataList = callApiResult.chartDataList;
  
  const [data, setData] = useState()
  const [tickValueTest, setTickValueTest] = useState();
  /*
  const [tickValueTest, setTickValueTest] = useState([1,2,3,4,5]);
  const [isReady, setIsReady] = useState(false)
  */
  useEffect(
    () => {
      /* chartData from API */
      dispatch(callGetChartListAPI());
      setData(chartDataList)
    },[dispatch]
  );

  /* render */ 
  return(
    chartDataList && (
      <GoalCampaignChart chartDataList={chartDataList}/>
    )
  );
}

export default GoalCampaign;