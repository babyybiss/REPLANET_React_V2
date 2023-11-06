function CampaignSidebar() {



    return (
        <div className="container-sidebar">
            <div className="toggle">
                <button  onclick="">
                    북마크 자리
                </button>
            </div>
            <h2> 현재 모금액 자리 </h2>
            <h6> 목표 모금액 자리 </h6>
            <progress className="progress mt-1" value="81" max="100"></progress>
            <div className="campaign-progress-info mt-1 pt-1">
                <span className="amount">2023. 10. 02</span>
                <span className="percent float-right">81%</span>
            </div>
            <div className="items-container ic2 mt-1 pt-1">
                <button className="button button-primary" onclick="location.href='/campaignRegist.html'">후원하기</button>
                <button className="button button-primary-outline">공유하기</button>
            </div>
            <div className="items-container ic1">
                <div className="item p-2 border">
                    <p>
                        현재 모금 현황 자리
                    </p>
                </div>
                <div className="item p-2 border">
                    <p>
                        단체 간단 소개 자리
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CampaignSidebar;