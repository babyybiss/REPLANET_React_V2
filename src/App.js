
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout';
import Main from './pages/Main';
import CampaignDetail from './pages/campaigns/CampaignDetails';
import Draft from './Draft';

function App() {
  return (
    <>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/" element={<Main />}>
            <Route path="campaign">
              <Route index element={<CampaignDetail />} />
              <Route path=":campaignCode" element={<CampaignDetail />} />
            </Route>
          </Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
