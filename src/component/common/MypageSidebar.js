import { NavLink } from "react-router-dom";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";
import { useState } from "react";


function MypageSidebar() {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    const submenuStyle = {
        display : isSubmenuOpen? 'block' : 'none'
    };

    return(
        <div className="mypage-sidebar bg-light">
            <div className="mypage-sidebar-menu" style={{pointerEvents : 'none'}}>
                <h6>소유 기부포인트</h6>
                <h4 style={{color: "#1D7151"}}>nn,nnnP</h4>
            </div>
            <ul className="mypage-sidebar">
                <li className="mypage-sidebar-menu"><NavLink to="/">기부(결제) 내역</NavLink></li>
                <li className="mypage-sidebar-menu" onClick={toggleSubmenu}>포인트 전환 및 관리</li>
                    <ul className="submenu-group" style={submenuStyle}>
                        <li className="sidebar-submenu"><NavLink to="/">서비스 안내</NavLink></li>
                        <li className="sidebar-submenu"><NavLink to="/exchange">전환 신청</NavLink></li>
                        <li className="sidebar-submenu"><NavLink to="/myExchanges">전환 신청 내역</NavLink></li>
                    </ul>
                <li className="mypage-sidebar-menu"><NavLink to="/">기부 영수증 안내</NavLink></li>
                <li className="mypage-sidebar-menu"><NavLink to="/">관심리스트</NavLink></li>
                <li className="mypage-sidebar-menu bg-light"><NavLink to="/">회원정보 수정</NavLink></li>
                <li className="mypage-sidebar-menu bg-light"><NavLink to="/">회원탈퇴</NavLink></li>
            </ul>
        </div>
    );
}

export default MypageSidebar;