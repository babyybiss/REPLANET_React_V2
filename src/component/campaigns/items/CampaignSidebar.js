function CampaignSidebar({ campaignInfo }) {

    const currentBudget = campaignInfo.currentBudget;
    const goalBudget = campaignInfo.goalBudget;
  
    const percentage = (currentBudget / goalBudget) * 100;
    

    return (
        campaignInfo && (
            <div className="container-sidebar">
                <div className="toggle">
                    <button onclick="">
                        북마크 자리
                    </button>
                </div>
                <h2> {campaignInfo.currentBudget} </h2>
                <h6> {campaignInfo.goalBudget} </h6>
                <progress className="progress mt-1" value={percentage} max="100"></progress>
                <div className="campaign-progress-info mt-1 pt-1">
                    <span className="amount">{campaignInfo.endDate}</span>
                    <span className="percent float-right">{percentage}%</span>
                </div>
                <div className="items-container ic2 mt-1 pt-1">
                    <button className="button button-primary" onclick="location.href='/campaignRegist.html'">후원하기</button>
                    <button className="button button-primary-outline">공유하기</button>
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