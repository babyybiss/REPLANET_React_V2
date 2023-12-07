import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';

import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMemberByTokenAPI, callGetTotalDonationByTokenAPI } from '../../apis/MemberAPI';

import { NavLink } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import { GetCampaignByOrgAPI, GetCampaignCount } from '../../apis/CampaignListAPI';


function MyPageOrg() {

    let token = localStorage.getItem('token');
    let decodedToken = token ? jwtDecode(token) : null;

    const dispatch = useDispatch();

    //const orgResult = useSelector((state) => state.campaignReducer.campaignlist);
    const countResult = useSelector((count) => count.campaignReducer);
    const campaignCount = countResult.campaignCount ? countResult.campaignCount.results : 0;
    //const org = orgResult && orgResult.results.campaignList;
    //const [campaignCount, setcampaignCount] = useState(countResult);

    let orgCode = decodedToken && decodedToken.memberCode;

    const memberName = decodedToken ? decodedToken.memberName : '로딩중...';
    useEffect(
        () => {
            dispatch(GetCampaignByOrgAPI({ orgCode }, "ing"))
            dispatch(GetCampaignCount({ orgCode }))
        },
        [dispatch]
    );

    const [modifyActive, setModifyActive] = useState(false);
    const location = useLocation();
    useEffect(
        () => {
            const isModifyActive = location.pathname.includes("modify");
            setModifyActive(isModifyActive);
        }, [location.pathname]
    )
    const modifyMenu = {
        backgroundColor: modifyActive ? 'var(--color-primary)' : 'var(--color-white)',
        color: modifyActive ? 'var(--color-white)' : 'var(--color-dark)'
    }

    return (
        <>
            <div className="header-admin">
                <div className="header-admin-menu bg-primary"><h4>{memberName}님</h4></div>
                <div className="header-admin-menu">
                    <h5>등록한 캠페인 수</h5>
                    <h3 className="text-primary">{campaignCount.ingCount ? campaignCount.ingCount : 0}개</h3>
                    {/* 재단의 등록한 캠페인 수 구해야함 */}
                </div>
                <div className="header-admin-menu">
                    <h5>종료된 캠페인 수</h5>
                    <h4 className="text-primary">{campaignCount.doneCount ? campaignCount.doneCount : 0}개</h4>
                    {/* 재단의 받은 기부금 총액 총합 구해야함 */}
                </div>
            </div>
            <div className='container-admin bg-light'>
                <div className="admin-sidebar bg-light">
                    <NavLink to="list" className='admin-sidebar-menu'>
                        캠페인 관리
                    </NavLink>
                    <NavLink to="review" className="admin-sidebar-menu">
                        후기 관리
                    </NavLink>
                    <NavLink to="confirmPwd" className='admin-sidebar-menu' style={modifyMenu}>
                        재단 정보 수정
                    </NavLink>
                    <NavLink to="withdraw" className='admin-sidebar-menu'>
                        탈퇴 신청
                    </NavLink>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default MyPageOrg;
