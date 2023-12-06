import '../../assets/css/common.css'
import '../../assets/css/chart.css'
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function ChartMain() {
    return(
        <>
            <div className="container-first">
                <h1 className="text-primary">통계</h1>
            </div>
            <div className="chart-container-test1">
                <div className="chart-navbar-test2">
                    <NavLink to="goalCampaign" className="link-box">카테고리별 현재 모금액 합계</NavLink>
                    <NavLink to="categoryCampaign" className="link-box">카테고리별 목표 모금액 대비 달성률</NavLink>
                    <NavLink to="historyCampaign" className="link-box">월별 모금액 추이</NavLink>
                    <NavLink to="currentYearCampaign" className="link-box">당해 등록된 캠페인 수</NavLink>
                </div>
                <Outlet/>
            </div>
        </>
    );
}
export default ChartMain;