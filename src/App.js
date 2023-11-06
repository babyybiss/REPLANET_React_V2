
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout';
import Main from './pages/Main';
import CampaignDetail from './pages/campaigns/CampaignDetails';
import Draft from './Draft';
import Charts from './pages/charts/Charts';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/" element={<Main />}>
              <Route path="/campaign/:campaignCode" element={<CampaignDetail />}>
              </Route>
            </Route>
            <Route path="charts" element={<Charts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;