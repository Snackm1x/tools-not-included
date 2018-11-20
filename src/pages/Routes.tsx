import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import SeedDetailsPage from './seed-browser/SeedDetailsPage';
import SeedBrowserPage from './seed-browser/SeedBrowserPage';
import AboutPage from './about/AboutPage';
import Error404 from './errors/Error404';
import SeedModImportInfoPage from 'src/pages/seed-browser/SeedModImportInfoPage';
import ComponentURL from 'src/constants/ComponentURL';

const Routes = () => (
    <Switch>
        <Route exact path={ComponentURL.Home} component={SeedBrowserPage} />
        <Route exact path={ComponentURL.SeedBrowser} component={SeedBrowserPage} />
        <Route exact path="/seeds/:seed/:version" component={SeedDetailsPage} />
        <Route exact path="/seeds/edit/:seed/:version" />
        <Route exact path={ComponentURL.SeedModImportInfo} component={SeedModImportInfoPage} />
        <Route exact path={ComponentURL.About} component={AboutPage} />
        <Route component={Error404} />
    </Switch>
);

export default Routes;