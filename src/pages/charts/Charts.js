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
import "../../assets/css/common.css";
import Sidebar from "../../component/common/Sidebar";


function Chart() {

    const callApiResult = useSelector(state => state.chartReducer)
    const chartDataList = callApiResult.chartDataList;
    const dispatch = useDispatch();

    useEffect(
        () => {
            /* chartData from API */
            dispatch(callGetChartListAPI());
        },
        []
    );

    return (
        chartDataList && (
            <div className="container-first">
                
                <h1 className="text-primary">통계</h1>
                <hr></hr>
                <div className="items-container ic2">
                    <div className="card">
                        <div className="card-header bg-primary">
                            캠페인 모금액 통계
                            <i class="fa-solid fa-cog"></i>
                        </div>
                        <div className="card-body">
                            <GoalCampaign chartDataList={chartDataList.results.categoryData} />
                        </div>
                    </div>
                    <div className="card">
                    <div className="card-header bg-primary">
                            카테고리별 캠페인 통계
                            <i class="fa-solid fa-cog"></i>
                        </div>
                        <div className="card-body">
                            <CategoryCampaign chartDataList={chartDataList.results.categoryData} />
                        </div>

                    </div>

                </div>
                <div className="items-container ic2">
                    <div className="card">
                        <div className="card-header border-bottom border-light">
                            캠페인 월간 통계
                            <i class="fa-solid fa-cog text-secondary"></i>
                        </div>
                        <div className="card-body">
                            <HistoryChart chartDataList={chartDataList.results.donationByTimeData} />
                        </div>
                    </div>
                    <div className="card">
                    <div className="card-header border-bottom border-light">
                            캠페인 연간 통계
                            <i class="fa-solid fa-cog text-secondary"></i>
                        </div>
                        <div className="card-body"><CurrentYearCampaign chartDataList={chartDataList.results.currentYearData} /></div>
                    </div>
                </div>
                <div class="items-container ic2">
                    <div className="card">
                    <div className="card-header border-bottom border-light">
                            캠페인 연간 통계
                            <i class="fa-solid fa-cog text-secondary"></i>
                        </div>
                        <div className="card-body">
                            <PreviousYearCampaign chartDataList={chartDataList.results.previousYearData} />
                        </div>
                    </div>
                    <div className="card">
                    <div className="card-header border-bottom border-light">
                            테스트
                            <i class="fa-solid fa-cog text-secondary"></i>
                        </div>
                        <div className="card-body">
                            <TestChart chartDataList={chartDataList.results.categoryData} />
                        </div>
                    </div>
                </div>

            </div>
        )

    );
}

export default Chart;