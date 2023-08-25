import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {

  const authContext = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authContext.token && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {authContext.token && (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/auth' onClick={authContext.logout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
        
  );
};

export default MainNavigation;
