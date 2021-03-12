import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header'
import Thread from '../pages/Thread'; 
import Tags from '../pages/Tags'; 
import House from '../pages/House';
import InMail from '../pages/InMail';
import Syllabus from '../pages/Syllabus'; 
import SymbolKey from './color/SymbolKey';
import Archive from '../pages/Archive';

const HouseRoute = () => { 
    return ( 
      <div className="page"> 
      <Header nav={[ {name: 'library', url: 'library'} ]}/> 
        <Switch>
          <Route exact path='/library' component={House}/>
          <Route path="/library/paths" component={Tags}/>
          <Route exact path='/library/rooms' component={SymbolKey}/>
          <Route exact path="/library/archive" component={Archive}/>
          <Route exact path='/library/inbox' component={InMail}/> 
          <Route exact path='/library/syllabus' component={Syllabus}/> 
          <Route path='/library/:threadId' component={Thread}/> 
        </Switch>
      </div>
      );
}
 
export default HouseRoute;