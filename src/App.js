
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
import { ReviewModify } from "./pages/reviews/ReviewModify";
import CampaignRegist from "./pages/campaigns/CampaignRegist";
import ExchangePoint from "./pages/points/ExchangePoint";
import Pay from './pages/pays/Pay';
import Success from './pages/pays/Success';
import Cancel from './pages/pays/Cancel';
import Fail from './pages/pays/Fail';
import AuthContext from "./component/auth/AuthContext";
import TextMessage from "./pages/auth/TextMessage";
import Find from "./pages/auth/Find";
import React, { useContext } from "react";
import ExchangeDetail from "./pages/points/ExchangeDetail";
import MyPage from "./pages/users/MyPage";
import AllExchanges from "./pages/points/AllExchanges";
import BookmarkList from "./component/mypage/lists/BookmarkList";
import DonationList from "./component/mypage/lists/DonationList";
import MyExchanges from "./pages/points/MyExchanges";
import CampaignModify from "./pages/campaigns/CampaignModify";
import MyPoints from "./pages/points/MyPoints";
import Calculator from "./component/mypage/Calculator";


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
              <Route path="/find/" element={<Find/>}></Route>
              
              <Route path="/myPage" element={<MyPage/>} children={[
                <Route key="history" index element={<Navigate to="history" />} />,
                <Route key="historyPage" path="history" element={<DonationList />} />,
                <Route key="bookmark" path="bookmark" element={<BookmarkList />} />,

                <Route key="pointService" path="pointService" element={<MyPoints />} />,
                <Route key="exchange" path="exchange" element={<ExchangePoint />} />,
                <Route key="myExchangeList" path="myExchangeList" element={<MyExchanges />} />
                <Route key="calculator" path="calculator" element={<Calculator />} />,

              ]}/>


            <Route path="/">
              <Route index element={<Main />} />
              <Route path="regist" element={<CampaignRegist />} />
              <Route path="campaign/:campaignCode" element={<CampaignDetail />} />
              <Route path="modify/:campaignCode"element={<CampaignModify />} />
            </Route>
            <Route path="reviews">
              <Route index element={<Reviews />} />
              <Route path=":campaignCode" element={<ReviewDetails />} />
              <Route path="reviewRegist">
                <Route path=":campaignCode" element={<ReviewRegist />} />
              </Route>
              <Route path="reviewUpdate">
                <Route path=":campaignCode" element={<ReviewModify />} />
              </Route>
              
              <Route path="regist" element={<CampaignRegist/>}/>
              <Route path="charts" element={<Charts />} />
              {/* <Route path="textmessage" element={<TextMessage />}/> */}
            </Route>

            <Route path="/campaign/:campaignCode/donations">
              <Route index element={<Pay />} />
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
              <Route path="fail" element={<Fail />} />
            </Route>

            
            <Route path="exchangeList" element={<AllExchanges />} />
            <Route path="exchangeDetail/:exchangeCode" element={<ExchangeDetail />} />
            

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
