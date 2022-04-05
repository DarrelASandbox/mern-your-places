import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NewPlace, UpdatePlace, UserPlaces } from './places/pages';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './user/pages/Users';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <main>
          <MainNavigation />
          <Routes>
            <Route path='/' element={<Users />} />
            <Route path='/:userId/places' element={<UserPlaces />} />
            <Route path='/places/new' element={<NewPlace />} />
            <Route path='/places/:placeId' element={<UpdatePlace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
