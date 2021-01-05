import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Thread from '../pages/Thread';
import House from '../pages/House';

//not used rn 
const HouseRoute = () => {
    return (
      <>
        <Switch>
          <Route exact path='/house/:thread' component={Thread}/>
        </Switch>
        <House/>
      </>
      );
}
 
export default HouseRoute;