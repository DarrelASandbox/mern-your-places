import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  loginHandler: () => {},
});

export default AuthContext;
