import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Edit from './Edit'; 
import Group from '../pages/layer/Group';

const GroupRoute = () => {
    return (
        <>
        <Switch>
            <Route path='/group/:group/:postId' component={Edit}/>
        </Switch>
            <Group/>
        </>
      );
}
 
export default GroupRoute;

