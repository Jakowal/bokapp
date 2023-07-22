import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from "./pages/MainPage";

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./AuthConfig";
import AuthContext, {User} from './AuthContext';

const msalInstance = new PublicClientApplication(msalConfig);
const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleLogin = () => {
      msalInstance.loginPopup(loginRequest)
        .then(_ => {
          const account = msalInstance.getAllAccounts()[0];

          setUser({
            username: account.username,
            email: account.username,
            tenantId: account.tenantId,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    handleLogin();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <MainPage/>
    </AuthContext.Provider>
  );
}

export default App;
