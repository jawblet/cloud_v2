import React from 'react';
import { Route, Switch } from 'react-router-dom'; 
import Edit from './Edit'; 
import PathLayer from '../pages/layer/PathLayer';

const PathRoute = () => {
    return (
        <>
        <Switch>
            <Route path='/path/:path/:postId' component={Edit}/>
        </Switch>
        <PathLayer/>
        </>
    );
}
 
export default PathRoute;