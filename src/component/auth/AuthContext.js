import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './AuthAction';
import axios from "axios";
import { Navigate } from "react-router-dom";
let logoutTimer;
const AuthContext = React.createContext({
    token: '',
    userObj: { email: '', memberName: '', memberRole: '' },
    isLoggedIn: false,
    isSuccess: false,
    isGetSuccess: false,
    signup: (email, password, memberName, phone) => { },
    login: (email, password) => { },
    logout: () => { },
    getUser: () => { },
   // changeMemberName: (memberName) => { },
    changePassword: (exPassword, newPassword) => { }
});

// axios.defaults.withCredentials = true; // withCredentials 전역 설정
// axios
//   .post(`${`http://localhost:3000`}/login`, AuthContext.userObj)
//   .then((res) => {
//     if (res.status === 200) {
//       // 모든 헤더 이름은 소문자
//       let token = res.headers['authorization']; // 응답헤더에서 토큰 받기
//       console.log('access 토큰 :', token);
//       setLocalStorage('token', token); // 토큰 localStorage에 저장
//       axios.defaults.headers.common[
//         'Authorization'
//       ] = `Bearer ${token}`;
//       navigate('/');
//     }
//   })

export const AuthContextProvider = (props) => {
    const tokenData = authAction.retrieveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);
    const [userObj, setUserObj] = useState({
        email: '',
        memberName: '',
        memberRole: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isGetSuccess, setIsGetSuccess] = useState(false);
    const userIsLoggedIn = !!token;
    const signupHandler = (email, password, memberName, phone) => {
        setIsSuccess(false);
        const response = authAction.signupActionHandler(email, password, memberName, phone);
        response.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
            }
        });
    };
    const loginHandler = (email, password) => {
        setIsSuccess(false);
        //console.log(isSuccess);
        const data = authAction.loginActionHandler(email, password);
        data.then((result) => {
            if (result !== null) {
                const loginData = result.data;
                setToken(loginData.accessToken);
                logoutTimer = setTimeout(logoutHandler, authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn));
                setIsSuccess(true);
                console.log(isSuccess);
            }
        });
    };
    const logoutHandler = useCallback(() => {
        setToken('');
        authAction.logoutActionHandler();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);
    const getUserHandler = () => {
        setIsGetSuccess(false);
        const data = authAction.getUserActionHandler(token);
        data.then((result) => {
            if (result !== null) {
                console.log('get user start!');
                const userData = result.data;
                setUserObj(userData);
                setIsGetSuccess(true);
            }
        });
    };

    const changePasswordHandler = (exPassword, newPassword) => {
        setIsSuccess(false);
        const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
        data.then((result) => {
            if (result !== null) {
                setIsSuccess(true);
                logoutHandler();
            }
        });
    };
    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);
    const contextValue = {
        token,
        userObj,
        isLoggedIn: userIsLoggedIn,
        isSuccess,
        isGetSuccess,
        signup: signupHandler,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
        changePassword: changePasswordHandler
    };
    return (React.createElement(AuthContext.Provider, { value: contextValue }, props.children));
};
export default AuthContext;
