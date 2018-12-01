import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import SeedBrowserPage from './seeds/browser/SeedBrowserPage';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={SeedBrowserPage} />
    </Switch>
);

export default Routes;