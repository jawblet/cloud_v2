import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
  
/*
if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://arriveanywhere.xyz';
} 
*/

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);