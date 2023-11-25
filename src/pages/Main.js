import '../assets/css/reset.css'
import '../assets/css/pagination.css';
import '../assets/css/tabs.css';
import '../assets/css/campaign.css';
import '../assets/css/forms.css';
import '../assets/css/common.css';

import CountBox from '../component/campaigns/items/CountBox';
import Tab from '../component/campaigns/items/Tab';
import CampaignList from '../component/campaigns/lists/CampaignList';

function Main() {
  
  return (
    <div className="container-first">
      <style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </style>
      <Tab/>
      <CountBox/>
      <CampaignList/>
    </div>

  )
}
export default Main;