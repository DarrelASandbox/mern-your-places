import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NewPlace, UpdatePlace, UserPlaces } from './places/pages';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AuthContext from './shared/context/auth-context';
import { Auth, Users } from './user/pages/';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem('userData', JSON.stringify({ uid, token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) login(storedData.uid, storedData.token);
  }, [login]);

  // It's better to use <Navigate to="/" replace />,
  // otherwise a new entry is added to the history and
  // if you try to navigate back you're redirected again, so you're stuck.
  let routes;
  if (token) {
    routes = (
      <>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/places/new' element={<NewPlace />} />
        <Route path='/places/:placeId' element={<UpdatePlace />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Navigate to='/auth' replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      <div>
        <BrowserRouter>
          <main>
            <MainNavigation />
            <Routes>{routes}</Routes>
          </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
