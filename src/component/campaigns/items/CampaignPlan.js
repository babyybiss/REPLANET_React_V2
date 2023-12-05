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
                <div className="items-container ic2">
                    <h2 className="">기부금 사용 계획</h2>
                    <div className="text-right">                <button className="button button-primary" style={{ width: "100px" }}>
                        {campaign.campaignCategory}
                    </button></div>

                </div>

                <div className="">
                    <div className="w-100 mb-1">
                        <div className="card" >
                            <div className="card-body" style={{ justifyContent: "spaceetween" }}>
                                <h3 className="text-primary" >총 목표 금액<br/></h3>
                                <h5>{campaign.goalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h5>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 mb-1">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">캠페인 마감일</h3>
                                <h5>{endDate}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 mb-1">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">단체명</h3>
                                <h5>{campaign.organization ? campaign.organization.member.memberName : "익명의 기부자"}</h5>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-100">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">단체 연락처</h3>
                                <h5>{campaign.organization ? campaign.organization.member.phone : "익명의 기부자"}</h5>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    );
}

export default CampaignPlan;