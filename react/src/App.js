import { useState, useEffect } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Home from './pages/Home';
import User from './pages/User';
import Add from './pages/Add';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';
import Test from './pages/Test';
import Room from './pages/Room';

function App() {
  const rooms = ['kitchen', 'living_room', 'bedroom', 'basement'];
  const [user, setUser] = useState(null);
  const { userStatus, isLoading } = useFindUser();
 
  useEffect(() => {
    if(userStatus) {
      setUser(userStatus);
    }
  }, [userStatus]);
   
  return (
   <Router>
       <UserContext.Provider value={{ user, setUser, rooms, isLoading }}>
       <Switch>
          <Route exact path="/" component={Landing}/>  
          <Route exact path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/test" component={Test}/>
          <PrivateRoute exact path="/home" component={Home}/>
          <PrivateRoute path='/home/:room' component={Room}/>
          <PrivateRoute path="/user" component={User}/>
          <PrivateRoute path="/add" component={Add}/>
          <Route component={NotFound}/>
        </Switch>
      </UserContext.Provider>
   </Router>
  );
}

export default App;
