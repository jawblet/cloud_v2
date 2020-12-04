import { useState, useEffect } from 'react'; 
import './App.css'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Confirm from './pages/Confirm';
import Landing from './pages/Landing'; 
import Home from './pages/Home';
import Room from './pages/Room';
import User from './pages/User';
import Add from './pages/Add';
import Tags from './pages/Tags';
import Library from './pages/Library';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';
import Test from './pages/Test';

function App() {

  const rooms = [{label: 'kitchen', id: 'kitchen'}, 
                {label: 'living room', id: 'living_room'}, 
                {label: 'bedroom', id: 'bedroom'}, 
                {label: 'basement', id:'basement'}];

  const [user, setUser] = useState(null);
  const [globalTags, setGlobalTags] = useState(null);
  const { userStatus, houseTags, isLoading } = useFindUser();
 
  useEffect(() => {
    if(houseTags) {
      console.log('call main useEffect');
      setUser(userStatus);
      setGlobalTags(houseTags);
    }
  }, [userStatus, houseTags]);

  //console.log(user);
   
  return (
   <Router>
       <UserContext.Provider value={{ user, setUser, globalTags, rooms, isLoading}}>
       <Switch>
          <Route exact path="/" component={Landing}/>  
          <Route exact path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/confirm" component={Confirm}/>
          <Route path="/test" component={Test}/>
          <PrivateRoute exact path="/home" component={Home}/>
          <PrivateRoute path='/home/:room/:postId?' component={Room}/>
          <PrivateRoute path='/library' component={Library}/>
          <PrivateRoute path="/user" component={User}/>
          <PrivateRoute path="/add" component={Add}/>
          <PrivateRoute path="/tags" component={Tags}/>
          <Route component={NotFound}/>
        </Switch>
      </UserContext.Provider>
   </Router>
  );
}

export default App;
