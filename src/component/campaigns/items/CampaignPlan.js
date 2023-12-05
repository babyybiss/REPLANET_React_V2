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
                <div className="d-flex flex-row j-1 mb-1">
                    <h2 className="">기부금 사용 계획</h2>
                    <button className="button button-primary">
                        카테고리 : {campaign.campaignCategory}
                    </button>
                </div>

                    <div className="items-container ic3 mb-2">
                        <div className="card">
                            <div className='card-header bg-primary'>총 목표 금액</div>
                            <div className="card-body">
                                <h5>{campaign.goalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h5>
                            </div>
                        </div>
                        <div className="card">
                        <div className='card-header bg-primary'>캠페인 마감일</div>
                            <div className="card-body">
                                <h5>{endDate}</h5>
                            </div>
                        </div>
                        <div className="card">
                        <div className='card-header bg-primary'>단체정보</div>
                            <div className="card-body d-flex flex-column">
                            <h5>{campaign.organization ? campaign.organization.member.memberName : "익명의 기부자"}</h5>
                                <h6>{campaign.organization ? campaign.organization.member.phone : "익명의 기부자"}</h6>
                                
                            </div>
                        </div>
                    </div>



            </div>
        )
    );
}

export default CampaignPlan;