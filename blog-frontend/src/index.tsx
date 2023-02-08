import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { Auth0Provider } from './contexts/auth0-context';
import { Auth0Provider } from "@auth0/auth0-react";
//import { BrowserRouter } from 'react-router-dom';

/* ReactDOM.render(
<Auth0Provider>
    <BrowserRouter>
    			<App />
   </BrowserRouter>,
   </Auth0Provider>,
	document.getElementById('root')
); */

ReactDOM.render(
  <Auth0Provider
    domain="dev-hzboy7borfa0bdz7.us.auth0.com"
    clientId="KAQOYwH7sSjKHegebhFOqskLjxSfOmQe"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);