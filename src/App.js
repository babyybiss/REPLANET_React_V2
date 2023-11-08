
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout';
import Main from './pages/Main';
import CampaignDetail from './pages/campaigns/CampaignDetails';
import Draft from './Draft';
import Charts from './pages/charts/Charts';
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { AuthContextProvider } from './component/auth/AuthContext';
import { Reviews } from "./pages/reviews/Reviews";
import { ReviewDetails } from "./pages/reviews/ReviewDetails";
import { ReviewRegist } from "./pages/reviews/ReviewRegist";
import CampaignRegist from "./pages/campaigns/CampaignRegist";
import ExchangePoint from "./pages/points/ExchangePoint";
import Pay from './pages/pays/Pay';
import Success from './pages/pays/Success';
import Cancel from './pages/pays/Cancel';
import Fail from './pages/pays/Fail';

function App() {
  return (
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login/" element={<Login />}/>
              <Route path="/signup/" element={<Signup />}/>
              <Route index element={<Main />} />
             
              <Route path="reviews">
                <Route index element={<Reviews />} />
                <Route path=":campaignRevCode" element={<ReviewDetails />}/>
                  <Route path="reviewRegist">
                    <Route path=":campaignRevCode" element={<ReviewRegist/> }/>
                  </Route>
              </Route>
  
              <Route path="/campaign/:campaignCode" element={<CampaignDetail />}/>
              <Route path="regist" element={<CampaignRegist/>}/>
              <Route path="charts" element={<Charts />} />
              <Route path="exchange" element={<ExchangePoint />} />
              <Route path="donations">
                <Route index element={<Pay />}/>
                <Route path="success" element={<Success />}/>
                <Route path="cancel" element={<Cancel />}/>
                <Route path="fail" element={<Fail />}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
  );
}

export default App;
