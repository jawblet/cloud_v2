import { useState, useEffect } from 'react'; 
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
import House from './pages/House';
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
          <Route path="/home" component={Landing}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/confirm" component={Confirm}/>
          <Route path="/test" component={Test}/>
          <PrivateRoute exact path="/" component={Home}/>
          <PrivateRoute path='/house' component={House}/>
          <PrivateRoute path="/user" component={User}/>
          <PrivateRoute path="/add" component={Add}/>
          <PrivateRoute path="/paths" component={Tags}/>
          <PrivateRoute path='/:room/' component={Layer}/>
          <Route component={NotFound}/>
          </Switch>
            <PrivateRoute path='/:room/:postId' component={Edit}/>
      </UserContext.Provider>
   </Router>
  );
}

export default App;


