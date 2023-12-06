import { useDispatch } from "react-redux";
import Loader from "../../common/Loader";
import { useEffect, useState } from "react";
import CampaignList from "../../campaigns/lists/CampaignList";
import { GetCampaignByOrgAPI } from "../../../apis/CampaignListAPI";
import { jwtDecode } from 'jwt-decode';

function OrgCamList() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    let orgCode = decodedToken && decodedToken.memberRole === "ROLE_ORG" ? decodedToken.memberCode : "";

    let ing = 'ing';
    let done = 'done';

    useEffect(() => {
        const fetchData = async () => {
            // 해당 기부처의 등록한 캠페인 목록 들고오는 dispatch 만들어야함
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    return (
        <>
            {loading ? (<div><Loader /></div>) : (
                <div className="admin-main">
                    <div className="admin-title">
                        <h1 class="text-primary">캠페인 목록</h1>

                        <div className='tabs'>
                            <input id="tab1" type="radio" name="tab_item" value={ing} defaultChecked onClick={(e) => { dispatch(GetCampaignByOrgAPI({ orgCode }, e.target.value)) }} />
                            <label className="tab_item ti2" htmlFor="tab1">진행중인 캠페인</label>
                            <input id="tab2" type="radio" name="tab_item" value={done} onClick={(e) => { dispatch(GetCampaignByOrgAPI({ orgCode }, e.target.value)) }} />
                            <label className="tab_item ti2" htmlFor="tab2">완료된 캠페인</label>
                        </div>
                    </div>
                    <CampaignList />
                </div>
            )
            }
        </>
    );
}

export default OrgCamList;