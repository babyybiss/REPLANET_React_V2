import { useDispatch } from 'react-redux';
import { CampaignListAPI, CampaignListDoneAPI } from '../../../apis/CampaignListAPI';



function Tab() {
    const dispatch = useDispatch();
    let ing = 'ing';
    let done = 'done';
    return (
        <div className='tabs'>
            <input id="tab1" type="radio" name="tab_item" value={ing} defaultChecked onClick={(e) => dispatch(CampaignListAPI(e.target.value))}/>
            <label className="tab_item ti2" htmlFor="tab1">진행중인 캠페인</label>
            <input id="tab2" type="radio" name="tab_item" value={done} onClick={(e) => dispatch(CampaignListAPI(e.target.value))}/>
            <label className="tab_item ti2" htmlFor="tab2">완료된 캠페인</label>
        </div>
    );
}
export default Tab;