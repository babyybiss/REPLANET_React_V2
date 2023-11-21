import MyPointList from "../../component/points/lists/MyPointList";
import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";


function MyPoints(){
    return(
    <div className="mypage-main">
        <div className="mypage-title">
            <h1>서비스 안내</h1>
        </div>
        <div className="serviceinfo">
            <p>Replanet은 회원 분들의 자원봉사 활동 이력을 포인트로 전환해 드리고 있습니다.</p>
            <p>1시간 당 10,000포인트로 전환되며 전환된 포인트는 기부에 현금처럼 사용하실 수 있습니다.</p>
            <p>포인트 전환 신청을 위한 증빙자료는 아래에서 발급 바랍니다.</p>
            <p onClick={()=>window.open('http://www.1365.go.kr')} className="externalLink">1365자원봉사포털 바로가기</p>
            <p onClick={()=>window.open('http://www.vms.or.kr')} className="externalLink">사회복지자원봉사인증관리 바로가기</p>
            <p onClick={()=>window.open('http://www.youth.go.kr')} className="externalLink">청소년활동정보서비스e청소년 바로가기</p>
            <p style={{color: "#DB524E"}}>1년 이내의 봉사 실적만 신청 가능합니다.</p>
            <p style={{color: "#DB524E"}}>1회에 1건의 봉사 실적만 신청 가능합니다.</p>
            <p style={{color: "#DB524E"}}>본인 명의의 봉사 실적만 신청 가능합니다.</p>
            <p>포인트 전환에 대한 이의 신청과 기타 관련 사항은 고객센터로 문의 바랍니다.</p>
        </div>
        <br/>
        <div className="mypage-title">
            <h1>포인트 사용/적립 내역</h1>
        </div>
        <MyPointList />
    </div>
    );
}

export default MyPoints;