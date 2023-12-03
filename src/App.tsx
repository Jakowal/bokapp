import React, {useEffect, useState} from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import { AccountInfo, InteractionRequiredAuthError } from "@azure/msal-browser";
import msalInstance, { loginRequest } from "./AuthConfig";
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
    const handleLogin = async () => {
      const accountId = localStorage.getItem('userHomeAccountId');
      if(accountId) {
        const account = msalInstance.getAccountByHomeId(accountId)

        if (account) {
          console.log(account)
          msalInstance.acquireTokenSilent(loginRequest)
            .then(tokenResponse => {
              saveUserInfo(tokenResponse.idToken, account);
            })
            .catch(error => {
              if (error instanceof InteractionRequiredAuthError) {
                msalInstance
                  .acquireTokenPopup(loginRequest)
                  .then(function (tokenResponse) {
                    saveUserInfo(tokenResponse.idToken, account);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            })
        }
      }
      else {
        msalInstance.loginPopup(loginRequest)
          .finally(() => {
            const account = msalInstance.getAllAccounts()[0];
            localStorage.setItem('userHomeAccountId', account.homeAccountId)
          })
          .catch(err => {
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
