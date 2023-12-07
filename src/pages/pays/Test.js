import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import DonationDetailHeader from '../../component/pays/DonationDetailHeader';

function DonationDetailsListTest() {
    return(
        <>
            {/* 마이페이지 뼈대 */}
            <div className="header-admin">
                <div className="header-admin-menu bg-primary"><h4>USER01님</h4></div>
                <div className="header-admin-menu">
                    <h5>총 기부 횟수</h5>
                    <h3 className="text-primary">13회</h3>
                </div>
                <div className="header-admin-menu">
                    <h6>총 기부 액수</h6>
                    <h4 className="text-primary">143,4320원</h4>
                </div>
            </div>
            <div className="container-admin">
                <div className="admin-sidebar bg-light">
                    <div className="admin-sidebar-menu">
                        <h6>소유 기부포인트</h6>
                        <h4>70,000P</h4>
                    </div>
                    <div className="admin-sidebar-menu">기부(결제)내역</div>
                    <div className="admin-sidebar-menu">포인트 전환 및 관리</div>
                    <div className="admin-sidebar-menu">기부영수증 안내</div>
                    <div className="admin-sidebar-menu">북마크</div>
                    <div className="admin-sidebar-menu bg-light">회원정보 수정</div>
                    <div className="admin-sidebar-menu bg-light">회원탈퇴</div>
                </div>

                {/* 컴포넌트 구간 */}
                <DonationDetailHeader/>
            </div>
        </>
    );
}

export default DonationDetailsListTest;