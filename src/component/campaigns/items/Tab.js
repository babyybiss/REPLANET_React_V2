import { useDispatch, useSelector } from 'react-redux';
import { CampaignAPI } from '../../../apis/CampaignAPI';
import Campaign from "../items/Campaign";


function Tab() {
    const dispatch = useDispatch();

    
    return (
        <div>
            <input id="tab1" name="tab_item" onClick={() => dispatch(CampaignAPI)} />
            <label className="tab_item ti2" htmlFor="tab1">진행중인 캠페인</label>
            <input id="tab2" name="tab_item" onClick={() => dispatch(CampaignAPI)} />
            <label className="tab_item ti2" htmlFor="tab2">완료된 캠페인</label>
        </div>
    );
}
export default Tab;