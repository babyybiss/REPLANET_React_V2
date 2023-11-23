import moment from 'moment';
import { DeleteCampaignAPI } from '../../../apis/CampaignListAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


import Swal from 'sweetalert2';
import HeartButton from '../../mypage/items/HeartButton';
import { useEffect } from 'react';

function CampaignSidebar({ campaignInfo }) {

    // 토큰 정보 
    let token = localStorage.getItem('token');
    let decodedToken = token ? jwtDecode(token) : null;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let campaignCode = campaignInfo.campaignCode;

    let fileSaveName = campaignInfo.campaignDescfileList[0];

    if(fileSaveName == null || undefined){
        fileSaveName = false; 
      }else{ 
        fileSaveName = true; 
      }

    // 기부 현황
    const currentBudget = campaignInfo.currentBudget;
    const goalBudget = campaignInfo.goalBudget;
    const percentage = Math.ceil((currentBudget / goalBudget) * 100).toFixed(0)
    // 날짜 
    const startDate = moment(campaignInfo.startDate).subtract(1, 'months').format('YYYY-MM-DD');
    const endDate = moment(campaignInfo.endDate).subtract(1, 'months').format('YYYY-MM-DD');

    // 삭제 
    const deleteCampaignHandler = () => {
        if (window.confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.\n(기부 내역이 있으면 삭제가 불가능합니다.)"))
            dispatch(DeleteCampaignAPI(campaignCode))
    }

    // 수정    
    const modifyCampaignHandler = () => {
        if (window.confirm("수정하시겠습니까?"))
            if (campaignInfo.currentBudget > 0) {
                Swal.fire('', '모금액이 존재하므로 수정이 불가능합니다.')
                return;
            }
        navigate(`/modify/${campaignCode}`)
    }
    // 후원하기 버튼
    const goToDonation = () => {
        decodedToken && decodedToken.memberCode != undefined ?
            navigate(`/campaign/${campaignInfo.campaignCode}/donations`) :
            navigate('/login')

    }

    // 카카오 공유하기 버툰

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
      }, []);

       const shareKakao = () => { // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
        if (window.Kakao) {
          const kakao = window.Kakao;
          if (!kakao.isInitialized()) {
            kakao.init("75ce38ebe67c3a1280e071003e94fcd8"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
          }
      
          kakao.Link.sendDefault({
            objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
            content: {
              title: campaignInfo.campaignTitle, // 인자값으로 받은 title
              description: campaignInfo.orgDescription, // 인자값으로 받은 title
              imageUrl: 'https://cdn-icons-png.flaticon.com/512/5017/5017359.png',
              link: {
                mobileWebUrl: `http://localhost:3000/campaign/${campaignCode}`, // 인자값으로 받은 route(uri 형태)
                webUrl: `http://localhost:3000/campaign/${campaignCode}`
              }
            },
          });
        }
      };
    return (
        campaignInfo && (

            <div className="container-sidebar">
         
                <div className="toggle">
                    <HeartButton campaignCode={campaignCode} />

                </div>
                <h2>현재 모금액 : {campaignInfo.currentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </h2>
                <h6>목표 모금액 : {campaignInfo.goalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </h6>
                <progress className="progress mt-1" value={percentage} max="100"></progress>
                <div className="campaign-progress-info mt-1 pt-1">
                    <span className="amount">{startDate} ~ {endDate}</span>
                    <span className="percent float-right">{percentage > 100 ? '목표금액 초과!!' : percentage + '%'}</span>
                </div>
                <div className="items-container ic2 mt-1 pt-1">

                    {decodedToken !== null && decodedToken.memberRole == "ROLE_ADMIN" ?
                        <button className="button button-primary" onClick={deleteCampaignHandler}>삭제하기</button> :

                        <button className="button button-primary" style={{ width: "100%" }} onClick={goToDonation}>후원하기</button>

                    }
                    {decodedToken !== null && decodedToken.memberRole == "ROLE_ADMIN" ?
                        <button className="button button-primary-outline" onClick={modifyCampaignHandler}>수정하기</button> :
                        <button className="button button-primary-outline" onClick={shareKakao}>공유하기</button>
                    }

                </div>
                <div className="items-container ic1">
                    <div className="item p-2 border">
                        <p>
                            현재 모금 현황 자리(추후 수정)
                        </p>
                    </div>
                    <div className="item p-2 border">
                        <p>
                            {campaignInfo.orgDescription}
                        </p>
                    </div>
                </div>
            </div>
        )
    );
}

export default CampaignSidebar;