import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';

import { NavLink, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMemberByTokenAPI, callGetTotalDonationByTokenAPI } from '../../apis/MemberAPI';

function MyPage() {

    const location = useLocation();
    const dispatch = useDispatch();
    const result = useSelector(state => state.memberReducer);
    console.log('MyPage() result : ', result);

    const memberName = result.member?.memberName || '로딩중...';
    const currentPoint = result.member?.currentPoint !== undefined && result.member?.currentPoint !== null? result.member?.currentPoint.toLocaleString() : '로딩중...';
    const totalAmount = result.totalAmount !== undefined && result.totalAmount !== null? result.totalAmount.toLocaleString() : '로딩중...';
    const totalDonation = result.totalDonation !== undefined && result.totalDonation !== null? result.totalDonation : '로딩중...';
    
    useEffect(
        () => {
            console.log('MyPage() useEffect 실행');
            dispatch(callGetMemberByTokenAPI())
            .catch(error => {
                console.error('MyPage() API 호출 에러: ', error);
            })
        },
        [dispatch, location.pathname]
    );

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [pointMenuActive, setPointMenuActive] = useState(false);
    console.log("로케이션 확인 : ", location);
    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };
    const submenuStyle = {
        display : isSubmenuOpen? 'block' : 'none'
    };
    const pointMenu = {
        backgroundColor: pointMenuActive? 'var(--color-primary)' : 'var(--color-white)',
        color: pointMenuActive? 'var(--color-white)' : 'var(--color-dark)'
    };
    useEffect(
        () => {
            const isPointMenuActive = location.pathname.includes("pointService")||
                                        location.pathname.includes("exchange")||
                                        location.pathname.includes("myExchangeList");
            setPointMenuActive(isPointMenuActive);
        },[location.pathname]
    )

    const [modifyActive, setModifyActive] = useState(false);
    useEffect(
        () => {
            const isModifyActive = location.pathname.includes("modify");
            console.log("참인지 확인 : ", isModifyActive);
            setModifyActive(isModifyActive);
        }, [location.pathname]
    )
    const modifyMenu = {
        backgroundColor: modifyActive? 'var(--color-primary) !important' : 'var(--color-white) !important',
        color: modifyActive? 'var(--color-white) !important' : 'var(--color-dark) !important'
    }

    return(
        <>
            <div className="header-admin">
                <div className="header-admin-menu bg-primary"><h4>{memberName}님</h4></div>
                <div className="header-admin-menu">
                    <h5>총 기부 횟수</h5>
                    <h3 className="text-primary">{totalDonation}회</h3>
                </div>
                <div className="header-admin-menu">
                    <h5>총 기부 액수</h5>
                    <h4 className="text-primary">{totalAmount}원</h4>
                </div>
            </div>
            <div className="container-admin">
                <div className="admin-sidebar bg-light">
                    <div className="admin-sidebar-menu">
                        <h6>소유 기부포인트</h6>
                        <h4>{currentPoint}P</h4>
                    </div>
                    <NavLink to="history" className='admin-sidebar-menu'>
                        기부(결제)내역
                    </NavLink>
                    <li className='admin-sidebar-menu' onClick={toggleSubmenu} style={pointMenu}>
                        포인트 전환 및 관리
                    </li>
                    <div style={submenuStyle}>
                        <NavLink to="pointService" className="sidebar-submenu">
                            서비스 안내
                        </NavLink>
                        <NavLink to="exchange" className="sidebar-submenu">
                            전환 신청
                        </NavLink>
                        <NavLink to="myExchangeList" className="sidebar-submenu">
                            전환 신청 내역
                        </NavLink>
                    </div>
                    <NavLink to="receipt" className="admin-sidebar-menu">
                        기부금영수증 안내
                    </NavLink>
                    <NavLink to="bookmark" className='admin-sidebar-menu'>
                        관심리스트
                    </NavLink>
                    <NavLink to="calculator" className='admin-sidebar-menu'>
                        세액공제 계산기
                    </NavLink>
                    <NavLink to="verifying" style={modifyMenu} className="admin-sidebar-menu bg-light">
                        회원정보 수정
                    </NavLink>
                    <NavLink to="withdraw" className="admin-sidebar-menu bg-light">
                        회원탈퇴
                    </NavLink>
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default MyPage;
