import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Edit from './Edit';
import Layer from '../pages/Layer';

const LayerRoute = () => {
    return (
        <>
        <Switch>
            <Route path='/:room/:postId' component={Edit}/>
        </Switch>
            <Layer/>
        </>
      );
}
 
export default LayerRoute;