import { NavLink } from "react-router-dom";
import "../../assets/css/reset.css"
import "../../assets/css/common.css"


function Sidebar() {
    return(
        <div className="admin-sidebar">
            <ul className="admin-sidebar">
                <li className="admin-sidebar-menu"><NavLink to="/">캠페인 관리</NavLink></li>
                <li className="admin-sidebar-menu"><NavLink to="/">포인트 전환 및 관리</NavLink></li>
                <li className="admin-sidebar-menu"><NavLink to="/">후기 관리</NavLink></li>
                <li className="admin-sidebar-menu"><NavLink to="/charts">캠페인 현황 통계</NavLink></li>
            </ul>
        </div>
    );
}

export default Sidebar;