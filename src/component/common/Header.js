import { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function responsiveHeader() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  const foldMenu = () => {
    var x = document.getElementById("myTopnav");
    if(x.className === "topnav responsive"){
        x.className = "topnav"
    }
  }

  function toggleMenu() {
    let NavBar = document.querySelector(".navbar");
    NavBar.classList.toggle("open");
  }

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

        var x = document.getElementById("myTopnav");
        if(x.className === "topnav responsive"){
            x.className = "topnav"
        }
    }

    let memberRole = null;
    if(isLogin){
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        memberRole = decodedToken.auth;
    }

    return (
        <div className="topnav-area">
            <div className="topnav" id="myTopnav">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                </style>
                <NavLink to="/" className="brand">Replanet</NavLink>
                <div className="menu">
                    {!isLogin && (
                        <>
                            <NavLink onClick={foldMenu} to="/">기부하기</NavLink>
                            <NavLink onClick={foldMenu} to="/reviews">캠페인후기</NavLink>
                            <NavLink onClick={foldMenu} to='/login'>로그인</NavLink>
                            <NavLink onClick={foldMenu} to='signup' style={{marginRight:"0"}}>회원가입</NavLink>
                        </>
                    )}
                    {isLogin && (
                        memberRole === "ROLE_USER" && (
                            <>
                                <NavLink onClick={foldMenu} to="/">기부하기</NavLink>
                                <NavLink onClick={foldMenu} to="/reviews">캠페인후기</NavLink>
                                <NavLink onClick={foldMenu} to='/myPage'>마이페이지</NavLink>
                                <NavLink onClick={toggleLogoutHandler} style={{marginRight:"0"}}>로그아웃</NavLink>
                            </>
                        ) ||
                        (memberRole === "ROLE_ADMIN" && (
                            <>
                                <NavLink onClick={foldMenu} to="exchangeList">포인트전환관리</NavLink>
                                <NavLink onClick={foldMenu} to='org'>기부처관리</NavLink>
                                <NavLink onClick={foldMenu} to="/reviews">후기관리</NavLink>
                                <NavLink onClick={foldMenu} to='charts'>캠페인현황통계</NavLink>
                                <NavLink onClick={toggleLogoutHandler} style={{marginRight:"0"}}>로그아웃</NavLink>

                            </>
                        )) ||
                        (memberRole === "ROLE_ORG" && (
                            <>
                                <NavLink onClick={foldMenu} to='/myPageOrg'>마이페이지</NavLink>
                                <NavLink onClick={toggleLogoutHandler} style={{marginRight:"0"}}>로그아웃</NavLink>
                            </>
                        ))
                    )}
                            <div className="icon" onClick={responsiveHeader}>
                                <i className="fa fa-bars"></i>
                            </div>
                </div>
            </div>
        </div>
    )
}


export default Header;
