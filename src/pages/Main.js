import '../assets/css/reset.css'
import '../assets/css/pagination.css';
import '../assets/css/tabs.css';
import '../assets/css/campaign.css';
import '../assets/css/forms.css';
import '../assets/css/common.css';

import Campaign from './campaigns/Campaign'
import CountBox from '../component/campaigns/items/CountBox';
import Tab from '../component/campaigns/items/Tab';

function Main() {
  
  return (
    <div className="container-first">
      <Tab/>
      <CountBox/>
      <Campaign/>
    </div>

  )
}
export default Main;