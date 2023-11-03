import CurrentYearCampaign from "../../component/charts/CurrentYearCampaign";
import Sidebar from "../../component/common/Sidebar";
import '../../assets/css/chart.css';

function Chart() {
    return (
        <>
            <div className="chartMain">
                <Sidebar/>
                <div className="chart-section">
                    <CurrentYearCampaign/>
                </div>
            </div>
            
        </>
    );
}

export default Chart;