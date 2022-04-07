import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  loginHandler: () => {},
});

export default AuthContext;
