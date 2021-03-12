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
import GroupRoute from './sections/GroupRoute';
import User from './pages/User';
import Add from './pages/Add';
import HouseRoute from './sections/HouseRoute';
import PathRoute from './sections/PathRoute';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/user/useFindUser';

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
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute path='/library' component={HouseRoute}/>
            <PrivateRoute path='/path/:path' component={PathRoute}/>
            <PrivateRoute path='/group/:group' component={GroupRoute}/>
            <PrivateRoute path="/user" component={User}/>
            <PrivateRoute path="/add" component={Add}/>
            <PrivateRoute path='/:room' component={LayerRoute}/>
            <Route component={NotFound}/> 
        </Switch>
      </UserContext.Provider>
   </Router>
  );
}

export default App;


