import './App.css'; 
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Confirm from './pages/Confirm';
import Landing from './pages/Landing'; 
import Home from './pages/Home';
import Layer from './pages/Layer';
import Edit from './sections/Edit';
import User from './pages/User';
import Add from './pages/Add';
import Tags from './pages/Tags';
import Library from './pages/Library';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/user/useFindUser';
import Test from './pages/Test';

function App() {

  const { user,
    rooms,
    globalTags,
    setUser,
    setRooms,
    setGlobalTags,
    isLoading } = useFindUser();
 
  return (
   <Router>
       <UserContext.Provider value={{   user,
                                        rooms,
                                        globalTags,
                                        setUser,
                                        setRooms,
                                        setGlobalTags,
                                        isLoading }} >
       <Switch>
          <Route exact path="/">
              {(!isLoading && !user) ? <Landing/> : <PrivateRoute component={Home}/>}
          </Route>
          <Route exact path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/confirm" component={Confirm}/>
          <Route path="/test" component={Test}/>
          <PrivateRoute path='/house' component={Library}/>
          <PrivateRoute path="/user" component={User}/>
          <PrivateRoute path="/add" component={Add}/>
          <PrivateRoute path="/paths" component={Tags}/>
          <PrivateRoute path='/:room/' component={Layer}/>
          <Route component={NotFound}/>
          </Switch>
            <PrivateRoute path='/home/:room/:postId' component={Edit}/>
      </UserContext.Provider>
   </Router>
  );
}

export default App;

/*
<PrivateRoute exact path="/home" component={Home}/>
<PrivateRoute path='/home/:room/' component={Layer}/>

*/
