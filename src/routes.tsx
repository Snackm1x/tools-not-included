import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import SeedDetailsPage from './pages/SeedDetailsPage';
import SeedBrowserPage from './pages/SeedBrowserPage';
import AboutPage from './pages/AboutPage';
import Error404 from './pages/Error404';
import SeedModImportInfo from 'src/components/adder/SeedModImportInfo';

import ComponentURL from 'src/constants/ComponentURL';

const Routes = () => (
    <Switch>
        <Route exact path={ComponentURL.Home} component={SeedBrowserPage} />
        <Route exact path={ComponentURL.SeedBrowser} component={SeedBrowserPage} />
        <Route exact path="/seeds/:seed/:version" component={SeedDetailsPage} />
        <Route exact path="/seeds/edit/:seed/:version" />
        <Route exact path={ComponentURL.SeedModImportInfo} component={SeedModImportInfo} />
        <Route exact path={ComponentURL.About} component={AboutPage} />
        <Route component={Error404} />
    </Switch>
);

export default Routes;
