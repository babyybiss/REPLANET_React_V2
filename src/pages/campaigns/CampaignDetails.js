function CampaignDetail() {
    return (
        <div className="container-first">
            <div className="items-container ic3 g-gap2 campaign-list-container">
                <div className="item" style="	grid-column: 1 / 3;">
                    <h1>2,760명의 아동에게 영양 가득한 식사를 선물했습니다</h1>

                    <div className="item-thumb rounded-3 mb-1">
                        <img src="img/campaign/1.jpg" />
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.</p>
                </div>
                <div className="item" style="display: block">
                    <div className="text-right">
                        <div className="toggle">
                            <button id="btn" className="btn" onclick="">
                                하트
                            </button>
                        </div>
                        <h2> 443,223원</h2>
                        <h6>3,000,000,000원 목표</h6>
                    </div>

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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </p>
                        </div>
                        <div className="item p-2 border">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="items-container ic1">
                <h2>The standard Lorem Ipsum passage, used since the 1500s</h2>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                    qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                    consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
                    quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
                    nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
                    quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
            </div>

            <div className="items-container ic3">

                <div className="item">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-primary">목표 금액</h3>
                            <h6>3,000,000,000원</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-primary">마감일</h3>
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
            </div>


        </div>
    );
}

export default CampaignDetail;
