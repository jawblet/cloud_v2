import { useState } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [user, setUser] = useState(null);

  return (
   <Router>
     <Switch>
       <UserContext.Provider value={{ user, setUser }}>
        <Route exact path="/" component={Register}/>
        <Route path="/home" component={Home}/>
        <Route component={NotFound}/>
        </UserContext.Provider>
      </Switch>
   </Router>
  );
}

export default App;
