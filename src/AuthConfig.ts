import { Configuration } from '@azure/msal-browser';
import { PublicClientApplication } from "@azure/msal-browser";


export const msalConfig: Configuration = {
  auth: {
    clientId: '04269264-5775-4c4b-845a-004c6afab43b',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};


const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ['User.Read']
};

export default msalInstance;