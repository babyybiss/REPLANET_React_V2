import moment from 'moment';
import 'moment/locale/ko';
function CampaignPlan({ campaignInfo }) {

    const endDate = moment(campaignInfo.endDate).subtract(1, 'months').format('YYYY-MM-DD');
    return (
        campaignInfo && (
            <div>
                <h2 className="mb-1">기부금 사용 계획</h2>

                {/* <div className="item">
                    {campaignInfo.campaignCategory}
                </div> */}

                <div className="items-container ic1">
                    <div className="item">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">총 목표 금액</h3>
                                <h6>{campaignInfo.goalBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h6>
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
                                <h6>{campaignInfo.orgName}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-primary">단체 연락처</h3>
                                <h6>{campaignInfo.orgTel}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default CampaignPlan;