import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';

import DonationDetail from '../../component/mypage/DonationDetail';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import BookmarkList from '../../component/mypage/lists/BookmartList';

function MyPage() {

    const [selectedMenu, setSelectedMenu] = useState('donationDetail');

    const renderComponent = () => {
        switch (selectedMenu) {
            case 'bookmarkList':
                return <BookmarkList/>;
            default:
                return <DonationDetail/>;
            // 필요한 각각의 컴포넌트들을 switch case를 이용해서 불러올 수 있다.
        }
    };

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
                    <div className={`admin-sidebar-menu ${selectedMenu === 'donationDetail' ? 'active' : ''}`} onClick={() => setSelectedMenu('donationDetail')}>
                        기부(결제)내역
                    </div>
                    <div className="admin-sidebar-menu">포인트 전환 및 관리</div>
                    <div className="admin-sidebar-menu">기부영수증 안내</div>
                    <div className={`admin-sidebar-menu ${selectedMenu === 'bookmarkList' ? 'active' : ''}`} onClick={() => setSelectedMenu('bookmarkList')}>
                        관심리스트
                    </div>
                    <div className="admin-sidebar-menu bg-light">회원정보 수정</div>
                    <div className="admin-sidebar-menu bg-light">회원탈퇴</div>
                </div>

                {renderComponent()}
                {/* switch case를 통해 불러오는 컴포넌트 */}

            </div>
        </>
    );
}

export default MyPage;