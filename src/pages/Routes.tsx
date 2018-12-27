import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import SeedBrowserPage from './seeds/browser/SeedBrowserPage';
import CoffeePage from './coffee/CoffeePage';
import Error404 from './error/Error404';
import SeedDetailsPage from './seeds/details/SeedDetailsPage';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={SeedBrowserPage} />
        <Route exact path="/seeds/:seed/:version" component={SeedDetailsPage} />
        <Route exact path="/seeds" component={SeedBrowserPage} />
        <Route exact path="/coffee" component={CoffeePage} />
        <Route component={Error404}/>
    </Switch>
);

export default Routes;