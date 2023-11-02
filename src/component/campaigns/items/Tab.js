import { useState } from 'react';


function Tab() {
    const [currentTab, setCurrentTab] = useState('ongoing');
    
    return (
        <div>
            <input id="tab1" name="tab_item" onClick={() => setCurrentTab('completed')} />
            <label className="tab_item ti2" for="tab1">진행중인 캠페인</label>
            <input id="tab2" name="tab_item" onClick={() => setCurrentTab('completed')} />
            <label class="tab_item ti2" for="tab2">완료된 캠페인</label>
        </div>
    );
}
export default Tab;