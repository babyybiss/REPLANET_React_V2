function CampaignPlan({campaignInfo}) {
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>기부금 사용 계획</h2>


            <div >
                <div className="item">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-primary">name</h3>
                            <h6>3,000,000,000원</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-primary">캠페인 마감일</h3>
                            <h6>2020.01.01 ~ 2030.01.01</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-primary">단체명</h3>
                            <h6>사회복지법인 효원(경산양로원)</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-primary">단체 연락처</h3>
                            <h6>010-1234*5678</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignPlan;