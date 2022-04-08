import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  loginHandler: () => {},
});

export default AuthContext;
