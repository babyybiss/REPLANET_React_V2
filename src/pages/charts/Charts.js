import CurrentYearCampaign from "../../component/charts/CurrentYearCampaign";
import "../../assets/css/chart.css";
import PreviousYearCampaign from "../../component/charts/PreviousYearCampaign";
import GoalCampaign from "../../component/charts/GoalCampaign";
import TestChart from "../../component/charts/TestChart";
import CategoryCampaign from "../../component/charts/CategoryCampaign";
import HistoryChart from "../../component/charts/HistoryChart";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callGetChartListAPI } from '../../apis/ChartAPI'


function Chart() {
    console.log("렌더링 순서좀")

    const callApiResult = useSelector(state => state.chartReducer)
    const chartDataList = callApiResult.chartDataList;
    const dispatch = useDispatch();

    useEffect(
        () => {
        console.log('ㅅ훈서:?')
        /* chartData from API */
        dispatch(callGetChartListAPI());
        },
        []
    );

    console.log('응답 데이터 확인용 ^^', chartDataList)

    return (
        chartDataList && (
            <div className="pageContainer">
                <div className='chartbox'>
                    <h2>캠페인 모금액 통계</h2>
                    <GoalCampaign chartDataList={chartDataList.results.categoryData}/>
                    <CategoryCampaign chartDataList={chartDataList.results.categoryData}/>
                    <HistoryChart chartDataList={chartDataList.results.donationByTimeData}/>
                    <h2>카테고리별 캠페인 통계</h2>
                    <h2>연도별 및 월별 통계</h2>
                    <CurrentYearCampaign chartDataList={chartDataList.results.currentYearData}/>
                    <PreviousYearCampaign chartDataList={chartDataList.results.previousYearData}/>
                    <h2>ㅌ테테테테테스트용</h2>
                    <TestChart chartDataList={chartDataList.results.categoryData}/>
                </div>
            </div>
        )
        
    );
}

export default Chart;