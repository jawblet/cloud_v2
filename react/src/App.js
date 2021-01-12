import './App.css'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Confirm from './pages/Confirm';
import Landing from './pages/Landing'; 
import Home from './pages/Home';
import LayerRoute from './sections/LayerRoute';
//import HouseRoute from './sections/HouseRoute';
import User from './pages/User';
import Add from './pages/Add';
import Tags from './pages/Tags';
import House from './pages/House';
import Group from './pages/layer/Group';
import Thread from './pages/Thread';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/user/useFindUser';
import TestTwo from './pages/TestTwo';

function App() {

  const { 
    user,
    rooms,
    groups,
    globalTags,
    setUser,
    setRooms,
    setGroups,
    setGlobalTags,
    isLoading } = useFindUser();
 
  return (
   <Router>
       <UserContext.Provider value={{   user,
                                        rooms,
                                        groups,
                                        globalTags,
                                        setUser,
                                        setRooms,
                                        setGroups,
                                        setGlobalTags,
                                        isLoading }} >

       <Switch>
            <Route path="/home" component={Landing}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/confirm" component={Confirm}/>
            <Route path="/blob" component={TestTwo}/>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute exact path='/house' component={House}/>
            <PrivateRoute path='/house/:threadId' component={Thread}/>
            <PrivateRoute path="/user" component={User}/>
            <PrivateRoute path="/add" component={Add}/>
            <PrivateRoute path="/paths" component={Tags}/>
            <PrivateRoute path='/group/:group' component={Group}/>
            <PrivateRoute path='/:room' component={LayerRoute}/>
            <Route component={NotFound}/> 
        </Switch>
      </UserContext.Provider>
   </Router>
  );
}

export default App;


// <PrivateRoute path='/house/:threadId' component={Thread}/>
