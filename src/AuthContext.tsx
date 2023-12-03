import React from 'react';

export interface User {
  username: string;
  email: string;
  accessToken: string;
}

const AuthContext = React.createContext<User | null>(null);

export default AuthContext;
