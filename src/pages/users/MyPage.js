import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';

import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMemberByTokenAPI, callGetTotalDonationByTokenAPI } from '../../apis/MemberAPI';

function MyPage() {

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
        [dispatch]
    );

    return(
        <>
            <div className="header-admin">
                <div className="header-admin-menu bg-primary"><h4>{memberName}님</h4></div>
                <div className="header-admin-menu">
                    <h5>총 기부 횟수</h5>
                    <h3 className="text-primary">{totalDonation}회</h3>
                    {/* 회원의 총 기부 횟수 구해야함 */}
                </div>
                <div className="header-admin-menu">
                    <h6>총 기부 액수</h6>
                    <h4 className="text-primary">{totalAmount}원</h4>
                    {/* 회원의 기부 액수 총합 구해야함 */}
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
                    <NavLink to="바꿔주세요" className="admin-sidebar-menu">
                        포인트 전환 및 관리
                    </NavLink>
                    <NavLink to="바꿔주세요" className="admin-sidebar-menu">
                        기부영수증 안내
                    </NavLink>
                    <NavLink to="bookmark" className='admin-sidebar-menu'>
                        관심리스트
                    </NavLink>
                    <NavLink to="바꿔주세요" className="admin-sidebar-menu bg-light">
                        회원정보 수정
                    </NavLink>
                    <NavLink to="바꿔주세요" className="admin-sidebar-menu bg-light">
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
