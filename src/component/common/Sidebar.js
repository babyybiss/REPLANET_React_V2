import { NavLink } from "react-router-dom";

function Sidebar() {
    return(
        <div>
            <ul>
                <li><NavLink to="/">캠페인 관리</NavLink></li>
                <li><NavLink to="/">포인트 전환 및 관리</NavLink></li>
                <li><NavLink to="/">후기 관리</NavLink></li>
                <li><NavLink to="/charts">캠페인 현황 통계</NavLink></li>
            </ul>
        </div>
    );
}

export default Sidebar;