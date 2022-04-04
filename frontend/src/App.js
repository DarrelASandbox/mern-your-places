import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => (
  <div>
    <BrowserRouter>
      <main>
        <MainNavigation />
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/places/new' element={<NewPlace />} />
        </Routes>
      </main>
    </BrowserRouter>
  </div>
);

export default App;
