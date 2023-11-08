
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import AuthContext from "./component/auth/AuthContext";
import React, { useContext } from "react";

function App() {

  const authCtx = useContext(AuthContext);

  return (
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login/*" 
          element={authCtx.isLoggedIn ? <Navigate to='/' /> : <Login />}/>
              <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <Signup />} />
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
  );
}

export default App;
