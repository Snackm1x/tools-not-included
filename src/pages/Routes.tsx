import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import SeedBrowserPage from './seeds/browser/SeedBrowserPage';
import CoffeePage from './coffee/CoffeePage';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={SeedBrowserPage} />
        <Route exact path="/seeds" component={SeedBrowserPage} />
        <Route exact path="/coffee" component={CoffeePage} />
    </Switch>
);

export default Routes;