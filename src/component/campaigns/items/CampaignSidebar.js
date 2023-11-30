import { DeleteCampaignAPI, GetCampaignsByOrgAPI } from '../../../apis/CampaignListAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import HeartButton from '../../mypage/items/HeartButton';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function CampaignSidebar({ campaign, orgList }) {

    // 토큰 정보 
    let token = localStorage.getItem('token');
    let decodedToken = token ? jwtDecode(token) : null;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let campaignCode = campaign.campaignCode;

    let fileSaveName = campaign.organization ? campaign.organization.fileSaveName : null
    if (fileSaveName == null || undefined) {
        fileSaveName = false;
    } else {
        fileSaveName = true;
    }
    

    // 기부 현황
    let currentBudget = campaign.currentBudget;
    let goalBudget = campaign.goalBudget;
    let percentage = Math.ceil((currentBudget / goalBudget) * 100).toFixed(0)
    // 마감 날짜 
    let getEndDate = new Date(campaign.endDate[0], campaign.endDate[1] - 1, campaign.endDate[2]);
    let endDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(getEndDate);
    // 시작 날짜
    let getStartDate = new Date(campaign.startDate[0], campaign.startDate[1] - 1, campaign.startDate[2]);
    let startDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(getStartDate);

    // 끝남 or 진행
    let today = new Date();
    let curEndDate = new Date(campaign.endDate[0], campaign.endDate[1] - 1, campaign.endDate[2] + 1);
    let campaignStatus = ((curEndDate) - (today));
    // 삭제 
    const deleteCampaignHandler = () => {
        Swal.fire({
            icon: "question",
            title: "캠페인 삭제",
            text: "해당 캠페인을 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: '#1D7151',
            cancelButtonColor: '#1D7151',
            confirmButtonText: '승인',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(DeleteCampaignAPI(campaignCode))
            }
        }
        );
    }

    // 수정    
    const modifyCampaignHandler = () => {
        Swal.fire({
            icon: "question",
            title: "캠페인 수정",
            text: "해당 캠페인을 수정하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: '#1D7151',
            cancelButtonColor: '#1D7151',
            confirmButtonText: '승인',
            cancelButtonText: '취소'
        }).then(result => {
            if (result.isConfirmed) {
                if (campaign.currentBudget > 0) {
                    Swal.fire('', '모금액이 존재하므로 수정이 불가능합니다.')
                    return;
                } else if (campaignStatus < 0) {
                    Swal.fire('', '마감 날짜가 지났습니다.')
                    return;
                }
                navigate(`/modify/${campaignCode}`)
            }
        }
        );
    }
    // 후원하기 버튼
    const goToDonation = () => {
        if (campaignStatus < 0) {
            Swal.fire({
                icon: "error",
                title: "모금 종료!",
                text: "모금이 종료 되었습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인',
            })
            return
        }
        decodedToken && decodedToken.memberCode != undefined ?
            navigate(`/campaign/${campaign.campaignCode}/donations`) :
            navigate('/login')

    }

    // 카카오 공유하기 버툰
    useEffect(() => {
        let script = document.createElement("script"); //script태그를 추가해준다.
        script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.js"; //script의 실행 src
        //script.integrity = "sha384-kYPsUbBPlktXsY6/oNHSUDZoTX6+YI51f63jCPEIPFP09ttByAdxd2mEjKuhdqn4";
        script.crossorigin = "anonymous";
        script.async = true; //다운로드 완료 즉시 실행
        document.head.appendChild(script);

    }, []);
    const shareKakao = () => { // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
        if (campaignStatus < 0) {
            Swal.fire({
                icon: "error",
                title: "모금 종료!",
                text: "모금이 종료 되었습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인',
            })
            return
        }

        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                kakao.init("135ecd180a9196ebbca69fe426be288e"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
            }

            kakao.Share.sendDefault({
                objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
                content: {
                    title: campaign.campaignTitle, // 인자값으로 받은 title
                    description: campaign.organization.orgDescription, // 인자값으로 받은 title
                    imageUrl: 'https://cdn-icons-png.flaticon.com/512/5017/5017359.png',
                    link: {
                        mobileWebUrl: `http://localhost:3000/campaigns/${campaignCode}`, // 인자값으로 받은 route(uri 형태)
                        webUrl: `http://localhost:3000/campaign/${campaignCode}`
                    }
                },
            });
        }
    };

    
   let camPaignOrgCode = campaign && campaign.organization.orgCode;
   let myOrgCode = decodedToken && decodedToken.memberCode;

    return (
        campaign && (
            <div className="container-sidebar">
                <div className="toggle">
                    {campaignStatus < 0 || decodedToken && decodedToken.memberRole === "ROLE_ORG" || decodedToken && decodedToken.memberRole === "ROLE_ADMIN" ?
                        "" :
                        <HeartButton campaignCode={campaignCode}/>
                    }
                </div>
                <h2>현재 모금액 : {campaign.currentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </h2>
                <h6>목표 모금액 : {campaign.goalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </h6>
                <progress className="progress mt-1" value={percentage} max="100"></progress>
                <div className="campaign-progress-info mt-1 pt-1">
                    <span className="amount">{startDate} ~ {endDate}</span>
                    <span className="percent float-right">{percentage > 100 ? '목표금액 초과!!' : percentage + '%'}</span>
                </div>
                <div className="items-container ic2 mt-1 pt-1">
                    {decodedToken !== null && decodedToken.memberRole == "ROLE_ORG" && camPaignOrgCode == myOrgCode ?
                        <button className="button button-primary" onClick={deleteCampaignHandler}>삭제하기</button> : 
                        decodedToken !== null && decodedToken.memberRole == "ROLE_ORG"? "" :
                        <button className="button button-primary" style={{ width: "100%" }} onClick={goToDonation}>후원하기</button>
                    }
                    {decodedToken !== null && decodedToken.memberRole == "ROLE_ORG" && camPaignOrgCode == myOrgCode ?
                        <button className="button button-primary-outline" onClick={modifyCampaignHandler}>수정하기</button> :
                        decodedToken !== null && decodedToken.memberRole == "ROLE_ORG"? "" :
                        <button className="button button-primary-outline" onClick={shareKakao}>공유하기</button>
                    }
                </div>
                <div className="items-container ic1">
                    <div className="item p-2 border">
                        {orgList && (
                            orgList.map(orgList => <NavLink to={`/campaign/${orgList.campaignCode}?orgCode=${orgList.organization.orgCode}`}>
                                <h5> {orgList.campaignTitle}</h5>
                            </NavLink>)
                        )}
                    </div>
                    <div className="item p-2 border">
                        <p>
                            {campaign.organization ? campaign.organization.orgDescription : ""}
                        </p>
                    </div>
                    <div className="item p-2 border">
                        <p>
                            <img src={fileSaveName ? `/campaigns/${campaign.organization.fileSaveName}` : '/campaigns/default/noImage.png'} alt="캠페인 이미지" />
                        </p>
                    </div>
                </div>
            </div>
        )
    );
}
export default CampaignSidebar;