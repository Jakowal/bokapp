import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {AccountInfo, AuthenticationResult, InteractionRequiredAuthError} from "@azure/msal-browser";
import msalInstance, {loginRequest, tokenRequest} from "./AuthConfig";
import AuthContext, { User } from './AuthContext';

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
    const aquireToken = (account: AccountInfo) => {
      msalInstance.acquireTokenSilent(tokenRequest(account))
        .then((tokenResponse: AuthenticationResult) => {
          saveUserInfo(tokenResponse.idToken, account);
        })
        .catch((error: any) => {
          if (error instanceof InteractionRequiredAuthError) {
            msalInstance.acquireTokenPopup(loginRequest)
              .then((tokenResponse: AuthenticationResult) => {
                saveUserInfo(tokenResponse.idToken, account);
              })
              .catch((error: any) => {
                console.log(error);
              });
          }
          else {
            console.log(error);
          }
        })
    }
    const handleLogin = async () => {
      const accountId = localStorage.getItem('userHomeAccountId');
      if (accountId) {
        const account = msalInstance.getAccountByHomeId(accountId)
        if (account) {
          aquireToken(account);
        }
      }
      else {
        msalInstance.loginPopup(loginRequest)
          .finally(() => {
            const account = msalInstance.getAllAccounts()[0];
            aquireToken(account);
            localStorage.setItem('userHomeAccountId', account.homeAccountId)
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
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
