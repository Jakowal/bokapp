import React from 'react';

export interface User {
  username: string;
  email: string;
  tenantId: string;
  // include other user properties that you need
}

const AuthContext = React.createContext<User | null>(null);

export default AuthContext;
