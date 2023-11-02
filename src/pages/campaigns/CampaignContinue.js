import { NavLink } from "react-router-dom";

function CampaignContinue(){
    return(
        <div className="items-container ic3 g-gap3 campaign-list-container">
            <div className="item">
                <NavLink className="itemThumb rounded 3 mb1" to='/campaignDetail'>
                    <img src='./1.jpg' />
                </NavLink>
            <h4>2,760명의 아동에게 영양 가득한 식사를 선물했습니다</h4>
            <h6>사단법인 굿월드 자선은행</h6>
            <progress className="progress" value="95" max="100"></progress>
            <div className="campaign-progress-info">
              <span className="amount">342,5000원</span>
              <span className="percent float-right">95%</span>
            </div>
          </div>
          <div class="item">
            <div class="item-thumb rounded-3 mb-1">
              <img src="img/campaign/2.jpg" />
            </div>
            <h4>이스라엘 가자 전쟁 피해 아동의 손을 잡아드렸습니다</h4>
            <h6>사단법인 굿월드 자선은행</h6>
            <progress class="progress" value="50" max="100"></progress>
            <div class="campaign-progress-info">
              <span class="amount">342,5000원</span>
              <span class="percent float-right">50%</span>
            </div>
          </div>
          <div class="item">
            <div class="item-thumb rounded-3 mb-1">
              <img src="img/campaign/3.jpg" />
            </div>
            <h4>하이미디어 초등학교<br/>교육 시스템 향상</h4>
            <h6>사단법인 굿월드 자선은행</h6>
            <progress class="progress" value="50" max="100"></progress>
            <div class="campaign-progress-info">
              <span class="amount">342,5000원</span>
              <span class="percent float-right">50%</span>
            </div>
          </div>
        </div>
    );
}
export default CampaignContinue;