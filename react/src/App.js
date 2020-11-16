import { useState, useEffect } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';

function App() {
  const [user, setUser] = useState(null);
  const { userStatus, isLoading } = useFindUser();

  useEffect(() => {
    if(userStatus) {
      console.log('The App useEffect ran');
      setUser(userStatus.username);
    }
  }, [userStatus]);
  
  return (
   <Router>
       <UserContext.Provider value={{ user, setUser, isLoading }}>
       <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Landing}/>
          <PrivateRoute path="/home" component={Home}/>
          <Route component={NotFound}/>
        </Switch>
      </UserContext.Provider>
   </Router>
  );
}

export default App;
