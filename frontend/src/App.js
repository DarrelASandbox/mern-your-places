import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import AuthContext from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth();

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
            <Suspense
              fallback={
                <div className='center'>
                  <LoadingSpinner />
                </div>
              }>
              <Routes>{routes}</Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
