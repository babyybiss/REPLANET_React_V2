import 'moment/locale/ko';
function CampaignPlan({ campaign }) {
    //날짜 
    const date = new Date(campaign.endDate[0], campaign.endDate[1] - 1, campaign.endDate[2]);
    const endDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    return (
        campaign && (
            <div>
                <h2 className="mb-1">기부금 사용 계획</h2>
                <div className="item">
                    {campaign.campaignCategory}
                </div>

                <div className="items-container ic1">
                    <div className="item">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">총 목표 금액</h3>
                                <h6>{campaign.goalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h6>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">캠페인 마감일</h3>
                                <h6>{endDate}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">단체명</h3>
                                <h6>{campaign.organization? campaign.organization.member.memberName : "익명의 기부자"}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">단체 연락처</h3>
                                <h6>{campaign.organization? campaign.organization.member.phone : "익명의 기부자"}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default CampaignPlan;