import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';

import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function MyPage() {

    return(
        <>
            <div className="header-admin">
                <div className="header-admin-menu bg-primary"><h4>USER01님</h4></div>
                {/* 현재 로그인한 회원의 ID 들고오기 */}
                <div className="header-admin-menu">
                    <h5>총 기부 횟수</h5>
                    <h3 className="text-primary">13회</h3>
                    {/* 회원의 총 기부 횟수 구해야함 */}
                </div>
                <div className="header-admin-menu">
                    <h6>총 기부 액수</h6>
                    <h4 className="text-primary">143,4320원</h4>
                    {/* 회원의 기부 액수 총합 구해야함 */}
                </div>
            </div>
            <div className="container-admin">
                <div className="admin-sidebar bg-light">
                    <div className="admin-sidebar-menu">
                        <h6>소유 기부포인트</h6>
                        <h4>70,000P</h4>
                        {/* 회원의 현재 소유포인트 들고와야함 */}
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