import { useDispatch } from "react-redux";
import Loader from "../../common/Loader";
import OrgCamItem from "../items/OrgCamItem";
import { useEffect, useState } from "react";

function OrgCamList() {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            console.log('OrgCamList() useEffect 실행');
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
                    <OrgCamItem/>
                </div>
            )
            }
        </>
    );
}

export default OrgCamList;