import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
// import Web3 from "web3"

function getLibrary(provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(provider);
}

// export const getLibrary = (provider: Web3): Web3 => {
//   return provider
// }

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
