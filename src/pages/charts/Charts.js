import CurrentYearCampaign from "../../component/charts/CurrentYearCampaign";
import Sidebar from "../../component/common/Sidebar";
import "../../assets/css/chart.css";
import PreviousYearCampaign from "../../component/charts/PreviousYearCampaign";
import GoalCampaign from "../../component/charts/GoalCampaign";
import TestChart from "../../component/charts/TestChart";
import CategoryCampaign from "../../component/charts/CategoryCampaign";
import TestChartSets from "../../component/charts/TestChartSets";
import HistoryChart from "../../component/charts/HistoryChart";


function Chart() {
    return (
        <div className="pageContainer">
            <Sidebar/>
            <div className='chartbox'>
                <h2>캠페인 모금액 통계</h2>
                <GoalCampaign/>
                <CategoryCampaign/>
                <HistoryChart/>
                <h2>카테고리별 캠페인 통계</h2>
                <h2>연도별 및 월별 통계</h2>
                <CurrentYearCampaign/>
                <PreviousYearCampaign/>
                <h2>ㅌ테테테테테스트용</h2>
                <TestChart/>
            </div>
        </div>
    );
}

export default Chart;