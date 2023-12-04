import { GET, POST } from "../../apis/AuthAPI";
const createTokenHeader = (token) => {
  return {
      headers: {
          'Authorization': 'Bearer ' + token
      }
  };
};
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};
export const loginTokenHandler = (token, expirationTime) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', String(expirationTime));
  const remainingTime = calculateRemainingTime(expirationTime);
  return remainingTime;
};
export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime') || '0';
  const remaingTime = calculateRemainingTime(+storedExpirationDate);
  if (remaingTime <= 1000) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      return null;
  }
  return {
      token: storedToken,
      duration: remaingTime
  };
};
export const signupActionHandler = (email, password, memberName, phone, memberRole) => {
  const URL = '/auth/signup';
  const signupObject = { email, password, memberName, phone, memberRole };
  const response = POST(URL, signupObject, {});
  return response;
};
export const socialSignupActionHandler = (email, password, memberName, phone, kakaoTokenId) => {
  const URL = '/auth/socialSignup';
  const signupObject = { email, password, memberName, phone, kakaoTokenId };
  const response = POST(URL, signupObject, {});
  return response;
};
export const loginActionHandler = (email, password) => {
  const URL = '/auth/login';
  const loginObject = { email, password };
  const response = POST(URL, loginObject, {});
  return response;
};
export const socialLoginActionHandler = (email, providerId) => {
  const URL = '/auth/socialLogin';
  const loginObject = { email, providerId };
  const response = POST(URL, loginObject, {});
  return response;
};
export const logoutActionHandler = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('code');
};
export const getUserActionHandler = (token) => {
  const URL = '/';
  const response = GET(URL, createTokenHeader(token));
  return response;
};
export const changePasswordActionHandler = (exPassword, newPassword, token) => {
  const URL = '/auth/password';
  const changePasswordObj = { exPassword, newPassword };
  const response = POST(URL, changePasswordObj, createTokenHeader(token));
  return response;
};

export const successRegistOrgActionHandler = ( email, title, message ) => {
  const URL = '/sendEmailToOrg';
  const changePasswordObj = { email, title, message };
  const response = POST(URL, changePasswordObj, {});
  return response;
};
