import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, loginHandler } = authContext;

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/'>ALL USERS</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to='/u1/places'>MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to='/places/new'>ADD PLACE</NavLink>
        </li>
      )}
      <li>
        <NavLink to='/auth'>AUTHENTICATE</NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <button onClick={loginHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
