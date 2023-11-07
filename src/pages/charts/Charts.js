import CurrentYearCampaign from "../../component/charts/CurrentYearCampaign";
import Sidebar from "../../component/common/Sidebar";
import "../../assets/css/chart.css";
import PreviousYearCampaign from "../../component/charts/PreviousYearCampaign";


function Chart() {
    return (
        <div className="pageContainer">
            <Sidebar/>
            <div className='chartbox'>
                <h2>캠페인 목표액 대비 달성률 통계</h2>
                <h2>현재 캠페인 기부액 통계</h2>
                <h2>카테고리별 캠페인 통계</h2>
                <h2>연도별 및 월별 통계</h2>
                <CurrentYearCampaign/>
                <PreviousYearCampaign/>
            </div>
        </div>
    );
}

export default Chart;