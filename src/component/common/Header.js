import Default from "./Default";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div class="topnav-area">
            <div class="topnav" id="myTopnav">
                <a href="main.html" class="brand">Replanet</a>
                <div class="menu">
                    <NavLink  to="/">기부하기</NavLink>
                    <a href="#">캠페인후기</a>
                    <a href="#">기부영수증</a>
                    <a href="mypage.html">userId</a>
                    <a href="#" class="user"><i class="fa fa-sign-in"></i></a>
                    <a href="javascript:void(0);" class="icon" onclick="responsiveHeader()">
                    <i class="fa fa-bars"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Header;

