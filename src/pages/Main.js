import '../assets/styles/Pagination.css';
import '../assets/styles/Tabs.css';
import '../assets/styles/Campaign.css';
import '../assets/styles/Forms.css';
import CampaignContinue from './campaigns/CampaignContinue';
import Tab from '../component/campaigns/items/Tab';
import CountBox from '../component/campaigns/items/CountBox';

function Main() {
  
  return (
    <div className="container-first">
      <Tab />
      <CountBox/>
      <CampaignContinue/>
    </div>

  )
}
export default Main;