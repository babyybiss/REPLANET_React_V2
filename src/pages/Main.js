import '../assets/css/reset.css'
import '../assets/css/pagination.css';
import '../assets/css/tabs.css';
import '../assets/css/campaign.css';
import '../assets/css/forms.css';
import '../assets/css/common.css';

import Loader from '../component/common/Loader';
// import Tab from '../component/campaigns/items/Tab';
// import CampaignList from '../component/campaigns/lists/CampaignList';

import React, { Suspense, useState } from 'react';
const CountBox = React.lazy(() => import('../component/campaigns/items/CountBox'));
const Tab = React.lazy(() => import('../component/campaigns/items/Tab'));
const CampaignList = React.lazy(() => import('../component/campaigns/lists/CampaignList'));
function Main() {

  return (
    <>
    <Suspense fallback={<Loader/>}>
        <div className="container-first">
          <style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
          </style>
          <Tab />
          <CountBox />
          <CampaignList />
        </div>
        </Suspense>
    </>
  )
}
export default Main;