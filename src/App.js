import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from './layouts/Layout';
import Main from './pages/Main';
import CampaignDetail from './pages/campaigns/CampaignDetails';
import Charts from './pages/charts/Charts';
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
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
import React, { useContext } from "react";
import ExchangeDetail from "./pages/points/ExchangeDetail";
import MyPage from "./pages/users/MyPage";
import AllExchanges from "./pages/points/AllExchanges";
import BookmarkList from "./pages/users/BookmarkList";
import DonationList from "./component/mypage/lists/DonationList";
import MyExchanges from "./pages/points/MyExchanges";
import CampaignModify from "./pages/campaigns/CampaignModify";
import MyPoints from "./pages/points/MyPoints";
import Calculator from "./component/mypage/Calculator";
import DonationReceipt from "./pages/users/Receipt";
import { jwtDecode } from 'jwt-decode';
import OrgManagement from "./pages/org/OrgManagement";
import OrgList from "./component/org/lists/OrgList";
import OrgRegist from "./pages/org/OrgRegist";
import MyPageOrg from "./pages/org/MyPageOrg";
import OrgCamList from "./component/org/lists/OrgCamList";
import OrgEdit from "./pages/org/OrgEdit";
import OrgWithdraw from "./pages/org/OrgWithdraw";
import PwdConfirm from "./pages/org/EditPwdConfirm";
import { ChangePassword } from "./component/auth/ChangePassword";
import SendEmail from "./pages/auth/SendEmail";
import OauthKakao from "./pages/auth/OauthKakao";
import ModifyUser from "./pages/users/ModifyUser";
import Withdrawal from "./pages/users/Withdrawal";
import VerifyUser from "./pages/users/VerifyUser";
import FindId from "./pages/auth/FindId";
import FindPw from "./pages/auth/FindPw";
import SocialSignup from "./pages/auth/SocialSignup";

function App() {

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const decodedToken = token ? jwtDecode(token) : null;
  console.log('Decoded Token:', decodedToken);

  return (

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login/*" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <Login />}/>
              <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <Signup />} />
              <Route path="/socialsignup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <SocialSignup />} />
              <Route path="/findid/" element={<FindId/>}></Route>
              <Route path="/findpw/" element={<FindPw/>}></Route>
              {/* <Route path="/password/" element={<ChangePassword/>}></Route> */}

              <Route path="/myPage" element={authCtx.isLoggedIn ? <MyPage /> : <Navigate to='/' />} children={[
                <Route key="history" index element={<Navigate to="history" />} />,
                <Route key="historyPage" path="history" element={<DonationList />} />,
                <Route key="bookmark" path="bookmark" element={<BookmarkList />} />,
                <Route key="receipt" path="receipt" element={<DonationReceipt />} />,
                <Route key="pointService" path="pointService" element={<MyPoints />} />,
                <Route key="exchange" path="exchange" element={<ExchangePoint />} />,
                <Route key="myExchangeList" path="myExchangeList" element={<MyExchanges />} />,
                <Route key="calculator" path="calculator" element={<Calculator />} />,
                <Route key="verifying" path="verifying" element={<VerifyUser />} />,
                <Route key="modify" path="modify" element={<ModifyUser />} />,
                <Route key="withdraw" path="withdraw" element={<Withdrawal />} />
              ]}/>
              {/* <Route path="/sendemail" element={<SendEmail/>}></Route> */}

            <Route path="/">
              <Route index element={<Main />} />
              <Route path="regist" element={<CampaignRegist />} />
              <Route path="campaign/:campaignCode" element={<CampaignDetail />} />
              <Route path="modify/:campaignCode"element={<CampaignModify />} />
            </Route>
            <Route path="charts" element={decodedToken?.memberRole === "ROLE_ADMIN" ? <Charts /> : <Navigate to='/' />} />
            <Route path="reviews">
              <Route index element={<Reviews />} />
              <Route path=":reviewCode" element={<ReviewDetails />} />
              <Route path="reviewRegist">
                <Route path=":campaignCode" element={decodedToken?.memberRole === "ROLE_ORG" ? <ReviewRegist /> : <Navigate to='/' />} />
              </Route>
              <Route path="reviewUpdate">
                <Route path=":reviewCode" element={decodedToken?.memberRole === "ROLE_ORG" ? <ReviewModify /> : <Navigate to='/' />} />
              </Route>
              {/* <Route path="textmessage" element={<TextMessage />}/> */}
            </Route>

            <Route path="/campaign/:campaignCode/donations">
              <Route index element={authCtx.isLoggedIn ? <Pay /> : <Navigate to='/' />} />
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
              <Route path="fail" element={<Fail />} />
            </Route>

            {/* ADMIN 포인트 신청 조회 */}
            <Route path="exchangeList" element={authCtx.isLoggedIn ? <AllExchanges /> : <Navigate to='/' />} />
            <Route path="exchangeDetail/:exchangeCode" element={authCtx.isLoggedIn ? <ExchangeDetail /> : <Navigate to='/' />} />
            
            <Route path="org" element={decodedToken?.memberRole === "ROLE_ADMIN" ? <OrgManagement /> : <Navigate to='/' />} children={[
              // ROLE_ADMIN의 기부처 관리
              <Route key="list" index element={<Navigate to="list" />} />,
              <Route key="listPage" path="list" element={<OrgList />} />,
              <Route key="regist" path="regist" element={<OrgRegist />} />,
            ]}/>

            <Route path="/myPageOrg" element={decodedToken?.memberRole === "ROLE_ORG" ? <MyPageOrg /> : <Navigate to='/' />} children={[
              // ROLE_ORG의 마이페이지
              <Route key="list" index element={<Navigate to="list" />} />,
              <Route key="listPage" path="list" element={<OrgCamList />} />,
              <Route key="review" path="review" element={<Reviews />} />,
              
              <Route key="confirmPwd" path="confirmPwd" element={<PwdConfirm />} />,
              <Route key="modify" path="modify" element={<OrgEdit />} />,
              <Route key="withdraw" path="withdraw" element={<OrgWithdraw />} />,
            ]}/>

            <Route path="/oauth/kakao" element={<OauthKakao />}/>

          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
