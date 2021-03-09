import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header'
import Thread from '../pages/Thread'; 
import Tags from '../pages/Tags'; 
import House from '../pages/House';
import InMail from '../pages/InMail';
import SymbolKey from './color/SymbolKey';
import Archive from '../pages/Archive';

const HouseRoute = () => { 
    return ( 
      <div className="page"> 
      <Header nav={[ {name: 'house', url: 'house'} ]}/> 
        <Switch>
          <Route exact path='/house' component={House}/>
          <Route path="/house/paths" component={Tags}/>
          <Route exact path='/house/rooms' component={SymbolKey}/>
          <Route exact path="/house/archive" component={Archive}/>
          <Route exact path='/house/inbox' component={InMail}/> 
          <Route path='/house/:threadId' component={Thread}/>
        </Switch>
      </div>
      );
}
 
export default HouseRoute;