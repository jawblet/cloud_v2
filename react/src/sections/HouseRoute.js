import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header'
import Thread from '../pages/Thread'; 
import House from '../pages/House';
import InMail from '../pages/InMail';
import SymbolKey from './color/SymbolKey';
import ColorTheory from './color/ColorTheory';
import Archive from '../pages/Archive';

const HouseRoute = () => { 
    return ( 
      <div className="page"> 
      <Header nav={[ {name: 'house', url: 'house'} ]}/> 
        <Switch>
          <Route exact path='/house' component={House}/>
          <Route exact path='/house/zone' component={ColorTheory}/>
          <Route exact path='/house/map' component={SymbolKey}/>
          <Route exact path="/house/archive" component={Archive}/>
          <Route exact path='/house/inbox' component={InMail}/>
          <Route path='/house/:threadId' component={Thread}/>
        </Switch>
      </div>
      );
}
 
export default HouseRoute;