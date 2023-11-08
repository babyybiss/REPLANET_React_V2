import Default from "./Default";
import { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const [memberName, setMemberName] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;
    const callback = (str) => {
        setMemberName(str);
    }
    useEffect(() => {
        if (isLogin) {
            console.log('start');
            authCtx.getUser();
        }
    }, [isLogin]);
    useEffect(() => {
        if (isGet) {
            console.log('get start');
            callback(authCtx.userObj.memberName);
        }
    }, [isGet]);
    const toggleLogoutHandler = () => {
        authCtx.logout();
    }

    return (
        <div className="topnav-area">
            <div className="topnav" id="myTopnav">
                <a href="/" className="brand">Replanet</a>
                <div className="menu">
                    <NavLink to="/">기부하기</NavLink>
                    <NavLink to="/reviews">캠페인후기</NavLink>
                    {!isLogin && <NavLink to='/login'>로그인</NavLink>}
                    {isLogin && <NavLink to='/'>{memberName}</NavLink>}
                    {!isLogin && <NavLink to='signup'>회원가입</NavLink>}
                    <a href="#!" className="user"><i className="fa fa-sign-in"></i></a>
                    {/* <a href="javascript:void(0);" className="icon" >
                    <i className="fa fa-bars"></i>
                    </a> */}
                    {isLogin && <NavLink onClick={toggleLogoutHandler}>로그아웃</NavLink>}
                </div>
            </div>
        </div>
    )
}


export default Header;

