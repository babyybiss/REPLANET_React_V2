import { useDispatch } from "react-redux";
import Loader from "../../common/Loader";
import { useEffect, useState } from "react";
import CampaignList from "../../campaigns/lists/CampaignList";

function OrgCamList() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    
    useEffect(() => {
        const fetchData = async () => {
            // 해당 기부처의 등록한 캠페인 목록 들고오는 dispatch 만들어야함
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);
    return(
        <>
            {loading ? (<div><Loader/></div>) : (
                <div className="admin-main">
                    <div className="admin-title">
                        <h1 class="text-primary">캠페인 목록</h1>
                    </div>
                    <CampaignList/>
                </div>
            )
            }
        </>
    );
}

export default OrgCamList;