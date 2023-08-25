import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthProvider from './store/AuthProvider';


function App() {

 
  return (
    <AuthProvider>
    <Layout>
      <Switch>
      <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/auth'>
            <AuthPage />
          </Route>
          <Route path='/profile'>
             <ProfilePage/>
          </Route>
      </Switch>
    </Layout>
    </AuthProvider>
  );
}

export default App;
