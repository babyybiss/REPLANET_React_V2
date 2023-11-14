import { NavLink } from "react-router-dom";
function CampaignItem( {campaign} ) {

  const currentBudget = campaign.currentBudget;
  const goalBudget = campaign.goalBudget;
  const percentage = Math.floor((currentBudget / goalBudget) * 100).toFixed(0);


  return (
    <div className="item">
      <NavLink className="item-thumb rounded-3 mb-1" to={`/campaign/${campaign.campaignCode}`}>
        <img src="img/campaign/1.jpg" />
      </NavLink>
      <h4> {campaign.campaignTitle}</h4>
      <h6>{campaign.orgName}</h6>
      <progress className="progress" value={percentage} max="100"></progress>
      <div className="campaign-progress-info">
        <span className="amount">{campaign.currentBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        <span className="percent float-right">{percentage > 100? '목표금액 초과!!(감사)': percentage+'%'}</span>
      </div>
    </div>
  );
}

export default CampaignItem;