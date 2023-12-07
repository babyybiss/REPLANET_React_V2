import { NavLink } from "react-router-dom";
import HeartButton from "../../mypage/items/HeartButton";

function CampaignItem({ campaign, decodedToken }) {
  let currentBudget = campaign.currentBudget;
  let goalBudget = campaign.goalBudget;
  let percentage = Math.ceil((currentBudget / goalBudget) * 100).toFixed(0);
  let campaignCode = campaign.campaignCode;

  // 마감 날짜 
  let curEndDate = new Date(campaign.endDate[0], campaign.endDate[1] -1, campaign.endDate[2] +1);

  // 끝남 or 진행
  let today = new Date();
  let campaignStatus = ((curEndDate) - (today));

  // 파일 정보
  let fileSaveName = campaign.campaignDescFileList[0] ? campaign.campaignDescFileList[0] : null
  if (fileSaveName == null || undefined) {
    fileSaveName = false;
  } else {
    fileSaveName = true;
  }
  // 재단 코드  
  let orgCode = campaign && campaign.organization.orgCode;

  return (
    <div className="item">
      <div className="item-thumb rounded-3 mb-1" style={{width: 100 + "%", height: 200 + "px", overflow: "hidden" + "!important"}}>
      <NavLink className="" to={`/campaign/${campaign.campaignCode}?orgCode=${orgCode}`}>
        <img src={fileSaveName ? `/campaigns/${campaign.campaignDescFileList[0].fileSaveName}` : '/campaigns/default/noImage.png'} alt="캠페인 이미지" style={{ width: 100 + "%"}} className=" rounded-3"/>
      </NavLink>
      </div>

      <h5 style={{display:"flex", justifyContent:"space-between"}}> 
        {campaign.campaignTitle}
        {campaignStatus < 0 || decodedToken && decodedToken.memberRole === "ROLE_ORG" || decodedToken && decodedToken.memberRole === "ROLE_ADMIN" ?
          "" :
         <HeartButton campaignCode={campaignCode} />
        }
      </h5>
      <div>
        {campaign.organization ? campaign.organization.member ? campaign.organization.member.memberName : "무명의 기부자" : "무명의 기부자"}

      </div>
      <progress className="progress" value={percentage} max="100"></progress>
      <div className="campaign-progress-info">
        <span className="amount">{campaign.currentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        <span className="percent float-right">{percentage > 100 ? '목표금액 초과! 감사합니다' : percentage + '%'}</span>
      </div>
    </div>
  );
}

export default CampaignItem;
