import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
    {/* Allows to use Auth0 in our app */}
    {/* Gotten From Auth0 Documents  */}
    {/* https://auth0.com/docs/quickstart/spa/react */}
    {/* ####----------------------------------#### */}
    <Auth0Provider
      domain="dev-t7-jvcng.us.auth0.com"
      clientId="IYokfU2DU82CKpYnaX9018a9HQXwsnoI"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
    {/* ####----------------------------------#### */}
  </React.StrictMode>,
  document.getElementById('root')
);
