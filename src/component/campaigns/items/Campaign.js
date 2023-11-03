function Campaign( {campaign} ) {
  return (
    <div className="item">
      <a className="item-thumb rounded-3 mb-1" href="campaign-detail.html">
        <img src="img/campaign/1.jpg" />
      </a>
      <h4> {campaign.id}2,760명의 아동에게 영양 가득한 식사를 선물했습니다</h4>
      <h6>{campaign.name}</h6>
      <progress className="progress" value="50" max="100"></progress>
      <div className="campaign-progress-info">
        <span className="amount">342,5000원</span>
        <span className="percent float-right">50%</span>
      </div>
    </div>
  );
}

export default Campaign;