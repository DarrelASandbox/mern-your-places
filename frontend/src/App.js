import { useCallback, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NewPlace, UpdatePlace, UserPlaces } from './places/pages';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AuthContext from './shared/context/auth-context';
import { Auth, Users } from './user/pages/';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = useCallback(
    () => setIsLoggedIn((prevState) => !prevState),
    []
  );

  // It's better to use <Navigate to="/" replace />,
  // otherwise a new entry is added to the history and
  // if you try to navigate back you're redirected again, so you're stuck.
  let routes;
  if (isLoggedIn) {
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
    <AuthContext.Provider value={{ isLoggedIn, loginHandler }}>
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
