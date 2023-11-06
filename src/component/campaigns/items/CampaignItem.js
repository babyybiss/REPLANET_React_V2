import { NavLink } from "react-router-dom";
function CampaignItem( {campaign} ) {
  return (
    <div className="item">
      <NavLink className="item-thumb rounded-3 mb-1" to={`/campaign/${campaign.id}`}>
        <img src="img/campaign/1.jpg" />
      </NavLink>
      <h4> {campaign.id}</h4>
      <h6>{campaign.name}</h6>
      <progress className="progress" value="50" max="100"></progress>
      <div className="campaign-progress-info">
        <span className="amount">342,5000원</span>
        <span className="percent float-right">50%</span>
      </div>
    </div>
  );
}

export default CampaignItem;