import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// 예제: localStorage에서 토큰 가져오기
const token = localStorage.getItem('token');

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const decodedToken = token ? jwtDecode(token) : null;

console.log('Decoded Token:', decodedToken);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);