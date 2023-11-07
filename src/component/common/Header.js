import Default from "./Default";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="topnav-area">
            <div className="topnav" id="myTopnav">
                <a href="main.html" className="brand">Replanet</a>
                <div className="menu">
                    <NavLink  to="/">기부하기</NavLink>
                    <NavLink to="/reviews">캠페인후기</NavLink>
                    <a href="#">기부영수증</a>
                    <a href="mypage.html">userId</a>
                    <a href="#" className="user"><i className="fa fa-sign-in"></i></a>
                    <a href="javascript:void(0);" className="icon" >
                    <i className="fa fa-bars"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Header;

