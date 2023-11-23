import moment from 'moment';
import { DeleteCampaignAPI, ModifyCampaignAPI } from '../../../apis/CampaignListAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AddBookmarkAPI, DeleteBookmarkAPI } from '../../../apis/BookmarkAPI';

function CampaignSidebar({ campaignInfo }) {
    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    // 북마크 정보
    // const result = useSelector(state => state.bookmarkReducer)
    // console.log(result,);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [like, setLike] = useState(false)
    const campaignCode = campaignInfo.campaignCode;

    // 기부 현황
    const currentBudget = campaignInfo.currentBudget;
    const goalBudget = campaignInfo.goalBudget;
    const percentage = Math.ceil((currentBudget / goalBudget) * 100).toFixed(0)
    // 날짜 
    const startDate = moment(campaignInfo.startDate).subtract(1, 'months').format('YYYY-MM-DD');
    const endDate = moment(campaignInfo.endDate).subtract(1, 'months').format('YYYY-MM-DD');

    // 삭제 
    const deleteCampaignHandler = () => {
        if (window.confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.\n(기부내역이 있으면 삭제 불가능 합니다.)"))
            dispatch(DeleteCampaignAPI(campaignCode))
    }

    // 수정    
    const modifyCampaignHandler = () => {
        if (window.confirm("수정 하시겠습니까?"))
            if (campaignInfo.currentBudget > 0) {
                alert('기부금 있어서 안됨')
                return;
            }
        navigate(`/modify/${campaignCode}`)

        //dispatch(ModifyCampaignAPI(campaignCode))
    }

    const header = {
        headers: {
            "Content-type": "multipart/form-data charset=utf-8",
            Accept: "*/*",
            Authorization: localStorage.getItem('token')
        },
    }

    // 후원하기 버튼
    const goToDonation = () => {
        decodedToken && decodedToken.memberCode != undefined  ?
        navigate(`/campaign/${campaignInfo.campaignCode}/donations`) :
        navigate('/login') 



    }


    // 북마크 추가 
    const addBookmark = (memberCode, campaignCode) => {
        dispatch(AddBookmarkAPI({memberCode, campaignCode}))
    };

    // 북마크 삭제
    const deleteBookmark = (memberCode, campaignCode) => {
        dispatch(DeleteBookmarkAPI(memberCode, campaignCode))
      };

    return (
        campaignInfo && (
            <div className="container-sidebar">
                <div className="toggle">

                    <img
                        className=""
                        style={{ width: 50 }}
                        alt="#"
                        src={
                            like
                                ? "/campaigns/default/checked.png"
                                : "/campaigns/default/unChecked.png"
                        }
                        onClick={() => {
                            if (like === true) {
                                setLike(!like);
                                deleteBookmark(decodedToken.memberCode,campaignCode);
                            }

                            if (like === false) {
                                setLike(!like);
                                addBookmark(decodedToken.memberCode, campaignCode);
                            }
                        }}
                    />

                    {/*bookMarkIcon === true ? (
                        <button onClick={() => setbookMarkIcon(!bookMarkIcon)} >  북마크체크표시 </button>
                    ) :
                        <button onClick={() => setbookMarkIcon(!bookMarkIcon)}>  북마크체크미표시 </button>
                    */}

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
                        <button className="button button-primary-outline">공유하기</button>
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

// <Link to={`/campaign/${campaignInfo.campaignCode}/donations`}></Link>