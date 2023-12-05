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
            <ul className="mb-1">
                <li>Replanet에서는 회원분들의 자원봉사 활동 이력을 포인트로 전환해드리고 있습니다.</li>
                <li>1시간 당 10,000포인트로 전환되며 전환된 포인트는 기부에 현금처럼 사용하실 수 있습니다.</li>
                <li>포인트 전환 신청을 위한 증빙자료는 아래에서 발급받으실 수 있습니다.</li>
            </ul>
            <div className="items-container ic3">
            <button onClick={()=>window.open('http://www.1365.go.kr')} class="button button-lg button-primary w-100">1365자원봉사포털 바로가기</button>
            <button onClick={()=>window.open('http://www.vms.or.kr')} className="button button-lg button-primary w-100">사회복지자원봉사인증관리 바로가기</button>
            <button onClick={()=>window.open('http://www.youth.go.kr')} className="button button-lg button-primary w-100">청소년활동정보서비스e청소년 바로가기</button>
            </div>

            {/*<p onClick={()=>window.open('http://www.1365.go.kr')} className="externalLink">1365자원봉사포털 바로가기</p>
            <p onClick={()=>window.open('http://www.vms.or.kr')} className="externalLink">사회복지자원봉사인증관리 바로가기</p>
            <p onClick={()=>window.open('http://www.youth.go.kr')} className="externalLink">청소년활동정보서비스e청소년 바로가기</p>*/}

<ul className="mb-1">
                <li className="text-danger">1년 이내의 봉사 실적만 신청 가능합니다.</li>
                <li className="text-danger">1회에 1건의 봉사 실적만 신청 가능합니다.</li>
                <li className="text-danger">본인 명의의 봉사 실적만 신청 가능합니다.</li>
                <li className="text-danger">1건당 최대 100,000 포인트까지 전환 가능합니다.</li>
                <li>포인트 전환에 대한 이의 신청과 기타 관련 사항은 고객센터로 문의 바랍니다.</li>
            </ul>

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