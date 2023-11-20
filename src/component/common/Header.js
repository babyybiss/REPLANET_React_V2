import Default from "./Default";
import { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { callGetMemberByTokenAPI } from "../../apis/MemberAPI";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

    let memberRole = null;
    if(isLogin){
        const token = localStorage.getItem('token');
        axios.interceptors.request.use(
            (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
            },
            (error) => {
            return Promise.reject(error);
            }
        );
        const decodedToken = token ? jwtDecode(token) : null;
        memberRole = decodedToken.auth;
    }

    return (
        <div className="topnav-area">
            <div className="topnav" id="myTopnav">
                <a href="/" className="brand">Replanet</a>
                <div className="menu">
                    {!isLogin && (
                        <>
                        <NavLink to="/">기부하기</NavLink>
                        <NavLink to="/reviews">캠페인후기</NavLink>
                        <NavLink to='/login'>로그인</NavLink>                  
                        <NavLink to='signup'>회원가입</NavLink>                   
                        <a href="#!" className="user"><i className="fa fa-sign-in"></i></a>
                        {/* <a href="javascript:void(0);" className="icon" >
                        <i className="fa fa-bars"></i>
                        </a> */}
                        </>
                    )}
                    {isLogin && (
                        memberRole === "ROLE_USER" && (
                            <>
                            <NavLink to="/">기부하기</NavLink>
                            <NavLink to="/reviews">캠페인후기</NavLink>
                            <NavLink to='/myPage'>마이페이지</NavLink>
                            <NavLink onClick={toggleLogoutHandler}>로그아웃</NavLink>
                            <a href="#!" className="user"><i className="fa fa-sign-in"></i></a>
                            {/* <a href="javascript:void(0);" className="icon" >
                            <i className="fa fa-bars"></i>
                            </a> */}
                            </>
                        )||
                        (memberRole === "ROLE_ADMIN" && (
                            <>
                            <NavLink to="exchangeList">포인트전환관리</NavLink>
                            <NavLink to="/reviews">후기관리</NavLink>
                            <NavLink to='charts'>캠페인현황통계</NavLink>
                            <NavLink onClick={toggleLogoutHandler}>로그아웃</NavLink>
                            <a href="#!" className="user"><i className="fa fa-sign-in"></i></a>
                            {/* <a href="javascript:void(0);" className="icon" >
                            <i className="fa fa-bars"></i>
                            </a> */}
                            </>
                        ))
                    )}
                    
                </div>
            </div>
        </div>
    )
}


export default Header;

