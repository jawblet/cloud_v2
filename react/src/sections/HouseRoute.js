import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header'
import Thread from '../pages/Thread';
import House from '../pages/House';
import InMail from '../pages/InMail';
import SymbolKey from './color/SymbolKey';
import ColorTheory from './color/ColorTheory';
import PostList5 from './posts/PostList5';

const HouseRoute = () => { 
    return ( 
      <div className="page"> 
      <Header nav={[ {name: 'house', url: 'house'} ]}/>
        <Switch>
          <Route exact path='/house' component={House}/>
          <Route exact path='/house/zone' component={ColorTheory}/>
          <Route exact path='/house/key' component={SymbolKey}/>
          <Route exact path='/house/inbox' component={InMail}/>
          <Route exact path='/house/paths' component={PostList5}/>
          <Route path='/house/:threadId' component={Thread}/>
        </Switch>
      </div>
      );
}
 
export default HouseRoute;