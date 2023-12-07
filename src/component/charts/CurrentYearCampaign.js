import "../../assets/css/chart.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CurrentYearChart from "./items/CurrentYearChart";
import { callGetCurrentYearAPI } from "../../apis/ChartAPI";

function CurrentYearCampaign() {

  const dispatch = useDispatch();
    const callApiResult = useSelector(state => state.chartReducer)
    const currentYearData = callApiResult.currentYearData;
    
    useEffect(
      () => {
          dispatch(callGetCurrentYearAPI());
      }, [dispatch]
    );

  return (
    currentYearData && (
      <CurrentYearChart currentYearData={currentYearData} />
    )   
  );
}

export default CurrentYearCampaign;