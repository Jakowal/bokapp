import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {AccountInfo, InteractionRequiredAuthError, PublicClientApplication} from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./AuthConfig";
import AuthContext, {User} from './AuthContext';

const msalInstance = new PublicClientApplication(msalConfig);
const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const saveUserInfo = (token: string, account: AccountInfo) => {
    setUser({
      username: account.username,
      email: account.username,
      accessToken: token,
    });
  }

  useEffect(() => {
    const handleLogin = () => {
      msalInstance.loginPopup(loginRequest)
        .finally(() => {
          const account = msalInstance.getAllAccounts()[0];

          const tokenRequest = {
            scopes: ["user.read"],
            account,
          }

          msalInstance.acquireTokenSilent(tokenRequest)
            .then(tokenResponse => {
              saveUserInfo(tokenResponse.accessToken, account);
            })
            .catch(error => {
              if (error instanceof InteractionRequiredAuthError) {
                msalInstance
                  .acquireTokenPopup(tokenRequest)
                  .then(function (tokenResponse) {
                    saveUserInfo(tokenResponse.accessToken, account);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            })
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
